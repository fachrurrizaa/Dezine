import React from 'react'
import ProductCard from './ProductCard'
import ProductImage from './ProductImage'

export default function ProductPage({ title, description, images, link }) {
  return (
    <div className='my-12 px-32'>
        <h1 className='text-5xl font-bold text-[#004f4f] leading-tight'>{ title }</h1>
        <p className='ml-1 py-6 text-xl text-[#6B7193]'>Level up your coding skills with hands-on design challenges.</p>
        <div className='mt-6 flex items-center justify-between'>
          <ProductImage images={ images }/>
          <ProductCard link={ link }/>
        </div>
        <div className='mt-12 max-w-2xl'>
          <p className='font-bold mb-4 text-lg'>About</p>
          <p className='text-[#6B7193] mb-4'>{ description }</p>
        </div>
    </div>
  )
}
