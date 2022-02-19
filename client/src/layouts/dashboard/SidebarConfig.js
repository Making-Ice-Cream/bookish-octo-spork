import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
 import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
// import accountCash from "@iconify/icons-eva/cash-marker"
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
  // console.log("Hello");
const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/admin/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Faculty',
    path :'/admin/user',
    icon : getIcon(personAddFill)
  },
  {
    title: 'Students',
    path: '/admin/Student',
    icon: getIcon(peopleFill)
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  {
    title: 'blog',
    path: '/admin/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title :'Pending Dues',
    path : "/admin/products",
    icon : getIcon(alertTriangleFill)
  },
  {
    title : "Fee Submission",
    path :"/fee_payment_manually",
    icon : getIcon(lockFill)
  }
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
  
];

export default sidebarConfig;
