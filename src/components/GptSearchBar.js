import { useRef } from 'react';
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'
import openai from "../utils/openai"

const GptSearchBar = () => {
  const langKey = useSelector((store)=> store.config.lang);
  const searchText = useRef(null);

  const handleGptSearchClick =async ()=>{
    console.log(searchText.current.value);

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });

      console.log(gptResults.choices)
    } 


  return (
    <div className='pt-[10%] flex justify-center'>
      <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg" onSubmit={(e)=>e.preventDefault()}>
        <input 
        type='text' 
        ref={searchText}
        className='pl-4 m-4 col-span-9 rounded-lg text-black' 
        placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='col-span-3 m-4 px-2 py-4 bg-red-600 text-white rounded-lg'
        onClick={handleGptSearchClick}>
          {lang[langKey].search}
          </button>
      </form>
    </div>
  )
}

export default GptSearchBar