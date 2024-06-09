import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import Input from '../form/Input';
import Button from '../Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/contact', formData);
      if (response.status === 200) {
        setIsSubmitted(true);
        setError('');
      }
    } catch (error) {
      setError('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <div className='flex h-[90vh] w-screen items-center justify-around'>
      <div>
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_lstnp9p3.json"
          style={{ height: '60vh', width: '30vw' }}
        />
      </div>
      <div className='mr-20 border-solid border-[#E6EAF2] border px-20 py-[2.5rem] rounded-3xl shadow-xl'>
        <h1 className='text-[2.5rem] text-[#004f4f] font-bold leading-[63px] text-center mb-10'>We’re Happy<br/> to Help You Today!</h1>
        {isSubmitted ? (
          <p className='text-center text-green-500'>Your message has been sent successfully!</p>
        ) : (
          <div className="flex flex-col w-full">
            <Input
              type="text"
              label="Name"
              name="Name"
              placeholder="Type your full name"
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
            <Input
              type="email"
              label="Email Address"
              name="Email"
              placeholder="Type your email"
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
            <label className="label">
              <span className="label-text font-normal text-[#160442] text-base mb-2">Message</span>
            </label>
            <textarea
              name="Message"
              placeholder="Type your message . . ."
              className="textarea textarea-bordered textarea-lg w-full"
              onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
            ></textarea>
            {error && <p className='text-red-500'>{error}</p>}
            <Button
              className="text-white bg-[#028d94] hover:bg-[#02b2bb] mt-5"
              content="Send Message"
              click={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
