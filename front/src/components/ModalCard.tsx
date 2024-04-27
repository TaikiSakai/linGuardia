import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material'
import Modal from '@mui/material/Modal'

type modalProps = {
  uuid: string
  title: string
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
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {props.title}
                  </Typography>
                </Grid>
                <Grid xs={6} md={6}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Button onClick={props.handleClose}>close</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Button>{props.uuid}</Button>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  )
}

export default ModalCard
