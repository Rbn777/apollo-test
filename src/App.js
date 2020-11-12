import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const SPACEX_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
      id
    }
  }
`;

function SpaceXLaunches() {
  const { loading, error, data } = useQuery(SPACEX_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map(({ rocket, details, launch_date_utc, launch_success, id }) => (
    <div key={id} className='LaunchCard'>
      <h3>
        date: {launch_date_utc}, success: {launch_success? 'Yes' : 'No'}
      </h3>
      <h5>Rocket: {rocket.rocket_name}</h5>
      <p>{details}</p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='Container'>
        <SpaceXLaunches />
      </div>
    </ApolloProvider>
  );
}

export default App;
