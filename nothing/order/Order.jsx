// import React from 'react'
// import { Table } from 'antd';

// export default function Order() {

// const columns = [
//   {
//     title: 'Title',
//     dataIndex: 'title',
//     filters: [
//       {
//         text: 'a',
//         value: 'a',
//       },
//       {
//         text: 'b',
//         value: 'b',
//         children: [
//           {
//             text: 'b1',
//             value: 'b1',
//           },
//         ],
//       },
//       {
//         text: 'Category 2',
//         value: 'Category 2',
//         children: [
//           {
//             text: 'Green',
//             value: 'Green',
//           },
//           {
//             text: 'Black',
//             value: 'Black',
//           },
//         ],
//       },
//     ],
//     filterMode: 'tree',
//     filterSearch: true,
//     onFilter: (value, record) => record.name.includes(value),
//     width: '30%',
//   },
//   {
//     title: 'Author',
//     dataIndex: 'Author',
//   },
//   {
//     title: 'Category',
//     dataIndex: 'category',
//     filters: [
//       {
//         text: 'London',
//         value: 'London',
//       },
//       {
//         text: 'New York',
//         value: 'New York',
//       },
//     ],
//     onFilter: (value, record) => record.address.startsWith(value),
//     filterSearch: true,
//     width: '40%',
//   },
// ];
// const data = [
//     {
//       key: '1',
//       title: 'aaa',
//       author: 'aaa',
//       catefory: 'ddd',
//     }
//   ];
  
//     const onChange= (pagination, filters, sorter, extra)=>{
//   console.log('params', pagination, filters, sorter, extra)
// }

//     return (
//         <div>
//             <Table columns={columns} dataSource={data} onChange={onChange} />
//         </div>
//     )
// }
