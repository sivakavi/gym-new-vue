
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
      { path: 'customer-list', component: () => import('pages/admin/customerList') },
      { path: 'create-customer', component: () => import('pages/admin/createCustomer') },
      { path: 'customer/:id', component: () => import('pages/admin/customerProfile') },
      { path: 'subscriptoin-list', component: () => import('pages/admin/subscriptionList') },
      { path: 'create-subscription', component: () => import('pages/admin/addSubscription') },
    ]
  },
  
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
