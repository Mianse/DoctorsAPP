import React from 'react';
import { useEffect ,useState} from "react";
import GlobalApi from '@/app/_Utils/GlobalApi';
import Image from 'next/image'
import Link  from 'next/link'
const DoctorSuggestionList = ({heading='Suggestions'}) => {
    const [doctorsList,setDoctorsList] = useState([])

  useEffect(()=>(
    getDoctorslist()
  ),[])
  const getDoctorslist =()=>{
    GlobalApi.getDoctorsList().then(resp=>{
      console.log(resp.data.data)
      setDoctorsList(resp.data.data)
    })
  }

  return (
    <div   className='flex flex-col items-center mb-10 px-10'>
    <h2 className='font-bold text-xl'>{heading}</h2>
    <div className='mt-4'>
        {doctorsList && doctorsList.length > 0 ? (
            doctorsList.map((doctor, index) => (
                <div key={index} className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out mb-4">
                    <Link href={'/details/'+doctor?.id} className="flex flex-col">
                        <Image src={doctor.attributes?.Image?.data?.attributes?.url} alt='doctor' className='h-[70px] w-[70px] object-cover rounded mb-3' width={70} height={70} />
                        <h2 className='text-[10px] bg-blue-100 p-1 px-2 rounded-lg'>{doctor.attributes?.categories?.data.attributes?.Name}</h2>
                        <h2 className='font-bold'>{doctor.attributes.Name}</h2>
                        <h2 className='text-sm text-primary'>{doctor.attributes?.Years_of_experience}</h2>
                        <h2 className='text-gray-500 text-sm'>{doctor.attributes?.Address}</h2>
                    </Link>
                </div>
            ))
        ) : (
            [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={index} className='h-[200px] bg-slate-100 w-full rounded-lg animate-pulse mb-4'></div>
            ))
        )}
    </div>
</div>

  );
}

export default DoctorSuggestionList;
