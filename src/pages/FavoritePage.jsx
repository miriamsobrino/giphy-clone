import React from 'react';
import { useEffect } from 'react';
import { GifState } from '../context/context';
import Gif from '../components/Gif';
import { useNavigate } from 'react-router-dom';

const FavoritePage = () => {
  const { favorites, setFavorites } = GifState();
  const navigate = useNavigate();
  const handleGifClick = (gif) => {
    navigate(`/${gif.type}s/${gif.slug}`);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className='flex-col flex gap-2 mt-4'>
      <span className='font-bold text-gray-300 opacity-80'>My Favorites</span>
      <div className='columns-2 md:columns-3 lg:columns-4'>
        {favorites.map((favoriteGif) => (
          <Gif
            onClick={handleGifClick}
            key={favoriteGif.id}
            gif={favoriteGif}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
