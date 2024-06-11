import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlignRight } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { GifState } from '../context/context';
import SearchGif from './SearchGif';
import { useParams } from 'react-router-dom';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showCategoriesMobile, setShowCategoriesMobile] = useState(false);
  const hoveringRef = useRef(false);
  const { gf } = GifState();
  const { query } = useParams();

  const fetchCategories = async () => {
    try {
      const { data } = await gf.categories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    setShowCategories(true);
    hoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;

    setTimeout(() => {
      if (!hoveringRef.current) {
        setShowCategories(false);
      }
    }, 100);
  };

  const toggleCategoriesMobile = () => {
    setShowCategoriesMobile(!showCategoriesMobile);
  };

  const hideMenuMobile = () => {
    setShowCategoriesMobile(false);
  };

  return (
    <header className='sticky top-0 z-50 pt-2 bg-background'>
      <nav className='relative flex justify-between items-center text-left  mb-4'>
        <div>
          <Link to='/' className='flex gap-2 cursor-pointer'>
            <img className='w-8' src='./logo.svg' alt='Logo' />
            <h1 className='text-5xl font-bold'>GIPHY</h1>
          </Link>
        </div>
        <div className='flex gap-2'>
          {categories?.slice(0, 5).map((category) => (
            <Link
              key={category.name}
              className='p-2 border-b-4 border-sky-500 font-bold hidden  hover:gradient-0 lg:block'
              to={category.name_encoded}
            >
              {category.name}
            </Link>
          ))}

          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='hidden p-2 border-b-4 border-fuchsia-500 hover:gradient-2 lg:block '
          >
            <EllipsisVertical />
          </button>

          <button onClick={toggleCategoriesMobile} className='lg:hidden '>
            <AlignRight className='text-sky-500' />
          </button>
          {showCategoriesMobile && (
            <div className='lg:hidden  absolute top-14 left-0 h-screen right-0 '>
              <div className='absolute  top-0 gradient-2 w-full  px-10 pt-6 pb-9 z-50 '>
                <h3 className='text-2xl font-extrabold mb-2'>Categories</h3>
                <ul className='columns-2 '>
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        className='py-2 flex columns-2 text-base font-bold active:opacity-80'
                        to={category.name_encoded}
                        onClick={hideMenuMobile}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {showCategories && (
          <div
            className='absolute top-16 right:0 gradient-2 w-full h-auto px-10 pt-6 pb-9 z-50'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className='text-2xl font-extrabold'>Categories</h3>
            <hr className='mt-4 opacity-50' />
            <div className='pt-6 grid-cols-2 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 '>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  className='font-bold hover:opacity-70 text-base px-2  '
                  to={category.name_encoded}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <SearchGif value={query} />
    </header>
  );
};

export default Header;
