import React from 'react';
import { TrendingUp } from 'lucide-react';
import { GifState } from '../context/context';

const filters = [
  {
    title: 'GIFs',
    value: 'gifs',
    background:
      'bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 ',
  },
  {
    title: 'Stickers',
    value: 'stickers',
    background: 'bg-gradient-to-r from-cyan-400 via-teal-400 to-green-300 ',
  },
  {
    title: 'Text',
    value: 'text',
    background: 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 ',
  },
];
const FiltersGif = ({ showTrending = false }) => {
  const { filter, setFilter } = GifState();
  return (
    <div className='flex justify-center items-center gap-6 py-4 md:justify-between lg:justify-between'>
      {showTrending && (
        <span className='hidden lg:flex gap-2'>
          <TrendingUp className='text-teal-400' />
          <span className='text-gray-300 font-semibold'>Trending</span>
        </span>
      )}

      <div className='flex items-center bg-neutral-800 rounded-full  '>
        {filters.map((f) => {
          return (
            <button
              onClick={() => setFilter(f.value)}
              className={`${
                filter === f.value
                  ? `${f.background} text-white`
                  : 'bg-transparent text-gray-300'
              }  py-2 w-24 rounded-full font-semibold hover:bg-zinc-800`}
              key={f.title}
            >
              {f.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FiltersGif;
