# シフト希望収集＆自動割当アプリ

ガソリンスタンド向けのシフト管理アプリです。スタッフの希望休を集めて、自動でシフト案を作成できます。

- スタッフ管理（資格・雇用形態・固定休み・基本稼働パターン）
- 希望休の入力（カレンダーでタップするだけ）
- 自動シフト作成＋店長による手直し・確定
- 各スタッフのログイン後は自分のシフト・残業時間をいつでも確認可能

データはVercelの無料データベース（Prisma Postgres）に保存されるので、誰がどの端末から開いても同じ情報が見られます。ログインは各スタッフの名前＋パスワード（アプリ内の「スタッフマスタ」で設定）です。

---

## クラウドに公開する手順（GitHub → Vercel）

必要なもの（すべて無料）
- GitHubアカウント
- Vercelアカウント

### 手順1：GitHubにプロジェクトを置く

1. [https://github.com/](https://github.com/) にログインします。
2. 右上の「＋」→「New repository」を選びます。
3. 「Repository name」に `shift-app` のような好きな名前を入力し、「Create repository」を押します。
4. 作成された画面の「uploading an existing file」というリンクをクリックします。
5. この `shift-app` フォルダの中身（`node_modules` フォルダがあれば含めない）を、まとめて画面にドラッグ＆ドロップします。
6. 下の方の緑色「Commit changes」を押します。

### 手順2：Vercelにインポートする

1. [https://vercel.com/](https://vercel.com/) で「Continue with GitHub」を選び、手順1と同じアカウントでログインします。
2. 「Add New...」→「Project」を選びます。
3. 先ほどの `shift-app` リポジトリを探して「Import」を押します。
4. 設定はそのままで「Deploy」を押します（データベース未接続のため、この時点では一度失敗しますが問題ありません）。

### 手順3：データの保存先（Prisma Postgres）を接続する

1. `shift-app` プロジェクトの上部メニューから「Storage」タブを開きます。
2. 「Connect Database」または「Create Database」を押します。
3. 一覧から「Prisma」（Prisma Postgres）を選び、「Continue」を押します。
4. リージョンはそのままでよく、プランは「Free」を選びます。
5. 好きな名前（例：`shift-app-db`）を付けて作成します。
6. 作成後、「Connect」で `shift-app` プロジェクトに接続します。

これで `DATABASE_URL` が自動的に設定されます（自分で入力する必要はありません）。

### 手順4：もう一度デプロイする

1. 「Deployments」タブを開きます。
2. 一番上（最新）のデプロイ右はしの「...」→「Redeploy」を押し、確認画面でもう一度「Redeploy」を押します。
3. 1〜2分待つと「Ready」（緑）になり、URL（例：`https://shift-app-xxxx.vercel.app`）が発行されます。

### 手順5：初回ログイン

1. 発行されたURLを開きます。
2. スタッフ名の欄に最初から「店長」が用意されています。パスワードは `admin` です。
3. ログインしたら、まず「スタッフマスタ」から実際の8名を登録し、この初期パスワードは分かりやすいものに変更しておくことをおすすめします。

---

## ローカルで動作確認したい場合（任意）

このプロジェクトは、Vercel + Prisma Postgres（本番のデータベース）に接続して動かす前提の構成です。ローカルで試す場合は、`.env`に本番と同じ`DATABASE_URL`を設定してから実行してください。

```
npm install
npm run dev
```

## ディレクトリ構成（主要部分）

```
shift-app/
├── public/
│   └── app.html          … アプリ本体（画面・ロジック）
├── app/
│   └── api/kv/route.js   … データ保存用API
├── lib/
│   └── prisma.js
├── prisma/
│   └── schema.prisma     … PostgreSQL用スキーマ（DATABASE_URLはVercelが自動設定）
└── next.config.js
```
