import { getEnvVar } from "./getEnvVar.js";
import { MongoClient, Collection, Document, ObjectId } from "mongodb";

export class ListingProvider {
  private mongoClient: MongoClient;
  private collection: Collection<Document>;

  constructor(mongoClient: MongoClient) {
    this.mongoClient = mongoClient;
    const collectionName = getEnvVar("LISTINGS_COLLECTION_NAME") as string;
    console.log(collectionName);
    this.collection = this.mongoClient.db().collection(collectionName);
  }

  getAllListings(): Promise<Document[]> {
    // Go to DB and get all Listings
    return this.collection.find().toArray();
  }
  getAllListingsWithPoster(): Promise<Document[]> {
    // Go to DB and get all Listings
    const pipeline = [];
    pipeline.push({
      // We are at Listing Collection
      // lookup from users the localfield which his postedByEmail in listing Documentuse the key to look up foreignKey email
      // in users and bring back as contact
      $lookup: {
        from: "users",
        localField: "postedByEmail",
        foreignField: "email",
        as: "contact",
      },
    });
    // Remove array returned by lookup
    pipeline.push({
      $unwind: {
        path: "$contact",
      },
    });

    return this.collection.aggregate(pipeline).toArray();
  }

  getOneListing(listingID: string) {
    if (!ObjectId.isValid(listingID)) {
      return null;
    }
    const objectId = new ObjectId(listingID);
    const pipeline = [];
    pipeline.push({
      $match: {
        _id: objectId,
      },
    });
    pipeline.push({
      // We are at Listing Collection
      // lookup from users the localfield which his postedByEmail in listing Documentuse the key to look up foreignKey email
      // in users and bring back as contact
      $lookup: {
        from: "users",
        localField: "postedByEmail",
        foreignField: "email",
        as: "contact",
      },
    });
    // Remove array returned by lookup
    pipeline.push({
      $unwind: {
        path: "$contact",
      },
    });
    return this.collection.aggregate(pipeline).next();
  }
  async deleteListing(listingID: string, email: string) {
    // Check if listingID is valid
    if (!ObjectId.isValid(listingID)) {
      return 0;
    }
    // Create new id
    const objectId = new ObjectId(listingID);
    // Search for it
    const listing = await this.collection.findOne({ _id: objectId });

    if (!listing) {
      // No such image exists
      return 0;
    }
    console.log(email);
    // Check if user owns if so change it
    if (listing.postedByEmail === email) {
      const response = await this.collection.deleteOne({ _id: objectId });
      return response.deletedCount;
    }
    // Do not own unauthorized
    return -1;
  }
  async createListing(
    listingData: {
      campus: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      distanceToCampus: number;
      type: string;
      bedrooms: number;
      bathrooms: number;
      squareFootage: number;
      rentPerMonth: number;
      depositAmount: number;
      utilitiesIncluded: boolean;
      availableFrom: string;
      leaseDuration: number;
      amenities: object;
    },
    postedByEmail: string,
    imageFilenames: string[],
  ): Promise<string> {
    // Validate numbers parsed correctly
    if (
      isNaN(listingData.distanceToCampus) ||
      isNaN(listingData.bedrooms) ||
      isNaN(listingData.bathrooms) ||
      isNaN(listingData.squareFootage) ||
      isNaN(listingData.rentPerMonth) ||
      isNaN(listingData.depositAmount) ||
      isNaN(listingData.leaseDuration)
    ) {
      throw new Error("Invalid numeric fields");
    }

    const result = await this.collection.insertOne({
      ...listingData,
      images: imageFilenames,
      postedByEmail,
      listedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    });

    return result.insertedId.toString();
  }
}
