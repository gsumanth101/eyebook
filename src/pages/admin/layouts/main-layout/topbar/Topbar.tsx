import { AppBar, IconButton, Stack, Toolbar } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
// import Search from 'components/common/Search';
import ElevationScroll from './ElevationScroll';
// import AccountDropdown from './AccountDropdown';

interface TopbarProps {
  drawerWidth: number;
  onHandleDrawerToggle: () => void;
}

const Topbar = ({ drawerWidth, onHandleDrawerToggle }: TopbarProps) => {
  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: '50px', // Adjust the height here
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 5 },
            minHeight: '50px', // Adjust the height here
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            columnGap={{ xs: 1, sm: 2 }}
            sx={{ display: { lg: 'none' } }}
          >
            <IconButton color="inherit" aria-label="open drawer" onClick={onHandleDrawerToggle}>
              <IconifyIcon icon="mdi:hamburger-menu" sx={{ fontSize: { xs: 24, sm: 32 } }} />
            </IconButton>

            <IconButton aria-label="search-icon" sx={{ display: { md: 'none' } }}>
              <IconifyIcon
                icon="gravity-ui:magnifier"
                sx={{ color: 'primary.main', fontSize: { xs: 24, sm: 32 } }}
              />
            </IconButton>
          </Stack>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={{ xs: 1, sm: 2, xl: 5.25 }}
            width={1}
          >
            {/* <Search
              sx={{
                display: { xs: 'none', md: 'block' },
                minWidth: 300,
                maxWidth: 550,
              }}
            />
            <AccountDropdown /> */}
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Topbar;
