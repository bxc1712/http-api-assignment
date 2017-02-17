const fs = require('fs');

const respond = (request, response, status, type, content) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': type });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(content);
  // Send the response to the client
  response.end();
};

const success = (request, response, acceptedTypes) => {
    // message to send
    const responseMessage = {
      title: 'Success',
      message: 'This is a successful response',
    };
    
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseMessage = '<response>';
        responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
        responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
        responseMessage = `${responseMessage} </response>`;

        // return response passing out string and content type
        return respond(request, response, 200,'text/xml',responseMessage);
    }
    
    const successString = JSON.stringify(responseMessage);
  // send our json with a success status code
  respond(request, response, 200,'application/json',successString);
};

const badReq = (request, response,acceptedTypes, params) => {
    // message to send
    const responseMessage = {
      title: 'Bad Request',
      message: 'This request has the required parameters',
    };
    
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseMessage = '<response>';
        responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
        responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
        responseMessage = `${responseMessage} </response>`;

        // return response passing out string and content type
        if(!params.valid || params.valid !== 'true') {
            // set our error message
            responseMessage.message = 'Missing valid query parameter set to true';
            // return our json with a 400 bad request code
            let responseMessage = '<response>';
            responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
            responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
            responseMessage = `${responseMessage} </response>`;
            
            return respond(request, response, 400, 'text/xml',responseMessage);
        }
        return respond(request, response, 200,'text/xml',responseMessage);
    }
    
    if(!params.valid || params.valid !== 'true') {
        const successString = JSON.stringify(responseMessage);
        return respond(request, response, 400, 'application/json',successString);
    }    
    return respond(request, response, 200,'application/json',successString);
};

const unauth = (request, response,acceptedTypes, params) => {
    // message to send
    const responseMessage = {
      title: 'Unauthorized',
      message: 'This request has the required parameters',
    };
    
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseMessage = '<response>';
        responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
        responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
        responseMessage = `${responseMessage} </response>`;

        // return response passing out string and content type
        if(!params.valid || params.valid !== 'true') {

            responseMessage.message = 'Missing loggedIn query parameter set to yes';

            let responseMessage = '<response>';
            responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
            responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
            responseMessage = `${responseMessage} </response>`;
            
            return respond(request, response, 401, 'text/xml',responseMessage);
        }
        return respond(request, response, 200,'text/xml',responseMessage);
    }
    
    if(!params.valid || params.valid !== 'true') {
        const successString = JSON.stringify(responseMessage);
        return respond(request, response, 401, 'application/json',successString);
    }    
    return respond(request, response, 200,'application/json',successString);
};

const forbid = (request, response, acceptedTypes) => {
    // message to send
    const responseMessage = {
      title: 'Forbidden',
      message: 'You do not have access to this content',
    };
    
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseMessage = '<response>';
        responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
        responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
        responseMessage = `${responseMessage} </response>`;

        // return response passing out string and content type
        return respond(request, response, 403,'text/xml',responseMessage);
    }
    
    const successString = JSON.stringify(responseMessage);
  // send our json with a success status code
  respond(request, response, 403,'application/json',successString);
};

const internal = (request, response, acceptedTypes) => {
    // message to send
    const responseMessage = {
      title: 'Internal Server Error',
      message: 'Internal Server Error, Something went wrong',
    };
    
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseMessage = '<response>';
        responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
        responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
        responseMessage = `${responseMessage} </response>`;

        // return response passing out string and content type
        return respond(request, response, 500,'text/xml',responseMessage);
    }
    
    const successString = JSON.stringify(responseMessage);
  // send our json with a success status code
  respond(request, response, 500,'application/json',successString);
};

const notImplemented = (request, response, acceptedTypes) => {
    // message to send
    const responseMessage = {
      title: 'Not Implemented',
      message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    };
    
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseMessage = '<response>';
        responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
        responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
        responseMessage = `${responseMessage} </response>`;

        // return response passing out string and content type
        return respond(request, response, 501,'text/xml',responseMessage);
    }
    
    const successString = JSON.stringify(responseMessage);
  // send our json with a success status code
  respond(request, response, 501,'application/json',successString);
};

const notFound = (request, response, acceptedTypes) => {
    // message to send
    const responseMessage = {
      title: 'Resource Not Found',
      message: 'This page you are looking for was not found',
    };
    
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseMessage = '<response>';
        responseMessage = `${responseMessage} <title>${responseMessage.title}</title>`;
        responseMessage = `${responseMessage} <message>${responseMessage.message}</message>`;
        responseMessage = `${responseMessage} </response>`;

        // return response passing out string and content type
        return respond(request, response, 404,'text/xml',responseMessage);
    }
    
    const successString = JSON.stringify(responseMessage);
  // send our json with a success status code
  respond(request, response, 404,'application/json',successString);
};

module.exports = {
    success,
    badReq,
    unauth,
    forbid,
    internal,
    notImplemented,
    notFound,
};