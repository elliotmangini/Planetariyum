import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Home.module.css';
import { useEffect, useState, useRef } from 'react'

import GridItem from './GridItem';

import Robot1 from '../Assets/robots/robot6.png';



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
            <GridItem item={p} key={uuid()} />
        )
    })

    function scrollToTop () {
        ref.current?.scrollIntoView({behavior: 'smooth'});
        console.log("scrolling");
    }



    return (
        <div className='display-block'>
            <div ref={ref} className={`${style.grid_container} halfsecond-lazyload`}>
                <div className={style.grid}>
                    {gridItems}
                </div>
            </div>
            <div className={`dev-box ${style.article_wrapper} halfsecond-lazyload`}>
                <div className={`${style.article_image_container}`}>
                    <img className={`${style.article_image}`} src={Robot1} />
                </div>


                <div className={`dev-box ${style.article_text_wrapper}`}>
                    <h2>Welcome To<br></br><span>Planetariyum</span></h2>
                    <div className={`${style.article_body_wrapper}`}>
                        <p style={{width: "90%", margin: "auto"}}>Welcome to our social network for artists! We are excited to have you here and hope that you will find our community to be a supportive and creative space. Our site is filled with features that will help you connect with other artists, showcase your work, and get inspired. Here are a few things you can do to get started:</p>
                        <p style={{textAlign: "center"}}>-Explore the work of other artists in our community.</p>
                        <p style={{textAlign: "center"}}>-Create a profile and start sharing your own art.</p>
                        <p style={{textAlign: "center"}}>-Join conversations in our forums and groups.</p>
                        <p style={{textAlign: "center"}}>-Check out our calendar of upcoming events.</p>
                        <h3 style={{textAlign: "center"}}><span>We can't wait to see what you create!</span></h3>
                    </div>
                </div>
                <div className={style.scroll_to_top_container} onClick={scrollToTop}>
                    <div></div>
                    <div className={style.like_btn}></div>
                    <div className={style.visit_btn}></div>
                    <div className={style.scroll_to_top_btn}></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}