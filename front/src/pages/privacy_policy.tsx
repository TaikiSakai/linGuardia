import { css } from '@emotion/react';
import { Box, Button, Card, CardContent, Container, Typography, Grid, Stack } from '@mui/material';
import type { NextPage } from 'next';
import Link from 'next/link';
import { styles } from '@/styles';

const textStyle = css({
  component: 'p',
  fontSize: '15px',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const PrivacyPolicy: NextPage = () => {
  return (
    <Box css={styles.baseLayout}>
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            pt: 2,
          }}
          spacing={2}
        >
          <Grid container item>
            <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
              <Typography css={styles.pageTitle}>プライバシーポリシー</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid container item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                      linGuardia（以下，「本サイト」といいます。）は，
                      本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。
                      における，ユーザーの個人情報の取扱いについて，
                      以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます
                    </Typography>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>第1条（個人情報）</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                      「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，
                      生存する個人に関する情報であって，当該情報に含まれる氏名，
                      生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，
                      指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                    </Typography>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>第2条（個人情報の収集方法）</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                      本サイトは，ユーザーが利用登録をする際に氏名，メールアドレスなどの個人情報をお尋ねすることがあります。
                    </Typography>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>
                        第3条（個人情報を収集・利用する目的）
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        1. 本サイトサービスの提供・運営のため
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        2. ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        3.
                        ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び本サイトが提供する他のサービスの案内のメールを送付するため
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        4. メンテナンス，重要なお知らせなど必要に応じたご連絡のため
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        5.
                        利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        6.
                        ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        7. 上記の利用目的に付随する目的
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>第4条（利用目的の変更）</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        1.
                        本サイトは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，
                        個人情報の利用目的を変更するものとします。
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        2.
                        利用目的の変更を行った場合には，変更後の目的について，本サイト所定の方法により，
                        ユーザーに通知し，または本ウェブサイト上に公表するものとします。
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>第5条（個人情報の第三者提供）</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        1.
                        本サイトは，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，
                        第三者に個人情報を提供することはありません。
                        ただし，個人情報保護法その他の法令で認められる場合を除きます。
                      </Typography>
                      <Stack spacing={2} sx={{ pl: { xs: 3, md: 10 } }}>
                        <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                          1.
                          本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合
                        </Typography>
                        <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                          2. 本サイトの業務の適正な実施に著しい支障を及ぼすおそれがある場合
                        </Typography>
                        <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                          3. その他法令に違反することとなる場合
                        </Typography>
                      </Stack>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        2.
                        前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，
                        原則として開示いたしません。
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>第6条（個人情報の開示）</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        1.
                        本サイトは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，
                        個人情報の利用目的を変更するものとします。
                      </Typography>
                      <Stack spacing={2} sx={{ pl: { xs: 3, md: 10 } }}>
                        <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                          1.
                          本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合
                        </Typography>
                        <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                          2. 本サイトの業務の適正な実施に著しい支障を及ぼすおそれがある場合
                        </Typography>
                        <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                          3. その他法令に違反することとなる場合
                        </Typography>
                      </Stack>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        2.
                        前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>
                        第7条（個人情報の訂正および削除）
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        1. ユーザーは，本サイトの保有する自己の個人情報が誤った情報である場合には，
                        本サイトが定める手続きにより，本サイトに対して個人情報の訂正，追加または削除
                        以下，「訂正等」といいます。）を請求することができます。
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        2.
                        本サイトは，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，
                        遅滞なく，当該個人情報の訂正等を行うものとします。
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        3.
                        本サイトは，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>第8条（個人情報の利用停止等）</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        1.
                        本サイトは，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，
                        または不正の手段により取得されたものであるという理由により，
                        その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，
                        遅滞なく必要な調査を行います。
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        2. 前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，
                        遅滞なく，当該個人情報の利用停止等を行います。
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        3. 本サイトは，前項の規定に基づき利用停止等を行った場合，
                        または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        4.
                        前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，
                        ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>
                        第9条（プライバシーポリシーの変更）
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        1. 本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，
                        ユーザーに通知することなく，変更することができるものとします。
                      </Typography>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        2. 本サイトが別途定める場合を除いて，変更後のプライバシーポリシーは，
                        本ウェブサイトに掲載したときから効力を生じるものとします。
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid container item>
                    <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                      <Typography css={styles.subTitle}>第10条（お問い合わせ窓口）</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ justifyContent: 'left', textAlign: 'left' }}>
                    <Stack spacing={2}>
                      <Typography css={textStyle} sx={{ px: { xs: 2, md: 5 } }}>
                        本ポリシーに関するお問い合わせは、お問い合わせフォームまでお願いいたします。
                      </Typography>
                      <Link href={'https://forms.gle/3NckAAHvVdJjzfzw5'}>
                        <Button variant="outlined" sx={{ mx: 1, textTransform: 'None' }}>
                          お問い合わせフォーム
                        </Button>
                      </Link>
                    </Stack>
                  </Grid>
                  <Grid container item sx={{ justifyContent: 'right', textAlign: 'right' }}>
                    <Box>
                      <Typography css={textStyle}>以上</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
