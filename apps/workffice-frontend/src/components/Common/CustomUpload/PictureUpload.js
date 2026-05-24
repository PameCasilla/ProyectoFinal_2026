
import React from "react";
import { Cloudinary } from "../Cloudinary/Cloudinary";

function PictureUpload(props) {
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(null);
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      props.onChange(reader.result)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="picture-container">
      <div className="picture">
        {
          imagePreviewUrl !== null ? <img src={imagePreviewUrl} className="picture-src" alt="..." />
            : <Cloudinary className="picture-src" publicId={props.avatar} />
        }

        <input type="file" onChange={handleImageChange} />
      </div>
    </div>
  );
}

export default PictureUpload;
