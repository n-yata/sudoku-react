import React from "react";
import SudokuCell from "./SudokuCell";

type Props = {
  board: number[][];
  fixedMask: boolean[][];
  errors: boolean[][];
  conflicts: boolean[][];
  selectedCell: { row: number; col: number } | null;
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
  onChange: (row: number, col: number, value: number) => void;
};

const SudokuBoard: React.FC<Props> = ({
  board,
  fixedMask,
  errors,
  conflicts,
  selectedCell,
  setSelectedCell,
  onChange,
}) => {
  return (
    <div className="inline-block">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((value, j) => {
            const isSelected =
              selectedCell?.row === i && selectedCell?.col === j;

            return (
              <SudokuCell
                key={`${i}-${j}`}
                row={i}
                col={j}
                value={value}
                isFixed={fixedMask[i][j]}
                hasError={errors[i][j]}
                hasConflict={conflicts[i][j]}
                isSelected={isSelected}
                onSelect={() => setSelectedCell({ row: i, col: j })}
                onChange={onChange}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
