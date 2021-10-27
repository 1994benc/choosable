import * as React from "react";

interface IAvatarProps {
  photoURL: string;
  className?: string;
  width?: string;
  height?: string;
}

const Avatar: React.FunctionComponent<IAvatarProps> = (props) => {
  if (!props.photoURL) {
    return (
      <div
        style={{ width: props.width ?? '200px', height: props.height ?? '200px' }}
        className={`rounded-full bg-gray-200 ${props.className}`}
      ></div>
    );
  }
  return (
    <img
      src={props.photoURL}
      style={{ width: props.width ?? '200px', height: props.height ?? '200px' }}
      className={`rounded-full  ${props.className}`}
    />
  );
};

export default Avatar;
