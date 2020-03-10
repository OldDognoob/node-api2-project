const server = require('./apis/server.js')

const PORT = 3000;

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
});