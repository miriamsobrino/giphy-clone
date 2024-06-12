import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, LinkIcon } from 'lucide-react';
import { GifState } from '../context/context';

const Gif = ({ gif, hover = true, onClick }) => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { favorites, setFavorites } = GifState();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage('Link copied to clipboard!');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (err) {
      setShowMessage(false);
    }
  };

  const addToFavorites = (gifToAdd) => {
    const isAlreadyFavorite = favorites.some(
      (favGif) => favGif.id === gifToAdd.id
    );
    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (favGif) => favGif.id !== gifToAdd.id
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, gifToAdd]);
    }
  };

  return (
    <div className='w-full'>
      {showMessage && (
        <div className='fixed top-0 left-0 right-0 p-4 gradient-0 text-center text-base font-bold z-50'>
          {message}
        </div>
      )}
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToFavorites(gif);
                }}
              >
                <Heart
                  size={20}
                  fill={
                    favorites.some((favoriteGif) => favoriteGif.id === gif.id)
                      ? 'currentColor'
                      : 'none'
                  }
                />
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
