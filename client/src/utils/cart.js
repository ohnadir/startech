// use local storage to manage cart data
const addToCart = (data) =>{
    let shoppingCart = [];

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
        shoppingCart = JSON.parse(storedCart);
    }
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
const RemoveFromCart = (item)=>{
    // console.log(name);
    const storedCart = localStorage.getItem('shopping-cart');
    const shoppingCart = JSON.parse(storedCart);
    // console.log(shoppingCart);
    const data = shoppingCart.filter((items)=> items.name !== item.name);
    console.log(data);
    if(data){
        localStorage.setItem('shopping-cart', JSON.stringify(data));
    }
    
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