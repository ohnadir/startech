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
const RemoveFromCart = async(item)=>{
    const storedCart = localStorage.getItem('shopping-cart');
    const shoppingCart = JSON.parse(storedCart);
    const data = await shoppingCart.filter((items)=> items.name !== item.name);
    if(data){
        await localStorage.setItem('shopping-cart', JSON.stringify(data));
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