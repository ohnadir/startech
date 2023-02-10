import React from 'react';
import { Table } from 'antd'

const Users = () => {
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
    ];
      
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
    return (
        <div>
            <h1 className='text-center font-semibold text-xl pb-5'>All Users from Database</h1>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    )
}

export default Users