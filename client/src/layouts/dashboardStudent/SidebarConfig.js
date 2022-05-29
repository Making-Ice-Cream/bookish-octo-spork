// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/student/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'classes',
    path: '/student/class',
    icon: getIcon('eva:people-fill')
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill')
  // },
  {
    title: 'Test Score',
    path: '/student/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'fee Status',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  }
  
];

export default sidebarConfig;
