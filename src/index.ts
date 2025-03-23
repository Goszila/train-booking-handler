import { Elysia } from "elysia";
import checkAvailable from "./api/checkAvailable";
const { PORT } = process.env

const app = new Elysia().get("/", () => "Hello Elysia")

app.get("/hello", async () => {

  return await checkAvailable();
});

app.listen(PORT || 3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
