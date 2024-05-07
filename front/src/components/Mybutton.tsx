import { Button } from '@mui/material';

type buttonProps = {
  label: string;
};

const MyButton = (props: buttonProps) => {
  return (
    <Button
      sx={{
        textTransform: 'none',
        fontSize: 16,
        borderRadius: 2,
        boxShadow: 'none',
      }}
    >
      {props.label}
    </Button>
  );
};

export default MyButton;
