import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BrandProduct = () => {
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
            <p>Bran Product</p>
        </div>
    )
}

export default BrandProduct;