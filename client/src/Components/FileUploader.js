import React, {useRef} from 'react'

export default function FileUploader ({onFileSelectError, onFileSelectSuccess }) {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1048576)
          onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        else onFileSelectSuccess(file);
    };

    return (
        <div className="file-uploader">
            <input type="file" onChange={(e) => handleFileInput(e)}/>
        </div>
    )
}