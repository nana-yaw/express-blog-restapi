require("dotenv").config()
const cors = require("cors")
const express = require("express")
const paginate = require("express-paginate")
const passport = require("passport")
const { connect } = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("./swagger_output.json")
const app = express()
const router = require("./routes/index")

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
require("./middleware/passport-middleware")(passport)

app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT))
app.use(router)
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile))
const runApp = async () => {
    try {
        let mongoConnect = (process.env.NODE_ENV === "production") ?  process.env.MONGO_URL : process.env.MONGO_DB
        await connect(mongoConnect, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log(`DB Connected on: ${mongoConnect}`);
        app.listen(process.env.PORT, () => {
            console.log('Backend is running!');
            console.log(`Visit swagger docs on ${process.env.APP_URL}:${process.env.PORT}/doc`);
        })
    } catch (error) {
        console.log(error);
        runApp()
    }
}

runApp()