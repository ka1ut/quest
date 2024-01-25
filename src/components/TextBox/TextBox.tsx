import React from 'react';
import styles from './TextBox.module.css';

import { GrNext } from "react-icons/gr";

type TextBoxProps = {
    text: string;
    setText: (value :string) => void;
    addNewWhy: () => void;
};

export function TextBox({ text, setText, addNewWhy }: TextBoxProps) {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px'
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      addNewWhy();
    }
  };

  const isButtonDisabled = text.trim().length === 0
  const ButtonBgClass = !isButtonDisabled ? 'bg-black' : 'bg-gray-200';


  return (
    <div>
      <div className='flex flex-row border border-gray-300 rounded-lg'>
        <textarea
          placeholder="ここに書いてください"
          className={` rounded-lg py-2 px-4 block   ${styles.textarea }`}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          
        />
        <div className='mx-2 flex items-center justify-center text-center'>
          <button 
          onClick={addNewWhy}
          className={`${ButtonBgClass}  w-7 h-7 md:w-10 md:h-10 rounded-lg text-white text-sm flex items-center justify-center text-center`}
          disabled={isButtonDisabled}
          >
          <GrNext/>
          </button>
        </div>
       

      </div>
    </div>
  );
}
