var http = require('http')
var https = require('https')

http.createServer(onRequest).listen(9000)


function onRequest (client_req, client_res) {
    console.log(client_req.url)

    const headers = {}

    // delete client_req.headers.host

    client_res.setHeader('Access-Control-Allow-Origin', '*')
    client_res.setHeader('Access-Control-Request-Method', '*')
    // client_res.setHeader('Access-Control-Request-Headers', 'x-language, accept')
    client_res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    client_res.setHeader('Access-Control-Allow-Headers', 'x-language, content-type, authorization')
    client_res.setHeader('Access-Control-Allow-Credentials', 'true')
    // client_req.headers['Access-Control-Request-Headers'] = 'x-language, accept'
    // client_res.setHeader('x-language', 'ru')

    for(const k in client_req.headers){
        if(k.toLowerCase() === 'Access-Control-Request-Headers'.toLowerCase()){
            delete client_req.headers[k];
        }
    }

    console.log(client_req.url)

    if (client_req.method === 'OPTIONS') {

        client_res.statusCode = 200
        //console.log(client_res);
        client_res.end()

        return
    }

    if (client_req.headers['content-type']) {
        headers['content-type'] = client_req.headers['content-type']
    }
    if (client_req.headers['authorization']) {
        headers['authorization'] = client_req.headers['authorization']
    }
    if (client_req.headers['application-domain']) {
        headers['application-domain'] = client_req.headers['application-domain']
    }
    if (client_req.headers['user-id']) {
        headers['user-id'] = client_req.headers['user-id']
    }
    if (client_req.headers['x-language']) {
        headers['x-language'] = client_req.headers['x-language']
    }
    // else {
    //   headers['x-language'] = 'ru'
    // }
    var options = {
        // hostname: 'localhost',
        // port: 9000,
        hostname: 'localhost',
        port: 8088,
        path: client_req.url,
        method: client_req.method,
        agent: false,
        headers: headers
    }

    var proxy = http.request(options, function (res) {
        client_res.statusCode = res.statusCode

        if (res.headers['file-name']) {
            client_res.setHeader('file-name', res.headers['file-name'])
        }

        res.pipe(client_res, {
            end: true
        })
    })

    client_req.pipe(proxy, {
        end: true
    })
}