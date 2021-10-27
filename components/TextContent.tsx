import * as React from "react";

interface ITextProps {
  text: string;
  placeholderHeight?: string;
  placeholderWidth?: string;
  className?: string;
}

const TextContent: React.FunctionComponent<ITextProps> = (props) => {
  if (!props.text) {
    const placeholderHeight = props.placeholderHeight ?? "20px";
    const placeholderWidth = props.placeholderWidth ?? "100%";
    return (
      <div
        style={{
          height: placeholderHeight,
          width: placeholderWidth,
        }}
        className={"bg-gray-100 rounded-xl w-100 " + props.className}
      ></div>
    );
  }
  return <div className={props.className}>{props.text}</div>;
};

export default TextContent;
