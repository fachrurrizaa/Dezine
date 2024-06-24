'use client'
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Context } from '../../../components/context/MyContext';
import ProductItem from '../../../components/section/ProductItem';
import Navbar from '../../../components/navbar/Navbar';

const CategoryPage = () => {
  const { id } = useParams();
  const { categories, posts } = useContext(Context);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const category = categories.find(category => category._id === id);
    if (category) {
      setCategoryName(category.name);
    }
  }, [id, categories]);

  const categoryPosts = posts.filter(post => post.category === id);

  return (
    <div>
      <Navbar />
      <div className="mx-auto p-5 px-32 py-8">
        <h1 className="text-[#160442] font-semibold text-2xl mt-8 mb-6">Posts in Category: {categoryName}</h1>
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryPosts.map(post => (
              <ProductItem 
                key={post._id} 
                id={post._id} 
                thumbnails={post.images[0]} 
                title={post.title} 
                description={post.description} 
                category={post.category} 
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

