import { forwardRef } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

const BoxModal = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={style} ref={ref} {...props}>
      {props.children}
    </Box>
  )
});

export default BoxModal;