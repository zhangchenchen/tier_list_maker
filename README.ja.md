# Tier表メーカー

> 🌐 言語: [English](README.md) | [中文](README.zh.md) | **日本語**

🎯 **無料オンラインTier表メーカー** - 数秒でプロフェッショナルなTier表を作成・共有！

![preview](preview.png)

## ✨ 機能

- 🆓 **永久100%無料** - 登録不要、隠れた料金なし
- 🎨 **ドラッグ&ドロップインターフェース** - 直感的で使いやすい
- 📱 **モバイルフレンドリー** - すべてのデバイスでシームレスに動作
- 💾 **自動保存** - localStorageで作業を失わない
- 🖼️ **高品質エクスポート** - PNG画像としてダウンロード
- 🌐 **多言語対応** - 英語、中国語、日本語サポート
- 🎯 **5段階ティアシステム** - S、A、B、C、Dランキングシステム

## 🚀 クイックスタート

### 前提条件

- Node.js 18+ 
- pnpm (推奨) または npm

### インストール

1. リポジトリをクローン

```bash
git clone https://github.com/zhangchenchen/tier_list_maker.git
cd tier_list_maker
```

2. 依存関係をインストール

```bash
pnpm install
```

3. 環境変数を設定

```bash
cp .env.example .env.development
```

4. 開発サーバーを起動

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) を開いてアプリケーションを表示します。

## 🎨 カスタマイズ

### テーマ

`src/app/theme.css` でテーマカラーを設定

[TweakCN Theme Editor](https://tweakcn.com/editor/theme) を使用して色をカスタマイズできます。

### ランディングページのコンテンツ

以下で編集:
- 英語: `src/i18n/pages/landing/en.json`
- 中国語: `src/i18n/pages/landing/zh.json`
- 日本語: `src/i18n/pages/landing/ja.json`

### メッセージと翻訳

以下で翻訳を更新:
- `src/i18n/messages/en.json`
- `src/i18n/messages/zh.json`
- `src/i18n/messages/ja.json`

## 📦 ビルド

本番環境用にビルド:

```bash
pnpm build
```

本番ビルドをローカルでテスト:

```bash
pnpm start
```

## 🚢 デプロイ

### Vercelにデプロイ（推奨）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. コードをGitHubにプッシュ
2. リポジトリをVercelにインポート
3. デプロイ！

### Cloudflare Pagesにデプロイ

1. プロジェクトをビルド:

```bash
pnpm build
```

2. `.next` 出力を使用してCloudflare Pagesにデプロイ

## 🛠️ 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **UIコンポーネント**: [Shadcn UI](https://ui.shadcn.com/)
- **国際化**: [next-intl](https://next-intl-docs.vercel.app/)
- **画像エクスポート**: [html2canvas](https://html2canvas.hertzen.com/)
- **通知**: [Sonner](https://sonner.emilkowal.ski/)

## 📁 プロジェクト構造

```
tier_list_maker/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Reactコンポーネント
│   │   ├── blocks/       # ランディングページブロック
│   │   │   └── hero/     # Tier表メーカー付きHeroセクション
│   │   └── ui/           # Shadcn UIコンポーネント
│   ├── i18n/             # 国際化
│   │   ├── messages/     # グローバル翻訳
│   │   └── pages/        # ページ固有の翻訳
│   ├── lib/              # ユーティリティ関数
│   └── types/            # TypeScript型
├── public/               # 静的アセット
└── content/             # MDXドキュメント
```

## 🎯 主要コンポーネント

### Tier表メーカー

場所: `src/components/blocks/hero/tier-list-maker.tsx`

機能:
- アイテムのドラッグ&ドロップ整理
- localStorageによる自動保存
- モバイルクイックメニュー
- リアルタイムテーマ検出
- 高品質PNG エクスポート
- ローディング状態と進捗フィードバック

## 🌐 国際化

プロジェクトは複数の言語をサポートしています:

- 英語 (`en`)
- 中国語 (`zh`)
- 日本語 (`ja`)

言語を追加するには:
1. `src/i18n/messages/` に新しいJSONファイルを作成
2. `src/i18n/pages/landing/` に翻訳を追加
3. `src/i18n/routing.ts` でロケール設定を更新

## 📝 ライセンス

[MIT License](LICENSE)

## 🤝 コントリビューション

コントリビューション歓迎！お気軽にプルリクエストを提出してください。

## 📱 ソーシャルメディア & SEO

プロジェクトには包括的なソーシャルメディア最適化が含まれています:

- **Open Graphタグ** - Facebook、LinkedInでの共有用
- **Twitter Cards** - Twitterプレビュー用
- **SEOメタデータ** - キーワード、説明、altタグ
- **多言語対応** - 英語、中国語、日本語のメタデータ

テストと最適化のヒントについては [Social Media Guide](SOCIAL_MEDIA_GUIDE.md) をご覧ください。

### ソーシャルカードのテスト

- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## 📧 お問い合わせ

- ウェブサイト: [tierlist-maker.com](https://tierlist-maker.com)
- メール: support@tierlist-maker.com
- Twitter: [@tierlistmaker](https://twitter.com/tierlistmaker)

---

❤️ Tier表メーカーチームによって作成されました

