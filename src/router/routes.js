
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
      { path: 'edit-customer/:id', component: () => import('pages/admin/editCustomer') },
      { path: 'customer/:id', component: () => import('pages/admin/customerProfile') },
      { path: 'subscriptoin-list', component: () => import('pages/admin/subscriptionList') },
      { path: 'create-subscription', component: () => import('pages/admin/addSubscription') },
      { path: 'customer-report', component: () => import('pages/admin/customerReport') },
      { path: 'payment-report', component: () => import('pages/admin/paymentReport') },
      { path: 'upcoming-expiration', component: () => import('pages/admin/upcomingExpiration') },
      { path: 'payment-pending', component: () => import('pages/admin/paymentPending') },
    ]
  },

  {
    path: '/staff',
    component: () => import('layouts/default/staffLayout'),
    children: [
      { path: 'dashboard', component: () => import('pages/staff/dashboard') },
      { path: 'customer-list', component: () => import('pages/staff/customerList') },
      { path: 'create-customer', component: () => import('pages/staff/createCustomer') },
      { path: 'edit-customer/:id', component: () => import('pages/staff/editCustomer') },
      { path: 'customer/:id', component: () => import('pages/staff/customerProfile') },
      { path: 'subscriptoin-list', component: () => import('pages/staff/subscriptionList') },
      { path: 'customer-report', component: () => import('pages/staff/customerReport') },
      { path: 'payment-report', component: () => import('pages/staff/paymentReport') },
      { path: 'upcoming-expiration', component: () => import('pages/staff/upcomingExpiration') },
      { path: 'payment-pending', component: () => import('pages/staff/paymentPending') },
    ]
  },
  
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
