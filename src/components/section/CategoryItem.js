export default function CategoryItem({ thumbnails, name, random }) {
  return (
    <div className="card w-72 h-[260px] bg-slate-50 shadow-xl hover:cursor-pointer">
        <figure className="m-3 h-44"><img src={ thumbnails } alt="" /></figure>
        <div className="card-body pt-0 pb-4 px-6">
          <h2 className="card-title text-black font-semibold">{ name }</h2>
          <p className="text-[#6B7193] font-normal">{ random } items</p> 
        </div>
      </div>
  )
}
