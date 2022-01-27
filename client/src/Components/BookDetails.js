import { useQuery } from "@apollo/client";

import { getBookQuery } from "../gql/queries"

export const BookDetails = ({bookId}) => {
	
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { bookId }	
	})
 
	if (loading) return null;

	if(data.book) {
		return <div id="book-details">
			<div>
				<h2>{data.book.name}</h2>
				<p>Genre: {data.book.genre}</p>
				<p>Author: {data.book.author.name}</p>
				<p>All books by this author:</p>
				<ul className="other-books">
					{
						data.book.author.books.map((item) => {
							return <li key={item.id} id="other-book">{item.name}</li>;
						})
					}
				</ul>
			</div>
		</div>
	} else return <p></p>
}