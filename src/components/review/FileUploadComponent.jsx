import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function FileUploadComponent({ onFileUpload, reviewId }) {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles
      .slice(0, 3 - images.length)
      .map((file, index) => ({
        file,
        preview: URL.createObjectURL(file),
        id: images.length + index,
      }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    //setImages([...newImages]);
    const imageFiles = newImages.map((image) => image.file);
    onFileUpload([...images, ...imageFiles]);
    console.log(imageFiles);
    //onFileUpload([...<ne />]);
  };

  const removeImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    onFileUpload(
      images.filter((image) => image.id !== id).map((image) => image.file)
    );
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    onDrop,
    multiple: true,
    maxFiles: 3,
  });

  return (
    <>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {reviewId > 0 ? (
          <p style={fontStyle}>
            수정할 사진을 업로드해주세요<br></br>(최대 3장)
          </p>
        ) : (
          <p style={fontStyle}>사진을 추가해주세요(최대 3장)</p>
        )}
      </div>
      <div style={imagesContainerStyles}>
        {images.map((image, index) => (
          <div key={index} style={imageContainerStyles}>
            <img
              src={image.preview}
              alt={`Uploaded ${index + 1}`}
              style={imageStyles}
            />
            <button onClick={() => removeImage(image.id)}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}

const fontStyle = {
  fontWeight: "600",
  fontSize: "17px",
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imagesContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  marginTop: "20px",
  justifyContent: "center",
};

const imageContainerStyles = {
  marginRight: "10px",
  marginBottom: "10px",
};

const imageStyles = {
  maxWidth: "100px",
  maxHeight: "100px",
};

export default FileUploadComponent;
