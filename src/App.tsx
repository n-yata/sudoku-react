import React, { useMemo, useState, useEffect } from "react";
import SudokuBoard from "./SudokuBoard";
import NumberPad from "./NumberPad";
import { generatePuzzle, Puzzle } from "./utils/sudokuGenerator";

type HistoryEntry = {
  difficulty: string;
  clearedAt: string;
};

function App() {
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [puzzle, setPuzzle] = useState<Puzzle>(generatePuzzle("easy"));
  const [board, setBoard] = useState<number[][]>(puzzle.question);
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
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // 固定セルマスク
  const fixedMask = useMemo(
    () => puzzle.question.map((row) => row.map((v) => v !== 0)),
    [puzzle]
  );

  // 初回ロード時に履歴を取得
  useEffect(() => {
    const stored = localStorage.getItem("sudokuHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const saveHistory = (newHistory: HistoryEntry[]) => {
    setHistory(newHistory);
    localStorage.setItem("sudokuHistory", JSON.stringify(newHistory));
  };

  const resetBoard = (newPuzzle: Puzzle) => {
    setPuzzle(newPuzzle);
    setBoard(newPuzzle.question);
    setErrors(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(false))
    );
    setConflicts(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(false))
    );
    setSelectedCell(null);
    setMessage("");
  };

  // 難易度変更時に自動で新しい問題生成
  useEffect(() => {
    resetBoard(generatePuzzle(difficulty));
  }, [difficulty]);

  const handleNewPuzzle = () => {
    resetBoard(generatePuzzle(difficulty));
  };

  const handleChange = (row: number, col: number, value: number) => {
    if (fixedMask[row][col]) return;
    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setBoard(newBoard);
  };

  const handleCheck = () => {
    const solution = puzzle.solution;
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

    if (correct) {
      setMessage("🎉 クリア！おめでとうございます！");
      const newEntry: HistoryEntry = {
        difficulty,
        clearedAt: new Date().toISOString(),
      };
      const newHistory = [...history, newEntry];
      saveHistory(newHistory);
    } else {
      setMessage("❌ 間違いがあります。");
    }
  };

  const handleNumberPad = (num: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    handleChange(row, col, num);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">数独ゲーム</h1>

      {/* 難易度選択 */}
      <div className="mb-4">
        <label className="mr-2">難易度:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border rounded p-1"
        >
          <option value="easy">簡単</option>
          <option value="medium">普通</option>
          <option value="hard">難しい</option>
        </select>
      </div>

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
          onClick={handleNewPuzzle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          新しい問題
        </button>
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          回答チェック
        </button>
      </div>

      {message && <p className="mt-4 text-lg">{message}</p>}

      <NumberPad onInput={handleNumberPad} />

      {/* 履歴 */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">クリア履歴</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">まだクリア履歴はありません</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {h.difficulty} -{" "}
                  {new Date(h.clearedAt).toLocaleString("ja-JP")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
