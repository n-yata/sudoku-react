import React from "react";
import SudokuCell from "./SudokuCell";

type Props = {
  board: number[][];
  fixedMask: boolean[][];
  onChange: (row: number, col: number, value: number) => void;
};

const SudokuBoard: React.FC<Props> = ({ board, fixedMask, onChange }) => {
  return (
    <div className="inline-block">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((value, j) => (
            <SudokuCell
              key={`${i}-${j}`}
              row={i}
              col={j}
              value={value}
              isFixed={fixedMask[i][j]}
              onChange={onChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
