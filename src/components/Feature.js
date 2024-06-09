import Image from "next/image";

export default function Feature({ src, content }) {
  return (
    <div className="mb-[60px]">
        <div className="flex items-center mb-4">
          <Image src={ src } height={0} width={0} alt="feature-icon" className="w-[60px] h-auto mr-4"/>
          <p className="font-semibold text-[#004f4f] text-xl">{ content }</p>
        </div>
        <p className="font-normal text-lg text-[#6B7193]">Accelerate your work with our millions<br/>of ready-to-use design projects.</p>
    </div>
  )
}
