const express = require("express")
const app = express()
app.use(express.json())
const users = []

const userId = (id) =>{
    return users.filter(e => e.id == id)
}

app.get("/", (req,res)=>{
    try{
        const user = []
        users.forEach(e => {user.push(e)});
        (users.length > 0 ) ?res.send(user) : res.send("user not found.")
    }   catch (e){
        res.send("getting error", e)
    } 
})

app.post("/adduser", (req,res)=>{
    try{
        const {email,password,name} = req.body
        let num=1;
        users.forEach(e => {e.id = num++})
        users.push({id:num,email:email,password:password,name:name})
        res.send("successfully added user")
    }   catch (e){
        res.send("getting error", e)
    } 
})

app.get("/getUserId/:id",(req,res) =>{
    try{
    const {id} = req.params;
    const getUser = userId(id);
    (getUser.length != null) ? res.send(getUser) : res.send("user not found") 
    } catch (e){
        res.send("getting error", e)
    }  
})

app.delete("/delUser/:id",(req,res) =>{
    try{
    const {id} = req.params;
    let index = 0,flag=0 ,findId=0;
    users.forEach((e) =>{
       if(e.id == id){
        findId = index;
        flag = 1;
       }
        index++;
    })

    if(flag == 1){ 
        console.log(users.splice(findId,1))
        res.send("successfully delete ")}
    else{ res.send("user not found")}
    } catch (e){
        res.send("getting error", e)
    }  
})

app.patch("/updateUser/:id", (req,res)=>{
    try{

        const {id} = req.params
        const {password,email,name} = req.body
        let flag = 0
        users.map(e => {
            if(id == e.id){
                console.log(password); console.log(email); console.log(name);
                email == undefined ? e.email : e.email = email  
                password == undefined ? e.password :e.password = password  
                name == undefined ? e.name : e.name = name  
                flag =1
            }
        })
        flag == 1 ? res.send("successfully update") : res.send("user not found")
    }catch (e){
        res.send("getting error", e)
    }
})

app.listen(3000,()=> console.log("running server 3000"))