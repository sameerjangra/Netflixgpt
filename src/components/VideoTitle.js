import React from 'react'

const VideoTitle = ({title ,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[10%] px-16 absolute bg-gradient-to-r from-black z-10">
      <h1 className="text-[40px] font-bold text-white ">{title}</h1>
      <p className="py-6 text-lg w-1/4 text-white">{overview}</p>
      <div>
        <button className="bg-white text-black p-3 px-8 text-lg rounded-lg hover:opacity-80"> ▶️ Play</button>
        <button className="bg-gray-500 mx-2 text-white p-3 px-8 text-xl bg-opacity-50 rounded-lg"> More info</button>
      </div>
      
    </div>
  )
}

export default VideoTitle;