import React from "react";

export function SecondaryButton(props: {
    onClick: () => void,
    text: string | React.ReactElement
}) {
    return (
        <button
            onClick={props.onClick}
            className="px-3 py-2 border-2 text-black rounded hover:border-gray-300"
        >
            {props.text}
        </button>
    );
}
