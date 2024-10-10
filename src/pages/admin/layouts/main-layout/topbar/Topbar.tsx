import { AppBar, IconButton, Link, Stack, Toolbar } from '@mui/material';
import { rootPaths } from 'routes/paths';
import Logo from 'components/icons/Logo';
import IconifyIcon from 'components/base/IconifyIcon';
import ElevationScroll from './ElevationScroll';
import AccountDropdown from './AccountDropdown';

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
          ml: { lg: `${drawerWidth}px` },
          height: '70px', // Decrease the height of the topbar
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 5 },
            minHeight: '60px', // Decrease the height of the toolbar
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            columnGap={{ xs: 1, sm: 2 }}
            sx={{ display: { lg: 'none' } }}
          >
            <Link href={rootPaths.root}>
              <IconButton color="inherit" aria-label="logo">
                <Logo sx={{ fontSize: 30 }} />
              </IconButton>
            </Link>

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
            <AccountDropdown />
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Topbar;
