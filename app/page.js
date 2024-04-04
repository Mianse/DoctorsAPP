
"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorsList from "./_components/DoctorsList";
import GlobalApi from "./_Utils/GlobalApi";
import { useEffect ,useState} from "react";

export default function Home() {
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
    <div>
      {/* hero  section*/}
      <Hero/>

      {/*search bar and category */}
      <CategorySearch/>

      {/*} doctorsList *******/}
      <DoctorsList doctorsList={doctorsList}/>


    </div>
  );
}
