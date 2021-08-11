const withStyles = require("@webdeb/next-styles");

module.exports = withStyles({
  sass: true, // use .scss files
  webpack: (config) => {
    config.optimization = {
      splitChunks: {
        cacheGroups: {}
      }
    };

    return config;
  }
});
