import { css } from '@emotion/react'
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useRouter } from 'next/router'

const switchCss = css({
  width: 150,
  height: 35,
})

const modalCss = css({
  borderRadius: 5,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: 390,
  minHeight: 400,
})

type currentCardProps = {
  uuid: string
  title: string
  updatedAt: string
  open: boolean
  handleClose: () => void
}

const ModalCard = (props: currentCardProps) => {
  const router = useRouter()

  // mui Linkが通常のリンクとして機能してしまうため、
  // useRouterでspaに対応
  const startFlashcard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    router.push(`/wordcards/${props.uuid}`)
  }

  return (
    <Box>
      <Modal open={props.open} onClose={props.handleClose}>
        <Card css={modalCss}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}
                  >
                    {props.title}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Button onClick={props.handleClose}>close</Button>
                  </Box>
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item sx={{ p: 2 }}>
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      aria-label="Platform"
                    >
                      <ToggleButton css={switchCss} value="face">
                        表面
                      </ToggleButton>
                      <ToggleButton css={switchCss} value="back">
                        裏面
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item sx={{ p: 2 }}>
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      aria-label="Platform"
                    >
                      <ToggleButton css={switchCss} value="face">
                        順番通り
                      </ToggleButton>
                      <ToggleButton css={switchCss} value="back">
                        シャッフル
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Typography>{props.updatedAt}</Typography>
            <Button
              variant="contained"
              sx={{
                width: 300,
              }}
              onClick={startFlashcard}
            >
              START
            </Button>
            <Link href={'wordcards/edit/' + props.uuid}>edit</Link>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  )
}

export default ModalCard
