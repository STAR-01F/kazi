import { useState, MouseEvent, ChangeEvent } from 'react';

const Homepage = () => {
  const [inputText, setInputText] = useState('');

  const handleSumbit = (e: MouseEvent<HTMLButtonElement>) => {
    // send the prompt along with the job description to the OpenAi API
    e.preventDefault();
    console.log(inputText);
  };

  return (
    <>
      <span>Copy Job Description</span>
      <div className="input_button">
        <input
          type="text"
          value={inputText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputText(e.target.value);
          }}
        />
        <button onClick={handleSumbit}>Upload</button>
      </div>
      <div className="keywords">
        {/* div for the returned keywords from the api */}
      </div>
    </>
  );
};

export default Homepage;
