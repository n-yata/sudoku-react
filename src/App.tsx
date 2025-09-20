import React, { useMemo, useState } from "react";
import SudokuBoard from "./SudokuBoard";
import NumberPad from "./NumberPad";

const puzzles: { question: number[][]; solution: number[][] }[] = [
  {
    question: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  },
];

function App() {
  const [puzzleIndex] = useState(0);
  const [board, setBoard] = useState(puzzles[0].question);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<boolean[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(false))
  );
  const [conflicts, setConflicts] = useState<boolean[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(false))
  );
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const fixedMask = useMemo(
    () => puzzles[puzzleIndex].question.map((row) => row.map((v) => v !== 0)),
    [puzzleIndex]
  );

  const handleChange = (row: number, col: number, value: number) => {
    if (fixedMask[row][col]) return;
    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setBoard(newBoard);
  };

  const handleCheck = () => {
    const solution = puzzles[puzzleIndex].solution;
    let correct = true;
    const newErrors = Array(9)
      .fill(null)
      .map(() => Array(9).fill(false));

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== solution[i][j]) {
          correct = false;
          if (board[i][j] !== 0) newErrors[i][j] = true;
        }
      }
    }
    setErrors(newErrors);
    setMessage(correct ? "🎉 クリア！" : "❌ 間違いがあります。");
  };

  // 数字パッドから入力
  const handleNumberPad = (num: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    handleChange(row, col, num);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">数独ゲーム</h1>
      <SudokuBoard
        board={board}
        fixedMask={fixedMask}
        errors={errors}
        conflicts={conflicts}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        onChange={handleChange}
      />
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          回答チェック
        </button>
      </div>
      {message && <p className="mt-4 text-lg">{message}</p>}
      {/* スマホ用ナンバーパッド */}
      <NumberPad onInput={handleNumberPad} />
    </div>
  );
}

export default App;
