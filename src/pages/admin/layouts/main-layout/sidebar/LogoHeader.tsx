import { Link, Stack, SxProps, Typography } from '@mui/material';
import Logo from 'components/icons/Logo';
import { rootPaths } from 'routes/paths';

interface LogoHeaderProps {
  sx?: SxProps;
}

const LogoHeader = (props: LogoHeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      columnGap={2} // Adjust the gap between logo and text
      component={Link}
      href={rootPaths.root}
      {...props}
    >
      <Logo sx={{ fontSize: 50 }} /> {/* Reduce the logo size */}
      <Typography variant="h6" color="primary.darker">
        EyeBook
      </Typography>
    </Stack>
  );
};

export default LogoHeader;
