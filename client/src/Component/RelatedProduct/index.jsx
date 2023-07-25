import React, { useEffect } from 'react'
import { getProducts } from '../../redux/actions/products';
import { MdLibraryAdd } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RelatedProduct = ({ category }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { products } = useSelector(state=>state.products);
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch, category]);
    const filterProduct = products?.filter((item) => item.category === category);
    return (
        <div className='product-container'>
            {
                filterProduct?.map((product)=>
                <div key={product?._id} className='single-product'>
                    <div className='img'>
                        <img src={product?.productPictures[0].img} alt="" />
                    </div>
                    <div className="info">
                        <h2 onClick={()=>navigate(product?._id)}>{product?.name}</h2>
                        <p>Price:- {product?.price} ৳</p>
                        <button>
                            <MdLibraryAdd/>
                            <span>Add to Compare</span>
                        </button>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default RelatedProduct