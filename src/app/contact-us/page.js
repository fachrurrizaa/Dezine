'use client'
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import React from 'react'
import Contact from '@/components/contact/Contact';

export default function page() {
  return (
    <>
      <Navbar/>
      <Contact/>
      <Footer/>
    </>
  )
}
