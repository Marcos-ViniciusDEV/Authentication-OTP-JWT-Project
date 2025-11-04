import { MailtrapClient } from "mailtrap";

export const sendMail = async (to: string, subject: string, body: string) => {
  const mailtrap = new MailtrapClient({
    token: process.env.TOKEN_MAIL_TRAP as string,
    testInboxId: 4152926,
  });

  try {
    await mailtrap.send({
      from: { name: "Sistema", email: "sistema@gmail.com" },
      to: [{ email: to }],
      subject,
      text: body,
    });
    return true;
  } catch (err) {
    return false;
  }
};
