const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setLiquidOptions({
    // Display dates in UTC (so they don't risk being off by one day)
    timezoneOffset: 0,
  });


  eleventyConfig.addPassthroughCopy("assets/**/*");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setBrowserSyncConfig({
		files: './_site/css/**/*.css'
	});

  return {
		templateFormats: [
			"md",
			"html",
		],
	};
   
33
};
