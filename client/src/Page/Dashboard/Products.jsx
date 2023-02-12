import React, { useEffect, useState } from 'react';
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
];
const Products = () => {
  const [counts, setCounts] = useState();
  const [size, setSize] = useState(8);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { products, error, count } = useSelector(state => state?.products);
    
  useEffect(() => {
    dispatch(getProducts(page, size));
    setCounts(count);
  }, [ page, size, error]);
    
  const pages = Number(Math.ceil(counts / size)) || 4;
  const arrayPages = [...Array(pages && pages).keys()];
    
  return (
    <div>
      <h1 className='text-center font-semibold text-xl pb-5'>All Products from Database</h1>
      <Table className='border' dataSource={products} columns={columns} pagination={false} />
      <section className="pagination mt-10 flex items-center justify-center" >
        <div>
          {
            arrayPages?.map(number => <button
              key={number}
              className={page === number ? 'selected' : ''}
              onClick={() => setPage(number)}
              >
              {number + 1}
            </button>)
          }
        </div>
        <select className='sizeContainer' onChange={event => setSize(event.target.value)}>
          <option value="">Please choose an option</option>
          <option value= "8">8</option>
          <option value= "10">10</option>
          <option value= "15">15</option>
          <option value= "20">20</option>
        </select>
      </section>
    </div>
  )
}

export default Products