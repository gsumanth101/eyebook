import { SvgIconProps } from '@mui/material';
import paths, { rootPaths } from './paths';
import DashboardIcon from 'components/icons/DashboardIcon';

export interface MenuItem {
  id: number;
  name: string;
  pathName: string;
  path?: string;
  active?: boolean;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
  items?: MenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: rootPaths.dashboard,
    pathName: 'dashboard',
    svgIcon: DashboardIcon,
    active: true,
  },
  {
    id: 9,
    name: 'Universities',
    pathName: 'universities',
    icon: 'material-symbols:security-rounded',
    active: true,
    items: [
      {
        id: 10,
        name: 'Add University',
        path: paths.add_university,
        pathName: 'add_university',
        active: true,
      },
      {
        id: 11,
        name: 'Manage Universities',
        path: paths.manage_university,
        pathName: 'manage_university',
        active: true,
      },
    ],
  },
  // {
  //   id: 2,
  //   name: 'Leaderboard',
  //   path: '#!',
  //   pathName: 'leaderboard',
  //   icon: 'ri:bar-chart-line',
  // },
  // {
  //   id: 3,
  //   name: 'Order',
  //   path: '#!',
  //   pathName: 'order',
  //   icon: 'ph:shopping-cart-light',
  // },
  // {
  //   id: 4,
  //   name: 'Courses',
  //   path: '#!',
  //   pathName: 'courses',
  //   icon: 'mdi:shopping-outline',
  // },
  {
    id: 4,
    name: 'Courses',
    pathName: 'courses',
    icon: 'mdi:shopping-outline',
    active: true,
    items: [
      {
        id: 2,
        name: 'Add Course',
        // path: paths.course,
        pathName: 'add_course',
        active: true,
      },
      {
        id: 3,
        name: 'Manage Universities',
        // path: paths.signup,
        pathName: 'manage_university',
        active: true,
      },
    ],
  },
  {
    id: 5,
    name: 'Students',
    pathName: 'students',
    icon: 'ph:chart-line',
    active: true,
    items: [
      {
        id: 6,
        name: 'Upload Students',
        path: paths.upload_students,
        pathName: 'upload_students',
        active: true,
      },
      {
        id: 7,
        name: 'Add Students',
        // path: paths.signup,
        pathName: 'manage_university',
        active: true,
      },
    ],
  },
  // {
  //   id: 5,
  //   name: 'Sales Report',
  //   path: '#!',
  //   pathName: 'sales-report',
  //   icon: 'ph:chart-line',
  // },
  // {
  //   id: 6,
  //   name: 'Messages',
  //   path: '#!',
  //   pathName: 'messages',
  //   icon: 'mdi:message-processing-outline',
  // },
  // {
  //   id: 7,
  //   name: 'Settings',
  //   path: '#!',
  //   pathName: 'settings',
  //   icon: 'fluent:settings-24-regular',
  //   active: true,
  // },
  {
    id: 8,
    name: 'Logout',
    path: '/logout', // Update the path to /logout
    pathName: 'logout',
    icon: 'humbleicons:logout',
    active: true,
  },
];

export default sitemap;
