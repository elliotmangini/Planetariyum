



export default function AudioPlayer ({ setDuration , sound , action , clearAction }) {

    const audio = new Audio(sound)

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
        clearAction("");
        setDuration(audio.duration);
        functionSelector(action);
    }

    // console.log(audio)

    return (
        <>
        </>
    )
}