'use client'
import { useEffect, useState } from "react";
import AccountMenu from "../components/AccountMenu/AccountMenu";
import '../profile.sass'
import './AddressPage.sass'
import Link from "next/link";
import { getCookie } from "@/app/server";

export default function AddressPage() {
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
    
    // получение массива Данных пользователя
    const [userName, setUserName] = useState([])
    const [userSurName, setUserSurName] = useState([])
    const [userPhone, setUserPhone] = useState([])
    const [userCity, setUserCity] = useState([])
    const [userStreet, setUserStreet] = useState([])
    const [userHouse, setUserHouse] = useState([])
    const [userApartment, setUserApartment] = useState([])

    async function getName(){
        await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`).then((res)=>{
        return res.json()
    }).then((productsCart) =>{
        setUserName(productsCart.name)
        setUserSurName(productsCart.surname)
        setUserPhone(productsCart.phone)
        setUserCity(productsCart.address_city)
        setUserStreet(productsCart.address_street)
        setUserHouse(productsCart.address_house)
        setUserApartment(productsCart.address_apartment)
    })
    }
    useEffect(()=>{
        getName()
    },[])

    useEffect(() => {
        document.title = 'Настройки Адреса'
      }, []);
    return(
        <div className="ProfilePage">
            <div className="container">
                <div className="PageHeader">Мой Аккаунт</div>
                <div className="ProfilePageWrapper">
                <AccountMenu AddressItem='active'/>
                <div className="PageInfo">
                    <div className="AccountSettings">
                        <div className="AccountSettingsWrapper">
                            <div className="PageSubHeader PageSubHeaderCart">Адрес</div>
                            <div className="AddressItem">
                                <div className="AddressItemFirst">
                                    <div className="AddressItemHeader">Адрес доставки:</div>
                                    <Link href='/profile/address/edit' className="AddressItemRedactorBtn">Редактировать &nbsp;<i className="fa-solid fa-pen"></i></Link>
                                </div>
                                <div className="AddressClientInfo">
                                    <div className="ClientInfoAddressItem">{userName} {userSurName}</div>
                                    <div className="ClientInfoAddressItem">{userPhone}</div>
                                    <div className="ClientInfoAddressItem">г.{userCity}, ул: {userStreet}, д: {userHouse}, кв: {userApartment}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}