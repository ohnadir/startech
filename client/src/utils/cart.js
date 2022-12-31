import { useEffect } from "react";

// use local storage to manage cart data
const addToCart = (data) =>{
    let shoppingCart = [];

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
        shoppingCart = JSON.parse(storedCart);
    }
    console.log(shoppingCart)
    shoppingCart.push(data)
    
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));

    
}
const getStoredCart = () => {
    let shoppingCart;

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
       shoppingCart = JSON.parse(storedCart);
    } 
    return shoppingCart;
}
const RemoveFromCart = id =>{
    const storedCart = localStorage.getItem('shopping-cart');
    const shoppingCart = JSON.parse(storedCart);
    useEffect(()=>{
        const data = shoppingCart.forEach(item=> item.id === id);
        console.log(data);
    },[id])
    let nadir ={};
    console.log(id);
    
        
        /* if(id in shoppingCart){
            console.log(shoppingCart);
            // delete shoppingCart[id];
            localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
        } */
    
}

const deleteShoppingCart = () =>{
    localStorage.removeItem('shopping-cart');
}

export {
    addToCart, 
    RemoveFromCart,
    deleteShoppingCart,
    getStoredCart
}