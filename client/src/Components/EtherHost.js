import style from "../StyleSheets/EtherHost.module.css";
import { useState, useEffect } from 'react';

export default function EtherHost({ delay }) {
    const [ isSpinningUp , setIsSpinningUp] = useState(false);
    const [ spinNumber , setSpinNumber ] = useState(0);

    setTimeout(() => {
        setIsSpinningUp(true);
    }, delay);


    useEffect(() => {
        // console.log("firing marks");
        const timeout = setTimeout(() => {
                if (spinNumber <= 60 && isSpinningUp) {
                    setSpinNumber(() => spinNumber + 1);
                }
        }, Math.random() * 20);
        return () => clearTimeout(timeout);
    }, [spinNumber, isSpinningUp]);



  return (
    <> 

      <div className='center-vertical'>
        <div className="center-horizontal">
          <div className={style.orb}></div>
          <div className={style.arc_hover}></div>
        </div>
      </div>

      <div className={style.positioning}>
        <div className={style.arc_reactor}>
          <div className={style.case_container}>
            <div className={style.e7}>
              <div className={style.semi_arc_3 + " " + style.e5_1}>
                <div className={style.semi_arc_3 + " " + style.e5_2}>
                  <div className={style.semi_arc_3 + " " + style.e5_3}>
                    <div className={style.semi_arc_3 + " " + style.e5_4}></div>
                  </div>
                </div>
              </div>
              <div className={style.core2}></div>
            </div>
            <ul className={style.marks}>
              <li className={spinNumber >= 1 ? null : style.hidden}></li>
              <li className={spinNumber >= 2 ? null : style.hidden}></li>
              <li className={spinNumber >= 3 ? null : style.hidden}></li>
              <li className={spinNumber >= 4 ? null : style.hidden}></li>
              <li className={spinNumber >= 5 ? null : style.hidden}></li>
              <li className={spinNumber >= 6 ? null : style.hidden}></li>
              <li className={spinNumber >= 7 ? null : style.hidden}></li>
              <li className={spinNumber >= 8 ? null : style.hidden}></li>
              <li className={spinNumber >= 9 ? null : style.hidden}></li>
              <li className={spinNumber >= 10 ? null : style.hidden}></li>
              <li className={spinNumber >= 11 ? null : style.hidden}></li>
              <li className={spinNumber >= 12 ? null : style.hidden}></li>
              <li className={spinNumber >= 13 ? null : style.hidden}></li>
              <li className={spinNumber >= 14 ? null : style.hidden}></li>
              <li className={spinNumber >= 15 ? null : style.hidden}></li>
              <li className={spinNumber >= 16 ? null : style.hidden}></li>
              <li className={spinNumber >= 17 ? null : style.hidden}></li>
              <li className={spinNumber >= 18 ? null : style.hidden}></li>
              <li className={spinNumber >= 19 ? null : style.hidden}></li>
              <li className={spinNumber >= 20 ? null : style.hidden}></li>
              <li className={spinNumber >= 21 ? null : style.hidden}></li>
              <li className={spinNumber >= 22 ? null : style.hidden}></li>
              <li className={spinNumber >= 23 ? null : style.hidden}></li>
              <li className={spinNumber >= 24 ? null : style.hidden}></li>
              <li className={spinNumber >= 25 ? null : style.hidden}></li>
              <li className={spinNumber >= 26 ? null : style.hidden}></li>
              <li className={spinNumber >= 27 ? null : style.hidden}></li>
              <li className={spinNumber >= 28 ? null : style.hidden}></li>
              <li className={spinNumber >= 29 ? null : style.hidden}></li>
              <li className={spinNumber >= 30 ? null : style.hidden}></li>
              <li className={spinNumber >= 31 ? null : style.hidden}></li>
              <li className={spinNumber >= 32 ? null : style.hidden}></li>
              <li className={spinNumber >= 33 ? null : style.hidden}></li>
              <li className={spinNumber >= 34 ? null : style.hidden}></li>
              <li className={spinNumber >= 35 ? null : style.hidden}></li>
              <li className={spinNumber >= 36 ? null : style.hidden}></li>
              <li className={spinNumber >= 37 ? null : style.hidden}></li>
              <li className={spinNumber >= 38 ? null : style.hidden}></li>
              <li className={spinNumber >= 39 ? null : style.hidden}></li>
              <li className={spinNumber >= 40 ? null : style.hidden}></li>
              <li className={spinNumber >= 41 ? null : style.hidden}></li>
              <li className={spinNumber >= 42 ? null : style.hidden}></li>
              <li className={spinNumber >= 43 ? null : style.hidden}></li>
              <li className={spinNumber >= 44 ? null : style.hidden}></li>
              <li className={spinNumber >= 45 ? null : style.hidden}></li>
              <li className={spinNumber >= 46 ? null : style.hidden}></li>
              <li className={spinNumber >= 47 ? null : style.hidden}></li>
              <li className={spinNumber >= 48 ? null : style.hidden}></li>
              <li className={spinNumber >= 49 ? null : style.hidden}></li>
              <li className={spinNumber >= 50 ? null : style.hidden}></li>
              <li className={spinNumber >= 51 ? null : style.hidden}></li>
              <li className={spinNumber >= 52 ? null : style.hidden}></li>
              <li className={spinNumber >= 53 ? null : style.hidden}></li>
              <li className={spinNumber >= 54 ? null : style.hidden}></li>
              <li className={spinNumber >= 55 ? null : style.hidden}></li>
              <li className={spinNumber >= 56 ? null : style.hidden}></li>
              <li className={spinNumber >= 57 ? null : style.hidden}></li>
              <li className={spinNumber >= 58 ? null : style.hidden}></li>
              <li className={spinNumber >= 59 ? null : style.hidden}></li>
              <li className={spinNumber >= 60 ? null : style.hidden}></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
