"use client"
import React, { useEffect, useState } from 'react';
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
        <div className='h-screen fixed mt-8 flex flex-col'>
        <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className='overflow-visible'>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
    {categoryList && categoryList.map((item, index) => (
    <CommandItem key={index}>
        <Link href={''} className='p-2 flex gap-2 text-[12px] text-blue-6 rounded-md cursor-pointer w-full'>
            <Image  alt='icon' src={item.attributes?.Icon?.data.attributes?.url} width={25} height={25}/>
            <label>{item.attributes.Name}</label>
        </Link>
    </CommandItem>
))}


      
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
        </Command>
    </div>
    );
}

export default CategoryList;
