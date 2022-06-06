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
  
  {
    title: 'Test Score',
    path: '/student/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'fee Status',
    path: '/student/feeStatus',
    icon: getIcon('eva:lock-fill')
  }
  
];

export default sidebarConfig;
