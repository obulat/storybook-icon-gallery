import { func } from "prop-types";
import css from "styled-jsx/css";

export const itemStyles = css` /* stylelint-disable-line */
    .item {
        flex-direction: column;

    }

    .name {
        padding-bottom: .75rem;
        text-align: center;
    }
    .copy-succeeded svg, .download-succeeded svg {
        height: 100%;
        line-height: 1rem;
    }
`;

export const CONTEXT_SHAPE = {
    getCopyValue: func,
    getDisplayName: func
};
