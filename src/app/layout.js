'use client'
import Link from 'next/link'
import './globals.css'
import './styles/header.sass'
import Script from 'next/script'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import MainDropdownMenu from './components/DropDownMenu/MainDropDownMenu'
import { useRouter } from "next/navigation";
import Footer from './components/footer/footer'
import { CartDB, getCookie } from './server'


export default function RootLayout({ children }) {

  const router = useRouter();

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
  const [userCart, setUserCart] = useState([])
  /* async function CartDB(){
      await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`).then((res)=>{
      return res.json()
  }).then((productsCart) =>{
      setUserCart(productsCart.cart)
  })
  } */
  useEffect(()=>{
      CartDB((productsCart)=>{
        setUserCart(productsCart.cart)
      })
  },[])

  const[dropDownStatus, setDropDownStatus] = useState('')

  
  return (
    <html lang="en">
      <body>
        <Script src="https://kit.fontawesome.com/073ad96d9b.js" crossorigin="anonymous"></Script>
        <div className='Header'>
          <div className='container'>
            <div className='HeaderWrapper'>
              <Link className='Logo' href='/'>3legant</Link>
              <div className='LinkItems'>
                <Link href='/' className='LinkItem'>Главная</Link>
                <Link href='/category' className='LinkItem'>Каталог</Link>
                <div style={{color: '#c0c0c0'}} href='/123' className='LinkItem'>Акции</div>
                <div style={{color: '#c0c0c0'}} href='/' className='LinkItem'>Контакты</div>
              </div>
              <div className='UserOpt'>
                <div className='UserSearch'><i className="fa-solid fa-magnifying-glass"></i></div>
                <div 
                  className='UserIco' 
                  style={{position: 'relative'}} 
                  onMouseEnter={()=>{setDropDownStatus('active')}} 
                  onMouseLeave={()=>{setDropDownStatus('')}}>
                    <i className="fa-regular fa-user"></i><MainDropdownMenu MainDropdownMenuStatus={dropDownStatus}/><div className='ActiveMonitor'></div>
                </div>
                <Link href='/profile/cart' className='UserIco UserShopCart'><div className='UserShopCartIteration'>{userCart && userCart.length !== null ? userCart.length : '0'}</div><i className="fa-solid fa-bag-shopping"></i></Link>
              </div>
            </div>
          </div>
        </div>
        <div className='MobileVer'>
            <div className='MobileVerWrapper'>
              <div className='UserSearchBlock'>
                <Link className='Logo' href='/'>3legant</Link>
                <input className='UserSearch'/>
              </div>
              <div className='MobileVerUserOpt'>
                <Link href='/' className='LinkItem'><i className="fa-ico fa-solid fa-house"></i>Главная</Link>
                <Link href='/category' className='LinkItem'><i className="fa-ico fa-solid fa-list"></i>Каталог</Link>
                <Link href='/profile/cart' className='LinkItem'><div className='UserShopCartIteration'></div><i className="fa-ico fa-solid fa-bag-shopping"></i>Корзина</Link>
                <div onClick={()=>{userLogginIn === true ? router.push('/profile'): router.push('/profile/auth')}} className='LinkItem'><i className="fa-ico fa-regular fa-user"></i>Профиль</div>
              </div>
            </div>
        </div>
        { children }
        <Footer/>
      </body>
    </html>
  )
}
