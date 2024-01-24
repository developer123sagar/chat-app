/* eslint-disable no-unused-vars */
import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";

interface PhotoPickerProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({ onChange }) => {
  const component = (
    <input type="file" hidden id="photo-picker" onChange={onChange} />
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById("photo-picker-element") as HTMLElement
  );
};

export default PhotoPicker;
