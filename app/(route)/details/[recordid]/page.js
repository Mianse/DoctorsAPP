'use client'
import GlobalApi from '@/app/_Utils/GlobalApi'
import React from 'react'
import  { useState ,useEffect} from 'react'

const Details = ({params}) => {
  useEffect(()=>{
    getDoctorById(params.recordId)
  },[params])
  const getDoctorById = (doctorId)=>{

    GlobalApi.getDoctorById(doctorId).then(resp=>{
      console.log(resp)
    })
  }

  return (
    <div>
      details
    </div>
  )
}

export default Details
