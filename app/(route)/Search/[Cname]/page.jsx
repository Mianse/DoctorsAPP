"use client"
import React from 'react'
import { useEffect } from 'react'
const Search = ({params}) => {

  useEffect(()=>{
    console.log(params.Cname)
  },[])
  return (
    <div>
        search
        
    </div>
  )
}

export default Search
