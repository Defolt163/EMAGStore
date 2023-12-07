'use client'
import Link from "next/link"
import './styles/MainPage.sass'
import { useEffect, useState  } from 'react';
import Swiper from 'react-id-swiper';



import PageCategoryFitCard from "./components/PageCategoryFit/PageCategoryFit";
import ProductCard from "./components/ProductCard/ProductCardBestSeller";
import PageCategoryBlock from "./components/PageCategory/PageCategory";
import { ProductDB, addToCart, getCookie } from "./server";


/* export const metadata = {
  title: '3legant',
  description: 'Online Store',
} */

export default function Home() {
  const params = {
    slidesPerView: 4.5,
    spaceBetween: 24,
    freeMode: true,
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 24
      },
      992: {
        slidesPerView: 3.5,
        spaceBetween: 24
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 20
      },
      427: {
        slidesPerView: 2.5,
        spaceBetween: 10
      },
      204: {
        slidesPerView: 1.5,
        spaceBetween: 10
      }
    }
  }

    let [products, setProducts] = useState([])
    useEffect(() => {
      ProductDB().then((data) => setProducts(data));
    }, []);


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


    useEffect(() => {
      document.title = 'Элегант'
    }, []);


  return (
    <main className='MainPage'>
      <section className="CurrentOffer">
        <div className="CurrentOfferWrapper">
          <div className="CurrentOfferImg"></div>
          <div className="ActualOfferDescr">
            <div className="ActualOfferDescrWrapper">
              <div className="ActualOfferDescrHeader">Неси тепло <br/> этой зимой!</div>
              <div className="ActualOfferDescrSubHeader">Хорошая зимняя куртка нужна каждому. <br/> 
              Найдите свою в нашей коллекции и не только.</div>
              <Link className="Button" href='/category'>Перейти к покупкам</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="NewProducts">
        <div className="container">
        <div className="PageHeader">Новинки</div>
          <Swiper
            {...params}
          >
            {products.filter((productItem) => productItem.statusnew === true).map((productItem) =>(
            <div key={productItem.id} className="ProductCard ProductCardNew">
              <div className='AddToCartButton' onClick={()=>{addToCart(productItem.id)}}>Добавить в корзину</div>
              <Link href={`/category/product/${productItem.id}`} className="ProductCardWrapper">
                <div style={{background: `url(${productItem.image}) center center/cover no-repeat`}} alt={productItem.name} className="ProductCardImage"></div>
                {productItem.statusnew === true && productItem.statushot === true ? <div className="ProductStatusBar"><div className="ProductStatus">New</div><div className="ProductStatus">Hot</div></div>:
                 productItem.statusnew === true ? <div className="ProductStatusBar"><div className="ProductStatus">New</div></div>:
                 productItem.statushot === true ? <div className="ProductStatusBar"><div className="ProductStatus">Hot</div></div>: null}
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
                        {Array.from({ length: 5 }).map((_, index) => (
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
          </Swiper>
            
        </div>
      </section>
      <section className="ShopByCategory">
        <div className="container">
          {/* <div className="PageHeader center">Покупки по категориям</div>
          <PageCategoryBlock/> */}
          <div className="PageCategoryFit">
            <PageCategoryFitCard bgimage='https://i.postimg.cc/rmT7kbs1/b102367ffa070dc1041f70d1a8fa7a4d.jpg' fit_header='Ноябрьский тренд'/>
            <PageCategoryFitCard bgimage='https://i.postimg.cc/MHFsvr6r/f4a794de0e40f7f11e8a4da23a2303c5.jpg' fit_header='Кашемир'/>
            <PageCategoryFitCard bgimage='https://i.postimg.cc/DwbNbFbQ/c6d12a2d119d22554f3b44e8b5e712ac.jpg' fit_header='Новый Скандинавский'/>
            <PageCategoryFitCard bgimage='https://i.postimg.cc/prTGVtHF/d74b4c379abace27e3ee126b36083389.jpg' fit_header='Кожа'/>
          </div>
        </div>
      </section>
      <section className="BestSellersProduct">
        <div className="container">
          <div className="PageHeader center">БестСеллеры</div>
            <div className="BestSellerBlock">
              <ProductCard filterMeaning='statushot' specMeaning='statushot' ProductCardBestSeller='ProductCardBestSeller'/>
            </div>
        </div>
      </section>
    </main>
  )
}
