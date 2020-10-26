import { any, number, shape, string } from "prop-types";
import React, { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { InnerIcon } from "./inner-icon";
import { CONTEXT_SHAPE, itemStyles } from "./shared";

const styles = css` /* stylelint-disable-line */
    .icon-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border: 1px solid gray;
        border-radius: 5px;
    }

    .icon-container {
        min-width: 2rem;
        min-height: 2rem;
    }

`;

function renderIcon(icon) {
    return cloneElement(icon);
}

export function IconItem({ children }) {
    const icon = Children.only(children);

    return (
        <div className="item sbdocs sbdocs-ig-item">
            <InnerIcon
                icon={renderIcon(icon)}
            />
            <style jsx>{itemStyles}</style>
            <style jsx>{styles}</style>
        </div>
    );
}

IconItem.propTypes = {
    /**
     * The icon name.
     */
    name: string.isRequired,
    /**
     * The icon size.
     */
    size: number,
    /**
     * A custom value to copy to the clipboard when the variant is clicked.
     */
    copyValue: string,
    /**
     * @ignore
     */
    context: shape(CONTEXT_SHAPE),
    /**
     * @ignore
     */
    children: any
};

IconItem.defaultProps = {
    size: 30
};
