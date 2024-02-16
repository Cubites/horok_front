// import { useState } from "react";

// const FileUploadComponent = () => {
//   const [postImg, setPostImg] = useState([]);
//   const [previewImg, setPreviewImg] = useState([]);

//   uploadFile = (e) => {
//     let fileArrr = e.targe.files;
//     setPostImg(Array.from(fileArrr));

//     let fileUrl = [];
//     for (let i = 0; i < fileArr.length; i++) {
//       let fileReader = new FileReader();
//       fileReader.onload = function () {
//         fileUrl[i] = fileReader.result;
//         setPreviewImg([...fileUrl]);
//         fileReader.readAsDataURL(fileArr[i]);
//       };
//     }
//   };

//   return (
//     <>
//       <WriteInput
//         accept=".png, .jpeg, .jpg"
//         type="file"
//         onChange={uploadFile}
//       />
//     </>
//   );
// };
// export default FileUploadComponent;
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function FileUploadComponent() {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.slice(0, 3 - images.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: true,
    maxFiles: 3,
  });

  return (
    <>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>이미지를 업로드하세요(최대 3장)</p>
      </div>
      <div style={imagesContainerStyles}>
        {images.map((image, index) => (
          <div key={index} style={imageContainerStyles}>
            <img
              src={image.preview}
              alt={`Uploaded ${index + 1}`}
              style={imageStyles}
            />
          </div>
        ))}
      </div>
    </>
  );
}

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
