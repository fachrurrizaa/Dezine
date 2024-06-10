'use client'
import Footer from "@/components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import ListCategories from "./ListCategories"

export default function CategoryPage() {
    return (
        <div>
            <Navbar />
            <div className=" mx-auto p-5 px-32">
                <h1 className="text-[#160442] font-semibold text-2xl mt-8 mb-6">Design Category</h1>
                <ListCategories />
            </div>
            <Footer/>
        </div>
    )
}
