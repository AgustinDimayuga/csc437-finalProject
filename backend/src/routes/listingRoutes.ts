import { JwtPayload } from "jsonwebtoken";
import { ListingProvider } from "../ListingProvider.js";
import { Express, response } from "express";

export function registerListingRoutes(
  app: Express,
  listingProvider: ListingProvider,
) {
  // Register listening for get at /api/listings response with all listings from imageProvider
  app.get("/api/listings", async (req, res) => {
    const response = await listingProvider.getAllListingsWithPoster();
    res.send(response);
  });

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
}
