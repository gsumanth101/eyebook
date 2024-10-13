import { SvgIconProps } from '@mui/material';
import paths, { spocPaths } from './paths';
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

const spocSitemap: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: spocPaths.dashboard,
    pathName: 'dashboard',
    svgIcon: DashboardIcon,
    active: true,
  },
  // {
  //   id: 9,
  //   name: 'Universities',
  //   pathName: 'universities',
  //   icon: 'material-symbols:security-rounded',
  //   active: true,
  //   items: [
  //     {
  //       id: 10,
  //       name: 'Add University',
  //       path: paths.spoc_add_university,
  //       pathName: 'add_university',
  //       active: true,
  //     },
  //     {
  //       id: 11,
  //       name: 'Manage Universities',
  //       path: paths.spoc_manage_university,
  //       pathName: 'manage_university',
  //       active: true,
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   name: 'Courses',
  //   pathName: 'courses',
  //   icon: 'mdi:shopping-outline',
  //   active: true,
  //   items: [
  //     {
  //       id: 2,
  //       name: 'Add Course',
  //       path: paths.add_course,
  //       pathName: 'add_course',
  //       active: true,
  //     },
  //     {
  //       id: 3,
  //       name: 'Manage Courses',
  //       path: paths.manage_course,
  //       pathName: 'manage_course',
  //       active: true,
  //     },
  //   ],
  // },
  {
    id: 5,
    name: 'Faculties',
    pathName: 'faculties',
    icon: 'ph:chart-line',
    active: true,
    items: [
      {
        id: 6,
        name: 'Upload Faculties',
        path: paths.spoc_upload_faculty,
        pathName: 'upload_Faculty',
        active: true,
      },
      // {
      //   id: 7,
      //   name: 'Add Students',
      //   pathName: 'manage_university',
      //   active: true,
      // },
    ],
  },
  {
    id: 19,
    name: 'profile',
    path: paths.spoc_profile,
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

export default spocSitemap;
