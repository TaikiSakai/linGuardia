import { css } from '@emotion/react'
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import { useRouter } from 'next/router'

const modalCss = css({
  borderRadius: 5,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: 390,
  minHeight: 400,
})

type currentVocabularyProps = {
  id: number
  word: string
  meaning: string
  open: boolean
  handleClose: () => void
}

const EditModal = (props: currentVocabularyProps) => {
  return (
    <Box>
      <Modal open={props.open} onClose={props.handleClose}>
        <Card css={modalCss}>
          <CardContent>
            <Grid container>
              <Grid item>
                <TextField></TextField>
              </Grid>
              <Grid item>
                <TextField></TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  )
}

export default EditModal
