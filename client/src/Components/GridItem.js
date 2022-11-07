import style from '../StyleSheets/Home.module.css';




export default function GridItem ({ item }) {

    return (
                <div className={item.kind === "large" ? style.grid_box_span_2 : style.grid_box}>
                    <div className={style.publication_container}>
                    
                    <img className={style.cover_image} src={item.cover_url} ></img>
                    <div className={style.publication_title}>{item.title}</div>
                    
                    </div>
                </div>
    )
}