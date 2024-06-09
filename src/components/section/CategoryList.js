import React, { useContext } from 'react';
import { Context } from '../context/MyContext';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
    const { categories } = useContext(Context);
    const { posts } = useContext(Context)
    



    return (
      <div className='flex justify-evenly'>
            {categories.slice(0, 4).map((category) => {
                // Ambil postingan pertama dari kategori tertentu sebagai thumbnail
                const categoryPosts = posts.filter((post) => post.category === category._id);
                const thumbnailUrl = categoryPosts.length > 0 ? categoryPosts[0].images[0] : ''; // Mengambil gambar pertama dari postingan pertama di kategori
                const postCount = categoryPosts.length;

                return (
                    <CategoryItem 
                        key={category._id} 
                        id={category._id} 
                        thumbnails={thumbnailUrl} // Menggunakan URL gambar sebagai prop 'thumbnails'
                        name={category.name} 
                        postCount={postCount}
                    />
                );
            })}
        </div>
    );
};

export default CategoryList;


