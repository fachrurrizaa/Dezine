'use client'
import Navbar from '@/components/navbar/Navbar'
import Hero from '@/components/hero/Hero';
import dynamic from 'next/dynamic'
import Footer from '@/components/footer/Footer';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const Section = dynamic (() => import ('@/components/section/Section'))


export default function Home() {
  return (
    <div className='bg-white'>
      <Navbar/>
      <Hero/>
      <Section/>
      <Footer/>
    </div>
  )
}