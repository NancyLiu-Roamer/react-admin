const menuList = [
  {
    title: 'Home',
    key: '/home',
  },
  {
    title: 'Create Blog',
    key: '/create-blog',
  },
  {
    title: 'Blog Management',
    key: '/blog-management',
    children: [
      {
        title: 'Draft',
        key: '/blog-management/draft'
      },
      {
        title: 'Pushlished',
        key: '/blog-management/published'
      }
    ]
  },
  {
    title: 'Post',
    key: '/posts'
  },
  {
    title: 'Users',
    key: '/users',
  }
]

export default menuList

// {
//   title: 'Charts',
//   key: '/charts',
//   icon: 'area-chart',
//   children: [
//     {
//       title: 'Bar',
//       key: '/charts/bar',
//       icon: 'bar-chart'
//     },
//     {
//       title: 'Line',
//       key: '/charts/line',
//       icon: 'line-chart'
//     },
//   ]
// },
// {
//   title: 'Products',
//   key: '/products',
//   icon: 'appstore',
//   children: [ // 子菜单列表
//     {
//       title: 'Category',
//       key: '/products/category',
//       icon: 'bars'
//     },
//     {
//       title: 'Product',
//       key: '/products/product',
//       icon: 'tool'
//     },
//   ]
// }
// {
//   title: 'Role',
//   key: '/role',
//   icon: 'safety',
// },   
// {
//   title: 'Orders',
//   key: '/order',
// },
