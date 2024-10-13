import { Box, List, Stack, Toolbar } from '@mui/material';
import sitemap from 'routes/adminSitemap';
import LogoHeader from './LogoHeader';
import NavCard from './NavCard';
import NavItem from './NavItem';

const NavItems = () => {
  return (
    <List
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 1,
        '& *': {
          fontSize: '0.875rem !important', // Medium font size for nav items (14px)
        },
      }}
    >
      {sitemap.map((navItem) => (
        <NavItem key={navItem.id} item={navItem} />
      ))}
    </List>
  );
};

const SidebarContent = () => {
  return (
    <>
      <Toolbar disableGutters>
        <LogoHeader />
      </Toolbar>

      <Box
        sx={(theme) => ({
          px: 2, // Reduce padding
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          overflowY: 'auto',
          '& *': {
            fontSize: '0.875rem !important', // Medium font size for the entire sidebar (14px)
          },
        })}
      >
        <Stack gap={2} py={1}>
          <NavItems />
          <NavCard />
        </Stack>
      </Box>
    </>
  );
};

export default SidebarContent;
