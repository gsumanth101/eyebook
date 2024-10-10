import { Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Typography
      variant="h6"
      component="footer"
      sx={{ pt: 3.75, textAlign: { xs: 'center', md: 'right' } }}
    >
      © 2024 .
      <Link
        href="#"
        target="_blank"
        rel="noopener"
        aria-label="Explore ThemeWagon Website"
        sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}
      >
        EyeBook
      </Link>
    </Typography>
  );
};

export default Footer;
