import React from 'react';

const getTrimmedOverview = (text, wordLimit = 18) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
};

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video px-4 sm:px-8 md:px-16 pt-[54%] sm:pt-[20%] md:pt-[10%] absolute bg-gradient-to-r from-black z-10 py-4 md:py-0">
      <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-white">
        {title}
      </h1>

      {/* Description */}
      <p className="py-4 text-xs sm:text-base md:text-lg text-white w-56 md:w-[500px] ">
        {/* Mobile: trimmed to 30 words */}
        <span className="block sm:hidden">
          {getTrimmedOverview(overview)}
        </span>

        {/* Desktop: full text */}
        <span className="hidden sm:block">{overview}</span>
      </p>

      <div className="flex flex-wrap gap-4 -mt-2 md:mt-0">
        <button className="bg-white text-black py-2 px-3 md:py-2 md:px-6 text-sm sm:text-base md:text-lg rounded-lg hover:opacity-80">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white py-2 px-6 text-sm sm:text-base md:text-lg bg-opacity-50 rounded-lg hover:bg-opacity-70">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
