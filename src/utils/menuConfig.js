
const menuList = [
    {
      title: 'Home', // 菜单标题名称
      key: '/home', // 对应的path
      icon: 'home', // 图标名称
      isPublic: true, // 公开的
    },
    {
      title: 'Products',
      key: '/products',
      icon: 'appstore',
      children: [ // 子菜单列表
        {
          title: 'Category',
          key: '/products/category',
          icon: 'bars'
        },
        {
          title: 'Product',
          key: '/products/product',
          icon: 'tool'
        },
      ]
    },
  
    {
      title: 'User',
      key: '/user',
      icon: 'user'
    },
    {
      title: 'Role',
      key: '/role',
      icon: 'safety',
    },
  
    {
      title: 'Charts',
      key: '/charts',
      icon: 'area-chart',
      children: [
        {
          title: 'Bar',
          key: '/charts/bar',
          icon: 'bar-chart'
        },
        {
          title: 'Line',
          key: '/charts/line',
          icon: 'line-chart'
        },
        {
          title: 'Pie',
          key: '/charts/pie',
          icon: 'pie-chart'
        },
      ]
    },
  
    {
      title: 'Orders',
      key: '/order',
      icon: 'windows',
    },
  ]
  
  export default menuList