
export default function FileUploader ({uploadType, maxSizeInMB, onFileSelectError, onFileSelectSuccess }) {
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
        <div className="file-uploader">
            <input id="file-being-uploaded" type="file" onChange={(e) => handleFileInput(e)}/>
        </div>
    )
}