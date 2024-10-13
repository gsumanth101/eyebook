export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: '',
  dashboard: '/dashboard',
};

export const spocPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: '/spoc',
  dashboard: '/dashboard',
};

export const facultyPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: '/faculty',
  dashboard: '/dashboard',
};

export const studentPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: '/student',
  dashboard: '/dashboard',
};

export default {
  indexPage: rootPaths.root,
  // _________________Admin Routes____________________________
  add_university: `${rootPaths.authRoot}/add_university`,
  manage_university: `${rootPaths.authRoot}/manage_university`,
  add_course: `${rootPaths.authRoot}/add_course`,
  manage_course: `${rootPaths.authRoot}/manage_course`,
  course_details: (courseId: string) => `${rootPaths.authRoot}/courses/${courseId}`,
  signin: `${rootPaths.authRoot}/signin`,
  signup: `${rootPaths.authRoot}/signup`,
  dashboard: rootPaths.dashboard,
  profile: `${rootPaths.authRoot}/profile`,
  upload_students: `${rootPaths.authRoot}/upload_students`,

  // _________________SPOC ROutes_______________________________
  spoc_add_university: `${spocPaths.authRoot}/add_university`,
  spoc_manage_university: `${spocPaths.authRoot}/manage_university`,
  spoc_signin: spocPaths.root,
  spoc_signup: `${spocPaths.authRoot}/signup`,
  spoc_dashboard: spocPaths.dashboard,
  spoc_profile: `${spocPaths.authRoot}/profile`,
  spoc_upload_faculty: `${spocPaths.authRoot}/upload_faculties`,

  //______________________Faculty Routes______________________________
  faculty_add_university: `${facultyPaths.authRoot}/add_university`,
  faculty_manage_university: `${facultyPaths.authRoot}/manage_university`,
  faculty_signin: facultyPaths.root,
  faculty_signup: `${facultyPaths.authRoot}/signup`,
  faculty_dashboard: facultyPaths.dashboard,
  faculty_profile: `${facultyPaths.authRoot}/profile`,
  faculty_upload_students: `${facultyPaths.authRoot}/upload_students`,

  // ________________________Student Routes__________________________
  student_add_university: `${studentPaths.authRoot}/add_university`,
  student_manage_university: `${studentPaths.authRoot}/manage_university`,
  student_signin: studentPaths.root,
  student_signup: `${studentPaths.authRoot}/signup`,
  student_dashboard: studentPaths.dashboard,
  student_profile: `${studentPaths.authRoot}/profile`,
  student_upload_students: `${studentPaths.authRoot}/upload_students`,
};
