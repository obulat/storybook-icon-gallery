import { useEffect, useRef, useState } from "react";
import css from "styled-jsx/css";

const { className, styles } = css.resolve` /* stylelint-disable-line */
    .icon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        outline: none;
    }

    .copy {
        position: absolute;
        top: 0;
        opacity: 0.5;
        transition: opacity .15s ease-in;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .25rem;
        background-color: #0E1C3D;
        width: 100%;
        height: 50%;
        box-sizing: content-box;
    }
    .download {
        position: absolute;
        bottom: 0;
        opacity: 0.5;
        transition: opacity .15s ease-in;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .25rem;
        background-color: #0E1C3D;
        width: 100%;
        height: 50%;
        box-sizing: content-box;
    }

    .icon:hover .copy,
    .icon:focus .copy,
    .icon:active .copy {
        opacity: 1;
        transition: opacity .15s ease-in;
    }

    .copy-action, .download-action {
        position: absolute;
        color: #FFF;
        font-weight: 500;
        font-size: .75rem;
        cursor: pointer;
        width: 200%;
        height: 40px;
        background-color: transparent;
        border: 0;
        outline: none;
    }

    .copy-action::-moz-focus-inner {
        border: 0;
    }

    .copy-succeeded {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200%;
        height: 200%;
        /* stylelint-disable-next-line */
        animation-duration: 500ms;
        animation-name: slidein;
    }

    .copy-checkmark {
        width: 1rem;
        height: 1rem;
        fill: #FFF;
    }

    .copy-form {
        position: absolute;
        opacity: 0.01;
        height: 0;
        z-index: -1;
    }

    @keyframes slidein {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export function InnerIcon({ icon, copyValue }) {
    const [copySucceeded, setCopySucceeded] = useState(false);
    const [downloadSucceeded, setDownloadSucceeded] = useState(false);
    const textAreaRef = useRef(null);
    const downloadTextAreaRef = useRef(null);

    useEffect(() => {
        let timeoutId = null;

        if (copySucceeded) {
            timeoutId = setTimeout(() => {
                setCopySucceeded(false);
            }, 1000);
        }

        return () => clearTimeout(timeoutId);
    }, [copySucceeded]);
    useEffect(() => {
        let timeoutId = null;

        if (downloadSucceeded) {
            timeoutId = setTimeout(() => {
                setDownloadSucceeded(false);
            }, 1000);
        }

        return () => clearTimeout(timeoutId);
    }, [downloadSucceeded]);

    const onCopyClick = () => {
        copyToClipboard();
    };

    const onCopyEnterKey = event => {
        if (event.keyCode === 13) {
            copyToClipboard();
        }
    };
    const onDownloadClick = () => {
        downloadIcon();
    };

    const onDownloadEnterKey = event => {
        if (event.keyCode === 13) {
            downloadIcon();
        }
    };

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand("copy");

        setCopySucceeded(true);
    };
    const downloadIcon = () => {
        setDownloadSucceeded(true);
    };

    return (
        <div className={`${className} icon sbdocs sbdocs-ig-icon`}>
            {icon}
            {styles}
        </div>
    );
}
