const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const hbs = require('handlebars');

const PORT = 8080;
const SOURCE_FOLDER_PATH = './src';

require('./helpers');

function _sendNotFount(res){
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
}

function _sendServerError(res,errorMessage){
    res.writeHead(505, {"Content-Type": "text/plain"});
    res.write(`500 Server Error\n Details: ${errorMessage}`);
    res.end();
}


http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url);
    const filePath = path.join(process.cwd(),SOURCE_FOLDER_PATH,parsedUrl.pathname+'.hbs');
    const dataPath = path.join(process.cwd(),SOURCE_FOLDER_PATH,parsedUrl.pathname+'.data.json');
    fs.stat(filePath,(err,resource)=>{
        if(err) return _sendNotFount(res);
        fs.readFile(filePath,(err,content)=>{
            if(err) return _sendServerError(res,'Cannot read file from server...');
            const template = hbs.compile(content.toString());
            fs.readFile(dataPath,(err,data)=>{
                if(err) return _sendServerError(res,'Cannot read data file from server...');
                res.end(template(JSON.parse(data.toString())));
            });
        });
    });
}).listen(PORT);

console.log('Listening on '+ PORT);