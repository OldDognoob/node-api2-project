const app= require('./apis/server.js')

const PORT = 3333;

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
});