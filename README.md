# langLog(仮名)スペイン語学習記録アプリ

<img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/d7bfb7ad-e437-4434-ae58-085f45c81b3f">

## サービス概要
linGuardiaは、スペイン語を効率よく学ぶための単語帳です。
スペイン語学習における最大の難所は動詞の活用形ではないでしょうか？
すでに単語帳のアプリはたくさんありますが、大量の活用形を1つずつ入力していたら効率が悪いです。
linGuardiaでは、AIを用いて様々な動詞の活用形を自動で生成することができます。

▼サービスURL
https://lin-guardia.com  

## 利用対象
- スペイン語学習初心者の方
- スペイン語の学習を効率化したい方
- 学習状況を見える化したい方

## 機能
| 単語カード | AIで作る活用形 | 学習記録 |
| :------: | :------: | :------------: |
| <img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/8c262296-6c19-4a09-b6c1-2985ec0e3755"> | <img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/4f21d1de-772a-403f-8e13-573b6e194346"> | <img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/a520a17c-ac6f-4702-a5ea-7c6b89a70050"> |
| 覚えたい単語を登録して自分だけの単語帳を作りましょう! 作成した単語帳は他のユーザーに公開することができます。 | 単語帳に登録された動詞からボタン1つで活用形を生成することができます。 | 学習が完了すると自動で記録が保存され、1週間分の学習をみえる化することができます。 学習目標を設定して学習を習慣化しましょう! |

## 開発背景
- 単語帳

私は趣味でスペイン語の学習を始めましたが、初心者の時に最も苦労したところは単語の管理です。
動詞の活用形を暗記するために、全ての活用形をノートにまとめていましたが、非常に時間がかかり非効率なものでした。  
単語帳アプリなども活用しましたが、登録された単語を表示することしかできなかったので、動詞の活用形を暗記するのには適したものではありませんでした。  
毎回違った活用パターンで表示してくれる単語帳があれば、効率的に学習できると思いました。  

- 学習記録

様々な学習記録アプリを試してきましたが、学習時間を測り忘れたり、学習内容を入力するのが面倒になり結局使わなくなってしまうということがありました。
もう少し簡潔に、ゆるく記録できるアプリがあっても良いのではと思いました。  
(学習時間ではなく、目標に対する達成率を記録できる)

- 差別化ポイントのまとめ

| 機能 | 他のアプリ | langLog |
| :------: | :------: | :------------ |
| 学習記録 | 学習時間、内容を細かく記録 | 目標に対する達成率を記録 |
| 単語帳 | 登録した単語を表示するだけ | ChatGPTを利用し、様々な語形を表示 |


## スペイン語を知らない方、これから学ぶ方へ...
スペイン語には動詞の活用というものがあります。  
英語で言う三人称単数現在の語尾に(s)をつけるやつです。
しかしスペイン語の場合は、表のように主語によって動詞の語形を変化させる必要があり、また不規則なものも多いので
初心者には非常に負担になります。

下記の表は英語のgiveに相当する単語の活用形をまとめたものです。

例)  
(dar: 英語のgiveに相当する単語)
| 主語 | 活用形 |
| :------: | :------------ |
| yo(私) | doy |
| tú(君) | das |
| usted(あなた、彼、彼女) | da |
| nosotros(私たち) | damos |
| vosotros(君たち) | dais  |
| ustedes(あなた達、彼、彼女ら) | dan |

以上に加え、過去形や未来形など多数の活用形が存在しており、動詞1つにつき80個ほどの活用形があることになります。
ある程度のパターンは決まっていますが、不規則なものは1つずつ覚えていくしかありません。


## 主要機能
- ログイン機能(MVP)
- 学習記録(MVP)  
- 単語帳機能(動詞活用機能付き)(MVP)  
- 単語検索機能

## 使用技術
### バックエンド  
- ruby: 3.1.2 (APIモード)
- rails: 7.0.4

### フロントエンド
- TypeScript: 5.2.2
- React: 18.2.0
- Next.js: 13.4.19
- CSS: Material UI

### データベース  
- MySQL

### インフラ(Amazon Web Service)
- ECS
- Route53

### 外部API
- ChatGPT API

## アプリ名候補
- langLog
- linGuardia(リンガァルディア)

## 画面遷移
https://www.figma.com/file/AkuP1xU2fpiiZX6FebbsEo/langLog?type=design&node-id=0%3A1&mode=design&t=cHvINarqMNxJkVAC-1

## ER図
![table](https://github.com/TaikiSakai/langLog/assets/135448782/9c692b53-91f9-4e5e-9aad-123bd0bba231)
