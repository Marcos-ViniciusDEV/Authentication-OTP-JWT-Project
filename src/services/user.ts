import { prisma } from "../libs/prisma";

export const getUserByEmail = async (email: string) => {
  return await prisma.User.findFirst({
    where: { email },
  });
};

export const createUser = async (name: string, email: string) => {
  const user = await prisma.user.create({
    data: { name, email },
  });

  return user;
};
