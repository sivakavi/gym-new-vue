
export default [
  {
    path: '/',
    component: () => import('layouts/auth/auth'),
    children: [
      { path: '', component: () => import('pages/auth/login') }
    ]
  },
  
  {
    path: '/admin',
    component: () => import('layouts/default/adminLayout'),
    children: [
      { path: 'dashboard', component: () => import('pages/admin/dashboard') },
      { path: 'stafflist', component: () => import('pages/admin/staffList') },
      { path: 'createstaff', component: () => import('pages/admin/createStaff') },
      { path: 'staffprofile', component: () => import('pages/admin/staffProfile') },
      { path: 'customer-list', component: () => import('pages/admin/customerList') },
      { path: 'create-customer', component: () => import('pages/admin/createCustomer') },
      { path: 'clientprofile', component: () => import('pages/admin/clientProfile') },
      { path: 'addgsttype', component: () => import('pages/admin/addGSTType') },
      { path: 'subscriptoin-list', component: () => import('pages/admin/subscriptionList') },
      { path: 'create-subscription', component: () => import('pages/admin/addSubscription') },
    ]
  },
  
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
