import { Link } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaParking,
  FaChair,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Listingitem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fphotos%2Freal-estate.html&psig=AOvVaw00QrjgyTQtLsHmwO2Bsa-9&ust=1737713290594000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCy5tPMi4sDFQAAAAAdAAAAABAE"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2">
            <span className="font-semibold text-black">Description - </span>
            {listing.description.length > 100 ? (
              <span className="">
                {listing.description.substring(0, 100)}...
              </span>
            ) : (
              <span>{listing.description}</span>
            )}
          </p>

          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && "/month"}
          </p>

          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
            <FaBed className="text-sm" />

            <FaBath className="text-sm" />

            <FaParking className="text-sm" />

            <FaChair className="text-sm" />
          </div>          
        </div>
      </Link>
    </div>
  );
}
