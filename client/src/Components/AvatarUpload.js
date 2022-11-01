import { useState } from 'react';
import FileUploader from './FileUploader';



export default function AvatarUpload () {
    const [ selectedFile, setSelectedFile ] = useState("");


    // function handleUploadAvatar () {
    //     fetch('http://localhost:3000/events', {
    //         method: 'post',
    //         body: formData,
    //     })
    // }

    function submitForm (e) {
        e.preventDefault();
    }


    return (
        <form >
            {/* <label htmlFor="avatar_upload_btn" >Upload Avatar</label> */}
            {/* <input
            onChange={(e) => setSelectedFile(e.target.files[0])}
            type="file"
            name="avatar_upload_btn"
            id="avatar_upload_btn"
            placeholder="avatar"
            value={selectedFile}
            style={{visibility:"hidden"}}
            /> */}

            <FileUploader
            onFileSelectSuccess={setSelectedFile}
            onFileSelectError={({ error }) => alert(error)}
            />

            <button onClick={(e) => submitForm(e)}>Upload Avatar</button>

        </form>
    )

}