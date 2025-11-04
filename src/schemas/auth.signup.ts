import { z } from "zod";

export const authSingUpShchema = z.object({
  name: z.string({ message: "Campo name é Obrigatório" }),
  email: z.string({ message: "Campo email é obrigatório" }).email("Email inválido"),
});
