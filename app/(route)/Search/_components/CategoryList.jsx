"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import  Link  from 'next/link';
import Image from 'next/image';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import GlobalApi from '../../../_Utils/GlobalApi';

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    const params = usePathname()
    const category = params.split('/')[2]

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = () => {
        GlobalApi.getCategory()
            .then(resp => {
                console.log(resp.data.data);
                setCategoryList(resp.data.data);
            })
            .catch(error => {
                console.error("Error fetching category list:", error);
            });
    }

    return (
        <div className='h-screen fixed mt-5 flex flex-col'>
        <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className='overflow-visible'>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
    {categoryList && categoryList.map((item, index) => (
    <div key={index}>
    <Link href={'/Search/'+item?.attributes?.Name} className={`p-4 flex gap-4 text-[16px] text-blue-800 rounded-md items-center cursor-pointer w-full ${category==item.attributes.Name&&'bg-blue-100'}`}>
            <Image  alt='icon' src={item.attributes?.Icon?.data.attributes?.url} width={25} height={25}/>
            <label className='text-blue-800 text-md'>{item.attributes.Name}</label>
        </Link>
    </div>
))}


      
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
        </Command>
    </div>
    );
}

export default CategoryList;
