import css from "styled-jsx/css";
import { itemStyles } from "./shared";
import React from "react";
import { useState } from "@storybook/addons";

const styles = css` /* stylelint-disable-line */

    .icon-container {
        min-width: 2rem;
        min-height: 2rem;
    }
    .actions-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .actions-container {
        box-sizing: border-box;
        width: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .action-button {
        margin: 0;
        overflow: visible;
        -webkit-appearance: button;
        height: 2.5rem;
        width: 100%;
        opacity: 0.8;
        text-transform: uppercase;
        font-weight: 600;
        line-height: 0;
        border: 0.125rem solid #767676;;
        color: #767676;
        background-color: white;
        font-size: 1.43rem;
        cursor: pointer;
        font-family: "Roboto Condensed",sans-serif;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        border-radius: 4px;
    }
    .action-button:hover {
        opacity: 1;
        background-color: #767676;
        border-color: #767676;
        color: #fff;
        text-decoration: none;
    }
    .action-button:focus {
        outline: none;
    }
    .action-button.inactive {
        opacity: 0;
        pointer-events: none;
    }
`;

const ENTER = 13;
const UP = 38;
const DOWN = 40;
const SPACE = 32;
const ESC = 27;
function copyIcon() {
    console.log("Copied icon!");
}

export function IconActions({ context, item }) {

    const { getCopy, getDisplayName } = context;


    // const [state, setState] = useState("idle");
    // const [activeType, setActiveType] = useState(undefined);
    const state = "idle";
    const setState = (item) => item;
    const activeType = "copy";
    const setActiveType = (item) => item;
    function copy(as) {
        if (state === "copied") {return;}
        copyIcon(item, as).then(() => {
            setState("copied");
        });
    }

    function activate() {
        if (state === "idle") {
            setState("active");
        }
    }

    function deactivate() {
        if (state === "active") {
            setState("idle");
            setActiveType(undefined);
        }
    }

    function onKeyDown(e) {
        if ([ENTER, SPACE, UP, DOWN, ESC].includes(e.which)) {
            e.preventDefault();
        }
        if (state === "active" && e.which === ESC) {
            setState("idle");
            setActiveType(undefined);
        } else if (state === "idle" && [ENTER, SPACE, DOWN].includes(e.which)) {
            setState("active");
            setActiveType("svg");
        } else if (activeType === "svg" && e.which === DOWN) {
            setActiveType("jsx");
        } else if (activeType === "jsx" && e.which === UP) {
            setActiveType("svg");
        } else if (
            state === "active" &&
            activeType &&
            [ENTER, SPACE].includes(e.which)
        ) {
            copy(activeType);
        }
    }

    // useEffect(() => {
    //     if (state === "copied") {
    //         const handler = window.setTimeout(() => {
    //             setState("idle");
    //         }, 1000);
    //
    //         return () => {
    //             window.clearTimeout(handler);
    //         };
    //     }
    // }, [state]);


    const className = "icon-actions";
    const onCopyClick = e => {console.log("Copying", e);};
    const onDownloadClick = e => {console.log("Downloading",e);};
    console.log("Icon actions: ", context, item);

    return (
        <div className={`${className} sbdocs sbdocs-ig actions-container`}
            onMouseEnter={activate}
            onMouseLeave={deactivate}
            onClick={activate}
        >
            <button
                className={`${className} ${state} action-button copy-action sbdocs sbdocs-ig`}
                onClick={onCopyClick}
                type="button"
            >
                Copy
            </button>
            <button
                className={`${className} ${state} action-button download-action sbdocs sbdocs-ig`}
                onClick={onDownloadClick}
                type="button"
            >
                Download
            </button>
            <style jsx>{itemStyles}</style>
            <style jsx>{styles}</style>
        </div>
    );
}
