import css from "styled-jsx/css";
import React, { cloneElement } from "react";
import { IconActions } from "./iconactions";
import * as icons from "../src/assets";

const styles = css` /* stylelint-disable-line */
    .icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        position: relative;
        height: 6rem;
        border: 1px solid gray;
        border-radius: 5px;
    }

    .icon-container {
        min-width: 2rem;
        min-height: 2rem;
    }
`;
const iconFile = name => {
    const filename = (name.split("-").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    })).join("");

    return icons[filename];
};

export function IconWrapper(item, context) {
    const icon = iconFile(item.props.name);

    return (
        <div className="icon-wrapper sbdocs sbdocs-ig">
            {cloneElement(item, { context: context })}
            <IconActions name={item.props.name} context={context} icon={icon} />
            <style jsx>{styles}</style>
        </div>
    );
}
