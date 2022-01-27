import { gql } from "@apollo/client";

export const getBooksQuery = gql`
 {
  books{
    name
	id
    genre
  }
}
`

export const getAuthorsQuery = gql`
 {
  authors{
    name
	id
  }
}
`

export const getBookQuery = gql`
  query($bookId: ID) {
    book(id: $bookId) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`