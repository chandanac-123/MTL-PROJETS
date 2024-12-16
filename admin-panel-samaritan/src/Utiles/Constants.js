import dummy from '../assets/dummy.svg';
export const userList = [
  { value: 'all', label: 'All Users' },
  { value: 'active', label: 'Active Users' },
  { value: 'inactive', label: 'Inactive Users' },
  { value: 'blocked', label: 'Blocked Users' },
  { value: 'deleted', label: 'Deleted Users' },
];

export const statusList = [
  { value: '', label: 'All Status' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'expired', label: 'Expired' }
];

export const rowsperpage = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' }
];

export const dummyData = [
  {
    id: 11,
    name: 'John Doe',
    username: 'johndoe123',
    eventName: 'Pashan Lake Half Marathon',
    event: 'MARATHON',
    date: 'FRI 09 Feb | 01 - 02 PM',
    location: 'Gorai Beach Mumbai, Maharashtra',
    status: 'Upcoming',
    postDate: '18 Jul 2023',
    profile: dummy,
    email: 'anilsharma@gmail.com',
    phone: '+91 87452 24512',
    created_On: '05 Mar 2023',
    badge: 'Global Hero'
  },
  {
    id: 12,
    name: 'Devid',
    username: 'devid123',
    eventName: 'Social work day',
    event: 'TREE PLANTATION',
    date: 'FRI 09 Feb | 01 - 02 PM',
    location: 'Virjanand Marg, Vikaspuri, Delhi, India',
    status: 'Expired',
    postDate: '18 Jul 2023',
    profile: dummy,
    email: 'meenakshig123@gmail.com',
    phone: '+91 87452 24512',
    created_On: '05 Mar 2023',
    badge: 'Visionary Leader'
  },
  {
    id: 13,
    name: 'Quil',
    username: 'johndoe_123',
    eventName: 'Social work day',
    event: 'VOLUNTEER',
    date: 'FRI 09 Feb | 01 - 02 PM',
    location: 'Pali Hill, Mumbai, India',
    status: 'Upcoming',
    postDate: '18 Jul 2023',
    profile: dummy,
    email: 'sharansony23@gmail.com',
    phone: '+91 87452 24512',
    created_On: '05 Mar 2023',
    badge: 'Inspiration Icon'
  }
];
