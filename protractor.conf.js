// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  'commonCapabilities': {
    'browserstack.user' : '',
    'browserstack.key' : '',
    'browserstack.debug' : 'true'
  },

  'multiCapabilities': [{
    'browserName': 'Chrome',
  },{
    'browserName': 'Safari'
  },{
    'browserName': 'Firefox'
  },{
    'browserName': 'IE'
  }]
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});