import React, { useEffect, useState } from 'react';
import { Table } from 'antd'


const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  }
];
const Users = () => {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    fetch("http://localhost:5001/api/v1/users")
    .then(res=> res.json())
    .then(data=> setUserList(data.users));
  }, []);
  return (
    <div>
      <h1 className='text-center font-semibold text-xl pb-5'>All Users from Database</h1>
      <Table className='border' dataSource={userList} columns={columns} pagination={false} />
    </div>
  )
}

export default Users