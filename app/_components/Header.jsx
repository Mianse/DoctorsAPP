import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Header = () => {
    const Menu = [
    {
        id:1,
        name: "Home",
        path: "/"
    },
    {
        id:2,
        name: "Explore",
        path: "/Explore"
    },
    {
        id:3,
        name: "contact us",
        path: "/contact"
    },
    ]
  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>
        <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo"
            width={180} height={80}
        />
      <ul className='md:flex gap-8 hidden'>
        {Menu.map((item,index)=>(
            <Link href={item.path}>
                        <l1 className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">{item.name}</l1>

            </Link>
        ))}
      </ul>
        </div>
        <Button>get started</Button>
     
    </div>
  )
}

export default Header
