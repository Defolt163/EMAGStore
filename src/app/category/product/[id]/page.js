"use client"
import { useEffect, useState } from "react";
import './ProductPage.sass'
import { getCookie } from "@/app/server";

export default function ProductPage(){
      useEffect(()=>{
        getCookie()
      })

      let userData = getCookie("UserData");
      let userDataObj;
      let userId = "";
      let userLogginIn = "";

      if (userData) {
          try {
              userDataObj = JSON.parse(userData);
              userId = userDataObj.userId !== null ? userDataObj.userId : "";
              userLogginIn = userDataObj.logginin !== null ? userDataObj.logginin : "";
          } catch (error) {
              console.error(error);
          }
      }

      let productId
      useEffect(() => {
        const getUrlParams = () => {
          const url = window.location.pathname;
          const parts = url.split('/');
          productId = parts[parts.length - 1];
        };

        getUrlParams();
      }, []);

      let [product, setProduct] = useState([])
      let [productName, setProductName] = useState([])
      async function ProductDB(){
        await fetch(`https://64f493b1932537f4051a7cde.mockapi.io/Products/${productId}`).then((res)=>{
        return res.json()
      }).then((product) =>{
          setProduct(product)
          setProductName(product.name)
      })
      }
      useEffect(()=>{
        ProductDB()
      },[])

      function addToCart(productId) {
        fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(userData => {
          // Получаем текущий массив cart из объекта userData
          const currentCart = userData.cart || [];
          
          // Добавляем productId в текущий массив cart
          const updatedCart = [...currentCart, productId];
          
          // Обновляем массив cart в базе данных пользователя
          return fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cart: updatedCart
            })
          });
        })
        .then(response => response.json())
        .catch(error => {
          console.error(error);
        });
      }





      const [productPiece, setProductPiece] = useState(1)
      function productPieceIncrement(){
        setProductPiece(productPiece + 1)
      }
      function productPieceDecrement(){
        setProductPiece(productPiece - 1)
      }

      const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p className="text">
                {text && (isReadMore ? text.slice(0, 100) : text)}
                <span
                    onClick={toggleReadMore}
                    className="read-or-hide"
                    style={{ color: "green", cursor: "pointer" }}
                >
                    {isReadMore ? "...Показать Больше" : " Скрыть"}
                </span>
            </p>
        );
    };
    useEffect(() => {
      document.title = `${productName}`
    }, [productName]);

    return(
      <div className="ProductPage">
        <div className="container">
          <div className="ProductPageWrapper">
            <div className="ProductImage" style={{background: `url(${product.image}) center center/cover no-repeat`}}>
            {product.statusnew === true && product.statushot === true ? <div className="ProductStatusBar">
                  <div className="ProductStatus">New</div>
                  <div className="ProductStatus">Hot</div>
                </div>:
                product.statusnew === true ? <div className="ProductStatusBar">
                  <div className="ProductStatus">New</div>
                </div>:
                product.statushot === true ? <div className="ProductStatusBar">
                  <div className="ProductStatus">Hot</div>
                </div>: null
              }
            </div>
            <div className="ProductInfo">
                <div className="ProductRating">{
                  product.rating >= 5 ? 
                    <div>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <i key={index} className="fa-solid fa-star"></i>
                      ))}
                    </div>:
                  product.rating === 4 ?
                    <div>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <i key={index} className="fa-solid fa-star"></i>
                      ))}
                    </div>:
                  product.rating === 3 ?
                    <div>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <i key={index} className="fa-solid fa-star"></i>
                      ))}
                    </div>:
                  product.rating === 2 ?
                    <div>
                      {Array.from({ length: 2 }).map((_, index) => (
                        <i key={index} className="fa-solid fa-star"></i>
                      ))}
                    </div>:
                  <div><i className="fa-solid fa-star"></i></div>
                  }
                </div>
              <div className="ProductName">{product.name}</div>
              <div className="ProductDescr"><ReadMore>{product.descr}</ReadMore></div>
              <div className="ProductPrice">Цена: {product.price} $</div>
              <div className="ProductActions">
                <div className="ProductCountAction">
                  <div className='CartItemPieceWrapper'>
                      <div onClick={() => productPieceDecrement()} className='CartItemPieceIteration'>-</div>
                          <div className='PiecesNumber'>{productPiece}</div>
                      <div onClick={() => productPieceIncrement()} className='CartItemPieceIteration'>+</div>
                  </div>
                </div>
                <div className="ProductAddToCart" onClick={()=>{addToCart(product.id)}}>Добавить в корзину</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}