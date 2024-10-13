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

const adminSitemap: MenuItem[] = [
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
        path: paths.add_course,
        pathName: 'add_course',
        active: true,
      },
      {
        id: 3,
        name: 'Manage Courses',
        path: paths.manage_course,
        pathName: 'manage_course',
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
        pathName: 'manage_university',
        active: true,
      },
    ],
  },
  {
    id: 9,
    name: 'Profile',
    path: paths.profile,
    pathName: 'profile',
    svgIcon: DashboardIcon,
    active: true,
  },
  {
    id: 8,
    name: 'Logout',
    path: '/logout',
    pathName: 'logout',
    icon: 'humbleicons:logout',
    active: true,
  },
];

export default adminSitemap;
