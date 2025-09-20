import React, { useMemo, useState } from "react";
import SudokuBoard from "./SudokuBoard";

// 初期の数独（0 = 空マス）
const initialPuzzle: number[][] = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function App() {
  const [board, setBoard] = useState(initialPuzzle);

  // 初期値が入っているセルは固定セルとする
  const fixedMask = useMemo(
    () => initialPuzzle.map((row) => row.map((v) => v !== 0)),
    []
  );

  const handleChange = (row: number, col: number, value: number) => {
    if (fixedMask[row][col]) return; // 固定セルは無視
    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">数独ゲーム</h1>
      <SudokuBoard
        board={board}
        fixedMask={fixedMask}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
