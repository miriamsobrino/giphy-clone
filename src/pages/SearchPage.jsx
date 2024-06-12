import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GifState } from '../context/context';
import Gif from '../components/Gif';
import FiltersGif from '../components/FiltersGif';
import { ArrowUpDown } from 'lucide-react';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sort, setSort] = useState('relevant');
  const { query } = useParams();
  const { gf, filter } = GifState();
  const navigate = useNavigate();

  const filterDisplayNames = {
    gifs: 'GIFs',
    stickers: 'Stickers',
    text: 'Texts',
  };
  const fetchSearchResults = async () => {
    const { data, pagination } = await gf.search(query, {
      sort: sort,
      type: filter,
      limit: 20,
    });

    setSearchResults(data);
    setTotalCount(pagination.total_count);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter, sort, query]);

  const toggleSortMenu = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
  };

  const handleSortChange = (option) => {
    setSort(option);
  };

  const handleGifClick = (gif) => {
    navigate(`/${gif.type}s/${gif.slug}`);
  };
  return (
    <section>
      <div className='flex justify-between items-center mb-4 '>
        <div className='flex gap-2 items-center'>
          <h className='text-5xl font-extrabold '>{query}</h>
          <small className='pt-8 font-semibold text-gray-300'>
            {totalCount.toLocaleString('de-DE') +
              ' ' +
              filterDisplayNames[filter]}
          </small>
        </div>
        <div className='group flex gap-2 items-center bg-neutral-700 rounded-md mt-4 px-4 py-2 relative '>
          <button
            onClick={toggleSortMenu}
            className='flex gap-2 items-center active:opacity-70'
          >
            <ArrowUpDown
              size={16}
              style={{
                strokeWidth: 3,
              }}
              className='text-cyan-500 '
            />
            <span className='font-bold cursor-pointer'>Sort</span>
          </button>
          {isSortMenuOpen && (
            <div className='w-60 bg-neutral-700 absolute top-12 right-0 rounded-md flex flex-col gap-2 p-4 z-20'>
              <label className='block font-semibold mb-2 text-md'>
                Sort Content By
              </label>
              <div className='flex justify-between pr-6 items-center'>
                <span className='font-medium text-base'>Relevant</span>
                <input
                  type='radio'
                  name='sort'
                  value='relevant'
                  checked={sort === 'relevant'}
                  onChange={() => handleSortChange('relevant')}
                  className='cursor-pointer appearance-none border-2 border-neutral-400 border-spacing-20 rounded-full w-4 h-4 checked:bg-purple-500 checked:border-purple-300 '
                />
              </div>
              <div className='flex justify-between pr-6 items-center'>
                <span className='font-medium text-base'>Newest</span>
                <input
                  type='radio'
                  name='sort'
                  value='recent'
                  onChange={() => handleSortChange('recent')}
                  className='cursor-pointer appearance-none border-2 border-neutral-400 rounded-full w-4 h-4 checked:bg-purple-500 checked:border-purple-300 '
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <FiltersGif />
      <div className=' gap-2 columns-2 md:columns-3 lg:columns-4 xl:columns-4 z-10'>
        {searchResults.map((gif) => (
          <Gif onClick={handleGifClick} gif={gif} key={gif.id} />
        ))}
      </div>
    </section>
  );
};
export default SearchPage;
