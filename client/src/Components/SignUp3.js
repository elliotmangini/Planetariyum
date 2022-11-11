import style from '../StyleSheets/AvatarUpload.module.css';



export default function SignUp3 ({ setSequence, user, setUser }) {

    return (
        <>
            <div className="pop-up-container">
                <div className="pop-up-title">THIS IS SIGNUP 3</div>
                <div className="pop-up-title pop-up-keyword">{user.display_name}</div>
                <div className={style.avatar_images_container}>
                    <img className={style.avatar_cropped_out_portion} src={user.avatar_url}></img>
                </div>
            </div>
        </>
    )
}