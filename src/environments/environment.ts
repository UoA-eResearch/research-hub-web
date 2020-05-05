// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// export const environment = {
//   production: false,
//   shibbolethSessionUrl: '',
//   researchHubApiUrl: '',
//   cerApiUrl: '',
//   analyticsCode: ''
// };

export const environment = {
  production: false,
  shibbolethSessionUrl: '/Session.json',
  researchHubApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/api/',
  cerApiUrl: 'https://dev.research-hub.cer.auckland.ac.nz/cer-api/',
  analyticsCode: ''
}