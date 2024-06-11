import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, LinkIcon } from 'lucide-react';

const Gif = ({ gif, hover = true, onClick }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Copied to clipboard:', text);
      })
      .catch((err) => {
        alert('Failed to copy:', err);
      });
  };

  return (
    <div className='w-full'>
      <div
        className='w-full relative cursor-pointer group'
        onClick={() => onClick(gif)}
      >
        <img
          className='w-full object-cover rounded transition-all duration-300 mb-2  '
          src={gif?.images?.fixed_width.webp}
          alt={gif.title}
        />
        {hover && (
          <div>
            <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 z-20'>
              <button>
                <Heart size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(gif.embed_url);
                }}
                className='z-30'
              >
                <LinkIcon size={20} />
              </button>
            </div>
            <div className='absolute inset-0 flex items-end gap-2 p-2 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-gray-900'>
              <img
                className='h-8'
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
              />
              <span>{gif?.user?.display_name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gif;
