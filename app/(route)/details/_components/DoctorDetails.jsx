import { GraduationCap ,MapPin} from 'lucide-react'
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


const DoctorDetails = ({doctor}) => {
const socialMediaList =[
  {
    id: 1,
    icon: '/youtube.webp',
    url: ''
  },
  {
    id:2,
    icon:'/twitter.webp',
    url: ''
  },{
    id:3,
    icon: '/facebook.webp',
    url:''
  }
]
  console.log(doctor.attributes?.Image?.data?.attributes?.url);
  const imageUrl = doctor.attributes?.Image?.data?.attributes?.url
  return (
    
        
      <div className='flex flex-col'>
        <div className='grid grid-cols-1  border-[1px] p-5 rounded-lg'>
          {/* Image placeholder for now */}
          <div >
            <Image src={imageUrl} width={200} height={200} alt='doctor-image' className='rounded-lg w-[300px] h-[300px] object-cover '/>
          </div>
          <div className='cols-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
            <h2 className='font-bold text-2xl'>{doctor.attributes?.Name}</h2>
            <h2 className="span-3 text-md flex gap-2 text-gray-500">
              <GraduationCap/>
              <span>{doctor.attributes?.Years_of_experience} years of experience</span>
            </h2>
            <h2 className='text-md flex gap-2 text-gray-500'>
                <MapPin/>
                {doctor.attributes?.Address}

            </h2>
            <h2 className='text-[10px] bg-blue-100 p-1 px-2 rounded-lg'>{doctor.attributes?.categories?.data.attributes?.Name}</h2>
            <div className='flex gap-3' >
                {socialMediaList.map((item,index)=>(
                  <Image src={item.icon} key={index} width={30} height={30}/>
                ))}
            </div>
            <Button className="mt-3 rounded-full">
              Book Appointment</Button>
          </div>
          

        </div>
        {/*about doctor info*/}
        <div className='mt-5 border-[1px] rounded-lg'>
            <h2 className='font-bold text-[20px] '>
                  About me
            </h2>
            <p className='text-gray-500 tracking-wider mt-2'>{doctor.attributes.About}</p>
          </div>
        </div>
    
  );
}

export default DoctorDetails;
