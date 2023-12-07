'use client'
import Link from 'next/link';
import '../RegisterPage.sass'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



export default function RegisterPage(){
    const router = useRouter();

    const [inputPassword, setInputPassword] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputSurName, setInputSurName] = useState('');
    const [inputName, setInputName] = useState('');
    const [logginIn, setLogginIn] = useState(false)



    let setAccount = {
        name: inputName,
        surname: inputSurName,
        email: inputEmail,
        password: inputPassword,
        phone: '',
        address_city: '',
        address_street: '',
        address_house: '',
        address_apartment: ''
    }

    function SendAccount(){
        fetch('https://65605efe83aba11d99d0b111.mockapi.io/Users',{
        method: 'POST',
        body: JSON.stringify(setAccount),
        headers: {'content-type':'application/json'},
        }).then((res) =>{
            setAccount = res.json()
            setLogginIn(true)
            alert("Успешно")
            router.push('/profile/login')
            setTimeout(() => {
                window.location.reload();
                }, 1000)
        }).catch(error=>{
            console.log("Error", error)
            alert("Произошла ошибка регистрации, повторите снова")
        })
    }

    useEffect(() => {
        document.title = 'Регистрация'
      }, []);


    return (
        <div className="AuthPage">
            <div className='ImageBlock'></div>
            <div className='InputDataWrapper'>
                <div className='InputDataBlockWrapper'>
                    <div className='InputDataHeader'>Регистрация</div>
                    <div className='InputDataAlReady'>Уже зарегистрированы? <Link href='login'>Войдите в Аккаунт</Link></div>
                    <div className='InputDataBlock'>
                            <input type='text' placeholder='Имя' className='InputData' value={inputName} onChange={(event) => setInputName(event.target.value)}/>
                            <input type='text' placeholder='Фамилия' className='InputData' value={inputSurName} onChange={(event) => setInputSurName(event.target.value)}/>
                            <input type='email' required placeholder='Email*' className='InputData' value={inputEmail} onChange={(event) => setInputEmail(event.target.value)}/>
                            <input type='password' required placeholder='Пароль*' className='InputData' value={inputPassword} onChange={(event) => setInputPassword(event.target.value)} />
                            <div className='PrivacyCheck'>
                                <input type='checkbox' id='policytermsreg'/>&nbsp;<label for='policytermsreg'>Я согласен с политикой конфидентифициальности</label>
                            </div>
                            <div className='AuthButton' onClick={()=>{SendAccount()}}
                        >Зарегистрироваться</div>
                    </div>
                </div>
            </div>
        </div>
    );
}