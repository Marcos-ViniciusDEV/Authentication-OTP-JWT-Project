import { MailtrapClient } from "mailtrap";

export const sendMail = async (to: string, subject: string, body: string) => {
  const client = new MailtrapClient({
    token: process.env.TOKEN_MAIL_TRAP as string,
    testInboxId: 4155195,
  });

  const sender = {
    email: "hello@example.com",
    name: "MailTrap test",
  };

  const recipients = [{ email: to }];

  try {
    await client.testing.send({
      from: sender,
      to: recipients,
      subject,
      text: body,
      category: "Integration Test",
    });
    return true;
  } catch (err) {
    console.log("falha ao enviar o email", err);
    return false;
  }
};
