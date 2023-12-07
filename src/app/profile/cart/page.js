'use client'
import { useEffect, useState } from "react";
import AccountMenu from "../components/AccountMenu/AccountMenu";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import { getCookie } from "@/app/server";
import './CartPage.sass'
export default function ShoppingCartPage() {


  useEffect(()=>{
    getCookie()
  })

  let userData = getCookie("UserData");
  let userDataObj;
  let userLogginIn = "";

  if (userData) {
      try {
          userDataObj = JSON.parse(userData);
          userLogginIn = userDataObj.logginin !== null ? userDataObj.logginin : "";
      } catch (error) {
          console.error(error);
      }
  }





  const [authStatus, setAuthStatus] = useState('')
  const [authStatusWrapper, setAuthStatusWrapper] = useState('')
  const [authStatusButton, setAuthStatusButton] = useState('')
  function CheckAuthStatus(){
    userLogginIn === true ? setAuthStatus('block') : setAuthStatus('none')
    userLogginIn === true ? setAuthStatusWrapper('') : setAuthStatusWrapper('100%')
    userLogginIn === true ? setAuthStatusButton('') : setAuthStatusButton("95%")
  }
  useEffect(() =>{
    CheckAuthStatus();
  })
  useEffect(() => {
    document.title = 'Корзина'
  }, []);

    return(
        <div className="ProfilePage">
            <div className="container">
                <div className="PageHeader">Мой Аккаунт</div>
                <div className="ProfilePageWrapper">
                  <AccountMenu authStatus={authStatus} CartItem='active'/>
                  <div className="PageInfo" style={{width: `${authStatusWrapper}`}}>
                      <ShoppingCart authStatusButton={authStatusButton}/>
                  </div>
                </div>
            </div>
        </div>
    )
}