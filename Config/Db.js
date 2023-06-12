const mongoose = require('mongoose')

const DBConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://brendanxure:xurecoder2022@cluster0.vzihnbw.mongodb.net/Commerce")
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = DBConnect