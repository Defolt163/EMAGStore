'use client'
import { Input } from "reactstrap";
import './AccountSettings.sass'
import { useEffect, useState } from "react";
import { getCookie } from "@/app/server";

export default function AccountSettings() {
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


    //User Info
    const [inputSurName, setInputSurName] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputOldPassword, setInputOldPassword] = useState('');
    const [inputNewPassword, setInputNewPassword] = useState('');
    const [inputNewPasswordConfirm, setInputNewPasswordConfirm] = useState('');

    let setAccount = {
        name: inputName === '' ? userId.name: inputName,
        surname: inputSurName === '' ? userId.surname: inputSurName,
        email: inputEmail === '' ? userId.email: inputEmail,
        password: inputNewPasswordConfirm !== '' && inputOldPassword !== '' || inputOldPassword === userId.password && inputNewPassword === inputNewPasswordConfirm ? inputNewPassword: userId.password
    }




    async function updateUserInfo(){
        await fetch(`https://65605efe83aba11d99d0b111.mockapi.io/Users/${userId}`,{
            method: 'PUT',
            body: JSON.stringify(setAccount),
            headers: {'content-type':'application/json'},
        }).then((res)=>{
        setAccount = res.json()
        alert("OK")
    }).catch(error=>{
        console.log("Error", error)
        alert("Произошла ошибка изменения, повторите снова")
    })
    }



    return(
        <div className="AccountSettings">
            <div className="AccountSettingsWrapper">
                <div className="PageSubHeader PageSubHeaderCart">Контактные данные</div>
                <div className="AccountSettingsProfileInfo">
                    <div className="InputItem">
                        <div placeholder="Имя" className="InputName">Имя</div>
                        <Input placeholder="Ваше Имя" value={inputName} onChange={(event) => setInputName(event.target.value)}/>
                    </div>
                    <div className="InputItem">
                        <div className="InputName">Фамилия</div>
                        <Input placeholder="Ваша Фамилия" value={inputSurName} onChange={(event) => setInputSurName(event.target.value)}/>
                    </div>
                    <div className="InputItem">
                        <div className="InputName">Email</div>
                        <Input placeholder="Ваш Email" value={inputEmail} onChange={(event) => setInputEmail(event.target.value)}/>
                    </div>
                </div>
                <div className="PageSubHeader PageSubHeaderCart">Настройки пароля</div>
                <div className="AccountSettingsProfileInfo">
                    <div className="InputItem">
                        <div className="InputName">Старый пароль</div>
                        <Input type="password" value={inputOldPassword} onChange={(event) => setInputOldPassword(event.target.value)}/>
                    </div>
                    <div className="InputItem">
                        <div className="InputName">Новый пароль</div>
                        <Input type="password" value={inputNewPassword} onChange={(event) => setInputNewPassword(event.target.value)}/>
                    </div>
                    <div className="InputItem">
                        <div className="InputName">Повторите новый пароль</div>
                        <Input type="password" value={inputNewPasswordConfirm} onChange={(event) => setInputNewPasswordConfirm(event.target.value)}/>
                    </div>
                    <div className="SetPasswordButton" onClick={()=>{updateUserInfo()}}>Сохранить изменения</div>
                </div>
            </div>
        </div>
    )
}