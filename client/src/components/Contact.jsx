import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export  default function Contact({listing}){
   const [landLord, setLandLord] = useState(null);
   const [message, setMessage] = useState('');
   const onChange = (e) => {
    setMessage(e.target.value);
   };

    useEffect(()=>{
        const fetchLandLord = async () => {
            try {
                console.log(listing.userRef)
                if (!listing.userRef) {
                    console.log("no userRef lapha!")
                }

                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                console.log("landLord data: ", data)
                setLandLord(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchLandLord();
    }, [listing.userRef])

    return (
        <div>
            <>
            {landLord && (
                <div className='flex flex-col gap-2'>
                    <p>Contact <span className='font-semibold'>{landLord.username}</span>{' '} for{' '}
                        <span className='font-semibold'>{listing?.name ? listing.name.toLowerCase() : "this Listing"}</span>
                    </p>
                    <textarea 
                        name='message' 
                        id='message' 
                        rows='2'
                        value={message}
                        onChange={onChange}
                        placeholder='Enter your message here...'
                        className='w-full border p-3 rounded-lg'
                    ></textarea>
                    <Link
                    to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`} 
                    className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
                        Send Message
                    </Link>
                </div>
            )}
            </>
        </div>
    )
}