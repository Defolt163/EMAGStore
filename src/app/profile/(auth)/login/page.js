'use client'
import Link from 'next/link';
import '../RegisterPage.sass'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage(){
    const router = useRouter();

    const [inputPassword, setInputPassword] = useState('')
    const [inputLogin, setInputLogin] = useState('')
    const [authData, setAuthData] = useState([])
    // User Data
    const [userName, setUserName] = useState('')
    const [userSurName, setUserSurName] = useState('')
    const [orders, setOrders] = useState([])
    const [userCart, setUserCart] = useState([])
    const [userCity, setuserCity] = useState('')
    const [userStreet, setUserStreet] = useState('')
    const [userHouse, setUserHouse] = useState('')
    const [userApartment, setUserApartment] = useState('')
    const [userId, setUserId] = useState('')
    const [logginIn, setLogginIn] = useState('')

    async function UserDB() {
        await fetch('https://65605efe83aba11d99d0b111.mockapi.io/Users').then((res)=>{
            return res.json()
        }).then((userData) =>{
            setAuthData(userData);
        })
    }

    useEffect(() => {
        UserDB();
    }, []);

    function setCookie(name, value, days) {
        var expires = "";
    
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
    
        document.cookie = name + "=" + decodeURIComponent(value) + expires + "; path=/";
    }

        function handleAuth() {
            if (authData.length === 0) {
                alert("Загрузка данных...");
                return;
            }
          
            
            for (let i = 0; i < authData.length; i++) {
                if (inputLogin === authData[i].email && inputPassword === authData[i].password) {
                    setLogginIn(true);
                    setUserName(authData[i].name);
                    setUserSurName(authData[i].surname);
                    setOrders(authData[i].orders);
                    setUserCart(authData[i].cart);
                    setuserCity(authData[i].address_city);
                    setUserStreet(authData[i].address_street);
                    setUserHouse(authData[i].address_house);
                    setUserApartment(authData[i].address_apartment);
                    setUserId(authData[i].id);
                  
                    // Обновите localStorage с актуальными значениями
                    setCookie('UserData', JSON.stringify({
                        logginin: true,
                        orders: authData[i].orders,
                        password: authData[i].password,
                        userName: authData[i].name,
                        userSurName: authData[i].surname,
                        userCart: authData[i].cart,
                        userCity: authData[i].address_city,
                        userStreet: authData[i].address_street,
                        userHouse: authData[i].address_house,
                        userApartment: authData[i].address_apartment,
                        userId: authData[i].id
                    }), 30);
                    alert("OK")
                    router.push('/profile')
                    const timeout = setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                  
                      // Cleanup the timeout on component unmount
                    return () => clearTimeout(timeout);
                }
            }
          
            alert("Nope");
        }

    

    useEffect(() => {
        document.title = 'Авторизация'
      }, []);


    return (
            <div className="AuthPage">
                <div className='ImageBlock'></div>
                <div className='InputDataWrapper'>
                    <div className='InputDataBlockWrapper'>
                        <div className='InputDataHeader'>Авторизация</div>
                        <div className='InputDataAlReady'>Нет аккаунта? <Link href='register'>Зарегистрируйтесь</Link></div>
                        <div className='InputDataBlock'>
                                <input type='email' required placeholder='Email*' className='InputData' value={inputLogin} onChange={(event) => setInputLogin(event.target.value)}/>
                                <input type='password' required placeholder='Пароль*' className='InputData' value={inputPassword} onChange={(event) => setInputPassword(event.target.value)}/>
                                <div className='AuthButton' onClick={()=>{handleAuth()}}>Авторизация</div>
                        </div>
                    </div>
                </div>
            </div>
    );
}