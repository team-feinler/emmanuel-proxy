const axios = require('axios');

// takes a string for the env var name for deployment and a portNumber in development
// returns endpoint that forwards request to either remote or local args
exports.forwardingController = (envVarName = 'ENV var for service', portNumber ='port') => async (req, res, next) => {
  // check environment, if prod use remote url env var, else use localhost port to make base of url
  const serviceUrl = process.env.NODE_ENV === 'production' ? process.env[envVarName] : `http://localhost:${portNumber}`;

  let { originalUrl, body, method, headers } = req;
  method = method.toLowerCase();
  // combine the serviceUrl with the matched path to get request url
  const url = `${serviceUrl}${originalUrl}`;

  // seperate get from other requests, make req forwarding body and headers and return response to client
  let response;
  if (method === 'get') {
    response = await axios.get(url, {headers});
  } else {
    response = await axios[method](url, body, {headers});
  }

  res.send(response.data);
}
