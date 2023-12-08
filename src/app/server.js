'use client'

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
    
    // Получение товаров из бд
    export async function ProductDB() {
        return fetch('https://64f493b1932537f4051a7cde.mockapi.io/Products')
            .then((res) => res.json())
            .then((products) => {
            return products;
            });
        }
    // получение массива корзины пользователя (подвязанны: ShoppingCart)


    // Удаление позиций с корзины:
        // Настраивается в ShoppingCard.js !!!

    /* export async function removeFromCart(itemId) {
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
      } */


    // добавление в корзину
    export function addToCart(productId) {
      if(userLogginIn === true){
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
        .then(
            response => response.json(),
            alert("Добавлено")
        )
        .catch(error => {
            console.error(error);
        });
      }else{
        alert("Вам необходимо авторизоваться")
      }
    }

    // Получение длины массива корзины пользователя
    export async function CartDB(callback){
      await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`).then((res)=>{
      return res.json()
    }).then((productsCart) =>{
      callback(productsCart)
    })
    }

    // НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ //

    // Получение имени (Подвязан: AccountMenu)

    export async function getName(callback) { // добавляем параметр callback
        await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`)
          .then((res) => res.json())
          .then((userInfo) => {
            callback(userInfo); // вызываем callback с полученными данными
          });
      }

    /* async function getName(){
        await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`).then((res)=>{
        return res.json()
    }).then((userInfo) =>{
      setUserName(userInfo.name)
      setUserSurName(userInfo.surname)
    })
    } */

    // получение cookie info

    export function getCookie(name) {
        if (typeof window !== "undefined") {
            let cookieName = name + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let cookieArray = decodedCookie.split(";");
        
            for (let i = 0; i < cookieArray.length; i++) {
              let cookie = cookieArray[i];
              while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
              }
              if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
              }
            }
        }
    
        return "";
    }


