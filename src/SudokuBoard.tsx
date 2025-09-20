import React from "react";

type Props = {
  board: number[][];
  fixedMask: boolean[][];
  errors: boolean[][];
  conflicts: boolean[][];
  selectedCell: { row: number; col: number } | null;
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
  onChange: (row: number, col: number, value: number) => void;
};

export default function SudokuBoard({
  board,
  fixedMask,
  errors,
  conflicts,
  selectedCell,
  setSelectedCell,
  onChange,
}: Props) {
  return (
    <div className="w-full max-w-sm aspect-square">
      <div className="grid grid-cols-9 grid-rows-9 w-full h-full">
        {board.map((row, i) =>
          row.map((value, j) => {
            const isSelected =
              selectedCell?.row === i && selectedCell?.col === j;
            const isFixed = fixedMask[i][j];
            const hasError = errors[i][j];
            const hasConflict = conflicts[i][j];

            // 3x3ごとの太線を黒で描画
            const borderClasses = `
              ${
                i % 3 === 0
                  ? "border-t-4 border-black"
                  : "border-t border-black"
              }
              ${
                j % 3 === 0
                  ? "border-l-4 border-black"
                  : "border-l border-black"
              }
              ${i === 8 ? "border-b-4 border-black" : ""}
              ${j === 8 ? "border-r-4 border-black" : ""}
            `;

            return (
              <input
                key={`${i}-${j}`}
                type="text"
                value={value === 0 ? "" : value}
                readOnly={isFixed}
                onClick={() => setSelectedCell({ row: i, col: j })}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  if (!isNaN(v) && v >= 1 && v <= 9) onChange(i, j, v);
                  if (e.target.value === "") onChange(i, j, 0);
                }}
                className={`
                  text-center text-lg focus:outline-none
                  ${isFixed ? "bg-gray-200 font-bold" : "bg-white"}
                  ${isSelected ? "bg-blue-200" : ""}
                  ${hasError ? "bg-red-200" : ""}
                  ${hasConflict ? "bg-yellow-200" : ""}
                  ${borderClasses}
                `}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
