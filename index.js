const app= require('./apis/server.js')

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
});