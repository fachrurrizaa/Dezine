'use client';
import Link from 'next/link';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

export default function Section() {
    return (
      <div className="flex flex-col min-h-[95vh]">
          <Link href={'/category-page'}>
            <h4 className="text-[#160442] font-semibold text-2xl mx-32 my-10">Top Categories</h4>
          </Link>
          <CategoryList/>
          <h4 className="text-[#160442] font-semibold text-2xl mx-32 mt-24 mb-10">New Items</h4>
          <ProductList/>
      </div>
    )
}