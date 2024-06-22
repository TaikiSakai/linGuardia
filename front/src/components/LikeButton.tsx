import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, IconButton, Typography, Stack } from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { mutate } from 'swr';

type likeButtonType = {
  like: boolean;
  numberOfLikes: number;
};

const LikeButton = (props: likeButtonType) => {
  const router = useRouter();
  const { uuid } = router.query;
  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const headers = { 'Content-Type': 'application/json' };

  const [isLike, setIsLike] = useState<boolean>(props.like);
  const [likeNumber, setLikeNumber] = useState<number>(props.numberOfLikes);

  const handleLikeState = async () => {
    if (isLike) {
      setIsLike(!isLike);
      setLikeNumber(likeNumber - 1);
    } else {
      setIsLike(!isLike);
      setLikeNumber(likeNumber + 1);
    }

    try {
      const res: AxiosResponse = await axios({
        method: isLike ? 'DELETE' : 'POST',
        url: url + uuid + '/like',
        headers: headers,
        withCredentials: true,
      });
      console.log(res);
      mutate(url + uuid);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        <IconButton onClick={handleLikeState}>
          {isLike ? (
            <StarIcon sx={{ color: '#f0950c', fontSize: 40 }} />
          ) : (
            <StarOutlineIcon sx={{ fontSize: 40 }} />
          )}
        </IconButton>
      </Box>
      <Box>
        <Typography>{likeNumber}</Typography>
      </Box>
    </Stack>
  );
};

export default LikeButton;
