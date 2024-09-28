# linGuardia スペイン語を効率的に学ぶための単語帳

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
| トップページ | 単語カード | AIで作る活用形 | 学習記録 |
| :------: | :------: | :------: | :------------: |
| <img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/8c262296-6c19-4a09-b6c1-2985ec0e3755"> | <img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/26e99893-b664-4701-a4d0-c08ea19e1214"> | <img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/4f21d1de-772a-403f-8e13-573b6e194346"> | <img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/a520a17c-ac6f-4702-a5ea-7c6b89a70050"> |
| 1週間分の学習記録や学習目標の達成度を確認することができます | 覚えたい単語を登録して自分だけの単語帳を作りましょう! 作成した単語帳は他のユーザーに公開することができます。 | 単語帳に登録された動詞からボタン1つで活用形を生成することができます。 | 学習が完了すると自動で記録が保存され、1週間分の学習をみえる化することができます。 学習目標を設定して学習を習慣化しましょう! |


## 開発背景
> 単語帳 / AIで作る活用形

私は趣味でスペイン語の学習を始めましたが、初心者の時に最も苦労したところは単語の管理です。
動詞の活用形を暗記するために、全ての活用形をノートにまとめていました。  
単語帳アプリなども活用しましたが、大量の活用形を入力するのに非常に時間がかかっていたので、非常に非効率なものでした。
また、登録された単語しか表示することができなかったので、様々なパターンの活用形を暗記するには適したものではありませんでした。 
ボタン1つで様々な活用形を生成できれば、効率的に学習できると思いました。  

> 学習記録

様々な学習記録アプリを試してきましたが、学習時間を測り忘れたり、学習内容を入力するのが面倒になり結局使わなくなってしまうということがありました。
もう少し気軽に見える化できるアプリがあればいいと思いました。
学習時間ではなく、学習した語数・目標に対する達成率を記録できます。

> 差別化ポイントのまとめ

| 機能 | 他のアプリ | linGuardia |
| :------: | :------: | :------------: |
| 単語帳 | 登録した単語を表示するだけ | ChatGPTを利用し、様々な活用形を表示 |
| 学習記録 | 学習時間、内容を細かく記録 | 語数・目標に対する達成率を自動で記録 |


## スペイン語を知らない方、これから学ぶ方へ...
スペイン語には動詞の活用というものがあります。  
英語で言う三人称単数現在の語尾に(s)をつけるやつです。
しかしスペイン語の場合は、表のように主語によって動詞の語形を変化させる必要が
あり、また不規則なものも多いので
初心者には非常に負担になります。

下記の表は英語のgiveに相当する単語の活用形の一例です。

例)  
(dar: 英語のgiveに相当する単語)
| 主語 | 直説法現在形 | 直説法点過去形 | 直説法線過去形 |
| :------: | :------------: | :------------: | :------: |
| yo(私) | doy | di | daba |
| tú(君) | das | diste | dabas |
| usted(あなた、彼、彼女) | da | dio | daba |
| nosotros(私たち) | damos | dimos | dábamos |
| vosotros(君たち) | dais | dieron | dabais |
| ustedes(あなた達、彼、彼女ら) | dan | dieron | daban |

以上に加え、過去形や未来形など多数の活用形が存在しており、動詞1つにつき80個ほどの活用形があることになります。
ある程度のパターンは決まっていますが、不規則なものは1つずつ覚えていくしかありません。

## 使用技術
> バックエンド  

- Ruby: 3.1.2 (APIモード)
- Ruby on Rails: 7.0.4

> フロントエンド
- TypeScript: 5.2.2
- React: 18.2.0
- Next.JS: 13.4.19
- CSS: MUI

> データベース  
- MySQL

> インフラ(Amazon Web Service)
- ECS
- Route53

> 外部API
- ChatGPT API

## インフラ構成図
<img width="938" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/93c1b653-7a37-40e4-913c-b7491f5f7cbd"> 


## ER図
<img width="550" alt="Captura de pantalla 2024-09-01 a las 10 28 40 p  m" src="https://github.com/user-attachments/assets/812048eb-59b0-4ac2-8c90-2889d91892db">
