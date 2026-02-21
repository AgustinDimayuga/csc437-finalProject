import express from "express";
import { getEnvVar } from "./getEnvVar.js";
import { SHARED_TEST } from "./shared/example.js";

const portEnvVar = getEnvVar("PORT", false);
const parsedPort = portEnvVar ? Number.parseInt(portEnvVar, 10) : Number.NaN;
const PORT = Number.isNaN(parsedPort) ? 3000 : parsedPort;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello, World " + SHARED_TEST);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}.  CTRL+C to stop.`);
});
