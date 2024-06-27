import React, { useContext, useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { Context } from '@/components/context/MyContext';

export default function ProductList() {
    const { posts } = useContext(Context);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (posts.length > 3) {
            setFilteredPosts(posts.slice(-3));
        }
    }, [posts]);

    return (
        <div className="flex justify-around">
            {filteredPosts.map((post) => (
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
    );
}
