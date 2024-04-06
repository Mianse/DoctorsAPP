"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Link from 'next/link';
import GlobalApi from '../_Utils/GlobalApi';

function CategorySearch() {
const [categoryList,setcategoryList] = useState([])

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = () => {
        GlobalApi.getCategory()
            .then(resp => {
                console.log(resp.data.data);
                setcategoryList(resp.data.data)
            })
            .catch(error => {
                console.error("Error fetching category list:", error);
            });
    }

    const handleSearch = () => {
        // Implement search functionality here
        // You may use the input value to perform search
    }

    return (
        <div className='mb-10 items-center px-5 flex flex-col gap-4'>
            <h2 className='font-bold text-4xl tracking-wide'>Search <span className="text-primary">Doctors</span> </h2>
            <h2 className='text-gray-400 text-xl'>Search your doctors and book appointment in one click </h2>
            <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Search ...." />
                <Button type="submit" onClick={handleSearch}>
                    <Search className='h-4 w-4 mr-2'/>
                    Search
                </Button>
            </div>
            {/* Display all categories */}
            <div  className='grid grid-cols-3 mt-8 md:grid-cols-4 lg:grid-cols-6'>
            {categoryList.length>0?categoryList.map((item,index)=>index<6 &&(
                <Link  key={index} href={'/Search/'+item.attributes.Name} className='flex flex-col text-center items-center p-5 m-2  bg-blue-50 gap-2 rounded-lg hover:scale-300 transition-all ease-in-out'>
                    <Image src={item.attributes?.Icon?.data.attributes?.url} alt='icon' height={90} width={90}/>
                    <label className='text-blue-800 text-sm'>{item?.attributes?.Name}</label>
                </Link>
            )):
            [1,2,3,4,5,6].map((item,index)=>(
            <div className='h-[130px] w-[120px] m-2 bg-slate-200 animate-pulse  rounded-lg '>

            </div>
            ))
            
        }
            </div>
            
        </div>
    );
}

export default CategorySearch;
