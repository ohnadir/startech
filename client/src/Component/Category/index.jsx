import React from 'react';
import Categories from '../../JSON/category.json';
import './Category.scss'
import { useNavigate } from 'react-router-dom';

const Category =()=>{
    const navigate = useNavigate();
    return (
        <div className='category'>
            <h1 className='heading'>Featured Category</h1>
            <p className='slogan'>Get Your Desired Product from Featured Category!</p>
            <div className='category-container'>
                {
                    Categories.map((category)=>
                        <div className='category-card' key={category.id} onClick={()=>navigate(`/categoryProduct/${category.name}`)}>
                            <img className='mx-auto' src={category.categoryImage} alt="" />
                            <p className='cardHeader'>{category.name}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Category;