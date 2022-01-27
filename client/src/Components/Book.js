
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { getBooksQuery } from "../gql/queries"

import { BookDetails } from "./BookDetails";

export const Book = () => {
	const [bookId, setBookId] = useState(null)

	const { loading, error, data } = useQuery(getBooksQuery)

	const handleBookClick = bookId => {
		console.log(bookId);
		setBookId(bookId)
	}

	const RenderBooks = ({ data }) => {
		if (data.loading) return <p>Loading...</p>

		return data.books.map((book, index) => {
			return <li key={book.id} onClick={() => handleBookClick(book.id)}>{book.name}</li>
		})
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<ul id="book-list">
				<RenderBooks data={data}/>
				<BookDetails bookId={bookId} />
			</ul>
		</>
	);
}