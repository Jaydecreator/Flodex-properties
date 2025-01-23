import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { FaShare, FaBed, FaChair, FaBath, FaParking, FaMapMarkedAlt, FaMapMarkerAlt } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import Contact from "../components/Contact";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false)
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser, listing?.useRef);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl"> Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">
          Something is wrong...wait..Look..
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper 
            navigation={true}
            modules={[Navigation]}
            className="h-[550px]"
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-full w-full flex items-center justify-center"
                  style={{
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={url}
                    alt="listing"
                    className="w-full h-full object-contain"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%'
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fixed top-[13%] right-[3%] z-[10] border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
          >
            <FaShare
              className=" text-slate-500"
              onClick={()=>{
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(()=>{
                  setCopied(false);
                },2000);
              }}
            />
          </div>
          {copied && <p className="fixed top-[23%] right-[5%] z-[10] font-semibold bg-slate-100 px-2 py-1 rounded-md">Link Copied!</p>}
          <div 
            className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4"
          >
            <p className="text-2xl font-semibold">
              {listing.name} - ${''}
              {listing.offer
                ? listing.discountedPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && '/ Month'}
            </p>
            <p
              className="flex items-center mt-6 text-slate-600 text-sm gap-2"
            >
              <FaMapMarkerAlt className=" text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-950 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className="bg-green-950 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountedPrice} Off!
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Description -
              </span>
              {listing.description}
            </p>
            <ul
              className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? 'Parking Spot' : 'No Parking'}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className="bg-slate-700 text-white uppercase rounded-lg hover:opacity-95">
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div> 
      )}
    </main>
  );
}
