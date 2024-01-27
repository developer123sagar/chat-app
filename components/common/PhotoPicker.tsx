import React from "react";
import ReactDOM from "react-dom";

interface PhotoPickerProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({ onChange }) => {
  const component = (
    <input
      type="file"
      hidden
      id="photo-picker"
      accept=".png, .jpg, jpeg"
      onChange={onChange}
    />
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById("photo-picker-element") as HTMLElement
  );
};

export default PhotoPicker;
