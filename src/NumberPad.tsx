import React from "react";

type Props = {
  onInput: (num: number) => void;
};

const NumberPad: React.FC<Props> = ({ onInput }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-5 gap-2 mt-6">
      {numbers.map((n) => (
        <button
          key={n}
          onClick={() => onInput(n)}
          className="w-14 h-14 bg-gray-200 rounded text-xl font-bold hover:bg-gray-300"
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onInput(0)}
        className="col-span-2 h-14 bg-red-200 rounded text-xl font-bold hover:bg-red-300"
      >
        削除
      </button>
    </div>
  );
};

export default NumberPad;
