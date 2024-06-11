import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GifState } from '../context/context';
import Gif from '../components/Gif';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SquareArrowOutUpRight,
  ChevronsLeftRight,
} from 'lucide-react';
import Follow from '../components/Follow';

const contentType = ['gifs', 'stickers', 'texts'];

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf, gifs } = GifState();
  const navigate = useNavigate();

  const fetchGif = async () => {
    const gifId = slug.split('-');
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 14,
    });
    setGif(data);
    setRelatedGifs(
      related.filter(
        (item, index, self) => self.findIndex((g) => g.id === item.id) === index
      )
    );
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error('Invalid Content Type');
    }
    fetchGif();
  }, [type, slug]);

  const currentIndex = gifs.findIndex((g) => g.id === gif.id);

  const goToPreviousGif = () => {
    if (currentIndex > 0) {
      const previousGif = gifs[currentIndex - 1];
      navigate(`/${type}/${previousGif.slug}`);
    }
  };

  const goToNextGif = () => {
    if (currentIndex < gifs.length - 1) {
      const nextGif = gifs[currentIndex + 1];
      navigate(`/${type}/${nextGif.slug}`);
    }
  };
  const handleGifClick = (gif) => {
    navigate(`/${gif.type}s/${gif.slug}`);
  };

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
    <div className='mt-6 '>
      <div className=' lg:flex gap-9 '>
        <div className='flex items-start justify-between gap-9 w-full lg:w-60 lg:flex-col lg:items-start lg:gap-6 lg:justify-start'>
          {gif.user && (
            <div className='mb-8 flex-col lg:flex gap-2 w-60 '>
              <div className=' flex  gap-2  text-wrap'>
                <img
                  className='h-auto w-12'
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                />
                <div className='flex flex-col'>
                  <span className='text-sm font-bold'>
                    {gif?.user?.display_name}
                  </span>
                  <small className='font-bold text-gray-300 opacity-80 truncate'>
                    @{gif?.user?.username}
                  </small>
                </div>
              </div>
              {gif?.user?.description && (
                <p className='text-sm text-gray-300 mt-2'>
                  {gif?.user?.description.length > 100
                    ? readMore
                      ? gif?.user?.description
                      : gif?.user?.description.slice(0, 100) + '...'
                    : gif?.user?.description}
                  {gif?.user?.description.length > 100 && (
                    <div
                      onClick={() => setReadMore(!readMore)}
                      className='font-bold flex items-center text-gray-300 opacity-80 cursor-pointer '
                    >
                      {readMore ? (
                        <small className='font-bold text-gray-300 opacity-80 '>
                          Read less <ChevronUp size={20} />
                        </small>
                      ) : (
                        <small className='font-bold text-gray-300 opacity-80 '>
                          Read more <ChevronDown size={20} />
                        </small>
                      )}
                    </div>
                  )}
                </p>
              )}

              {gif?.source_tld && (
                <div className='flex-col lg:hidden mt-4'>
                  <small className='font-bold  text-gray-300 opacity-80 '>
                    Source
                  </small>
                  <a href={gif?.source_tld}>
                    <span className='font-bold flex text-sm gap-2 items-center'>
                      <SquareArrowOutUpRight size={14} /> {gif?.source_tld}
                    </span>
                  </a>
                </div>
              )}
            </div>
          )}
          {gif?.user && <Follow />}
          <div className={gif?.user ? 'lg:block hidden divider' : 'hidden'} />

          {gif?.source_tld && (
            <div className='lg:flex flex-col hidden '>
              <small className='font-bold  text-gray-300 opacity-80 '>
                Source
              </small>
              <a href={gif?.source_tld}>
                <span className='font-bold flex text-sm gap-2 items-center'>
                  <SquareArrowOutUpRight size={14} /> {gif?.source_tld}
                </span>
              </a>
            </div>
          )}
        </div>
        <div className='flex-col flex gap-2'>
          <div className='lg:flex  gap-4'>
            <div className='flex flex-col flex-grow'>
              <small className='font-bold text-gray-300 opacity-80 mb-2 truncate'>
                {gif.title} by {gif?.user?.username}
              </small>
              <div className='w-auto'>
                <Gif gif={gif} hover={false} />
              </div>
            </div>

            <div className='flex w-full  flex-col gap-6 mt-4 lg:w-60'>
              <div className='flex gap-2 justify-center lg:justify-end mb-4'>
                <button
                  onClick={goToPreviousGif}
                  disabled={currentIndex === 0}
                  className='px-2 py-1 bg-neutral-600 text-white rounded hover:bg-neutral-500 disabled:bg-gray-400'
                >
                  <ChevronLeft size={20} style={{ strokeWidth: 3 }} />
                </button>
                <button
                  onClick={goToNextGif}
                  disabled={currentIndex === gifs.length - 1}
                  className='px-2 py-1 bg-neutral-600 text-white rounded hover:bg-neutral-500 disabled:bg-gray-400'
                >
                  <ChevronRight size={20} style={{ strokeWidth: 3 }} />
                </button>
              </div>
              <div className=' flex items-start gap-9 justify-center lg:flex-col lg:gap-6 mb-4'>
                <div className='flex gap-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer'>
                  <img src='../../public/favorite.svg' />
                  <span className='font-bold text-gray-300 '>Favorite</span>
                </div>
                <div
                  className='flex gap-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer '
                  onClick={() => copyToClipboard(gif.embed_url)}
                >
                  <img src='../../public/share.svg' />
                  <span className='font-bold text-gray-300'>Share</span>
                </div>
                <div className='flex gap-1 transform items-center transition-transform duration-300 hover:scale-110 cursor-pointer'>
                  <ChevronsLeftRight size={30} />
                  <span className='font-bold text-gray-300'>Embed</span>
                </div>
              </div>
            </div>
          </div>
          <h4 className='font-bold text-lg mt-4'>Related GIFs</h4>
          <div className=' columns-2 md:columns-3 lg:columns-4 gap-2'>
            {relatedGifs.map((gif) => (
              <Gif onClick={handleGifClick} key={gif.id} gif={gif} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
