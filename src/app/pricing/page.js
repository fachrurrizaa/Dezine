import Costumize from "../../../public/assets/costumize.svg";
import Fortune from "../../../public/assets/fortune.svg";
import Documentation from "../../../public/assets/documentation.svg";
import Navbar from "@/components/navbar/Navbar";
import Feature from '@/components/Feature';
import CardBasic from "@/components/pricing/CardBasic";
import CardGold from "@/components/pricing/CardGold";
import { useEffect } from "react";

export default function page() {
    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const clientKey = process.env.MIDTRANS_CLIENT_KEY
    
        const script = document.createElement('script')
        script.src = snapScript
        script.async = true
        script.setAttribute('data-client-key', clientKey)
        document.body.appendChild(script)
    
        return () => {
          document.body.removeChild(script)
        }
      }, [])
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center">
                <div className="mr-[140px]">
                    <h1 className="font-bold text-5xl text-[#004f4f] leading-[63px] text-center mt-16 mb-3">Friendly Pricing,<br/>High Quality Design</h1>
                    <p className="font-normal text-xl text-[#6B7193] text-center">Working faster and better than before</p>
                </div>
                <div className="flex mb-24 mt-16 gap-20 mr-32">
                    <CardBasic/>
                    <CardGold/>
                </div>
                <div className="flex gap-32">
                    <Feature src={ Costumize } content={"Costumizable"}/>
                    <Feature src={ Fortune } content={"500 Fortune"}/>
                    <Feature src={ Documentation } content={"Documentation"}/>
                </div>
            </div>
        </>
    )
}
