import React, { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { itemStyles } from "./shared";
import { v4 as uuidv4 } from "uuid";
import * as icons from "./assets";

const { styles } = css.resolve` /* stylelint-disable-line */
    .icon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        outline: none;
    }
`;

const iconSvgString = name => {
    const filename = (name.split("-").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    })).join("");

    return icons[filename];
};

export function InnerIcon({ name, children }) {
    const isInlineSvg = !children;
    const options = {};
    if (isInlineSvg) {
        options.dangerouslySetInnerHTML = { __html: iconSvgString(name) };
    } else {
        const icon = Children.only(children);
        options.children = [cloneElement(icon, { key:uuidv4() })];
    }

    return (
        <div className="item sbdocs sbdocs-ig-item">
            <div className="icon sbdocs sbdocs-ig-icon" {...options} />
            <style jsx>{itemStyles}</style>
            <style jsx>{styles}</style>
        </div>
    );
}
