import { Link } from 'react-router-dom';
import ForgetPassword from '../Screens/Authentictaion/ForgetPassword.jsx';
import Login from '../Screens/Authentictaion/Login.jsx';
import ResetPassword from '../Screens/Authentictaion/ResetPassword.jsx';
import ResetSuccess from '../Screens/Authentictaion/ResetSuccess.jsx';
import Dashboard from '../Screens/Dashboard/index.jsx';
import UserManagement from '../Screens/UserManagement/index.jsx';
import EventCategories from '../Screens/EventManagement/EventCategories/index.jsx';
import AllEvents from '../Screens/EventManagement/AllEvents/index.jsx';
import PostApprovals from '../Screens/PostApprovals/index.jsx';
import dash_black from '../assets/dash-black.svg';
import dash_red from '../assets/dash-red.svg';
import event_black from '../assets/event-black.svg';
import event_red from '../assets/event-red.svg';
import post_black from '../assets/post-black.svg';
import post_red from '../assets/post-red.svg';
import reports_black from '../assets/reports-black.svg';
import reports_red from '../assets/reports-red.svg';
import user_black from '../assets/user-black.svg';
import user_red from '../assets/user-red.svg';
import UserDetails from '../Screens/UserManagement/View/index.jsx';
import AddEdit from '../Screens/EventManagement/AllEvents/AddEdit/index.jsx';
import View from '../Screens/EventManagement/AllEvents/View.jsx';
import PostApprovalView from '../Screens/PostApprovals/View.jsx';
import UserDataReport from '../Screens/Reports/index.jsx';
import UserProfile from '../Screens/UserProfile/index.jsx';
import Notification from '../Screens/Notifications/index.jsx';

export const routes = [
  {
    key: 0,
    path: '/',
    label: '',
    privetRoute: false,
    isSubRoute: false,
    title: 'Login',
    component: Login,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: '/forget-password',
    label: '',
    privetRoute: false,
    isSubRoute: false,
    title: 'Forget Password',
    component: ForgetPassword,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: '/reset-password',
    label: '',
    privetRoute: false,
    isSubRoute: false,
    title: 'Reset Password',
    component: ResetPassword,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: '/reset-success',
    label: '',
    privetRoute: false,
    isSubRoute: false,
    title: 'Reset Success',
    component: ResetSuccess,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: '/dashboard',
    label: 'Dashboard',
    privetRoute: true,
    isSubRoute: false,
    title: 'Dashboard',
    component: Dashboard,
    menubar: true,
    permission: true,
    subMenu: false,
    icon: dash_black,
    iconActive: dash_red,
    breadCrumbs: [
      {
        title: <div className="text-text_grey font-inter text-sm font-normal">Welcome</div>
      }
    ]
  },
  {
    key: 0,
    path: '/user-management',
    label: 'User Management',
    privetRoute: true,
    isSubRoute: false,
    title: 'User Management',
    component: UserManagement,
    menubar: true,
    permission: true,
    subMenu: false,
    icon: user_black,
    iconActive: user_red,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            User Management
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: 'user-management/view/:id',
    label: 'User Details',
    privetRoute: true,
    isSubRoute: false,
    title: 'User Details',
    component: UserDetails,
    menubar: false,
    permission: true,
    subMenu: false,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      { title: <Link to="/user-management">User Management</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            User Details
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: '/event-management',
    label: 'Event Management',
    privetRoute: true,
    isSubRoute: false,
    title: 'Event Management',
    menubar: true,
    permission: true,
    icon: event_black,
    iconActive: event_red,
    subMenu: [
      {
        key: 1,
        path: '/event-management/categories',
        label: 'Event Categories',
        privetRoute: true,
        isSubRoute: false,
        title: 'Event Categories',
        component: EventCategories,
        breadCrumbs: [
          { title: <Link to="/dashboard"> Dashboard</Link> },
          {
            title: (
              <Link to="#" className="font-semibold">
                Event Categories
              </Link>
            )
          }
        ]
      },
      {
        key: 2,
        path: '/event-management/all',
        label: 'All Events',
        privetRoute: true,
        isSubRoute: false,
        title: 'All Events',
        component: AllEvents,
        breadCrumbs: [
          { title: <Link to="/dashboard"> Dashboard</Link> },
          {
            title: (
              <Link to="#" className="font-semibold">
                All Events
              </Link>
            )
          }
        ]
      }
    ]
  },
  {
    key: 0,
    path: 'event-management/all/add',
    label: 'Add Event',
    privetRoute: true,
    isSubRoute: false,
    title: 'All Event',
    component: AddEdit,
    menubar: false,
    permission: true,
    subMenu: false,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      { title: <Link to="/event-management/all">All Events</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            Add Event
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: 'event-management/all/edit/:id',
    label: 'Edit Event',
    privetRoute: true,
    isSubRoute: false,
    title: 'Edit Event',
    component: AddEdit,
    menubar: false,
    permission: true,
    subMenu: false,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      { title: <Link to="/event-management/all">All Events</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            Edit Event
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: 'event-management/all/view/:id',
    label: 'Event Details',
    privetRoute: true,
    isSubRoute: false,
    title: 'Event Details',
    component: View,
    menubar: false,
    permission: true,
    subMenu: false,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      { title: <Link to="event-management/all">All Events</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            Event Details
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: '/post-approval',
    label: 'Posts Approval',
    privetRoute: true,
    isSubRoute: false,
    title: 'Posts Approval',
    component: PostApprovals,
    menubar: true,
    permission: true,
    subMenu: false,
    icon: post_black,
    iconActive: post_red,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            Posts Approval
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: 'post-approval/view/:id',
    label: 'Post Details',
    privetRoute: true,
    isSubRoute: false,
    title: 'Post Details',
    component: PostApprovalView,
    menubar: false,
    permission: true,
    subMenu: false,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      { title: <Link to="/post-approval">Posts Approval</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            Post Details
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: '/reports',
    label: 'Reports',
    privetRoute: true,
    isSubRoute: false,
    title: 'Reports',
    component: UserDataReport,
    menubar: true,
    permission: true,
    subMenu: false,
    icon: reports_black,
    iconActive: reports_red,
    breadCrumbs: [
      { title: <Link to="/dashboard"> Dashboard</Link> },
      {
        title: (
          <Link to="#" className="font-semibold">
            Reports
          </Link>
        )
      }
    ]
  },
  {
    key: 0,
    path: '/user-profile',
    label: 'Account Settings',
    privetRoute: true,
    isSubRoute: false,
    component: UserProfile,
    menubar: false,
    permission: true,
    breadCrumbs: [{ title: <Link to="/dashboard"> Dashboard</Link> }]
  },
  {
    key: 0,
    path: '/notification',
    label: 'Notifications',
    privetRoute: true,
    isSubRoute: false,
    component: Notification,
    menubar: false,
    permission: true,
    breadCrumbs: [{ title: <Link to="/dashboard"> Dashboard</Link> }]
  }
];
