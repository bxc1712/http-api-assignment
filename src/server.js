const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const urlStruct = {
    '/':htmlHandler.getIndex,
    index: htmlHandler.getIndex,
    '/style.css':htmlHandler.getcss,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badReq,
    '/unauthorized': responseHandler.unauth,
    '/forbidden': responseHandler.forbid,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
    const parsedUrl = url.parse(request.url);

  // grab the 'accept' headers (comma delimited) and split them into an array
    const acceptedTypes = request.headers.accept.split(',');
    const params = query.parse(parsedUrl.query);
  // check if the path name (the /name part of the url) matches
  // any in our url object. If so call that function. If not, default to index.
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
