import { Player } from '@lottiefiles/react-lottie-player';
import Button from '../Button';

export default function Hero() {
  return (
    <div className='hero-content max-w-full min-h-[90vh] justify-around flex lg:flex-row-reverse'>
        <div className='ml-24 mb-24'>
          <Player
            autoplay
            loop
            src="https://assets1.lottiefiles.com/packages/lf20_ghs9bkkc.json"
            style={{ height: '70vh', width: '40vw' }}
          >
          </Player>
        </div>
        <div>
            <h1 className='text-5xl font-bold text-[#004f4f] leading-tight'>Design Better & <br/>Faster Than Before.</h1>
            <p className='py-6 text-[#6B7193]'>Accelerate your work with our millions<br/> of ready-to-use design projects.</p>
            <Button className={'text-white bg-[#028d94] hover:bg-[#02b2bb]'}  content={"Browse Now"}/>
        </div>
    </div>
  )
}
