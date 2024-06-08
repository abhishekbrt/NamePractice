import React from "react";
import { useRef, useState, useEffect } from "react";
import names from "./names";

export default function App() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [hindiName, setHindiName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const entries = Object.entries(names);
  const [i, setI] = useState(0); // This is the state to keep track of the index of the letter in the englishName

  // function matchLetters(inputLetter, nextLetter, i) {
  //   if (inputLetter === nextLetter) {
  //     console.log("Matched");
  //     console.log(inputLetter);
  //     inputRef.current.style.color = "green";
  //     setI(++i);
  //   } else {
  //     console.log("Not Matched");
  //     inputRef.current.style.color = "red";
  //   }
  //   console.log(i);
  // }

  function handleChange(e) {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const letters = englishName.toLowerCase().split("");
    const currentLetter = letters[i];
    // matchLetters(value.charAt(value.length - 1), currentLetter, i);
    if (englishName.startsWith(value)) {
      inputRef.current.style.color = "green";
    } else {
      inputRef.current.style.color = "red";
      navigator.vibrate(200); // Vibrate the phone if the letter is wrong
    }
  }

  function handleNext() {
    const randomIndex = Math.floor(Math.random() * entries.length);
    const [newHindiName, newEnglishName] = entries[randomIndex];
    setHindiName(newHindiName);
    setEnglishName(newEnglishName.toLowerCase());
    console.log(newEnglishName);
    // setI(0);
    setInputValue("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  useEffect(() => {
    handleNext();
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center  ">
      <div className=" bg-blue-100 h-1/6 w-4/5 my-10 rounded-2xl flex items-center justify-center text-3xl font-bold">
        {hindiName}
      </div>
      <div className=" bg-blue-200 h-1/6 w-4/5 my-10 rounded-2xl">
        <input
          className=" h-full w-full text-center font-mono text-2xl text-green-700"
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className="bg-red-500 rounded border border-red-500 text-white px-4 py-2"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
