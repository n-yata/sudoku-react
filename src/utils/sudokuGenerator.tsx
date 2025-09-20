export type Puzzle = {
  question: number[][];
  solution: number[][];
};

// ユーティリティ関数（シャッフル）
function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// バックトラッキングで完全盤面を生成
function fillBoard(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// 値が置けるかチェック
function isValid(
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === num) return false;
    }
  }
  return true;
}

// 難易度ごとの残すマス数
function getClues(difficulty: string): number {
  if (difficulty === "easy") return 40;
  if (difficulty === "medium") return 32;
  return 25; // hard
}

// パズル生成
export function generatePuzzle(difficulty: string): Puzzle {
  const solution = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(solution);

  const question = solution.map((row) => [...row]);

  let cellsToRemove = 81 - getClues(difficulty);
  while (cellsToRemove > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (question[r][c] !== 0) {
      question[r][c] = 0;
      cellsToRemove--;
    }
  }

  return { question, solution };
}
