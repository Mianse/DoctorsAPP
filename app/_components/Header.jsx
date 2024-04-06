"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from 'next/link';
import { useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/"
    },
    {
      id: 2,
      name: "Explore",
      path: "/Explore"
    },
    {
      id: 3,
      name: "contact us",
      path: "/contact"
    },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className='md:flex gap-8 hidden'>
          {Menu.map((item, index) => (
            <Link key={item.id} href={item.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      {user ?
        <Popover>
          <PopoverTrigger>
            <Image src={user?.picture} alt='profile-image' className='rounded-full' height={50} width={50} />
          </PopoverTrigger>
          <PopoverContent className='w-44'>
            <ul className='flex flex-col'>
              <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>profile</li>
              <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>my bookings</li>
              <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'><LogoutLink>Log out</LogoutLink> </li>
            </ul>
          </PopoverContent>
        </Popover>
        :
        <LoginLink><Button variant='outline'>get started</Button></LoginLink>
      }
    </div>
  );
};

export default Header;
