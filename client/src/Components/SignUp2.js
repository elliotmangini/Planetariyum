import AvatarUpload from "./AvatarUpload"
import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';

import style from '../StyleSheets/AvatarUpload.module.css';



export default function SignUp2 ({ user, setUser }) {

    return (
        <>
            <div className="pop-up-container">
                <div className="pop-up-title">Welcome to Planetariyum, {user.display_name}.</div>
                <div className={style.avatar_images_container}>
                    <img className={style.avatar_cropped_out_portion} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                    <img className={style.avatar_crop_animator} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                </div>
                <AvatarUpload user={user} setUser={setUser}/>
            </div>
        </>
    )
}