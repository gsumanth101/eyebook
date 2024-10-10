/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('pages/admin/layouts/main-layout'));
const SpocLayout = lazy(() => import('pages/spoc/layouts/main-layout')); // Import SpocLayout
const AuthLayout = lazy(() => import('pages/admin/layouts/auth-layout'));
const AdminDashboard = lazy(() => import('pages/admin/AdminDashboard'));
const SpocDashboard = lazy(() => import('pages/spoc/SpocDashboard')); // Import SpocDashboard
const SignIn = lazy(() => import('pages/admin/SignIn'));
// const SignUp = lazy(() => import('pages/authentication/SignUp'));
const Page404 = lazy(() => import('pages/errors/Page404'));

import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';
import Profile from 'pages/admin/Profile';
import AddUniversity from 'pages/admin/AddUniversity';
import ManageUniversity from 'pages/admin/ManageUniversity';
import BulkUpload from 'pages/admin/BulkUpload';
import { useAuth } from 'providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return null;
};

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
            element: <AdminDashboard />,
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
        path: '/spoc',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: '/spoc/dashboard',
        element: (
          <SpocLayout>
            <Suspense fallback={<PageLoader />}>
              <SpocDashboard />
            </Suspense>
          </SpocLayout>
        ),
      },
      {
        path: '/spoc/add-university',
        element: (
          <SpocLayout>
            <Suspense fallback={<PageLoader />}>
              <AddUniversity />
            </Suspense>
          </SpocLayout>
        ),
      },
      {
        path: '/spoc/manage-university',
        element: (
          <SpocLayout>
            <Suspense fallback={<PageLoader />}>
              <ManageUniversity />
            </Suspense>
          </SpocLayout>
        ),
      },
      {
        path: '/spoc/upload-students',
        element: (
          <SpocLayout>
            <Suspense fallback={<PageLoader />}>
              <BulkUpload />
            </Suspense>
          </SpocLayout>
        ),
      },
      {
        path: '/spoc/profile',
        element: (
          <SpocLayout>
            <Suspense fallback={<PageLoader />}>
              <Profile />
            </Suspense>
          </SpocLayout>
        ),
      },
      {
        path: '/logout',
        element: <Logout />, // Handle logout route
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