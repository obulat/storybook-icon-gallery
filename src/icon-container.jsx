import css from "styled-jsx/css";
import React, { cloneElement } from "react";
import { IconActions } from "./iconactions";
import * as icons from "../src/assets";
import { v4 as uuidv4 } from "uuid";

const styles = css` /* stylelint-disable-line */
    .icon-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        position: relative;
        height: 9rem;
        width: 9rem;
        border: 1px solid gray;
        border-radius: 5px;
    }

    .icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .name {
        margin-top: 10px;
    }

`;
const iconSvgString = name => {
    const filename = (name.split("-").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    })).join("");

    return icons[filename];
};

export function IconWrapper(item, context) {
    const { name } = item.props;
    const icon = iconSvgString(name);
    const { getDisplayName } = context;
    const displayName = getDisplayName({ name });

    return (
        <div className="icon-wrapper sbdocs sbdocs-ig">
            <div className="icon-container sbdocs sbdocs-ig">
                {cloneElement(item, { context: context, key: uuidv4() } )}
                <IconActions name={name} context={context} icon={icon} />
            </div>
            <div className="name sbdocs sbdocs-ig-name">{displayName}</div>
            <style jsx>{styles}</style>
        </div>
    );
}
