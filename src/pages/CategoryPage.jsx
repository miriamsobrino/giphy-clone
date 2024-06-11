import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GifState } from '../context/context';
import { BadgeCheck } from 'lucide-react';
import Gif from '../components/Gif';
import Follow from '../components/Follow';

const CategoryPage = () => {
  const [categoryResults, setCategoryResults] = useState([]);
  const { category } = useParams();
  const { gf } = GifState();
  const navigate = useNavigate();
  const fetchCategoryResults = async () => {
    const { data } = await gf.gifs(category, category);

    setCategoryResults(data);
  };

  useEffect(() => {
    fetchCategoryResults();
  }, [category]);

  const handleGifClick = (gif) => {
    navigate(`/${gif.type}s/${gif.slug}`);
  };
  return (
    <section className='flex flex-col gap-8 mt-4 sm:flex-row '>
      <div className='flex flex-col gap-2'>
        {categoryResults.length > 0 && <Gif gif={categoryResults[0]} />}
        <span className='text-gray-300 text-xs mt-2'>
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <Follow />
        <div className='divider' />
      </div>
      <div>
        <h2 className='text-4xl font-extrabold mt-4 capitalize'>
          {category.split('-').join(' & ')} GIFs
        </h2>
        <div className='flex gap-1 items-center mt-1'>
          <small className='text-gray-300 font-bold'>@{category}</small>
          <BadgeCheck size={14} className='text-sky-400' />
        </div>
        {categoryResults.length > 0 && (
          <div className=' gap-2 columns-2 md:columns-3 lg:columns-4 xl:columns-4 mt-4 '>
            {categoryResults.slice(1).map((gif) => (
              <Gif onClick={handleGifClick} key={gif.id} gif={gif} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
