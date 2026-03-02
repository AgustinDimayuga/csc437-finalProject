interface ListingContactCardProps {
  id: number;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  postedBy: "agent" | "student";
  address: string;
  listedAt: string;
  updatedAt: string;
}

export function ListingContactCard({
  id,
  contactName,
  contactEmail,
  contactPhone,
  postedBy,
  address,
  listedAt,
  updatedAt,
}: ListingContactCardProps) {
  const formattedListed = new Date(listedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedUpdated = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-brand-100 rounded-2xl border border-brand-200 p-6 space-y-5 sticky top-24">
      <h2 className="text-lg font-bold text-brand-900">Contact Landlord</h2>

      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-accent-500 border border-accent-500 flex items-center justify-center text-lg font-bold text-white">
          {contactName.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-brand-900">{contactName}</p>
          <p className="text-xs text-brand-600 capitalize">{postedBy}</p>
        </div>
      </div>

      {/* Contact links */}
      <div className="space-y-3">
        <a
          href={`mailto:${contactEmail}`}
          className="flex items-center gap-3 text-sm text-brand-700 hover:text-brand-900 transition-colors"
        >
          <span className="text-base">✉️</span>
          <span className="break-all">{contactEmail}</span>
        </a>
        {contactPhone && (
          <a
            href={`tel:${contactPhone}`}
            className="flex items-center gap-3 text-sm text-brand-700 hover:text-brand-900 transition-colors"
          >
            <span className="text-base">📞</span>
            <span>{contactPhone}</span>
          </a>
        )}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <a
          href={`mailto:${contactEmail}?subject=Inquiry about ${address}`}
          className="block text-center w-full bg-accent-200 text-brand-900 font-semibold py-2.5 rounded-xl hover:bg-accent-500 hover:text-white transition-colors text-sm"
        >
          Send Email
        </a>
        {contactPhone && (
          <a
            href={`tel:${contactPhone}`}
            className="block text-center w-full border border-brand-300 text-brand-900 font-semibold py-2.5 rounded-xl hover:bg-brand-200 transition-colors text-sm"
          >
            Call Now
          </a>
        )}
      </div>

      {/* Meta */}
      <div className="border-t border-brand-200 pt-4 space-y-1">
        <p className="text-xs text-brand-700">Listed: {formattedListed}</p>
        <p className="text-xs text-brand-700">Updated: {formattedUpdated}</p>
        <p className="text-xs text-brand-700">
          ID #{id} &middot;{" "}
          <span className="capitalize">{postedBy} listing</span>
        </p>
      </div>
    </div>
  );
}
