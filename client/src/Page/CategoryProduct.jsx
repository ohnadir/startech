import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../Style/CategoryProduct.css";

const CategoryProduct = () => {
    const { keyword } = useParams();
    const [searchProduct, setSearchProduct] = useState([]);
    useEffect(() => {
        // axios.get(`https://startech-server.vercel.app/search?q=${keyword}`)
        axios.get(`/products/search?q=${keyword}`)
            .then(function (response) {
                setSearchProduct(response.data.data?.products)
    
            })
    }, [keyword]);
    return (
        <div>
            <p>Category Product</p>
        </div>
    )
}

export default CategoryProduct