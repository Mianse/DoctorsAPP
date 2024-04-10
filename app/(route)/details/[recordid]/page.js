'use client'
import GlobalApi from '@/app/_Utils/GlobalApi'
import React, { useState, useEffect } from 'react'
import DoctorDetails from '../_components/DoctorDetails'
import DoctorSuggestionList from '../_components/DoctorSuggestionList'

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    // Call getDoctorById only when params.recordId changes
    getDoctorById();
  }, [params.recordId]);

  const getDoctorById = () => {
    // Check if params.recordId is available before making the API call
    if (params.recordId) {
      GlobalApi.getDoctorById(params.recordId)
        .then(resp => {
          console.log(resp)
          setDoctor(resp.data.data);
        })
        .catch(error => {
          console.error('Error fetching doctor details:', error);
        });
    }
  }

  return (
    <div className='p-2 md:px-20 flex flex-col items-center'>
  <h2 className='font-bold text-[22px] mb-4'>Details</h2>
  <div className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full'>
    {/* Doctor details */}
    {doctor && <DoctorDetails doctor={doctor} />}
    {/* doctors suggestions */}
    <div className="md:col-span-3">
      {/* Content for doctor suggestions */}
      <DoctorSuggestionList />
    </div>
  </div>
</div>

  );
}

export default Details;
