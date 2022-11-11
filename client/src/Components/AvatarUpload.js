import { useState, useEffect } from 'react';
import FileUploader from './FileUploader';

import style from '../StyleSheets/AvatarUpload.module.css';



export default function AvatarUpload ({ user, setUser }) {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ errors, setErrors ] = useState([]);

    function postAvatar () {
        console.log("selectedFile is")
        console.log(selectedFile);
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

    useEffect(() => {
        postAvatar();
    }, [selectedFile])


    return (
        <form >
            <FileUploader
            uploadType={"Avatar"}
            maxSizeInMB={6}
            onFileSelectSuccess={setSelectedFile}
            onFileSelectError={({ error }) => alert(error)}
            />
        </form>
    )

}