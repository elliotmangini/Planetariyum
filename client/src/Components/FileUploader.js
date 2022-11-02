
export default function FileUploader ({maxSize, onFileSelectError, onFileSelectSuccess }) {

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > maxSize)
          onFileSelectError({ error: "Avatar size must be 6MB or less." });
        else onFileSelectSuccess(file);
    };

    return (
        <div className="file-uploader">
            <input type="file" onChange={(e) => handleFileInput(e)}/>
        </div>
    )
}