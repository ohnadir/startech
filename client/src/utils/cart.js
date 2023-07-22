// use local storage to manage cart data
const addToCart = async(data) =>{
    let shoppingCart = [];

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
        shoppingCart = JSON.parse(storedCart);
    }
    // when duplicate data come for stored then quantity increase
    const data1= JSON.parse(storedCart)?.find((items)=> items.name === data.name);
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
            quantity : Number(data1.quantity) + 1,
            total : ""

        }
        object.total = Number(data1.price) *  Number(object.quantity)
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

const decreaseQuantity = async(id)=>{
    const storedCart = localStorage.getItem('shopping-cart');
    const shoppingCart = JSON.parse(storedCart);
    const data = await shoppingCart.find((items)=> items.id === id);
    const product = {
        name : "",
        image : "",
        price : "",
        id: "",
        quantity : "",
        total : ""
    }
    if(data.quantity > 1){
        product.name = data.name;
        product.image = data.image;
        product.price = data.price;
        product.id= data.id;
        product.quantity = Number(data.quantity) - 1;
        product.total = Number(data.price) *  Number(product.quantity);
        if(product.quantity < data.quantity){
            const data = await shoppingCart.filter((items)=> items.id !== id);
            await localStorage.setItem('shopping-cart', JSON.stringify(data));
        }
        if(product.quantity >=1){
            addToCart(product)
        }
    }
    if(data.quantity <= 1){
        const data = await shoppingCart.filter((items)=> items.id !== id);
        await localStorage.setItem('shopping-cart', JSON.stringify(data));
    }
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
    getStoredCart,
    decreaseQuantity
}