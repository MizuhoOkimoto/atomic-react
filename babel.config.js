const nodeEnv = process.env.NODE_ENV;
const env = process.env.BABEL_ENV;

let config = {
  presets: ["next/babel"],
  plugins: []
};

if (nodeEnv !== "production") {
  config.plugins.push([
    "istanbul",
    {
      exclude: [".cache/*", "docs/*"]
    }
  ]);
}

if (["lib"].includes(env)) {
  config = {
    presets: ["@babel/preset-react", ["@babel/preset-env", {modules: false}]],
    ignore: [/\.spec\.js$/]
  };
}

module.exports = config;
