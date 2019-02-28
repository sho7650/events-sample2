# 変更データキャプチャ with JWTログイン サンプル

当スクリプトは、次の２つの機能を包含するサンプルプログラムです

1. JSON Web Token で署名されたアクセストークンを使って、安全にログインを行う
2. 変更データキャプチャのストリームを購読(Subscribe)し、取得されるRAWデータを確認する

## プログラムの使い方

### 前提条件

- Salesforce 環境が準備できていること (Developer推奨)
- Salesforce で、取引先を変更データキャプチャの対象に設定していること
- Salesforce 環境で「接続アプリケーション」が、次の設定で作成されていること
    - OAuth認証
    - デジタル認証 (OpenSSLなどでの自己証明書でOK)
    - 利用するユーザは「管理者が承認したユーザは事前承認済み」としてプロファイルを登録していること
- node.js 10.x または 11.x ランタイムが使えるようになっていること
- git コマンドが利用できること

### 導入方法

次のコマンドを実行します

```bash
git clone https://github.com/tabesfdc/events-sample2.git
```

ローカルに `events-sample2` というディレクトリができます。各コマンドは、このディレクトリ内にありますので、`cd events-sample2` でカレントディレクトリを変更します。

次に、`npm install` コマンドを実行して、必要な npm パッケージをどうにゅうします。

### 事前準備

`.env` ファイルの準備が必要です。次がサンプルです。

```bash
PRIVATE_KEY='LS0tLS1CRUdJTiBSU0E (中略)VORCBSU0EgUFJJVkFURSBLRVktLS0tLQo='
ISSUER='3MVG9pe2TC (中略) f2g7eGk09jJaIP6w'
AUDIENCE='https://login.salesforce.com'
SUBJECT='test@example.com'
```

各々は次のとおりです

- `PRIVATE_KEY` - 作成した秘密鍵を`base64`化したものを定義します。例えば `base64 ./cert/server.key` などで作成します
- `ISSUER` - 接続アプリケーション内の`コンシューマ鍵`
- `AUDIENCE` - `https://login.salesforce.com` 固定
- `SUBJECT` - ログインするユーザ名

これを、プログラムのルートディレクトリに配置します

### 実行方法

#### 取引先に新規にレコードを追加します。

- Linux/Macの場合

```bash
./publisher.js [Account名 [Account名[...]]]
```

- Windows の場合 (試したことない)

```
node .¥publisher.js [Account名 [Account名[...]]]
```

いずれの場合も `Account名` の数に制限はありません。省略も可。省略した場合、`Publish test`という取引先が１件作成されます。

#### 取引先の変更内容をキャプチャします。

- Linux/Macの場合

```bash
./subscriber.js
```

- Windows の場合 (試したことない)

```
node .¥subscriber.js
```

実行すると待機状態になります。「取引先」のレコードで、新規作成・更新・削除が発生すると、変更データキャプチャが取得した内容がJSON形式で表示されます。

## プログラムの紹介

### ディレクトリ構成

```
.
├── README.md           このファイル
├── jwt.js              認証・ログイン周りのモジュール
├── publisher.js        取引先に新規登録する
└── subscriber.js       取引先の変更データキャプチャを受け取る
```

各プログラムの内容については、プログラム内に説明を記述していますので、そちらを参考になさってください