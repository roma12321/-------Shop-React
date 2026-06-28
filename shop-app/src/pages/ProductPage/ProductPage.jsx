  import { useNavigate, useParams } from "react-router-dom";
  import styles from "./ProductPage.module.css";
  import { useEffect, useState } from "react";
  import { getProducts } from "../../api/productsApi";
import FooterPage from "../FooterPage/FooterPage";

  const cartUtils = {
    getCart: () => JSON.parse(localStorage.getItem("cart")) || [],
    setCart: (cart) => localStorage.setItem("cart", JSON.stringify(cart)),
    getCount: () => {
      const cart = cartUtils.getCart();
      return cart.reduce((sum, item) => sum + (item.count || 0), 0);
    },
    addToCart: (product) => {
      const cart = cartUtils.getCart();
      const idx = cart.findIndex((item) => String(item.id) === String(product.id));
      if (idx !== -1) {
        cart[idx].count += 1;
      } else {
        cart.push({ ...product, count: 1 });
      }
      cartUtils.setCart(cart);
    },
  };

  function ProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);
    const [cartCount, setCartCount] = useState(cartUtils.getCount());
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    useEffect(() => {
      setCartCount(cartUtils.getCount());
    }, []);

    useEffect(() => {
      const loadProduct = async () => {
        try {
          const data = await getProducts();
          const found = data.find((item) => String(item.id) === String(id));
          
          if (found) {
            setProduct(found);
            setSelectedColorIndex(0); 
          } else {
            setError(true);
          }
        } catch (err) {
          console.error(err);
          setError(true);
        }
      };
      loadProduct();
    }, [id]);

   const getCurrentImage = () => {
  if (!product) return "/images/no-image.png";
  if (Array.isArray(product.colors) && product.colors.length > 0) {
    const safeIndex = Math.max(0, Math.min(selectedColorIndex, product.colors.length - 1));
    const selectedColor = product.colors[safeIndex];
    if (selectedColor && selectedColor.image) {
      return selectedColor.image;
    }
  }
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }
  if (product.image) {
    return product.image;
  }

  return "/images/no-image.png";
};

    const currentImage = getCurrentImage();
    const handleColorClick = (index) => {
      setSelectedColorIndex(index);
    };
    const handleAddToCart = () => {
      if (!product) return;
      const user = localStorage.getItem("user");
      if (!user) {
        alert("Чтобы добавить товар в корзину, нужно войти");
        navigate("/login");
        return;
      }
      cartUtils.addToCart(product);
      setCartCount((c) => c + 1);
      alert("Товар добавлен в корзину");
    };
    if (error) {
      return (
        <div className={styles.container}>
          <p className={styles.errorText}>Товар не найден или произошла ошибка загрузки.</p>
          <button className={styles.backButton} onClick={() => navigate("/catalog")}>
            Назад в каталог
          </button>
        </div>
      );
    }
    if (!product) {
      return <div className={styles.container}><p className={styles.loader}>Загрузка...</p></div>;
    }
    const title = product.name || product.title || "Без названия";
    const description = product.description ?? "Не указано";
    const price = new Intl.NumberFormat("ru-RU").format(product.price) + " ₽";
    return (
      <>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate("/catalog")}>
            ← Назад в каталог
          </button>
          {cartCount > 0 && (
            <span className={styles.cartBadge} onClick={() => navigate("/cart")}>Корзина: {cartCount}</span>
          )}
        </div>
        <main className={styles.productWrapper}>
          <div className={styles.imageSection}>
            {currentImage ? (
              <img
                src={currentImage}
                alt={title}
                className={styles.mainImage}
                loading="lazy"
                onError={(e) => {
                  console.warn(`Картинка не найдена: ${currentImage}`);
                  e.target.src = "/images/no-image.png";
                }}
              />
            ) : (
              <div className={styles.noImagePlaceholder}>Нет фото</div>
            )}
          </div>
          <div className={styles.infoSection}>
            <h1 className={styles.titleText}>{title}</h1>
            
            <p className={styles.description}>{description}</p>

            <div className={styles.priceBlock}>
              <span className={styles.currentPrice}>{price}</span>
            </div>
            <div className={styles.actionsBlock}>
              <button className={styles.actionCall} type="button">
                ПОЗВОНИТЬ
              </button>
              <button
                className={styles.actionOrder}
                type="button"
                onClick={handleAddToCart}
              >
                В КОРЗИНУ
              </button>
            </div>
            
            {Array.isArray(product.colors) && product.colors.length > 0 && (
              <div className={styles.colorsBlock}>
                <div className={styles.colorLabel}>Цвет</div>
                <div className={styles.colorOptions}>
                  {product.colors.map((color, i) => {
                    const isActive = i === selectedColorIndex;
                    
                    return (
                      <div
                        key={i}
                        className={`${styles.colorOption} ${
                          isActive ? styles.colorOptionActive : ""
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                        onClick={() => handleColorClick(i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleColorClick(i);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            
            {(product.specs || product.characteristics)?.map((spec, i) => {
              const key = spec.key || spec.name || `Характеристика ${i + 1}`;
              const value = spec.value || spec.description || "Не указано";
              return (
                <div key={i} className={styles.specItem}>
                  <span className={styles.specKey}>{key}:</span>
                  <span className={styles.specValue}>{value}</span>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <FooterPage/>
      </>
    );
  }

  export default ProductPage;
