
'use client'
import { useEffect, useState } from "react";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import AccountSettings from "./components/accountdetail/AccountSettings";
import './profile.sass'

export default function ProfilePage() {
  useEffect(() => {
    document.title = 'Профиль'
  }, []);

  return (
    <div className="ProfilePage">
      <div className="container">
        <div className="PageHeader">Мой Аккаунт</div>
        <div className="ProfilePageWrapper">
            <AccountMenu ProfileItem='active'/>
            <div className="PageInfo">
                <AccountSettings/> 
          </div>
        </div>
      </div>
    </div>
  );
}