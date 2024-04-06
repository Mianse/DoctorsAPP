import React from 'react';
import Image from 'next/image';

function DoctorsList({ doctorsList, heading = 'Popular Doctors' }) {
    console.log('Doctors List:', doctorsList); // Debugging: Log doctorsList to console

    return (
        <div className='mb-10 px-10 '>
            <h2 className='font-bold text-xl'>{heading}</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2 gap-7 mt-4 md:grid-cols-3 lg:grid-cols-4'>
                {doctorsList && doctorsList.length > 0 ? (
                    doctorsList.map((doctor, index) => (
                        <div key={index} className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out">
                            <Image src={doctor.attributes?.Image?.data?.attributes?.url} alt='doctor' className='h-[200px] w-full object-cover rounded ' width={200} height={200} />
                            <div className='mt-3 items-baseline flex flex-col gap-2'>
                                <h2 className='text-[10px] bg-blue-100 p-1 px-2 rounded-lg'>{doctor.attributes?.categories?.data.attributes?.Name}</h2>
                                <h2 className='font-bold'>{doctor.attributes.Name}</h2>
                                <h2 className='text-sm text-primary'>{doctor.attributes?.Years_of_experience}</h2>
                                <h2 className='text-gray-500 text-sm'>{doctor.attributes?.Address}</h2>
                                <h2 className='p-2 px-3 border-[1px] border-primary text-primary text-center rounded-full w-full mt-2 text-[10px] cursor-pointer hover:bg-primary hover:text-white'>Book now</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='h-[200px] bg-slate-100 w-full rounded-lg animate-pulse'></div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DoctorsList;
