import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../api/productsApi";
import styles from './ProductPage.module.css'
function ProductPage(){
    const navigate = useNavigate();
    const {id}=useParams();
    const [product,setProducts]=useState(null)

    useEffect(() => {
        async function loadProducts() {
          const data = await getProducts(id);
          setProducts(data); 
        }
        loadProducts();
      }, [id]);
      function addToCart(product){
        const user=localStorage.getItem("user")
        if(!user){
          alert("Чтобы добавить товар в корзину нужно войти")
          navigate("/login")
          return;
        }
        const cart=JSON.parse(localStorage.getItem("cart"))||[];
        const foundProduct=cart.find((item)=>
        item.id===product.id)
        if(foundProduct){
            foundProduct.count+=1
        }
        else{
            cart.push({
                ...product,count:1,
            })
        }
        localStorage.setItem("cart",JSON.stringify(cart))
        alert("Товар добавлен в корзину")
        
      }
      if(!product){
        return<p>ЗАгрузка...</p>
      }

    return(
        <div className={styles.container}> 
                <button onClick={()=>navigate("/catalog")}>Назад</button>
                <div className={styles.product}>
                    <img src={product.image} alt={product.title}/>
                    <div>
                        <h1>{product.title}</h1>
                        <p className={styles.price}>{product.price} rub</p>
                        <p>Осталось: {product.stock} шт.</p>
                        <p>{product.description}</p>
                        <button onClick={addToCart}>Добавить к корзину</button>
                    </div>
                </div>
        </div>
    )
}
export default ProductPage