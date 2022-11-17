



export default function AudioPlayer ({ setDuration , sound , action , clearAction }) {
    // console.log({
    //     sound,
    //     action,
    //     clearAction,
    // })

    const audio = new Audio(sound)
    // audio.volume = .5;

    function play() {
        audio.play();
    }

    function pause() {
        audio.pause();
    }


    function functionSelector (action) {
        switch(action) {
            case "play":
              play();
              break;
            case "pause":
              pause();
              break;
            default:
              console.log("no matching audio function");
          }
    }

    audio.onloadedmetadata = () => {
        // setDuration(audio.duration);

        // THIS IS IMPORTANT OTHERWISE SAMPIES ONLY PLAY TWICE (I think i found a better solution)
        // if (clearAction) {
            // clearAction("");
        // }
        
        // console.log(audio.duration);
        functionSelector(action);
    }

    return (
        <>
        </>
    )
}