import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Follow = () => {
  return (
    <div>
      <small className=' text-gray-300 opacity-80 font-bold'>Follow on:</small>
      <div className='group cursor-pointer flex mt-2 gap-3'>
        <a href='https://www.facebook.com/GIPHY/'>
          <Facebook size={20} className='text-sky-400' />
        </a>
        <a href='https://twitter.com/giphy'>
          <Twitter size={20} className='text-sky-400' />
        </a>
        <a href='https://instagram.com/giphy'>
          <Instagram size={20} className='text-sky-400' />
        </a>
      </div>
    </div>
  );
};

export default Follow;
