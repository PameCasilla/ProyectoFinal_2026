/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// used for making the prop types of this component
import PropTypes from "prop-types";
import React from "react";
import { Button } from "reactstrap";
import { Cloudinary } from "../Cloudinary/Cloudinary";



function ImageUpload(props) {
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(null);
  const fileInput = React.useRef()
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
  const handleClick = () => {
    fileInput.current.click();
  };

  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail"}>
        {imagePreviewUrl !== null ? <img src={imagePreviewUrl} alt="..." /> : <Cloudinary className="picture-src" publicId={props.avatar} />}
      </div>
      <div>
        {imagePreviewUrl === null ? (
          <Button className="btn-round" color="primary" onClick={() => handleClick()}>
            Seleccionar imagen
          </Button>
        ) : (
          <Button className="btn-round" color="primary" onClick={() => handleClick()}>
            Cambiar
          </Button>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.string,
  onChange: PropTypes.func,
};

export default ImageUpload;
