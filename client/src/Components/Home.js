import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Home.module.css';
import { useEffect, useState } from 'react'

import GridItem from './GridItem';



export default function Home () {

      // GET STUFF FOR HOME
  const [ publications , setPublications ] = useState([]);

  useEffect(() => {
      fetch('/publications')
      .then(resp => resp.json())
      .then(data => setPublications(data));
  },[]);

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