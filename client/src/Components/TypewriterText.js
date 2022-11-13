import { useState, useEffect } from 'react';



export default function TypewriterText ({ body, speed }) {
    const [renderedText, setrenderedText] = useState("");
    const [ progress , setProgress ] = useState(.1)
    const [ carotRetrigger , setCarotRetrigger ] = useState(false);

    // const [ messageNumber , setMessageNumber ] = useState(1);
    // const [ retrigger , setRetrigger ] = useState(false);
    // const totalMessages = 3;

    // useEffect(() => {
    //     console.log("firing");
    //     const timeout = setTimeout(() => {
    //             if (messageNumber <= totalMessages) {
    //                 setMessageNumber(messageNumber + 1);
    //                 setRetrigger(!retrigger);
    //             }
    //     }, 6400);
    //     return () => {
    //         clearTimeout(timeout);
    //     }
    // }, [retrigger]);

    useEffect(() => {
        // console.log("firing");
        setProgress(renderedText.length / body.length);
        // console.log(progress);
        const timeout = setTimeout(() => {
          setrenderedText(body.slice(0, renderedText.length + 1));
          setCarotRetrigger(!carotRetrigger)
        }, Math.random() * speed * progress);
        return () => clearTimeout(timeout);
    }, [renderedText]);

    return (
        <>
            <div>{renderedText}{carotRetrigger ? <span className='retrigger1'></span> : <span className='retrigger2'></span>}</div>
        </>
    )
}