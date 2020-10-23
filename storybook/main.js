const path = require("path");


module.exports = {

    // webpackFinal: config => {config.module.rules = config.module.rules.map(rule => {
    //     if (
    //         String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/)
    //     ) {
    //         return {
    //             ...rule,
    //             test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
    //         };
    //     }
    //     return rule;
    // });
    //
    // // use svgr for svg files
    // config.module.rules.push({
    //     test: /\.svg$/,
    //     use: ["@svgr/webpack", "file-loader"]
    // });
    //
    // return { ...config, module: { ...config.module } };
    // },
    stories: ["../stories/usage.stories.mdx", "../stories/css-escape-hatches.stories.mdx"],
    presets: ["@storybook/addon-docs/preset"]
};
