'use client';

import React, { useEffect, useState } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { FaStar } from 'react-icons/fa';


interface Item {
    _id: string;
    title: string;
    date: string;
    review: string;
    subtitle: string;
    images: string;
    pandit: string;
    minPrice: string;
    maxPrice: string;
    about: string;
    poojaTag: string;
    poojaDuration: string;
    tithi: string;
    aboutPooja: string;
    category: string;
    panditNo: string;
    params: { name: string };
    faq: string;
    stars:string,   
    avgStars:string
    poojaBookPdf: {
        title:string;
        pdfUrl:string;
    };
    
    
}

const PoojaId = () => {

    const [data, setData] = useState<Item | null>(null);
    const [showModal, setShowModal] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [mantraData, setMantraData] = useState(null);
    const handleGooglePlayClick = () => {
        window.open(' https://play.google.com/store/apps/details?id=com.aumgroup.vedic_pandit_app') ;
      };
     
      const handleAppStoreClick = () => {
      
        window.open('https://apps.apple.com/in/app/vedic-pandit/id6633438885') ;
      };
    

    // Get the id from search parameters

    useEffect(() => {


        const fetchData = async () => {
            try {

                const id = searchParams.get('id');

                if (id) {

                    const response = await fetch(`https://vedic-pandit-server.onrender.com/get-pooja-by-id/${id}`);
                    const data = await response.json();
                    setData(data);

                    if (data.poojaBookPdf && data.poojaBookPdf.length > 1) {
                      setMantraData(data.poojaBookPdf[1].pdfUrl);
                  }
                    // setMantraData(data.poojaBookPdf[1]); 
                    console.log(data.poojaBookPdf[1]);

                }

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();

    }, []);

    const handleBookNowClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container p-4 lg:p-0">

{data && (
  <div className="md:px-40 items-center pt-10">
    {/* Main grid layout for image and text on large screens */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
      {/* Image section */}
      <div className="w-full h-auto my-4 flex justify-center md:justify-end">
  <img
    src={data.images}
    alt={data.subtitle}
    className="rounded-lg w-full h-auto max-w-[500px] max-h-[300px] object-cover"
  />
</div>


      {/* Text and details section */}
      <div>
        <h3 className="text-base font-medium tracking-wider">{data.title}</h3>
        <p className="text-black">{data.review}</p>
        <div className="flex py-3">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={`h-5 w-5 ${
                index < parseInt(data.avgStars) ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
          <p className="px-2">({data.avgStars})</p>
        </div>
        <p className="text-black text-base md:pr-20">{data.subtitle}</p>
        <div className="pt-2">
          <p className="text-black">Pooja Duration: {data.poojaDuration} hour(s)</p>
          <p className="text-black">Number of Pandit(s): {data.panditNo}</p>
        </div>
        <div className="flex space-x-2 text-black py-4">
          <p>₹{data.minPrice} -</p>
          <p>₹{data.maxPrice}</p>
        </div>
      </div>
    </div>

    {/* Grid for boxes and button on large screens */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center ">
      {/* Boxes section */}
      <div className="flex gap-4 hover:cursor-pointer lg:px-6">
      {/* Samagrih */}
      <div
        className="border-2 rounded-lg h-20 w-20 flex flex-col justify-center items-center px-2 py-2"
        onClick={() => router.push('/puja-samagrih')}
      >
        <img
          src='/shopping-bag.png'
          className='w-auto h-6'
        />
        <p className="text-xs pt-2">Samagrih</p>
      </div>

     {/* Mantra button */}
     <div
                        className="border-2 rounded-lg h-20 w-20 flex flex-col justify-center items-center px-2 py-2"
                        onClick={() => mantraData && window.open(mantraData, '_blank')}
                    >
                        <img src='/atomic.png' className='w-auto h-6' alt="Mantra icon" />
                        <p className="text-xs pt-2">Mantra</p>
                    </div>


      {/* Aarti */}
      <div
        className="border-2 rounded-lg h-20 w-20 flex flex-col justify-center items-center px-3 py-2"
        onClick={() => router.push('/aarti')}
      >
        <img
          src='/pooja.png'
          className='w-auto h-6'
        />
        <p className="text-xs pt-2">Aarti</p>
      </div>

      {/* Bhajan */}
      <div
        className="border-2 rounded-lg h-20 w-20 flex flex-col justify-center items-center px-2 py-2"
        onClick={() => router.push('/Bhajan')}
      >
        <img
          src='/play-button (1).png'
          className='w-auto h-6'
        />
        <p className="text-xs pt-2">Bhajan</p>
      </div>
    </div>
      {/* Button section */}
      <div className="flex justify-center md:justify-start lg:ml-4 lg:-mt-10">
        {/* <div className="md:py-8 pt-6"> */}
          <button
            className="bg-black text-white rounded-md px-32 py-2"
            onClick={handleBookNowClick}
          >
            <div className="flex gap-1">
              Book <span> Now</span>
            </div>
          </button>
        {/* </div> */}
      </div>
    </div>
                    <div className=" md:py-10  py-2">
                        <h4 className="font-semibold pb-4 tracking-wider">About </h4>
                        <p className="text-black">{data.about}</p>
                        <p>{data.aboutPooja}</p>
                        <button >{data.about}</button>
                        
                    </div>
                  
  </div>
)}


              


            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="bg-white p-8 rounded-md shadow-md relative w-[1000px] h-[650px]">
                        <button
                            className="absolute top-2 right-2 text-white-600 hover:text-gray-900 bg-gray-100 px-2 "
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <div className="flex flex-col md:flex-row items-center justify-center md:pt-20">

                            <img
                                src="/download ss.png" // Replace with your actual image path
                                alt="App Download"

                                className="rounded-lg w-auto h-96"
                            />


                            <div className="mt-4 md:mt-0 md:ml-4">

                                <div className="text-center md:text-left md:pr-8">
                                    <h2 className="text-2xl font-bold mb-4">Download the App </h2>
                                    <p className="mb-4">To proceed with the booking, please download our app.</p>
                                    <div className="flex justify-around md:justify-start md:gap-4 gap-2">
                                        <button  onClick={handleGooglePlayClick} className="bg-black text-white inline-flex py-3 px-5 rounded-lg items-center ml-0 mt-4 md:mt-0 hover:bg-gray-800 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                                                <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                                            </svg>
                                            <span className="ml-4 flex items-start flex-row leading-none gap-1">
                                                {/* <span className="text-xs text-white mb-1">GET IT ON</span> */}
                                                <span className="title-font font-medium">Google </span>
                                                <span className="title-font font-medium"> Play</span>
                                            </span>
                                        </button>
                                        <button onClick={handleAppStoreClick} className="bg-black text-white inline-flex py-3 px-5 rounded-lg items-center lg:ml-4 md:ml-4 ml-0 mt-4 md:mt-0 hover:bg-gray-800 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 305 305">
                                                <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                                                <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                                            </svg>
                                            <span className="ml-4 flex items-start flex-row leading-none gap-1">
                                                {/* <span className="text-xs text-white mb-1">Download on the</span> */}
                                                <span className="title-font font-medium">App </span>
                                                <span className="title-font font-medium"> Store</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PoojaId;
