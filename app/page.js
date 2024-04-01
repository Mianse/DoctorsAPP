import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorsList from "./_components/DoctorsList";
import GlobalApi from "./_Utils/GlobalApi";

export default function Home() {
  const getDoctorslist =()=>{
    GlobalApi.getDoctorsList().then(resp=>{
      console.log(resp.data.data)
    })
  }

  return (
    <div>
      {/* hero  section*/}
      <Hero/>

      {/*search bar and category */}
      <CategorySearch/>

      {/*} doctorsList *******/}
      <DoctorsList/>

    </div>
  );
}
