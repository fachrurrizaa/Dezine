import Image from "next/image";
import apple from '/public/assets/apple.svg'
import adobe from '/public/assets/adobe.svg'
import slack from '/public/assets/slack.svg'
import spotify from '/public/assets/spotify.svg'
import google from '/public/assets/google.svg'

export default function Brand() {
  return (
    <div className="flex justify-center items-center gap-10 mt-24">
        <Image src={apple} height={0} width={0} alt="apple-icon" className="w-28 h-auto"/>
        <Image src={adobe} height={0} width={0} alt="adobe-icon" className="w-28 h-auto"/>
        <Image src={slack} height={0} width={0} alt="slack-icon" className="w-28 h-auto"/>
        <Image src={spotify} height={0} width={0} alt="spotify-icon" className="w-28 h-auto"/>
        <Image src={google} height={0} width={0} alt="google-icon" className="w-28 h-auto"/>
    </div>
  )
}
