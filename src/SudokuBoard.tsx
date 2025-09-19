import React from "react";
import SudokuCell from "./SudokuCell";

type Props = {
  board: number[][];
  onChange: (row: number, col: number, value: number) => void;
};

const SudokuBoard: React.FC<Props> = ({ board, onChange }) => {
  return (
    <div className="inline-block bg-white">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((value, j) => (
            <SudokuCell
              key={`${i}-${j}`}
              row={i}
              col={j}
              value={value}
              onChange={onChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
