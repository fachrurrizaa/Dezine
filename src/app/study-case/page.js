'use client';
import { useContext } from 'react';
import { Context } from '../../components/context/MyContext';
import ProductItem from '../../components/section/ProductItem';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const StudycasePage = () => {
  const { posts } = useContext(Context);

  return (
    <div>
      <Navbar />
      <div className="mx-auto p-5 px-32 py-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map(post => (
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
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default StudycasePage;
