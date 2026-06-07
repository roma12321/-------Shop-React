import { useEffect, useState } from "react";
import styles from "./CatalogPage.module.css";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productsApi";

function CatalogPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); 
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartCount,setCartCount]=useState(0)
  const cart=JSON.parse(localStorage.getItem("cart"))|| [];
  
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data); 
    }
    loadProducts();
    updateCartCount();
  }, []);
  function updateCartCount(){
    const cart=JSON.parse(localStorage.getItem("cart"))|| [];
    const count=cart.reduce((sum,item)=>sum+item.count,0)
    setCartCount(count)
  }
  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }
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
    updateCartCount();
  }
  return (
    <div className="body">
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Каталог</h1>
        <div>
          <span>{user?.name}</span> 
          <button onClick={()=>navigate("/cart")}>Корзина ({cartCount})</button>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
      <div className={styles.products}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price}$</p> 
            <button onClick={()=>addToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
export default CatalogPage;