`use client`
import './ProductCard.sass'
import { useEffect, useState  } from 'react';
import Link from 'next/link'
import { ProductDB, addToCart, getCookie } from '@/app/server';



export default function ProductCard(props){
    const { filterMeaning, specMeaning } = props;
    let [products, setProducts] = useState([])
    
    useEffect(() => {
      ProductDB().then((data) => setProducts(data));
    }, [filterMeaning, specMeaning]);

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

    
    return(
        <div className="ProductCardItems">
            {products.filter((productItem) => productItem[filterMeaning] && productItem[specMeaning] === true).map((productItem) =>(
            <div key={productItem.id} className={`ProductCard ProductCardNew + ${props.ProductCardBestSeller}`}>
              <div className='AddToCartButton' onClick={()=>{addToCart(productItem.id)}}>Добавить в корзину</div>
              <Link href={`/category/product/${productItem.id}`} className="ProductCardWrapper">
                <div style={{background: `url(${productItem.image}) center center/cover no-repeat`}} alt={productItem.name} className="ProductCardImage">
                </div>
                {productItem.statusnew === true && productItem.statushot === true ? <div className="ProductStatusBar">
                    <div className="ProductStatus">New</div>
                    <div className="ProductStatus">Hot</div>
                  </div>:
                 productItem.statusnew === true ? <div className="ProductStatusBar">
                    <div className="ProductStatus">New</div>
                  </div>:
                 productItem.statushot === true ? <div className="ProductStatusBar">
                    <div className="ProductStatus">Hot</div>
                  </div>: null
                }
                <div className="ProductCardDescrWrapper">
                  <div className="ProductCardRating">{
                    productItem.rating >= 5 ? 
                      <div>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <i key={index} className="fa-solid fa-star"></i>
                        ))}
                      </div>:
                    productItem.rating === 4 ?
                      <div>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <i key={index} className="fa-solid fa-star"></i>
                        ))}
                      </div>:
                    productItem.rating === 3 ?
                      <div>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <i key={index} className="fa-solid fa-star"></i>
                        ))}
                      </div>:
                    productItem.rating === 2 ?
                      <div>
                        {Array.from({ length: 2 }).map((_, index) => (
                          <i key={index} className="fa-solid fa-star"></i>
                        ))}
                      </div>:
                    <div><i className="fa-solid fa-star"></i></div>
                    }
                  </div>
                  <div className="ProductCardName">{productItem.name}</div>
                  <div className="ProductCardPrice">{productItem.price} $</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
    )
}