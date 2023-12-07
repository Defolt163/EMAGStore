'use client'
import Link from "next/link"
import './MobileAuth.sass'
import { useEffect } from "react";


export default function MobileAuth(){
    useEffect(() => {
        document.title = 'Авторизация'
      }, []);
    return(
        <div className="MobileAuthBlock">
            <div className="MobileAuthBlockWrapper">
                <Link href="/profile/login" className="MobileAuthItem">Вход</Link>
                <Link href="/profile/register" className="MobileAuthItem">Регистрация</Link>
            </div>
        </div>
    )
}