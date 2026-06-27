import { useEffect, useState, useMemo } from "react";
import styles from "./CatalogPage.module.css";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productsApi";

function CatalogPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartCount, setCartCount] = useState(0);
  
  // Вычисляем категории только когда products уже загружены
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return ["all", ...uniqueCategories];
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  // Фильтруем товары через useMemo — это правильно и быстро
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
    updateCartCount();
  }, []);

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.count, 0);
    setCartCount(count);
  }

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  function addToCart(product) {
    const userItem = localStorage.getItem("user");
    if (!userItem) {
      alert("Чтобы добавить товар в корзину, нужно войти");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const foundProduct = cart.find((item) => item.id === product.id);

    if (foundProduct) {
      foundProduct.count += 1;
    } else {
      cart.push({
        ...product,
        count: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину");
    updateCartCount();
  }

  return (
  <div className={styles.body}>
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Каталог</h1>
        <div className={styles['header-actions']}>
          <span>{user?.name}</span>
          <button onClick={() => navigate("/cart")}>
            Корзина ({cartCount})
          </button>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>

      <aside className={styles.sidebar}>
        <h3>Категории</h3>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? styles.activeCategory : ""}
          >
            {category}
          </button>
        ))}
      </aside>

      <div className={styles.products}>
        {filteredProducts.length === 0 ? (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#6b7280" }}>
            Товаров не найдено
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div className={styles.card} key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price}$</p>
              <button onClick={() => addToCart(product)}>Добавить в корзину</button>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

}

export default CatalogPage;
