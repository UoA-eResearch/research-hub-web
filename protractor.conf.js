// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 11000,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    // browser.driver.manage().window().maximize();
  },

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  'commonCapabilities': {
    'browserstack.user' : '',
    'browserstack.key' : '',
    'browserstack.debug' : true,
    'browserstack.video' : true,
    'acceptSslCerts' : true
  },

  'multiCapabilities': [{
    'browserName': 'Chrome',
    'os' : 'Windows',
    'os_version' : '10',
  },{
    'browserName': 'Safari',
    'os' : 'OS X',
    'os_version' : 'Mojave',
  },{
    'browserName': 'Firefox',
    'os' : 'Windows',
    'os_version' : '10',
  }]
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});