import React from 'react'
import logo from '@/app/assets/logo.png'
import { IoIosBody } from "react-icons/io";
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
       <Image src={logo} alt="Logo" width={100} height={100} />
         <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/profile"><IoIosBody/></Link>
        <button>Sign Out</button>
        
    </nav>
  )
}

export default Navbar