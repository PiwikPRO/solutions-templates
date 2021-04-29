const path = require('path');

module.exports = function () {
  return {
    name: 'piwik-pro-analytics-plugin',
    getClientModules() {
      return [path.resolve(__dirname, './piwikProAnalytics')];
    },
  };
};
