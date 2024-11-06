import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
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
  console.log(loading);
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
        </div>
      )}
    </main>
  );
}
