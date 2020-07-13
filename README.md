# Platform Events: publish & subscribe サンプル (jsforce & nforce)

当スクリプトは、次の２つの機能を包含するサンプルプログラムです

1. JSON Web Token で署名されたアクセストークンを使って、安全にログインを行う (nforce 版は user/pass)
2. 変更データキャプチャのストリームを購読(Subscribe)し、取得される RAW データを確認する

## プログラムの使い方

### 前提条件

- Salesforce 環境が準備できていること (Developer 推奨)
- Salesforce 環境で「接続アプリケーション」が、次の設定で作成されていること
  - OAuth 認証
  - デジタル認証 (OpenSSL などでの自己証明書で OK) (nforce 版では不要)
  - 利用するユーザは「管理者が承認したユーザは事前承認済み」としてプロファイルを登録していること
- node.js 10.x 以降のランタイムが使えるようになっていること
- git コマンドが利用できること
- Salesforce 上のイベントオブジェクト内に `dummy__c` フィールドを作成しておくこと

### 導入方法

次のコマンドを実行します

```bash
git clone https://github.com/tabesfdc/events-sample2.git
```

ローカルに `events-sample2` というディレクトリができます。各コマンドは、このディレクトリ内にありますので、`cd events-sample2` でカレントディレクトリを変更します。

次に、`npm install` コマンドを実行して、必要な npm パッケージを導入します。

### 事前準備

`.env` ファイルの準備が必要です。これを、プログラムのルートディレクトリに配置します。

#### jsforce 版を利用する場合

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

#### nforce 版を利用する場合

```bash
CLIENT_ID='3MVG9pe2TC (中略) f2g7eGk09jJaIP6w'
CLIENT_SECRET='80CB1 (中略) 839F19AE3'
REDIRECT_URL='https://localhost:3000/oauth/_callback'
API_VERSIOIN='v38.0'
ENV='production'
USER_ID='xxxx@yyyy.com'
PASSWORD='password'
```

各定義は次のとおりです

- `CLIENT_ID` - 接続アプリケーション内の`コンシューマ鍵`
- `CLIENT_SECRET` - 接続アプリケーション内の`コンシューマの秘密`
- `REDIRECT_URL` - 接続アプリケーションで指定した`コールバックURL`
- `API_VERSIOIN` - 使用する API バージョン (v38.0 以降)
- `ENV` - 使用する環境 `production`, `test`
- `USER_ID` - ログインユーザ名
- `PASSWORD` - ログインパスワード

#### 両者共通の設定

```bash
TOPIC='TestingEvent__c'
```

- `TOPIC` - Platform Events のイベントオブジェクト名(API 名)

### 実行方法

#### 取引先に新規にレコードを追加します。

- Linux/Mac の場合

```bash
./publisher.js [Account名 [Account名[...]]]
```

- Windows の場合 (試したことない)

```
node .¥publisher.js [Account名 [Account名[...]]]
```

いずれの場合も `Account名` の数に制限はありません。省略も可。省略した場合、`Publish test`という取引先が１件作成されます。

#### 取引先の変更内容をキャプチャします。

- Linux/Mac の場合

```bash
./subscriber.js
```

または

```bash
./nforce-subscriber.js
```

- Windows の場合 (試したことない)

```
node .¥subscriber.js
```

または

```bash
node .¥norce-subscriber.js
```

実行すると待機状態になります。「取引先」のレコードで、新規作成・更新・削除が発生すると、変更データキャプチャが取得した内容が JSON 形式で表示されます。

## プログラムの紹介

### ディレクトリ構成

```
.
├── README.md             このファイル
├── jwt.js                認証・ログイン周りのモジュール
├── nforce.js             認証・ログイン周りのモジュール(nforce用)
├── nforce-publisher.js   イベントを公開する
├── nforce-subscriber.js  配信されたイベントを取得する
├── publisher.js          イベントを公開する
└── subscriber.js         配信されたイベントを取得する
```

各プログラムの内容については、プログラム内に説明を記述していますので、そちらを参考になさってください

## nforce 版の存在について

`nforce` 版を準備したのは、subscribe 時に `jsforce` ではエラーを取得する機構が利用できず、自由度の高い `nforce`版も準備しました。用途に応じて、サンプルを活用ください。
