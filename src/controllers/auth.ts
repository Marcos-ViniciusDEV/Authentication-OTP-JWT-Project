import { RequestHandler } from "express";
import { schema } from "../schemas/auth.signin";
import { authSingUpShchema } from "../schemas/auth.signup";
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validateOTP } from "../services/otp";
import { sendMail } from "../libs/mailTrap";
import { authUserOtpSchema } from "../schemas/auth-useotp";
import { createJWT } from "../libs/jwt";

export const signin: RequestHandler = async (req, res) => {
  const data = schema.safeParse(req.body);

  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  const user = await getUserByEmail(data.data.email);
  if (!user) {
    res.json({
      error: "usuario não existe",
    });
    return;
  }

  const otp = await generateOTP(user.id);

  await sendMail(user.email, "Seu código de acesso é " + otp.code, "digite seu codigo " + otp.code);

  res.json({ id: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
  //Validar os dados recebidos
  const data = authSingUpShchema.safeParse(req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "O corpo (body) da requisição está vazio ou não é um JSON válido.",
    });
  }
  if (!data.success) {
    console.log("ERRO ZOD:", data.error.flatten());
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  const user = await getUserByEmail(data.data.email);
  //verifica se o email ja existe
  if (user) {
    res.json({ error: "já existe usuário com este e-mail." });
    return;
  }

  //Criar o usuário

  const newUser = await createUser(data.data.name, data.data.email);

  res.status(201).json({ user: newUser });
  //retornar os dados do usuario-criado
};

export const useOTP: RequestHandler = async (req, res) => {
  const data = authUserOtpSchema.safeParse(req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "O corpo (body) da requisição Precisa ter um json {id:--- , code:---} do OTP",
    });
  }

  if (!data.success) {
    console.log({ error: data.error.flatten() });

    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  const user = await validateOTP(data.data.id, data.data.code);
  if (!user) {
    res.json({ error: "OTP inválido ou expirado" });
    return;
  }

  const token = createJWT(user.id);

  res.json({ token, user });
};
