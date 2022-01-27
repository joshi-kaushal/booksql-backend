import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose"
import cors from "cors"
import schema from "./schema/schema.js";

// Using ES6 syntax in Node so __dirname is not available out of the box
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
mongoose.connect("mongodb+srv://kaushal:booksql@cluster0.9ldef.mongodb.net/books?retryWrites=true&w=majority")
mongoose.connection.once("open", () => console.log(`connected to database!`))

const app = express()
app.use(cors())

// PORT
const PORT = process.env.PORT || 5000

// GraphQL
app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}))

// Deployment
if(process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "./build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "./build", "index.html"));
	});
}

// Listening on port PORT || 5000
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
})

// package.json heroku postbuild script
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"