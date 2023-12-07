'use client'

import { useState } from "react";

export default function CartDB() {
    const [userCart, setUserCart] = useState([]);
  
    useEffect(() => {
      // Получаем данные из localStorage
      const userData = localStorage.getItem('UserData');
      // Преобразуем данные из строки JSON в объект JavaScript
      const userDataObj = JSON.parse(userData);
      // Получаем значение userId из объекта userDataObj
      const userId = userDataObj && userDataObj.userId !== null ? userDataObj.userId : '';
      const userLogginIn = userDataObj && userDataObj.logginin !== null ? userDataObj.logginin : '';
  
      async function fetchData() {
       await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`)
          .then(res => res.json())
          .then(productsCart => setUserCart(productsCart.cart));
      }
  
      fetchData();
    }, []);
  
    // ... остальной код функции 
  
    return (
      // вернуть jsx компонента или null, если компонент ничего не рендерит
      null
    );
  }
  