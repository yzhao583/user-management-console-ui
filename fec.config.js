module.exports = {
  appUrl: "/iam/user-management/users",
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  routes: {
    "/api/chrome-service/v1/static": {
      host: "http://localhost:8889",
    },
  },
  _unstableHotReload: process.env.HOT === "true",
  moduleFederation: {
    exclude: ["react-router-dom"],
    shared: [
      {
        "react-router-dom": {
          singleton: true,
          import: false,
          requiredVersion: "^6.3.0",
        },
      },
    ],
  },
};
