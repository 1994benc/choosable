import React from "react";

export function PrimaryButton(props: {
    onClick: () => void,
    text: string | React.ReactElement
}) {
    return (
        <button
            onClick={props.onClick}
            className="px-3 py-2 bg-black text-white rounded hover:opacity-75"
        >
            {props.text}
        </button>
    );
}
