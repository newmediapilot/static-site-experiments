module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    return {
        dir: {
            input: "./src",
            output: "./dist",
            includes: "_includes",
            layouts: "_layouts",
            data: "_data",
            templateFormats: [
                "njk"
            ]
        }
    };
};