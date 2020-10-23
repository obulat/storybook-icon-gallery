import { any, func } from "prop-types";
import React, { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { IconItem } from "./icon-item";
import { IconActions } from "./iconactions";

const styles = css` /* stylelint-disable-line */
    .icon-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
        grid-gap: 2rem;
    }
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

function IconWrapper(item, context) {
    return (
        <div className="icon-wrapper sbdocs sbdocs-ig">
            {cloneElement(item, { context: context })}
            <IconActions item={item} context={context} />
            <style jsx>{styles}</style>
        </div>
    );
}

export function IconGallery({ getCopyValue, getDisplayName, children }) {
    const context = {
        getCopyValue,
        getDisplayName
    };

    return (
        <div className="icon-gallery sbdocs sbdocs-ig">
            {Children.map(children, x => IconWrapper(x, context))}
            <style jsx>{styles}</style>
        </div>
    );
}

IconGallery.propTypes = {
    /**
     * Called during the rendering of an item to retrieve the display name of the matching item.
     * @param {{ name: string }} data
     * @returns {string}
     */
    getDisplayName: func,
    /**
     * Called during the rendering of a variant to retrieve the value to copy to the clipboard when the matching variant is clicked.
     * @param {{ name: string, size: number, isVariant: boolean }} data
     * @returns {string}
     */
    getCopyValue: func,
    /**
     * @ignore
     */
    children: any.isRequired
};

IconGallery.defaultProps = {
    getDisplayName: ({ name }) => name,
    getCopyValue: ({ name, size, isVariant }) => isVariant ? `${name}${size}` : name
};

IconGallery.Item = IconItem;
