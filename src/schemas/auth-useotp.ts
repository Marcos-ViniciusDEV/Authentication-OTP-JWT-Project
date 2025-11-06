import z from "zod";

export const authUserOtpSchema = z.object({
  id: z.string({ message: "ID do OTP é obrigatorio" }),
  code: z.string().length(6, "codigo precisa de 6 numeros"),
});
