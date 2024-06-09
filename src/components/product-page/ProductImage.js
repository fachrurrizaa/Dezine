import Slider from './Slider';

export default function ProductImage({ images }) {
  return (
    <div className='max-w-3xl h-[520px] shadow-lg bg-slate-100'>
      <Slider images={images}/>
    </div>
  )
}
