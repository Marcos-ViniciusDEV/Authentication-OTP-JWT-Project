import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routes/main";
import { prisma } from "./libs/prisma";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(mainRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server rodando http://localhost:${port}/`);
});
