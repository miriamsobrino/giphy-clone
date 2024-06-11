import React, { useEffect } from 'react';
import { GifState } from '../context/context';
import Gif from '../components/Gif';
import FiltersGif from '../components/FiltersGif';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();
  const navigate = useNavigate();

  const fetchTrendingGifs = async () => {
    try {
      setGifs([]);
      const { data } = await gf.trending({
        limit: 20,
        type: filter,
        rating: 'g',
      });
      setGifs(data);
    } catch (error) {
      console.error('Error fetching trending gifs:', error);
    }
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  const handleGifClick = (gif) => {
    navigate(`/${gif.type}s/${gif.slug}`);
  };
  return (
    <section>
      <img src='https://media.giphy.com/headers/2022-06-01-21-1654089664/PRIDE_BANNER_HP.gif'></img>
      <FiltersGif showTrending />
      <div className=' gap-2 columns-2 md:columns-3 lg:columns-4 xl:columns-4  '>
        {gifs.map((gif) => (
          <Gif onClick={handleGifClick} key={gif.id} gif={gif} />
        ))}
      </div>
    </section>
  );
};

export default Home;
