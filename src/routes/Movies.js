import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Could not fatch :( </h1>;
  }
  return (
    <div>
      <ul>
        <h1>Movies</h1>
        {data.allMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
        <h1>Tweets</h1>
        {data.allTweets.map((tweet) => (
          <li key={tweet.id}>
            {tweet.text}/by: {tweet.author.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
}
