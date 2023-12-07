import Link from "next/link";
import './MainDropDownMenu.sass'
import { useEffect } from "react";
import { getCookie } from "@/app/server";


export default function MainDropdownMenu(props){
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



    
    function LogOut(){
        localStorage.removeItem()
        window.location.reload()
    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    


    return(
        <div className={`MainDropDownMenu ${props.MainDropdownMenuStatus}`}>
            {
                userLogginIn === true ?
                <div className="MainDropDownMenuBlock">
                    <Link href='/profile' className={`MainDropDownMenuItem`}>
                        Профиль
                    </Link>
                    <Link href='/profile/address' className={`MainDropDownMenuItem`}>
                        Адреса
                    </Link>
                    <Link href='/profile/orders' className={`MainDropDownMenuItem`}>
                        Заказы
                    </Link>
                    <Link href='/profile/cart' className={`MainDropDownMenuItem`}>
                        Корзина
                    </Link>
                    {userDataObj && userDataObj.logginin === true ? 
                        <Link href='/' className={`MainDropDownMenuItem`} onClick={()=>{deleteCookie("UserData")}}>Выход</Link>:
                    null}
                </div>:
                <div className="MainDropDownMenuBlock">
                    <Link href='/profile/login' className="MainDropDownMenuItem">Войти</Link>
                    <Link href='/profile/register' className="MainDropDownMenuItem">Регистрация</Link>
                </div>
            }
        </div>
    )
}