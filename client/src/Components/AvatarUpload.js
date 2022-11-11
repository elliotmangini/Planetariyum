import { useState, useEffect } from 'react';
import FileUploader from './FileUploader';

import style from '../StyleSheets/AvatarUpload.module.css';



export default function AvatarUpload ({ setSequence, user, setUser }) {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ errors, setErrors ] = useState([]);

    // console.log(selectedFile)



    function postAvatar () {
        if (selectedFile) {
            const avatar = new FormData();
            avatar.append('avatar', selectedFile);
    
            fetch("/avatar", {
                method: 'post',
                body: avatar,
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            });
        }
    }

    useEffect(() => {
        postAvatar();
    }, [selectedFile])

    function goTo3 () {
        setSequence(3)
    }


    return (
        <>
            <form >
                <FileUploader
                selectedFile={selectedFile}
                uploadType={"Avatar"}
                maxSizeInMB={6}
                onFileSelectSuccess={setSelectedFile}
                onFileSelectError={({ error }) => alert(error)}
                />
            <div className="submit-button" onClick={goTo3} >{ selectedFile ? "Confirm" : "Skip?"}</div>
            </form>
        </>
    )

}