'use client'
import Link from 'next/link';
import Button from '../Button';
import Input from './Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import emailRegex from 'email-regex';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function SignUp() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [valid, setValid] = useState(false)
  const MySwal = withReactContent(Swal)

  const validate = (data) => {
    if (data.name.length < 3) {
      setNameError(true)
    } else {
      setNameError(false)
    }

    if (!data.email.includes('@')) {
      setEmailError(true)
    } else {
      emailRegex({exact: true}).test(data.email) ? setEmailError(false) : setEmailError(true);
    }

    if (data.password.length < 6) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }

    if (!nameError && !emailError && !passwordError) {
      setValid(true)
    }
  }
  async function handleSubmit(e){
    e.preventDefault()
    const data = { name, email, password }
    validate(data)
    if (valid) {
      const res = await axios.post('/api/user', data)
      if (res.status === 200) {
        MySwal.fire({
          title: 'Success',
          text: 'User created successfully',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        })
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    }
  }

  return (
    <form className="flex flex-col w-80" onSubmit={handleSubmit}>
      <Input type={"text"} label={"Name"} placeholder={"Type your full name"} onChange={(e) => setName(e.target.value)}/>
      <p className={`text-red-500 ${nameError ? "block" : "hidden"}`}>*Name must be at least 3 characters</p>
      <Input type={"email"} label={"Email Address"} placeholder={"Type your email"} onChange={(e) => setEmail(e.target.value)}/>
      <p className={`text-red-500 ${emailError ? "block" : "hidden"}`}>*Email must be valid</p>
      <Input type={"password"} label={"Password"} placeholder={"Type your password"} onChange={(e) => setPassword(e.target.value)}/>
      <p className={`text-red-500 ${passwordError ? "block" : "hidden"}`}>*Password must be at least 6 characters</p>
      <Button type={"submit"} className={"text-white mt-4 mb-4 bg-[#028d94] hover:bg-[#02b2bb]"} content={"Continue Sign Up"}/>
      <Link href="/login">
        <Button className={"text-[#004f4f] bg-[#EBEDF3] hover:bg-slate-300 w-full"} content={"Sign In"}/>
      </Link>
    </form>
  )
}
