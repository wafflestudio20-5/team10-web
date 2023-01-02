import React, { createContext, useContext, useState } from 'react';

type BoardContextType = {
  handleInputTitle: (input: string) => void;
  handleInputContent: (input: string) => void;
};

const BoardContext = createContext<BoardContextType>({} as BoardContextType);

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');

  const handleInputTitle = (input: string) => {
    input = input.trim();
    console.log(input);
    console.log(inputTitle);
    setInputTitle(input);
  };
  const handleInputContent = (input: string) => {
    input = input.trim();
    setInputContent(input);
  };

  return (
    <BoardContext.Provider
      value={{
        handleInputTitle,
        handleInputContent,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoardContext = () => useContext(BoardContext);
