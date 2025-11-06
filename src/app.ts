import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routes/main";
import cron from "node-cron";
import { prisma } from "./libs/prisma";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(mainRouter);

// Esta string '*/30 * * * *' significa "Rodar a cada 30 minutos"
cron.schedule("*/30 * * * *", async () => {
  console.log("-------------------------------------");
  console.log("INICIANDO LIMPEZA DE OTPS EXPIRADOS...");

  const now = new Date(); // Pega a hora atual (ex: 10:30)

  try {
    const { count } = await prisma.otp.deleteMany({
      where: {
        // A condição para deletar é:
        used: false, // Onde 'used' for falso
        AND: {
          expiresAt: {
            lt: now, // E 'expiresAt' for menor que (lt) a hora atual
          },
        },
      },
    });

    console.log(`LIMPEZA CONCLUÍDA: ${count} registros de OTP deletados.`);
    console.log("-------------------------------------");
  } catch (error) {
    console.error("ERRO AO LIMPAR OTPS:", error);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server rodando http://localhost:${port}/`);
});
