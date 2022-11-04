import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Home.module.css';

import GridItem from './GridItem';



export default function Home ({ publications }) {

    const gridItems = publications.map((p) =>{
        return (
            <GridItem item={p} key={uuid()} />
        )
    })



    return (
        <div className={style.grid_container}>
            <div className={style.grid}>
                {gridItems}
            </div>
        </div>
    )
}