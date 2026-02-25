import houseImg from "./assets/house.jpg";

export function HousingCards() {
  return (
    <a href="listing.html">
      <article className="border rounded-4xl overflow-hidden">
        {/* Image fills top half */}
        <div className="w-full h-56 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={houseImg}
            alt="House listing"
          />
        </div>

        <div className="p-4 flex flex-col gap-1">
          <data value="1000" className="text-lg font-bold text-gray-900">
            $1,000<span className="text-sm font-normal text-gray-500">/mo</span>
          </data>

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <span>
              2 <span className="font-normal text-gray-500">bds</span>
            </span>
            <span className="text-gray-300">|</span>
            <span>
              2 <span className="font-normal text-gray-500">ba</span>
            </span>
            <span className="text-gray-300">|</span>
            <span>
              2,000 <span className="font-normal text-gray-500">sqft</span>
            </span>
          </div>

          <address className="not-italic text-sm text-gray-500 leading-snug">
            9281 Paseo De Caballo, San Luis Obispo, CA 93405
          </address>
        </div>
      </article>
    </a>
  );
}
