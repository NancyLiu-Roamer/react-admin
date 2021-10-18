// import React from 'react'
// import { useState, useEffect } from 'react';
// import { Table, Modal, Button } from 'antd';
// import { reqProductCate } from '../../src/api/index'
// import listToTreeWithLevel from '../../src/utils/categoryProcess'
// export default function ProductCategory() {
//   const [categoryData, setCateData] = useState()
//   useEffect(() => {
//     reqProductCate().then(
//       req => {
//         console.log(listToTreeWithLevel(req.data.data, 1))
//         setCateData(listToTreeWithLevel(req.data.data, 0))
//       }

//     )
//   }, [])

//   const columns = [
//     {
//       title: 'Category',
//       dataIndex: 'cat_name',
//     },
//     {
//       title: 'Operation',
//       render: (item) => {
//         if (item.cat_level === 0) {
//           return <Button type="primary" onClick={showModal}>
//             Edit
//           </Button>
//         }
//       }
//       // return(
//       //   <Space size = "middle" >
//       //     <Button type="primary" onClick={showModal}>
//       //       Edit
//       //     </Button>
//       //     <Button type="primary" onClick={showModal}>
//       //       Delete
//       //     </Button>
//       //   </Space >
//       // )
//       //     )
//     }
//   ]
// const [visible, setVisible] = useState(false);
// const [confirmLoading, setConfirmLoading] = useState(false);
// const [modalText, setModalText] = useState('Content of the modal')
// const showModal = () => {
//   setVisible(true);
// };

// const handleOk = () => {
//   setModalText('The modal will be closed after two seconds');
//   setConfirmLoading(true);
//   setTimeout(() => {
//     setVisible(false);
//     setConfirmLoading(false);
//   }, 2000);
// };

// const handleCancel = () => {
//   console.log('Clicked cancel button');
//   setVisible(false);
// };

// const [checkStrictly, setCheckStrictly] = useState(false);
// return (
//   <div style={{ 'overflow': 'auto' }}>
//     <Table
//       scroll
//       columns={columns}
//       rowKey="cat_id"
//       rowSelection={{ checkStrictly }}
//       dataSource={categoryData}
//       pagination={{ pageSize: 8 }}
//     />
//     <Modal
//       title="Title"
//       visible={visible}
//       onOk={handleOk}
//       confirmLoading={confirmLoading}
//       onCancel={handleCancel}
//     >
//       <p>{modalText}</p>
//     </Modal>
//   </div>
// )
// }
