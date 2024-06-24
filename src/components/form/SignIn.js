'use client'
import Brand from './Brand';
import Button from '../Button';
import Input from './Input';
import Image from 'next/image';
import googleIcon from '/public/assets/googleIcon.svg'
import { signIn } from "next-auth/react"
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  async function handleSubmit(){
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })
    if(res.ok){
      router.push("/")
    }
    if(res.error){
      setError(true)
      setErrorMessage(res.error)
    }
  }

  return (
    <div>
        <div className='flex justify-center items-center flex-col'>
            <h1 className='font-bold text-5xl text-[#004f4f] mb-16 mt-28'>Welcome Back</h1>
            <div className='w-80'>
              <Input type={"email"} label={"Email Address"} placeholder={"Type your email"} onChange={(e) => setData({...data, email: e.target.value})}/>
              <Input type={"password"} label={"Password"} placeholder={"Type your password"} onChange={(e) => setData({...data, password: e.target.value})}/>
              <p className={`text-red-500 ${error ? "block" : "hidden"}`}>{`*${errorMessage}`}</p>
            </div>
            <div className='max-w-xs w-full'>
              <Button type={"submit"} className={'w-full text-white bg-[#028d94] hover:bg-[#02b2bb] mt-8 font-semibold'} content={"Sign In"} click={()=>handleSubmit(data)}/>
              <Button click={()=>signIn('google', { callbackUrl: '/'})} className={'w-full text-[#004f4f] bg-[#EBEDF3] my-4 font-medium hover:bg-slate-300'} content={
                <div className='flex items-center w-full'>
                  <Image src={googleIcon} width={0} height={30} alt={"img"} className='ml-3 mr-11'/>
                  <p className='text-[#4484f5] text-center'>Sign in with Google</p>
                </div>
              }/>
              <Link href={'/register'} className={`label-text font-semibold text-[#004f4f] text-base px-2 underline `}>
                Don't have an account?
              </Link>
            </div>
        </div>
        <Brand/>
    </div>
  )
}


