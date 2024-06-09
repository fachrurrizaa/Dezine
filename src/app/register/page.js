import Feature from "@/components/Feature";
import Costumize from "../../../public/assets/costumize.svg";
import Fortune from "../../../public/assets/fortune.svg";
import Documentation from "../../../public/assets/documentation.svg";
import SignUp from "@/components/form/SignUp";
import SignNav from '/src/components/navbar/SignNav';

export default function page() {
  return (
    <div className="min-h-screen">
      <SignNav/>
      <div className="flex flex-col mt-20 items-center min-w-full">
          <h1 className="text-5xl text-[#004f4f] font-bold leading-[63px] text-center mb-16">Join & Get Our <br/>Pro Benefits</h1>
          <div className="flex">
              <div className="mr-44">
                  <Feature src={ Costumize } content={"Costumizable"}/>
                  <Feature src={ Fortune } content={"500 Fortune"}/>
                  <Feature src={ Documentation } content={"Documentation"}/>
              </div>
              <SignUp />
          </div>
      </div>
    </div>
  )
}
