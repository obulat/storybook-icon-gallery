import css from "styled-jsx/css";
import { itemStyles } from "./shared";
import React from "react";

const styles = css` /* stylelint-disable-line */
    .icon-container {
        min-width: 2rem;
        min-height: 2rem;
    }

    .actions-container {
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        padding: 5px;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
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
        border: 0.125rem solid #767676;
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
        color: white;
        text-decoration: none;
    }

    .action-button:focus {
        outline: none;
    }

    .action-button.idle {
        opacity: 0;
    }
`;

const ENTER = 13;
const UP = 38;
const DOWN = 40;
const SPACE = 32;
const ESC = 27;

export function IconActions({ context, name, icon }) {
    const { getCopyValue } = context;
    const copyValue = getCopyValue({ name, size: 30 });
    const [state, setState] = React.useState("idle");
    const [activeType, setActiveType] = React.useState(undefined);
    function perform(as) {
        if (state === "copied") {return;}
        if (as === "download") {
            // Create a link element
            const link = document.createElement("a");
            link.type = "image/svg+xml";
            link.href = icon;
            link.download = copyValue;

            // Append link to the body
            document.body.appendChild(link);
            // Dispatch click event on the link
            // This is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window
                })
            );
            // Remove link from body
            document.body.removeChild(link);
        } else {
            navigator.clipboard.writeText(copyValue)
                .then(value =>
                    console.log("Copied!", value, copyValue) );
        }
        setState("copied");
    }

    function activate(event) {
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
            setActiveType("copy");
        } else if (activeType === "copy" && e.which === DOWN) {
            setActiveType("download");
        } else if (activeType === "download" && e.which === UP) {
            setActiveType("copy");
        } else if (
            state === "active" &&
            activeType &&
            [ENTER, SPACE].includes(e.which)
        ) {
            perform(activeType);
        }
    }

    React.useEffect(() => {
        if (state === "copied") {
            const handler = window.setTimeout(() => {
                setState("idle");
            }, 1000);

            return () => {
                window.clearTimeout(handler);
            };
        }
    }, [state]);


    const className = "icon-actions";
    const onCopyClick = e => {
        setActiveType("copy");
        perform("copy");
    };
    const onDownloadClick = e => {
        setActiveType("download");
        perform("download");
    };


    return (
        <div className={`${className} ${state==="active"? "active": ""} sbdocs sbdocs-ig actions-container`}
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
