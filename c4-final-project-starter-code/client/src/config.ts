// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
// DONE
const apiId = 'sfnpf7zea3'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  // DONE
  domain: 'dev-tohuy.us.auth0.com',                   
  clientId: 'Kj2aZRJw5um9ujvnny2ZsKrSt231H39F',           
  callbackUrl: 'http://localhost:3000/callback'
}
