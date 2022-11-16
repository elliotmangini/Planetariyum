import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Home.module.css';
import { useEffect, useState, useRef } from 'react'

import GridItem from './GridItem';

import Publication  from './Publication';



export default function Home () {
    const ref = useRef(null);

    // GET STUFF FOR HOME
    const [ publications , setPublications ] = useState([]);

    useEffect(() => {
        fetch('/publications')
        .then(resp => resp.json())
        .then(data => setPublications(data));
    },[]);

    const gridItems = publications.map((p) =>{
        return (
            <GridItem scrollToArticle={scrollToArticle} item={p} key={uuid()} />
        )
    })

    const articles = publications.map((p) =>{
        return (
            <Publication item={p} scrollToTop={scrollToTop} key={uuid()} />
        )
    })

    function scrollToTop () {
        ref.current?.scrollIntoView({behavior: 'smooth'});
        console.log("scrolling");
    }

    function scrollToArticle (name) {
        name.scrollIntoView({behavior: 'smooth'});
    }



    return (
        <div className='display-block'>
            <div ref={ref} className={`${style.grid_container} halfsecond-lazyload`}>
                <div className={style.grid}>
                    {gridItems}
                </div>
            </div>
            <div className={style.articles_container}>
                {articles} 
            </div>
        </div>
    )
}