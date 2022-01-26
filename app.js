import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose"
import cors from "cors"
import path from "path"
import schema from "./schema/schema.js";


mongoose.connect("mongodb+srv://kaushal:booksql@cluster0.9ldef.mongodb.net/books?retryWrites=true&w=majority")
mongoose.connection.once("open", () => console.log(`connected to database!`))

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}))

if(process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"))
	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

app.listen(PORT, () => {
	console.log("Listening on port 4000");
})