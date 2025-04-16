const mongoose =require("mongoose")
const DB_URL="mongodb+srv://gulnaz:gulnaz1234@cluster0.9myoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const DB_NAME="blogger"

async function dbConnect()
{
    try{
        await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log("database connected")
    }
    catch(error)
    {
        throw error
    }
}
module.exports=dbConnect