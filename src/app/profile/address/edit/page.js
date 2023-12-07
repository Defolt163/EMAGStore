'use client'
import { useEffect, useState } from "react";
import '../../profile.sass'
import '../AddressPage.sass'
import './editadress.sass'
import AccountMenu from "../../components/AccountMenu/AccountMenu";
import { Input } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie, getName } from "@/app/server";

export default function AddressEditPage() {
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
    
      const [userName, setUserName] = useState([])
      const [userSurName, setUserSurName] = useState([])
      const [userPhone, setUserPhone] = useState([])
      const [userCity, setUserCity] = useState([])
      const [userStreet, setUserStreet] = useState([])
      const [userHouse, setUserHouse] = useState([])
      const [userApartment, setUserApartment] = useState([])
  
      useEffect(() => {
          getName((userInfo) => {
            setUserName(userInfo.name);
            setUserSurName(userInfo.surname);
            setUserPhone(userInfo.phone);
            setUserCity(userInfo.address_city);
            setUserStreet(userInfo.address_street);
            setUserHouse(userInfo.address_house);
            setUserApartment(userInfo.address_apartment);
          });
        }, []);
        

    useEffect(() => {
        document.title = 'Изменение Адреса'
      }, []);

    let setAccount = {
        name: userName === '' ? userId.name: userName,
        surname: userSurName === '' ? userId.surname: userSurName,
        phone: userPhone === '' ? userId.phone: userPhone,
        address_city: userCity === '' ? userId.address_city: userCity,
        address_street: userStreet === '' ? userId.address_street: userStreet,
        address_house: userHouse === '' ? userId.address_house: userHouse,
        address_apartment: userApartment === '' ? userId.address_apartment: userApartment,
    }

    async function updateUserInfo(){
        await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`,{
            method: 'PUT',
            body: JSON.stringify(setAccount),
            headers: {'content-type':'application/json'},
        }).then((res)=>{
        setAccount = res.json()
        alert("Изменения применены")
        router.push('/profile/address')
    }).catch(error=>{
        console.log("Error", error)
        alert("Произошла ошибка изменения, повторите снова")
    })
    }

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
                                    <div className="AddressItemHeader">Режим редактирования</div>
                                    <Link href='/profile/address' className="AddressItemRedactorBtn"><i className="fa-solid fa-xmark"></i></Link>
                                </div>
                                <div className="AddressClientInfo">
                                    <div className="ClientInfoAddressItem">Имя:</div>
                                    <Input placeholder={userName} value={userName} onChange={(event) => setUserName(event.target.value)}/>
                                    <div className="ClientInfoAddressItem">Фамилия</div>
                                    <Input placeholder={userSurName} value={userSurName} onChange={(event) => setUserSurName(event.target.value)}/>
                                    <div className="ClientInfoAddressItem">Телефон:</div>
                                    <Input placeholder={userPhone} value={userPhone} onChange={(event) => setUserPhone(event.target.value)}/>
                                    <div className="ClientInfoAddressItem">Город:</div>
                                    <Input placeholder={userCity} value={userCity} onChange={(event) => setUserCity(event.target.value)}/>
                                    <div className="ClientInfoAddressItem">Улица:</div>
                                    <Input placeholder={userStreet} value={userStreet} onChange={(event) => setUserStreet(event.target.value)}/>
                                    <div className="HouseEditBlock">
                                        <div className="HouseEditItem"><div className="HouseEditHeader">Дом:</div>
                                        <Input placeholder={userHouse} value={userHouse} onChange={(event) => setUserHouse(event.target.value)}/>
                                        </div>
                                        <div className="HouseEditItem"><div className="HouseEditHeader">Квартира:</div>
                                        <Input placeholder={userApartment} value={userApartment} onChange={(event) => setUserApartment(event.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='SaveChangesButton' onClick={()=>{updateUserInfo()}}>Сохранить изменения</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}