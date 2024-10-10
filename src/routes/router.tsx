/* eslint-disable prettier/prettier */
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const AdminDashboard = lazy(() => import('pages/admin/AdminDashboard'));
const SignIn = lazy(() => import('pages/admin/SignIn'));
// const SignUp = lazy(() => import('pages/authentication/SignUp'));
const Page404 = lazy(() => import('pages/errors/Page404'));

import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';
import Profile from 'pages/admin/Profile';
import AddUniversity from 'pages/admin/AddUniversity';
import ManageUniversity from 'pages/admin/ManageUniversity'
import BulkUpload from 'pages/admin/BulkUpload';

export const routes = [
  {
    path: rootPaths.root,
    element: (
      <Suspense fallback={<Progress />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<Progress />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.dashboard,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          </MainLayout>
        ),
      },
      {
        path: rootPaths.authRoot,
        element: (
          <MainLayout>
            <AuthLayout />
          </MainLayout>
        ),
        children: [
          {
            path: paths.dashboard,
            element: <AdminDashboard/>,
          },
          {
            path: paths.add_university,
            element: <AddUniversity />,
          },
          {
            path: paths.manage_university,
            element: <ManageUniversity />,
          },
          {
            path: paths.upload_students,
            element: <BulkUpload />,
          },
          {
            path: paths.profile,
            element: <Profile />,
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/' });

export default router;