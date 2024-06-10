import Link from "next/link";

export default function CategoryItem({id, thumbnails, name, postCount }) {
  return (
    <div className="card w-72 h-[280px] bg-slate-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:cursor-pointer hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out">
    <Link  className='category-item' href={`/category/${id}`}>
        <figure className="m-3 h-44"><img src={ thumbnails } alt="" /></figure>
        <div className="card-body pt-0 pb-4 px-6">
          <h2 className="card-title text-black font-semibold">{ name }</h2>
          <p className="text-[#6B7193] font-normal">{ postCount } items</p> 
        </div>
        </Link>
      </div>
  )
}
