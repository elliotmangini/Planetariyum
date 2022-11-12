import style from '../StyleSheets/FaultyNeon.module.css'



export default function FaultyNeon () {

    return (
        <>
            <button className={style.glowing-btn}><span className={style.glowing-txt}>ENT<span className={style.faulty-letter}>E</span>R</span></button>
        </>
    )
}