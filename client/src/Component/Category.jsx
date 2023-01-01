import React from 'react';
import Categories from '../category.json';
import '../Style/Categories.css'

const Category =()=>{
    return (
      <div className='max-w-7xl mx-auto px-2 py-[40px]'>
        <h1 className='text-center  font-bold mb-[2px]'>Featured Category</h1>
        <p className='text-center mb-[25px]'>Get Your Desired Product from Featured Category!</p>
        <div className='grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
            {
                Categories.map((category)=> <div className='card py-4' key={category.id}>
                    <div>
                        <img className='mx-auto' src={category.categoryImage} alt="" />
                        <p className='cardHeader'>{category.name}</p>
                    </div>
                </div>)
            }
        </div>
      </div>
    )
}

export default Category;