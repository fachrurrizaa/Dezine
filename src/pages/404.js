import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NotFound() {
    const router = useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        },5000)
    },[])

    return (
       <div className='flex justify-center items-center'>
            <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_aaesnvcw.json"
                style={{ height: '80vh', width: '80vw'}}
                className='mt-96'
            >
            </Player>
       </div>
  )
}
