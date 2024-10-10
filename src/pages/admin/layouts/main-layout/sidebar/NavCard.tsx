import Background from 'assets/Background.webp';
// import LogoPro from 'components/icons/LogoPro';
// import { Card, CardContent, Button, Stack } from '@mui/material';
import { Card } from '@mui/material';

const NavCard = () => {
  return (
    <Card
      sx={{
        background: `url(${Background}) no-repeat`,
        width: 238,
      }}
    >
      {/* <CardContent sx={{ p: 3 }}>
        <Stack gap={1} alignItems="center" color="common.white">
          <LogoPro sx={{ fontSize: 48 }} />
          <Button
            variant="contained"
            sx={{
              mt: 3.75,
              px: 5,
              color: 'primary.main',
              bgcolor: 'background.default',
              '&:hover': {
                bgcolor: 'action.hover',
                color: 'common.white',
              },
            }}
          >
            Get Pro
          </Button>
        </Stack>
      </CardContent> */}
    </Card>
  );
};

export default NavCard;
