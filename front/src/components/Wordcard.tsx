import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material'
import { useState } from 'react'
import ModalCard from './ModalCard'

type wordcardProps = {
  uuid: string
  title: string
  updatedAt: string
}

const Wordcard = (props: wordcardProps) => {
  const [open, setModalOpen] = useState<boolean>(false)
  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  return (
    <Card sx={{ borderRadius: 5, height: 100 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={6} md={6}>
            <Typography
              component="h3"
              sx={{
                mb: 3,
                minHeight: 50,
                fontSize: 15,
                fontWeight: 'bold',
                lineHeight: 1.5,
              }}
            >
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Box>
                  <Typography sx={{ fontSize: 12 }}>
                    {props.updatedAt}
                  </Typography>
                </Box>
                <Button onClick={handleOpen}>modal</Button>
                <ModalCard
                  open={open}
                  handleClose={handleClose}
                  uuid={props.uuid}
                  title={props.title}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Button>編集</Button>
                  <Button>削除</Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Wordcard
