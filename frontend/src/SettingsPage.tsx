import { useEffect, useState } from "react";
import { HousingCard } from "./HousingCards";
import { Listing } from "./Listing.interface";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  type: "student" | "agent";
}

interface SettingsPageProps {
  authToken: string;
  emailAddress: string;
}

export function SettingsPage({ authToken, emailAddress }: SettingsPageProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);
  const [userError, setUserError] = useState("");
  const [listingsError, setListingsError] = useState("");

  useEffect(() => {
    if (!emailAddress || !authToken) return;

    async function fetchUser() {
      try {
        const res = await fetch(
          `/api/users/${encodeURIComponent(emailAddress)}`,
          { headers: { Authorization: `Bearer ${authToken}` } },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        setUser(await res.json());
      } catch (e: any) {
        setUserError(e.message);
      } finally {
        setLoadingUser(false);
      }
    }

    async function fetchListings() {
      try {
        const res = await fetch("/api/users/listings", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        setListings(await res.json());
      } catch (e: any) {
        setListingsError(e.message);
      } finally {
        setLoadingListings(false);
      }
    }

    fetchUser();
    fetchListings();
  }, [emailAddress, authToken]);

  async function handleDelete(listingId: string) {
    try {
      const res = await fetch(`/api/listings/${listingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setListings((prev) => prev.filter((l) => l._id !== listingId));
    } catch (e: any) {
      console.error("Failed to delete listing:", e.message);
    }
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="container-information">
      <div className="mx-auto max-w-content flex flex-col gap-10">
        {/* ── Profile card ── */}
        <section>
          <h1 className="text-2xl font-bold text-brand-900 mb-4">
            My Profile
          </h1>

          {loadingUser ? (
            <p className="text-sm text-brand-600">Loading profile…</p>
          ) : userError ? (
            <p className="text-sm text-red-500">{userError}</p>
          ) : user ? (
            <div className="rounded-2xl border border-brand-200 bg-brand-100 p-6 flex flex-col gap-5">
              {/* Avatar + name row */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-900 flex items-center justify-center text-brand-50 text-xl font-bold shrink-0">
                  {initials}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-semibold text-brand-900">
                    {user.name}
                  </p>
                  <span
                    className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${
                      user.type === "agent"
                        ? "bg-accent-500 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {user.type === "agent" ? "Agent" : "Student"}
                  </span>
                </div>
              </div>

              {/* Details grid */}
              <div className="border-t border-brand-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <p className="text-brand-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-1">
                    Phone
                  </p>
                  <p className="text-brand-900">{user.phone || "—"}</p>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {/* ── My Listings ── */}
        <section>
          <h2 className="text-xl font-bold text-brand-900 mb-4">
            My Listings
          </h2>

          {loadingListings ? (
            <p className="text-sm text-brand-600">Loading listings…</p>
          ) : listingsError ? (
            <p className="text-sm text-red-500">{listingsError}</p>
          ) : listings.length === 0 ? (
            <div className="rounded-2xl border border-brand-200 bg-brand-100 p-8 text-center">
              <p className="text-brand-600 text-sm">
                You haven't posted any listings yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <HousingCard
                  key={listing._id}
                  id={listing._id}
                  campus={listing.campus}
                  address={listing.address}
                  city={listing.city}
                  state={listing.state}
                  zipCode={listing.zipCode}
                  distanceToCampus={listing.distanceToCampus}
                  type={listing.type}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                  squareFootage={listing.squareFootage}
                  rentPerMonth={listing.rentPerMonth}
                  postedBy={user?.type ?? "student"}
                  cardImage={listing.images?.[0]}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
