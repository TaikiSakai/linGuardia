# langLog(仮名)スペイン語学習記録アプリ

![Captura de pantalla 2024-03-17 a las 0 57 41 a  m](https://github.com/TaikiSakai/langLog/assets/135448782/a461fc1e-5c4a-496d-a3bc-2adc85504e6e)
## サービス概要 - Detalles de servicio
langLogはスペイン語学習者のための学習記録アプリです。

日々の学習記録だけでなく、動詞の活用機能がついた単語帳など効果的な学習をサポートします。

▼サービスURL
http://linguardia.com  

## 利用対象
スペイン語学習初段階の方　

## 開発背景
スペイン語学習における最大の難所は動詞の活用形ではないでしょうか？  
活用形がパッと出てこず会話が続かない、長文を読んでいて活用形がわからず止まってしまう、などといったことはよくあると思います。  
langLogでは、ユーザーが登録した単語をフラッシュカード形式で表示し、通常の単語学習はもちろん、  
動詞の自動活用機能により様々な活用形を効率的に学習することができます。

## スペイン語を知らない方、これから学ぶ方へ...
スペイン語には動詞の活用というものがあります。  
英語で言う三人称単数現在の語尾に(s)をつけるやつです。

| 主語 | 活用形 |
| :------: | :------------ |
| yo(私) | sé |
| tú(君) | sabes  |
| usted(あなた、彼、彼女) | sabe |
| nosotros(私たち) | sabemos |
| vosotros(君たち) | sabeis  |
| ustedes(あなた達、彼、彼女ら) | saben |


## 主要機能
- ログイン機能
- 学習記録
- 学習計画・目標管理
- マイ本棚
- 単語帳機能(動詞活用機能付き)
- 単語検索機能

## 使用技術
### バックエンド  
- ruby: 3.1.2
- rails: 7.0.4
- python: 3.8.0
- flask:
- mlconjug3: 3.11.0

### フロントエンド
- TypeScript: 5.2.2
- React: 18.2.0
- Next.js: 13.4.19
- CSS: Material UI

### 外部API
- 国立国会図書館サーチ 書影API

### インフラ(Amazon Web Service)
- ECS
- Route53
- DataBase: MySQL
## アプリ名候補
- langLog
- linGuardia(リンガァルディア)



## 書影API
<img src="https://ndlsearch.ndl.go.jp/thumbnail/9784876153961.jpg"/>  

国立国会図書館サーチより
https://ndlsearch.ndl.go.jp/help/api/thumbnail
