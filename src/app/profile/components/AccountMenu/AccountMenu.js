'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './AccountMenu.sass';
import { getCookie, getName } from '@/app/server';

export default function AccountMenu(props) {
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


    // получение массива корзины пользователя
      const [userName, setUserName] = useState([])
      const [userSurName, setUserSurName] = useState([])
  
      useEffect(() => {
          getName((userInfo) => {
            setUserName(userInfo.name);
            setUserSurName(userInfo.surname);
          });
        }, []);


      function deleteCookie(name) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

    
    
    return (
      <div style={{display: `${props.authStatus}`}} className="AccountMenu">
        <div className="AccountMenuWrapper">
          <div className="ProfileName">{userName} {userSurName}</div>
          <div className="AccountMenuItems">
            <Link href='/profile' className={`AccountMenuItem ${props.ProfileItem}`}>
              Аккаунт
            </Link>
            <Link href='/profile/address' className={`AccountMenuItem ${props.AddressItem}`}>
              Адреса
            </Link>
            <Link href='/profile/orders' className={`AccountMenuItem ${props.OrdersItem}`}>
              Заказы
            </Link>
            <Link href='/profile/cart' className={`AccountMenuItem ${props.CartItem}`}>
              Корзина
            </Link>
            {userDataObj && userDataObj.logginin === true ? <Link href='/' className={`AccountMenuItem ${props.LogOutItem}`} onClick={()=>{deleteCookie()}}>Выйти из аккаунта</Link>: <Link href='/profile/register' className={`AccountMenuItem ${props.LogOutItem}`}>Зарегистрироваться или войти</Link>}
            
          </div>
        </div>
      </div>
    );
  }
  
