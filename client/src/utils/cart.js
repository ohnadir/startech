// use local storage to manage cart data
const addToCart = async(data) =>{
    let shoppingCart = [];

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
        shoppingCart = JSON.parse(storedCart);
    }

    // when duplicate data come for stored then quantity increase
    const data1= JSON.parse(storedCart).find((items)=> items.name === data.name);
    if(data1){
        const newData = JSON.parse(storedCart).filter((items)=> items.name !== data.name);
        if(newData){
            shoppingCart = newData;
        }
        const object = {
            name : data1.name,
            image : data1.image,
            price : data1.price,
            id: data1.id,
            quantity : data1.quantity + 1

        } 
        shoppingCart.push(object);
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    } else{
        shoppingCart.push(data)
    }
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