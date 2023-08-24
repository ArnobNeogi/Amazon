import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../../Cart/Cart';
import { addToDb } from '../../../utilities/fakedb';
import {getShoppingCart} from '../../../utilities/fakedb';

const Shop = () => {
    const [products , setProducts]=useState([]);

    const [cart,setCart]=useState([]);
    const [displayProducts,setDisplayProducts]=useState ([]);

    useEffect( () =>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then (data => {
            setProducts(data);
            setDisplayProducts(data);
        });
    },[]);
    useEffect(() =>{
       
        if(products.length){
            const savedCart = getShoppingCart();
            const storedCart = [];
        for (const key in savedCart){
           
            const addedpPoduct = products.find(product => product.key === key);
            if(addedpPoduct){
                const quantity =savedCart[key];
                addedpPoduct.quantity = quantity;
               
                storedCart.push(addedpPoduct);

            }
            

        }
        setCart(storedCart)
    }
        
    }, [products] )

    const handleAddToCart =(product)=>{
       const newCart = [...cart,product];
       setCart(newCart);
       console.log(product.key);
       //save to local storage for now only
       addToDb(product.key)
    }
    const handleSearch = event =>{
        const searchText =(event.target.value);
        const matchedProducts = products.filter(product =>
             product.name.toLowerCase().includes(searchText.toLowerCase()));
             setDisplayProducts(matchedProducts);
        
    }
    return (
        <>
            <div className="search-container">
            <input type="text" 
            onChange={handleSearch}
            placeholder='search-product' />

        </div>
        <div className='shop-container'>
            <div className="product-container">
                
                {
                displayProducts.map(product => <Product
                        key={product.key}
                        product={product}
                        handleAddToCart ={handleAddToCart}
                        
                        > 
                        </Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
           
        </div>
        </>
    );
};

export default Shop;