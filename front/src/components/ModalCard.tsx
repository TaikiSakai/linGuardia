import { css } from '@emotion/react'
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material'
import Modal from '@mui/material/Modal'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const switchCss = css({
  width: 150,
  height: 35,
})

type modalProps = {
  uuid: string
  title: string
  updatedAt: string
  open: boolean
  handleClose: () => void
}

const ModalCard = (props: modalProps) => {
  return (
    <Box>
      <Modal open={props.open} onClose={props.handleClose}>
        <Card
          sx={{
            borderRadius: 5,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            width: 400,
            minHeight: 300,
          }}
        >
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
            <Button href={'/wordcards/cards/' + props.uuid}>
              {props.uuid}
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  )
}

export default ModalCard
