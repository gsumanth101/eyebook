export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: '',
  dashboard: '/dashboard',
};

export default {
  add_university: `${rootPaths.authRoot}/add_university`,
  manage_university: `${rootPaths.authRoot}/manage_university`,
  signin: rootPaths.root,
  signup: `${rootPaths.authRoot}/signup`,
  dashboard: rootPaths.dashboard,
  profile: `${rootPaths.authRoot}/profile`,
  upload_students: `${rootPaths.authRoot}/upload_students`,
};
