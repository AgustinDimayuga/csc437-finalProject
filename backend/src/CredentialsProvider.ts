import { MongoClient, Collection, ClientSession } from "mongodb";
import { getEnvVar } from "./getEnvVar.js";
import bcrypt from "bcrypt";

interface CredentialDocument {
  email: string;
  password: string;
}

interface UserDocument {
  name: string;
  email: string;
  phone: string;
  type: string;
}

export class CredentialProvider {
  private mongoClient: MongoClient;
  private credsCollection: Collection<CredentialDocument>;
  private usersCollection: Collection<UserDocument>;

  constructor(mongoClient: MongoClient) {
    this.mongoClient = mongoClient;

    const credsCollectionName = getEnvVar("CREDS_COLLECTION_NAME") as string;
    this.credsCollection = this.mongoClient
      .db()
      .collection<CredentialDocument>(credsCollectionName);

    const userCollectionName = getEnvVar("USERS_COLLECTION_NAME") as string;
    this.usersCollection = this.mongoClient
      .db()
      .collection<UserDocument>(userCollectionName);
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
    phone: string,
    type: string,
  ): Promise<boolean> {
    const existing = await this.credsCollection.findOne({ email: email });
    if (existing) {
      return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const session: ClientSession = this.mongoClient.startSession();
    try {
      await session.withTransaction(async () => {
        await this.credsCollection.insertOne(
          { email: email, password: hashedPassword },
          { session },
        );
        await this.usersCollection.insertOne(
          { name: name, email: email, phone: phone, type: type },
          { session },
        );
      });
    } catch (e) {
      return false;
    } finally {
      await session.endSession();
    }

    return true;
  }

  async getUser(email: string): Promise<UserDocument | null> {
    return this.usersCollection.findOne(
      { email },
      { projection: { _id: 1, name: 1, email: 1, phone: 1, type: 1 } },
    );
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const credDoc = await this.credsCollection.findOne({ email: email });
    if (!credDoc) {
      return false;
    }

    return bcrypt.compare(password, credDoc.password);
  }
}
