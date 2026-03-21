import { JwtPayload } from "jsonwebtoken";
import { ListingProvider } from "../ListingProvider.js";
import { Express, Response, Request } from "express";
import {
  handleImageFileErrors,
  imageMiddlewareFactory,
} from "../imageUploadMiddleware.js";

export function registerListingRoutes(
  app: Express,
  listingProvider: ListingProvider,
) {
  // Register listening for get at /api/listings response with all listings from imageProvider
  app.get("/api/listings", async (req, res) => {
    const response = await listingProvider.getAllListingsWithPoster();
    res.send(response);
  });
  app.post(
    "/api/listings",
    imageMiddlewareFactory.array("images"),
    handleImageFileErrors,
    async (req: Request, res: Response) => {
      try {
        const files = req.files as Express.Multer.File[];
        const {
          campus,
          address,
          city,
          state,
          zipCode,
          distanceToCampus,
          type,
          bedrooms,
          bathrooms,
          squareFootage,
          rentPerMonth,
          depositAmount,
          utilitiesIncluded,
          availableFrom,
          leaseDuration,
          amenities,
        } = req.body;

        // Check required fields
        if (
          !campus ||
          !address ||
          !city ||
          !state ||
          !zipCode ||
          !distanceToCampus ||
          !type ||
          !bedrooms ||
          !bathrooms ||
          !squareFootage ||
          !rentPerMonth ||
          !depositAmount ||
          utilitiesIncluded === undefined ||
          !availableFrom ||
          !leaseDuration ||
          !amenities
        ) {
          return res.status(400).json({
            error: "Bad Request",
            message: "Missing required listing fields",
          });
        }

        // Parse amenities safely
        let parsedAmenities;
        try {
          parsedAmenities = JSON.parse(amenities);
        } catch {
          return res.status(400).json({
            error: "Bad Request",
            message: "amenities must be a valid JSON string",
          });
        }

        const email = (req.userInfo as JwtPayload)?.username;
        if (!email) {
          return res.status(401).json({
            error: "Unauthorized",
            message: "Could not identify user from token",
          });
        }

        const imageFilenames = files ? files.map((file) => file.filename) : [];

        const id = await listingProvider.createListing(
          {
            campus,
            address,
            city,
            state,
            zipCode,
            distanceToCampus: parseFloat(distanceToCampus),
            type,
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            squareFootage: parseInt(squareFootage),
            rentPerMonth: parseFloat(rentPerMonth),
            depositAmount: parseFloat(depositAmount),
            utilitiesIncluded: utilitiesIncluded === "true",
            availableFrom,
            leaseDuration: parseInt(leaseDuration),
            amenities: parsedAmenities,
          },
          email,
          imageFilenames,
        );

        return res.status(201).json({ _id: id });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    },
  );

  app.get("/api/listings/:id", async (req, res) => {
    // Use req.params.id to get id parameter from string
    try {
      const response = await listingProvider.getOneListing(req.params.id);
      if (!response) {
        return res.status(404).send({
          error: "Not Found",
          message: "No listing with that ID",
        });
      }
      return res.send(response);
    } catch (e) {
      console.error("failed to get listing", e);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.delete("/api/listings/:id", async (req, res) => {
    try {
      const response = await listingProvider.deleteListing(
        req.params.id,
        (req.userInfo as JwtPayload)?.username,
      );
      if (response == 0) {
        return res.status(404).send({
          error: "Not Found",
          message: "No listing with that ID",
        });
      } else if (response == -1) {
        return res.status(403).send({
          error: "Forbidden",
          message: "This user does not own this image",
        });
      }
      return res.status(204).send();
    } catch (e) {
      console.error("failed to update image", e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.get("/api/users/listings", async (req: Request, res: Response) => {
    try {
      const response = await listingProvider.getListingsByUser(
        (req.userInfo as JwtPayload).username,
      );
      if (response == -1) {
        return res.status(404).send({
          error: "Not Found",
          message: "No listing with that ID",
        });
      }
      return res.send(response);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
