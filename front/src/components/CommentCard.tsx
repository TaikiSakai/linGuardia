import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, IconButton } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useUserState } from '@/hooks/useGlobalState';
import { CommentData } from '@/types/CommentType';

const CommentCard = (props: CommentData) => {
  const router = useRouter();
  const { uuid } = router.query;
  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const [user] = useUserState();
  const headers = { 'Content-Type': 'application/json' };

  const deleteMyself = async () => {
    try {
      const res: AxiosResponse = await axios({
        method: 'DELETE',
        url: url + uuid + '/comments/' + props.id,
        headers: headers,
        withCredentials: true,
      });
      console.log(res);
      mutate(url + uuid + '/comments');
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  return (
    <ListItem
      sx={{ height: 60 }}
      secondaryAction={
        // ログイン中のユーザーIDとコメントのユーザーIDが一致する場合、削除できる
        user.id === props.userId && (
          <IconButton sx={{ p: 0 }} onClick={deleteMyself}>
            <DeleteIcon />
          </IconButton>
        )
      }
    >
      <ListItemAvatar>
        <AccountCircleIcon />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component="span" sx={{ fontWeight: 'bold' }}>
            {props.userName}
          </Typography>
        }
        secondary={props.body}
      />
    </ListItem>
  );
};

export default CommentCard;
