import Image from "next/image";
import Link from "next/link";
import logo from '/public/assets/logo.jpeg'

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-5 px-32">
        <Link href='/'>
          <Image src={logo} width={200} height={0} alt={"logo"}/>
        </Link>
        <nav>
            <ul className="flex justify-between">
                <li className="font-medium text-base text-[#004f4f] inline-block py-0 px-5 transition-all ease-in-out cursor-pointer hover:font-bold"><Link href="/">Home</Link></li>
                <li className="font-medium text-base text-[#004f4f] inline-block py-0 px-5 transition-all ease-in-out cursor-pointer hover:font-bold">Categories</li>
                <li className="font-medium text-base text-[#004f4f] inline-block py-0 px-5 transition-all ease-in-out cursor-pointer hover:font-bold"><Link href="/pricing">Pricing</Link></li>
                <li className="font-medium text-base text-[#004f4f] inline-block py-0 px-5 transition-all ease-in-out cursor-pointer hover:font-bold">Study Case</li>
            </ul>
        </nav>
    </header>
  )
}
