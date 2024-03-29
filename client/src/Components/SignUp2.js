import React, { useState, useEffect } from "react";

import AvatarUpload from "./AvatarUpload"
import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';

import style from '../StyleSheets/WelcomeSequence.module.css';



export default function SignUp2 ({ setCurrentGame, dimUI, setDimUI, setSequence, user, setUser }) {
    useEffect(() => {
        setDimUI("opacity_50");
        setCurrentGame(null);
    },[])
    

    return (
        <>
            <div className="pop-up-container">
                <div className="pop-up-title">Welcome to Planetariyum,</div>
                <div className="pop-up-title pop-up-keyword">{user.display_name}</div>
                <div className={style.avatar_images_container}>
                    <img className={style.avatar_cropped_out_portion} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                    <img className={style.avatar_crop_animator} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                </div>
                <AvatarUpload setSequence={setSequence} user={user} setUser={setUser}/>
            </div>
        </>
    )
}