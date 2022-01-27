import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client";

import { getAuthorsQuery, getBooksQuery } from "../gql/queries"
import { addBookMutation } from "../gql/muations"

const RenderAuthors = ({data}) => {
	if (data.loading) return <option disabled>Loading authors...</option>

	return data.authors.map((author, index) => {
		return <option key={author.id} value={author.id}>{author.name}</option>
	})
}

export const AddBook = () => {
	const [name, setName] = useState("")
	const [genre, setGenre] = useState("")
	const [authorId, setAuthorId] = useState("")
	
	const { loading, error, data } = useQuery(getAuthorsQuery)

	const [addBook] = useMutation(addBookMutation, {
		variables: { name, genre, authorId },
		refetchQueries: [{ query: getBooksQuery}]
	})

	const handleSubmit = e => {
		e.preventDefault()
		addBook()
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<form id="add-book" onSubmit={handleSubmit}>
			<div className="field">
				<label>Book name:</label>
				<input type="text" onChange={e => setName(e.target.value)} />
			</div>
			<div className="field">
				<label>Genre:</label>
				<input type="text" onChange={e => setGenre(e.target.value)} />
			</div>
			<div className="field">
				<label>Author:</label>
				<select onChange={e => setAuthorId(e.target.value)}>
					<option>Select author</option>
					<RenderAuthors data={data}/>
				</select>
			</div>
			<button>+</button>

		</form>
	);
}