import { BG_IMG } from "../utils/constant"
import GptMovieSuggestion from "./GptMovieSuggestion"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <div>
        <div className="absolute -z-10 inset-0">
            <img className="w-full h-full object-cover" src={BG_IMG}></img>
            <div className="absolute inset-0 bg-black/55"></div> 
        </div>
        <GptSearchBar />
        <GptMovieSuggestion />
    
    </div>

  )
}

export default GptSearch