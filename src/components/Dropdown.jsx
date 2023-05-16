import { useSearchState } from "../contexts/SearchContext";
import DropdownItem from "./DropdownItem";
import * as S from "./style";

const Dropdown = ({ isOpen }) => {
  const { suggestions, inputText } = useSearchState();

  if (!isOpen) {
    return null;
  }

  return (
    <S.DropdownContainer>
      <S.Item>
        {inputText ? (
          <S.SameWord>{inputText}</S.SameWord>
        ) : (
          <S.Text>검색어를 입력해 주세요.</S.Text>
        )}
      </S.Item>
      {suggestions.length === 0 ? (
        <S.NoResults>추천 아이템 없음</S.NoResults>
      ) : (
        suggestions.map((suggestion, idx) => (
          <DropdownItem key={idx} index={idx}>
            {suggestion}
          </DropdownItem>
        ))
      )}
    </S.DropdownContainer>
  );
};

export default Dropdown;
