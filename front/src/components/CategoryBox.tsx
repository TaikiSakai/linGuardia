import { css } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Stack, Typography, IconButton } from '@mui/material';
import { CategoryData } from '@/types/CategoryType';

const boxShape = css({
  display: 'inline-flex',
  maxWidth: '100%',
  borderRadius: '100px',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e6f2ff',
  border: '2px solid',
  borderColor: '#657ef7',
  padding: '0 10px',
  margin: '5px 1px',
});

type CategoryBoxData = CategoryData & {
  deletable: boolean;
  deleteMyself: (valueId: number) => void;
};

const CategoryBox = (props: CategoryBoxData) => {
  const label = props.name;
  const deleteMyself = props.deleteMyself;

  return (
    <Box css={boxShape}>
      <Box>
        <Typography sx={{ fontSize: '15px', color: '#657ef7' }}>{label}</Typography>
      </Box>
      {props.deletable && (
        <IconButton
          sx={{
            mx: '1px',
            width: '20px',
            height: '20px',
            alignItems: 'center',
          }}
          onClick={() => { deleteMyself }}
        >
          <ClearIcon sx={{ fontSize: '15px' }} />
        </IconButton>
      )}
    </Box>
  );
};

export default CategoryBox;
