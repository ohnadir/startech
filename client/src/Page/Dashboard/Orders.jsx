import React, { useEffect, useState } from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const Orders = () => {
  const [ orderList, setOrderList ] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/v1/orders")
    .then(res=> res.json())
    .then(data=> setOrderList(data.orderList))
  }, [ ]);
      
  return (
    <div>
      <h1 className='text-center font-semibold text-xl pb-5'>All orders from Database</h1>
      <Table className='border' dataSource={orderList} columns={columns} pagination={false} />
    </div>
  )
}

export default Orders