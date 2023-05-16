import { createContext, useContext, useEffect, useState } from "react";
import { DEBOUNCE_DELAY_IN_MS, KEYBOARD, START_ACTIVE_INDEX } from "../utils/const";
import useSuggestions from "../hooks/useSuggestions";
import useDebounce from "../hooks/useDebounce";

const SearchContext = createContext(null);
const SearchDispatchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [suggestions, search] = useSuggestions();
  const [inputText, setInputText] = useState("");
  const [activeIndex, setActiveIndex] = useState(START_ACTIVE_INDEX);
  const debouncedKeyword = useDebounce(inputText.trim(), DEBOUNCE_DELAY_IN_MS);
  const maxIndex = suggestions.length - 1;

  useEffect(() => {
    search(debouncedKeyword);
  }, [debouncedKeyword]);

  const changeInputText = (keyword) => {
    setInputText(keyword);
    setActiveIndex(START_ACTIVE_INDEX);
  };

  const hoverSuggestion = (itemIndex) => setActiveIndex(itemIndex);
  const inactivate = () => setActiveIndex(START_ACTIVE_INDEX);

  const controlKeyboard = (e) => {
    if (e.nativeEvent.isComposing || suggestions.length === 0) return;

    switch (e.key) {
      case KEYBOARD.ENTER:
        if (activeIndex < 0) break;
        changeInputText(suggestions[activeIndex].name);
        break;

      case KEYBOARD.ARROW_DOWN:
        e.preventDefault();
        if (activeIndex === maxIndex) {
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => prev + 1);
        }
        break;

      case KEYBOARD.ARROW_UP:
        e.preventDefault();
        if (activeIndex === START_ACTIVE_INDEX || activeIndex === 0) {
          setActiveIndex(maxIndex);
        } else {
          setActiveIndex((prev) => prev - 1);
        }
        break;

      default:
        break;
    }
  };

  return (
    <SearchContext.Provider value={{ inputText, activeIndex, suggestions }}>
      <SearchDispatchContext.Provider
        value={{ controlKeyboard, changeInputText, hoverSuggestion, inactivate }}
      >
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  const state = useContext(SearchContext);
  if (!state) {
    throw new Error("SearchContextProvider not found");
  }
  return state;
};

export const useSearchDispatch = () => {
  const dispatch = useContext(SearchDispatchContext);
  if (!dispatch) {
    throw new Error("SearchContextProvider not found");
  }
  return dispatch;
};
