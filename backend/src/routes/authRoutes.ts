import jwt, { JwtPayload } from "jsonwebtoken";
import { Express, Request, Response } from "express";

import { CredentialProvider } from "../CredentialsProvider.js";
import { getEnvVar } from "../getEnvVar.js";
import { verifyAuthToken } from "./verifyAuthToken.js";
/**
 * Creates a Promise for a JWT token, with a specified username embedded inside.
 *
 * @param username the username to embed in the JWT token
 * @return a Promise for a JWT
 */
function generateAuthToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = { username };
    jwt.sign(
      payload,
      getEnvVar("JWT_SECRET") as string,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token as string);
      },
    );
  });
}

export function registerAuthRoutes(
  app: Express,
  credentialsProvider: CredentialProvider,
): void {
  app.post("/api/users", async (req: Request, res: Response) => {
    // TODO: Make sure req body is not null
    if (!req.body) {
      return res.status(400).json({
        error: "Bad request",
        message: "Empty Body",
      });
    }
    const { name, email, password, phone, type } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof phone !== "string" ||
      typeof type !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !phone.trim() ||
      !type.trim()
    ) {
      return res.status(400).json({
        error: "Bad request",
        message: "Invalid or missing username, email, or password",
      });
    }

    const response = await credentialsProvider.registerUser(
      name,
      email,
      password,
      phone,
      type,
    );

    if (!response) {
      return res.status(409).json({
        error: "Conflict",
        message: "Username already taken",
      });
    }

    const authResponse = await credentialsProvider.verifyPassword(
      email,
      password,
    );

    if (authResponse) {
      const token = await generateAuthToken(email);
      return res.status(201).json({ token, email });
    } else {
      return res.status(401).json({
        message: "Incorrect Username/ Password",
      });
    }
  });

  app.get(
    "/api/users/:email",
    verifyAuthToken,
    async (req: Request, res: Response) => {
      const email = req.params.email as string;
      const authenticatedEmail = (req.userInfo as JwtPayload).username;

      if (authenticatedEmail !== email) {
        return res.status(403).json({
          error: "Forbidden",
          message: "You can only access your own profile",
        });
      }

      const user = await credentialsProvider.getUser(email);
      if (!user) {
        return res.status(404).json({
          error: "Not found",
          message: "User not found",
        });
      }

      return res.status(200).json(user);
    },
  );

  app.post("/api/auth/tokens", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({
        error: "Bad request",
        message: "Invalid or missing username, or password",
      });
    }

    const response = await credentialsProvider.verifyPassword(email, password);

    if (response) {
      const token = await generateAuthToken(email);
      return res.status(200).json({ token, email });
    } else {
      return res.status(401).json({
        message: "Incorrect Username/ Password",
      });
    }
  });
}
