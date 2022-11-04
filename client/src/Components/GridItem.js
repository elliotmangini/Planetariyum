import style from '../StyleSheets/Home.module.css';




export default function GridItem ({ item }) {

    return (
        <div className={style.grid_container}>
            <div className={style.grid}>
                <div className={style.grid_box}>
                    <img src={item.cover_url} ></img>
                </div>
            </div>
        </div>
    )
}