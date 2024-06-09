'use client'
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

export default function page() {
    const router = useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/payment/success')
        },5000)
    },[])

    return (
       <div className='flex justify-center items-center flex-col'>
            <Player
                autoplay
                loop
                src="https://lottie.host/f00bb9c0-0ee5-4d4e-8512-05fac8919b01/fMXhu7o7Ds.json"
                style={{ height: '80vh', width: '80vw'}}
                className='mt-96'
            >
            </Player>
            <div className='flex justify-center'>
                <h1 className='font-bold text-[#004f4f] text-2xl'>Payment processing</h1>
                <div className='mt-[5px]'>
                    <BeatLoader color="#004f4f" margin={7}/>
                </div>
            </div>
       </div>
  )
}
