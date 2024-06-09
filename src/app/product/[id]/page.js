'use client'
import Navbar from "@/components/navbar/Navbar"
import ProductPage from "@/components/product-page/ProductPage"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function page({ params }) {
    const [post, setPost] = useState(null);
    const id = params.id;

    useEffect(() => {
        if (!id){
        return;
        }
        axios.get('/api/post?id='+id).then(response => {
        setPost(response.data)
        })
    }, [id])
    
    if (post == null){
        return <h1>Loading . . .</h1>
    }else{
        return (
            <>
                <Navbar/>
                <ProductPage title={ post.title } description={ post.description } images={ post.images } link={ post.link } />
            </>
        )
    }
}
