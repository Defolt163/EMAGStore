'use client'
import { ProductDB, getCookie } from '@/app/server';
import './ShoppingCart.sass'
import { useEffect, useState  } from 'react';
import Link from 'next/link'


export default function ShoppingCart(props) {

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




    //фетчи
    let [products, setProducts] = useState([])
    useEffect(() => {
        ProductDB().then((data) => setProducts(data));
      }, []);

    const [cartItemPieces, setCartItemPieces] = useState([]);

    async function CartDB(){
        return fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`)
        .then((res)=>res.json())
        .then((productsCart) =>{
            return productsCart.cart
    })
    }

    useEffect(() => {
    if (products.length > 0) {
        setCartItemPieces(products.map(() => 1));
    }
    }, [products]);

    const decreaseCartItemPiece = (index) => {
        if (cartItemPieces[index] > 1) {
          const updatedCartItemPieces = [...cartItemPieces];
          updatedCartItemPieces[index] = updatedCartItemPieces[index] - 1;
          setCartItemPieces(updatedCartItemPieces);
        }
      };
      
      const increaseCartItemPiece = (index) => {
        const updatedCartItemPieces = [...cartItemPieces];
        updatedCartItemPieces[index] = updatedCartItemPieces[index] + 1;
        setCartItemPieces(updatedCartItemPieces);
      };


    const [userCart, setUserCart] = useState([])
    useEffect(() => {
        CartDB().then((data) => setUserCart(data));
      }, []);


    const [userCartItem, setUserCartItem] = useState([])
    function handleAuth() {
        if (userCart && userCart.length !== null ? userCart.length : '0' > 0) {
            const promises = userCart.map((cartItem) => {
            return fetch(`https://64f493b1932537f4051a7cde.mockapi.io/Products/${cartItem}`)
                .then((res) => res.json());
            });

            Promise.all(promises)
            .then((productCart) => {
                setUserCartItem(productCart);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        }

    useEffect(()=>{
        handleAuth()
    },[userCart])

    const filteredUserCartItems = userCartItem.filter((item) => userCart.includes(item.id))

    async function removeFromCart(itemId) {
        // Получите текущие данные пользователя из базы данных
        const response = await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`);
        const userData = await response.json();
      
        // Создайте новый массив `newCart`, исключив элемент с указанным itemId
        const newCart = userData.cart.filter((item) => item !== itemId);
      
        // Обновите запись в базе данных с новым значением `newCart`
        await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart: newCart })
        });
      
        // Обновите состояние `userCart` в компоненте, либо выполните обновление данных из базы данных
        setUserCart(newCart);
        alert("Удалено")
      }

      const totalPrice = filteredUserCartItems.reduce((sum, item, index) => {
        return sum + item.price * cartItemPieces[index];
      }, 0);

    return(
        <div className="ShoppingCart">
            <div className="ShoppingCartWrapper">
                <div className="PageSubHeader PageSubHeaderCart">Корзина</div>
                <div className="ShoppingCartTable">
                    <div className="ShoppingCartTableItem">Товар</div>
                    <div className="ShoppingCartTableItem">Количество</div>
                    <div className="ShoppingCartTableItem">Стоимость</div>
                    <div className="ShoppingCartTableItem">Итого</div>
                </div>
                <div className="ShoppingCartItems">
                    {userCart && userCart.length > 0 ? filteredUserCartItems.map((cartItem, index)=>(
                        <div key={cartItem.id} className="CartItem">
                            <div className='CartItemProductInfo'>
                                <div style={{background: `url(${cartItem.image}) center center/cover no-repeat`}} className='CartItemImage'></div>
                                <div className='CartItemInfo'>
                                    <div className='CartItemInfoBlock'>
                                        <div className='CartItemName'>{cartItem.name}</div>
                                        <div className='CartItemColor'>Black</div>
                                        <div className='CartItemSize'>Размер: 52</div>
                                        <div className='CartItemPiece CartItemPieceMobile'>
                                            <div className='CartItemPieceWrapper'>
                                                <div onClick={() => decreaseCartItemPiece(index)} className='CartItemPieceIteration'>-</div>
                                                    <div className='PiecesNumber'>{cartItemPieces[index]}</div>
                                                <div onClick={() => increaseCartItemPiece(index)} className='CartItemPieceIteration'>+</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='DeleteCartItem DeleteCartItemDesktop' onClick={()=>{removeFromCart(cartItem.id), handleAuth()}}>Удалить <i className="fa-solid fa-xmark"></i></div>
                                </div>
                            </div>
                            <div className='CartItemPiece CartItemPieceDesktop'>
                                <div className='CartItemPieceWrapper'>
                                    <div onClick={() => decreaseCartItemPiece(index)} className='CartItemPieceIteration'>-</div>
                                        <div className='PiecesNumber'>{cartItemPieces[index]}</div>
                                    <div onClick={() => increaseCartItemPiece(index)} className='CartItemPieceIteration'>+</div>
                                </div>
                            </div>
                            <div className='CartItemPrice CartItemPriceSubTotal'>{cartItem.price} $</div>
                            <div className='CartItemPrice CartItemPriceEnd'>{cartItem.price*cartItemPieces[index]} $</div>
                        </div>
                    )):<div className='PageSubHeader'>{userLogginIn === true ? 'Здесь пока ничего нет' : <div>Чтобы начать покупки вам необходимо <Link href='/profile/login'>Авторизоваться</Link> или <Link href='/profile/register'>Зарегистрироваться</Link></div>}</div>}
                </div>
            </div>
            <div className='CartDelivery'>
                <div style={{width: `${props.authStatusButton}`}} className="CartDeliveryBlock">
                    <div className='CartDeliveryTotal'>Итог: &nbsp;  <strong>{totalPrice}$</strong></div>
                    <div className='CartDeliverySendButton'>Оформить</div>
                </div>
            </div>
        </div>
    )
}