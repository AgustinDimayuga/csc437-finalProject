import express, { Express } from "express";
import { getEnvVar } from "./getEnvVar.js";
import { SHARED_TEST } from "./shared/example.js";
import { VALID_ROUTES } from "./shared/ValidRoutes.js";
import { connectMongo } from "./connectMongo.js";
import { registerListingRoutes } from "./routes/listingRoutes.js";
import { ListingProvider } from "./ListingProvider.js";
import { verify } from "node:crypto";
import { verifyAuthToken } from "./routes/verifyAuthToken.js";
import { registerAuthRoutes } from "./routes/authRoutes.js";
import { CredentialProvider } from "./CredentialsProvider.js";

const portEnvVar = getEnvVar("PORT", false);
const parsedPort = portEnvVar ? Number.parseInt(portEnvVar, 10) : Number.NaN;
const PORT = Number.isNaN(parsedPort) ? 3000 : parsedPort;
const app: Express = express();
const myMongoClient = connectMongo();
// Setup middleware so we can read body
app.use("/api/listings", verifyAuthToken);
app.use(express.json());

// Use mongo CLient to log connection works
myMongoClient
  .db()
  .listCollections()
  .toArray()
  .then((result) => console.log(result));
app.get("/api/hello", (req, res) => {
  res.send("Hello, World " + SHARED_TEST);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}.  CTRL+C to stop.`);
});

// Get the static directory of the built files
const STATIC_DIR = getEnvVar("STATIC_DIR") || "public";
app.use(express.static(STATIC_DIR));

// Get the index.html from the built files directory and server them on any of the ValidRoutes see VALID_ROUTES Folder
app.get(Object.values(VALID_ROUTES), (req, res) => {
  res.sendFile("index.html", { root: STATIC_DIR });
});
registerListingRoutes(app, new ListingProvider(myMongoClient));
registerAuthRoutes(app, new CredentialProvider(myMongoClient));
