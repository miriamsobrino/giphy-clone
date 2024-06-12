import { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { createContext, useContext } from 'react';

const GifContext = createContext();
const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState('gifs');
  const [favorites, setFavorites] = useState([]);
  const gf = new GiphyFetch('SxCdj40kmPtWjkSJHy63kE7IIiObdeHX');
  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};
export default GifProvider;
