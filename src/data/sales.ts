import { SvgIconProps } from '@mui/material';
// import OrderIcon from 'components/icons/OrderIcon';
// import SalesIcon from 'components/icons/SalesIcon';

export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  svgIcon?: React.ComponentType<SvgIconProps>;
  icon?: string;
}

export const sales: SaleItem[] = [
  {
    label: 'Universities',
    value: '0',
    growth: '+0%',
    bgColor: 'secondary.lighter',
    iconBackgroundColor: 'secondary.main',
    icon: 'material-symbols:school',
  },
  {
    label: 'Students',
    value: '0',
    growth: '+0%',
    bgColor: 'primary.lighter',
    iconBackgroundColor: 'primary.main',
    icon: 'material-symbols:person',
  },
  {
    label: 'SPOCs',
    value: '0',
    growth: '+0%',
    bgColor: 'warning.lighter',
    iconBackgroundColor: 'warning.main',
    icon: 'material-symbols:supervisor-account',
  },
  {
    label: 'Courses',
    value: '0',
    growth: '+0%',
    bgColor: 'success.lighter',
    iconBackgroundColor: 'success.main',
    icon: 'material-symbols:book',
  },
];
