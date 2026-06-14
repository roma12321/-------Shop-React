import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './CartPage.module.css';
function CartPage(){
    const navigate = useNavigate();
    const[cart,setCart]=useState(JSON.parse(localStorage.getItem("cart")))
    function removeFrontCart(id){
    const newCart=cart.filter((item)=>
    item.id!==id);
    setCart(newCart);
    localStorage.setItem("cart",JSON.stringify(newCart));
}
function clearCart(){
    setCart([])
    localStorage.removeItem("cart")
}
const totalPrice=cart.reduce((sum,item)=>sum+item.price*item.count,0);
    function increaseCount(id){
        const newCart=cart.map((item)=>{
            if(item.id===id){
                return{
                    ...item,count:item.count+1
                }
            }
            return item;
        })
        setCart(newCart)
        localStorage.setItem("cart",JSON.stringify(newCart));
    }
    function decreaseCount(id){
        const newCart=cart.map((item)=>{
            if(item.id===id){
                return{
                    ...item,count:item.count-1
                }
            }
            return item;
        }).filter((item)=>item.count>0);
        setCart(newCart)
        localStorage.setItem("cart",JSON.stringify(newCart));
    }
    return(
        <div className={styles.container}>
            <h1>Корзина</h1>
            <button onClick={()=>navigate("/catalog")}>Назад в каталог</button>
            {cart.length===0?(
                <p>Корзина пустая</p>
            ):(
                <>
                    <div className={styles.items}>
                        {cart.map((item)=>(
                            <div className={styles.item} key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <div className={styles.counter}>
                                    <button disabled={item.count===1} onClick={()=>decreaseCount(item.id)} className={styles.bot}>-</button>
                                   <button onClick={() => {
                                                        if (item.count>=item.stock) {
                                                            alert('Нет в наличии!');
                                                            return;
                                                            }
                                                            increaseCount(item.id);
                                                        }}className={styles.bot}>+</button>
                                </div>
                                <p>Цена{item.price}$</p>
                                <p>Кол-во: {item.count}</p> 
                                <p>Сумма: {item.price*item.count}$</p> 
                                <button onClick={()=>removeFrontCart(item.id)} className={styles.bot}>Удалить</button>
                            </div>
                        ))}
                        <h2>Итого: {totalPrice}$</h2>
                        <button onClick={clearCart}>Очистить корзину</button>
                    </div>
                </>
            )}
        </div>
    )
}
export default CartPage;