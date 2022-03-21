import React, { useState } from "react";
import Avatar from "../Avatar";
import defaultPlaceholder from "../../assets/upload_icon.png";

const AvatarUploader = (props) => {
  const { size, defaultImg, placeholder, onChange } = props;
  const [image, setImage] = useState(null);

  const updateImage = (e) => {
    const imageToUpload = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (avatar) => setImage(avatar.target.result);
    reader.readAsDataURL(imageToUpload);
    reader.onloadend = () => onChange(reader.result);
  };

  return (
    <Avatar placeholder={placeholder} size={size}>
      {image || defaultImg ? (
        <Avatar.Preview src={image || defaultImg} />
      ) : null}
      <Avatar.Uploader fileType="image/*" onChange={updateImage} />
    </Avatar>
  );
};

AvatarUploader.defaultProps = {
  placeholder: defaultPlaceholder,
  fileType: "image/jpeg",
  size: 150,
};

export default AvatarUploader;
