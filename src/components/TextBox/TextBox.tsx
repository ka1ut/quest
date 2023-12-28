import React, { Dispatch, SetStateAction } from 'react';

type TextBoxProps = {
    text: string| null;
    setText: Dispatch<SetStateAction<string | null>>;
};

export function TextBox({ text, setText }: TextBoxProps) {
  const handleTextChange = (event:any) => {
    setText(event.target.value);
  };

  return (
    <div className="p-4">
      <input 
        type="text" 
        placeholder="ここに書いてください"
        className="border border-gray-300 rounded-lg py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={text || ''}
        onChange={handleTextChange}
      />
    </div>
  );
}
