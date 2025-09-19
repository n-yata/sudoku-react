import React from "react";

type Props = {
  row: number;
  col: number;
  value: number;
  onChange: (row: number, col: number, value: number) => void;
};

const SudokuCell: React.FC<Props> = ({ row, col, value, onChange }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value) || 0;
    if (v >= 1 && v <= 9) {
      onChange(row, col, v);
    } else if (e.target.value === "") {
      onChange(row, col, 0);
    }
  };

  // 3x3 ごとに太線を入れる
  const borderClasses = `
    border border-black
    ${col % 3 === 2 ? "border-r-4" : ""}
    ${row % 3 === 2 ? "border-b-4" : ""}
    ${col === 0 ? "border-l-4" : ""}
    ${row === 0 ? "border-t-4" : ""}
  `;

  return (
    <input
      type="text"
      value={value === 0 ? "" : value}
      onChange={handleInput}
      maxLength={1}
      className={`w-10 h-10 text-center text-lg font-bold ${borderClasses}`}
    />
  );
};

export default SudokuCell;
