import { func } from "prop-types";
import css from "styled-jsx/css";

export const itemStyles = css` /* stylelint-disable-line */
    .item {
        display: flex;
        flex-direction: column;
    }

    .name {
        padding-bottom: .75rem;
        text-align: center;
    }
`;

export const CONTEXT_SHAPE = {
    getCopyValue: func,
    getDisplayName: func
};
