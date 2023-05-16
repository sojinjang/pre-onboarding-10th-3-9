import { useState } from "react";
import { getSearchData } from "../api/search";

const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const clearSuggestions = () => setSuggestions([]);
  const changeKeyword = async (keyword) => {
    if (keyword === "") {
      clearSuggestions();
    } else {
      const { data } = await getSearchData(keyword);
      setSuggestions(data.result);
    }
  };

  return [suggestions, changeKeyword];
};

export default useSuggestions;
