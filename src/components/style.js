import styled from "styled-components";

export const DropdownContainer = styled.ul`
  background-color: white;
  margin-top: 5px;
  border-radius: 17px;
  font-size: 15px;
  padding: 24px 24px 16px;
  box-shadow: rgba(30, 32, 37, 0.1) 0 2px 10px;
`;

export const NoResults = styled.div`
  padding: 8px 0;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  list-style: none;

  &.active {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

export const TextWrapper = styled.span`
  display: inline;
`;

export const Text = styled.span`
  white-space: break-spaces;
`;

export const SameWord = styled(Text)`
  font-family: inherit;
  color: #2bc9ba;
`;
