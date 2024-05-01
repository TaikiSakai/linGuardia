import { Box, Card, CardContent, Typography, Grid } from '@mui/material'
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
    <Box>
      <Box onClick={handleOpen}>
        <Card sx={{ borderRadius: 5, height: 100 }}>
          <CardContent>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={6} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component="h3"
                    sx={{
                      mb: 3,
                      minHeight: 50,
                      fontSize: 20,
                      color: '#000040',
                      fontWeight: 'bold',
                      lineHeight: 1.5,
                    }}
                  >
                    {props.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 12 }}>
                    {props.updatedAt}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <ModalCard
        open={open}
        handleClose={handleClose}
        uuid={props.uuid}
        title={props.title}
        updatedAt={props.updatedAt}
      />
    </Box>
  )
}

export default Wordcard
