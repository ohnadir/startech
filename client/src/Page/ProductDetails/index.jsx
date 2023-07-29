import React, { useEffect, useState } from 'react'
import './ProductDetails.scss';
import { HiHome } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import SEO from '../../Component/SEO';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { DiGitCompare } from 'react-icons/di';
import { Modal} from 'antd';
import { AiFillCheckCircle } from "react-icons/ai"
import { BsCart } from "react-icons/bs"
import { useParams  } from 'react-router-dom';
import { addToCart } from '../../utils/cart';
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../redux/actions/products'
import { addItemToCart } from '../../redux/actions/carts'
import image from "../../assets/images.png"
import RelatedProduct from '../../Component/RelatedProduct';
import { message } from 'antd';
import Loader from "../../Component/Loader"
import Specifications from "./Specifications"
import Description from "./Description"
import Reviews from "./Reviews"
import Questions from "./Questions"

const ProductDetails=()=> {
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [count, setCount] = useState(1);
    const [ details, setDetails ] = useState("specification")
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productDetails);

    const { cartItems } = useSelector(state => state.cart);
    const [selectedImg, setSelectedImg] = useState(product?.productPictures[0]?.img);

    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            dispatch(clearErrors())
        }
    }, [dispatch, id, error]);

    const handleCart=()=>{
        const data = {
            id:product?._id,
            name: product?.name,
            image : product?.productPictures[0].img,
            price: product?.price,
            quantity : count,
            total: Number(product?.price) * Number(count)
        }
        if(data){
            messageApi.info("Product added cart");
            dispatch(addItemToCart(data))
        }
    }
    return (
        <>
            {contextHolder}
            {
                loading
                ? 
                <Loader/>
                :
                <div className='product'>
                    <SEO title={'Product Details'} />
                    <section className='header-container'>
                        <HiHome onClick={()=>navigate('/')} className='home-icon'/> 
                        <span>/</span> 
                        <span className='home-icon'>Product Details</span> 
                        <span>/</span>
                        <span className='home-icon'>{product?.brand}</span>
                        <span>/</span>
                        <span className='home-icon'>{product?.name}</span>
                    </section>
                    <section className='share-container'>
                        <div className='share-item'>
                            <span className='hidden sm:block'>Share:</span>
                            <FaFacebookF size={16} className='share-btn'/>
                            <FaPinterestP size={16} className='share-btn'/>
                        </div>
                        <div className='btn-container'>
                            <button className='add-btn' onClick={handleCart}>
                                <BsCart size={18}/>
                                <p className='hidden sm:block'>Add to Cart</p>
                            </button>
                            <button className='compare-btn'>
                                <DiGitCompare size={20}/>
                                <p className='hidden sm:block'>Add To Compare</p>
                            </button>
                        </div>
                    </section>

                    <section className='product-container'>
                        <div className='img-container'>
                            <img className='large-img' src={selectedImg} alt="" />
                            <div className='img-layout'>
                                {
                                    product?.productPictures?.map((item) => <div
                                        key={item.id}
                                        style={{border :selectedImg === item.img ? "1px solid #ef4a23" : "1px solid transparent" }}
                                        className='mx-auto'>
                                        <img
                                            key={item.id}
                                            src={item.img}
                                            alt="fruits"
                                            onClick={()=>setSelectedImg(item?.img)}
                                        />    
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className='info-container'>
                            <h1 className='product-title'>{product?.name}</h1>
                            <div className='price-container'>
                                <div className='price-item'>
                                    <span className='criteria'>Price: </span>
                                    <span className='value'> {product?.price}৳</span>
                                </div>
                                <div className='price-item'>
                                    <span className='criteria'>Regular Price: </span>
                                    <span className='value'>{parseInt(product?.price) + 200 }৳</span>
                                </div>
                                <div className='price-item'>
                                    <span className='criteria'>Status: </span>
                                    <span className='value'>In Stock</span>
                                </div>
                                <div className='price-item'>
                                    <span className='criteria'>Product Code: </span>
                                    <span className='value'>252525</span>
                                </div>
                                <div className='price-item'>
                                    <span className='criteria'>Brand: </span>
                                    <span className='value'>{product?.brand}</span>
                                </div>
                                
                            </div>
                            <div className='details'>
                                <h3>Key Features</h3>
                                <p>{product?.desc}</p>
                            </div>
                            <div className='point'>
                                <FaStar className='icon'/>
                                <div className='point-container'>
                                    <p className='price'>120</p>
                                    <p className='point'>Star Point</p>
                                </div>
                            </div>
                            <div className='quantity-container'>
                                <div className='count-container'>
                                    <button className='minus-btn' disabled={count <= 1} onClick={()=>setCount(count - 1)}  >-</button>
                                    <input type="text" value={count} />
                                    <button className='plus-btn' onClick={()=>setCount(count + 1)} >+</button>
                                </div>
                                <button onClick={() => setModalOpen(true)} className='buy-now-btn'>Buy Now</button>
                            </div>
                        </div>
                    </section>
                    
                    {/* product specification and related product */}
                    <section className="product-specification-and-related-product">
                        <div className='product-specification'>
                            <ul>
                                <li onClick={()=>setDetails("specification")} tabIndex="1">Specification </li>
                                <li onClick={()=>setDetails("description")} tabIndex="2">Description</li>
                                <li onClick={()=>setDetails("questions")} tabIndex="3">Questions ({product?.questions ? product?.questions?.length : 0})</li>
                                <li onClick={()=>setDetails("reviews")} tabIndex="4">Reviews ({product?.reviews ? product?.reviews?.length : 0})</li>
                            </ul>
                            <div className="specification-option">
                                { details  ==="specification" &&  <Specifications/> }
                                { details  === "description" &&   <Description/> }
                                { details  === "questions" &&   <Questions/> }
                                { details  === "reviews" &&   <Reviews/> }
                            </div>
                        </div>
                        <div className='related-product'>
                            <h1 className='title'>Related Product</h1>
                            <RelatedProduct category={product?.category}/>
                        </div>
                    </section>

                    {/* Modal */}
                    <section className="modal">
                        {
                            modalOpen && <Modal
                            centered
                            open={modalOpen}
                            onCancel={() => setModalOpen(false)}
                            bodyStyle={{padding:"0", margin:"0", border:"none" }}
                            width={1000}
                            footer={null}
                        >
                            <div className='modal-body'>
                                <div className='cart-info-container'>
                                    <div className='cart-add-confirmation'>
                                        <AiFillCheckCircle size={30} className='text-[#15b579]'/>
                                        <span>You have added <span className='add-cart-product-name'>Razer DeathAdder Essential Gaming Mouse</span> to your shopping cart!</span>
                                    </div>
                                    <div className='cart-product-quantity'>
                                        <div className='quantity-item'>
                                            <span className='tag'>Cart Quantity: </span>
                                            <span className='value'>{count}</span>
                                        </div>
                                        <div className='quantity-item'>
                                            <span className='tag'>Cart Total:</span>
                                            <span className='value'>{count}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='btn-container'>
                                    <button className='cart-btn'>View Cart</button>
                                    <button onClick={()=>navigate('/checkout')} className='order-btn'>Confirm Order</button>
                                </div>
                            </div>
                            </Modal>
                        }
                    </section>
                </div>
            }
        </>
  )
}

export default ProductDetails