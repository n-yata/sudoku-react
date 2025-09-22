# Sudoku React

## 概要
- ReactとTypeScriptで実装したシンプルな数独パズルアプリです。
- 簡単 / 普通 / 難しいの3段階から難易度を選択して新しい問題を自動生成できます。
- 回答チェック機能で誤りをハイライトし、クリアするとローカルストレージに履歴を保存します。
- 画面下部のナンバーパッドから入力でき、選択セルや固定セルの状態が視覚的に分かりやすく表示されます。

## 動作確認済み環境
- OS: Windows 11（64bit）
- Node.js: 18.x 以上（開発用コンテナでは v22.19.0 で確認）
- npm: 9 以上を推奨

Vite 5系は Node.js 18 以上が必須のため、事前にバージョンをご確認ください。

## 主な利用技術 / ライブラリ
- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)（開発・ビルドツール）
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)（スタイリング）

## セットアップとローカル実行
1. 依存パッケージのインストール
   ```bash
   npm install
   ```
2. 開発サーバーの起動
   ```bash
   npm run dev
   ```
3. ブラウザで `http://localhost:5173/` にアクセスするとアプリを操作できます。

## ビルドとプレビュー
- 本番ビルドの作成
  ```bash
  npm run build
  ```
  `dist/` ディレクトリに静的ファイルが生成されます。

- ビルド成果物のローカルプレビュー
  ```bash
  npm run preview
  ```

## 公開URL（GitHub Pages）
- https://n-yata.github.io/sudoku-react/
  - `main` ブランチに push された内容が自動的にデプロイされます。

## プロジェクト構成（抜粋）
```
.
├─ src/
│  ├─ App.tsx               # 画面全体の状態管理とUI構成
│  ├─ SudokuBoard.tsx       # 9x9の盤面コンポーネント
│  ├─ NumberPad.tsx         # 数字入力用ナンバーパッド
│  ├─ utils/
│  │   └─ sudokuGenerator.tsx # 数独の生成・検証ロジック
│  ├─ main.tsx, index.css   # エントリーポイント
├─ vite.config.ts           # Vite設定
├─ tailwind.config.js       # Tailwind CSS設定
└─ package.json             # 依存関係・スクリプト
```

## 開発メモ
- クリア履歴はブラウザの `localStorage` に保存します。履歴をリセットしたい場合はブラウザのストレージを削除してください。
- 不具合報告や改善要望は Issue や Pull Request として歓迎します。

