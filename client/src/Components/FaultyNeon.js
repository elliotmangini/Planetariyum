import style from '../StyleSheets/FaultyNeon.module.css'



export default function FaultyNeon () {

    return (
        <div className="center-vertical">
            <div className="center-horizontal">
                <button className={style.glowing_btn}><span className={style.glowing_txt}>ENT<span className={style.faulty_letter}>E</span>R</span></button>
            </div>
        </div>
    )
}