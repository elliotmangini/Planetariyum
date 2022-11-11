
export default function FileUploader ({selectedFile, uploadType, maxSizeInMB, onFileSelectError, onFileSelectSuccess }) {
    const maxSizeInBytes = maxSizeInMB * 1000000;

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > maxSizeInBytes)
          onFileSelectError({ error: `${uploadType} must be ${maxSizeInMB}MB or less in size` });
        else {
            onFileSelectSuccess(file);
        };
    };

    return (
        // <div className="file-uploader">
            <label className="submit-button">
                <input id="file-being-uploaded" type="file" onChange={(e) => handleFileInput(e)}/>
                { !selectedFile ? "Upload" : "Change"}
            </label>
        // </div>
    )
}