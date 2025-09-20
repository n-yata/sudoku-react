import React from "react";

type Props = {
  row: number;
  col: number;
  value: number;
  isFixed: boolean;
  onChange: (row: number, col: number, value: number) => void;
};

const SudokuCell: React.FC<Props> = ({
  row,
  col,
  value,
  isFixed,
  onChange,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value) || 0;
    if (v >= 1 && v <= 9) {
      onChange(row, col, v);
    } else if (e.target.value === "") {
      onChange(row, col, 0);
    }
  };

  // 枠線の太さ
  const borderClasses = `
    border border-black
    ${col % 3 === 2 ? "border-r-4" : ""}
    ${row % 3 === 2 ? "border-b-4" : ""}
    ${col === 0 ? "border-l-4" : ""}
    ${row === 0 ? "border-t-4" : ""}
  `;

  // 固定セルは編集不可
  const fixedClasses = isFixed
    ? "bg-gray-200 font-bold text-black"
    : "bg-white";

  return (
    <input
      type="text"
      value={value === 0 ? "" : value}
      onChange={isFixed ? undefined : handleInput}
      readOnly={isFixed}
      maxLength={1}
      className={`w-12 h-12 text-center text-lg ${borderClasses} ${fixedClasses}`}
    />
  );
};

export default SudokuCell;
