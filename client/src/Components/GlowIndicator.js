import style from '../StyleSheets/GlowIndicator.module.css'



export default function GlowIndicator () {

    return (
        <>
            <div className={style.glow}></div>
            <div className={style.particles}>

                <div className={style.rotate}>

                    <div className={style.angle}>
                        <div className={style.size}>
                            <div className={style.position}>
                                <div className={style.pulse}>
                                    <div className={style.particle}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={style.angle}>
                        <div className={style.size}>
                            <div className={style.position}>
                                <div className={style.pulse}>
                                    <div className={style.particle}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.angle}>
                        <div className={style.size}>
                            <div className={style.position}>
                                <div className={style.pulse}>
                                    <div className={style.particle}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}