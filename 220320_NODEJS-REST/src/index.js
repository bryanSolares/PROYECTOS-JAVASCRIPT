const http = require('http');
const {
    bodyParse
} = require('./lib/bodyParse')

let database = [];

function getTasksHandler(request, response) {
    //Hethers
    response.writeHead(200, {
        'Content-type': 'application/json'
    });
    response.write(JSON.stringify(database));
    response.end();
}

async function createTaskHandler(request, response) {
    try {
        await bodyParse(request);
        database.push(request.body);
        console.log(request.body);
        response.writeHead(200, {
            'Content-type': 'application/json'
        });
        response.write(JSON.stringify(database));
        response.end();
    } catch (error) {
        response.writeHead(400, {
            'Content-type': 'text/plain'
        });
        response.write('Invalid Data');
        response.end();
    }
}

async function updateTaskHandler(request, response) {
    try {
        let {
            url
        } = request;
        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        //console.log(idQuery,'/',idKey,'/',idValue);
        //console.log(request)

        if (idKey === 'id') {
            await bodyParse(request);
            database[idValue - 1] = request.body;
            response.writeHead(200, {
                'Content-type': 'application/json'
            });
            response.write(JSON.stringify(database));
            response.end();
        } else {
            response.writeHead(200, {
                'Content-type': 'text/plain'
            });
            response.write('Invalid request query');
            response.end();
        }
    } catch (error) {
        response.writeHead(400, {
            'Content-type': 'text/plain'
        });
        response.write('Invalid body data was provided', error.message);
        response.end();
    }


}

async function deleteTaskHandler(request, response) {
    let {
        url
    } = request;
    let idQuery = url.split("?")[1];
    let idKey = idQuery.split("=")[0];
    let idValue = idQuery.split("=")[1];

    if (idKey === 'id') {
        database.splice(idValue - 1, 1);
        response.writeHead(200, {
            'Content-type': 'application/json'
        });
        response.write(JSON.stringify({
            message: 'Delete successfully'
        }));
        response.end();
    } else {
        response.writeHead(400, {
            'Content-type': 'application/json'
        });
        response.write(JSON.stringify({
            message: 'Invalid Query'
        }));
        response.end();
    }
}


const server = http.createServer((request, response) => {
    const {
        url,
        method
    } = request;

    //Logger
    console.log(`${url} - ${method}`);

    //routes
    switch (method) {
        case 'GET':
            if (url === '/') {
                //Hethers
                response.writeHead(200, {
                    'Content-type': 'application/json'
                });
                response.write(JSON.stringify({
                    message: 'Hello World'
                }));
                response.end();
            }
            if (url === '/tasks') {
                getTasksHandler(request, response)
            }
            break;
        case 'POST':
            if (url === '/task') {
                createTaskHandler(request, response);
            }
            break;
        case 'PUT':
            updateTaskHandler(request, response);
            break;
        case 'DELETE':
            deleteTaskHandler(request, response);
            break;
        default:
            response.writeHead(404, {
                'Content-type': 'application/json'
            });
            response.write(JSON.stringify({
                message: '404 NOT FOUND'
            }));
            response.end();

    }

});

server.listen(3000);
console.log(`Server on port 3000`);