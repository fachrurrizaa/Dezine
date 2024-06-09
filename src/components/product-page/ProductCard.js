import Image from 'next/image';
import Button from '../Button';
import Check from "/public/assets/check-icon.svg";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { Context } from '@/components/context/MyContext';

export default function ProductCard({ link }) {
    const {data : session} = useSession()
    const {isSubscribe} = useContext(Context)
    const router = useRouter()
    function clickHandler (){
        if(!session){
            router.push(`/login`)
        }else if(session){
            if(isSubscribe){
                window.open(`${link}`)
            }else{
                router.push(`/pricing`)
            }
        }
    }
    return (
        <div className='flex flex-col w-96 h-[520px] bg-base-100 shadow-xl rounded-xl'>
            <figure className='pt-10 flex items-center'>
                <img src='/assets/icon-figma.png' alt='figma-icon' className='rounded-xl object-cover h-14 w-14 mr-4 ml-8' />
                <div>
                    <h5 className='text-[#004f4f] font-semibold text-base'>Figma</h5>
                    <p className='text-[#A3A5AA] font-normal text-sm'>Project Included</p>
                </div>
            </figure>
            <figure className='pt-5 flex items-center'>
                <img src='/assets/icon-sketch.png' alt='sketch-icon' className='rounded-xl object-cover h-14 w-14 mr-4 ml-8' />
                <div>
                    <h5 className='text-[#004f4f] font-semibold text-base'>Sketch</h5>
                    <p className='text-[#A3A5AA] font-normal text-sm'>Project Included</p>
                </div>
            </figure>
            <div className='mb-5 pt-8 ml-8'>
                <h5 className='text-[#004f4f] font-semibold text-base mt-3'>Great Features</h5>
                <div className='flex justify-between'>
                    <p className='text-base font-normal text-[#A3A5AA] mt-3'>Customizable layers</p>
                    <Image src={ Check } height={0} width={0} alt="check-icon" className="w-6 h-auto mr-8"/>
                </div>
                <div className='flex justify-between'>
                    <p className='text-base font-normal text-[#A3A5AA] mt-3'>Documentation</p>
                    <Image src={ Check } height={0} width={0} alt="check-icon" className="w-6 h-auto mr-8"/>
                </div>
                <div className='flex justify-between'>
                    <p className='text-base font-normal text-[#A3A5AA] mt-3'>Icon set design</p>
                    <Image src={ Check } height={0} width={0} alt="check-icon" className="w-6 h-auto mr-8"/>
                </div>
                <div className='flex justify-between'>
                    <p className='text-base font-normal text-[#A3A5AA] mt-3'>Pre-built UI screens</p>
                    <Image src={ Check } height={0} width={0} alt="check-icon" className="w-6 h-auto mr-8"/>
                </div>
            </div>
            <Button className={"text-white w-[85%] bg-[#028d94] hover:bg-[#02b2bb] mx-auto mt-6"} click={()=>clickHandler(link)} content={"Download Now"}/>
        </div>
    )
}
