import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { X } from 'lucide-react';

const SearchGif = ({ value = '' }) => {
  const [query, setQuery] = useState(() => value);
  const navigate = useNavigate();

  const searchGifs = async () => {
    if (query.trim() === '') {
      return;
    }
    navigate(`/search/${query}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchGifs();
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=' sticky top-0 mb-2 flex items-center z-10'
    >
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search all the Gifs and Stickers'
        className='w-full relative bg-white rounded-l-md p-4 focus:outline-none text-black text-lg'
      ></input>
      {query && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute right-20 bg-gray-300 rounded-full p-1 text-center items-center'
        >
          <X size={16} className='text-white' />
        </button>
      )}
      <button
        type='submit'
        onClick={searchGifs}
        className='gradient-3 p-4 rounded-r-md'
      >
        <Search size={30} className='transform scale-x-[-1]' />
      </button>
    </form>
  );
};

export default SearchGif;
