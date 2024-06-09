'use client';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

export default function Section() {
    return (
      <div className="flex flex-col min-h-[95vh]">
          <h4 className="text-[#160442] font-semibold text-2xl mx-32 my-5">Top Categories</h4>
          <CategoryList/>
          <h4 className="text-[#160442] font-semibold text-2xl mx-32 mt-24 mb-6">New Items</h4>
          <ProductList/>
      </div>
    )
}