import { makeAugmentedSchema } from '../../src/index';
import { ApolloServer } from 'apollo-server';
import neo4j from 'neo4j-driver';

// JWT

// scopes
//  "scopes": ["read:user", "create:user"]

// JWT_SECRET

const typeDefs = `
type User {
    userId: ID!
    name: String
}

type Business {
    name: String
}
`;

const schema = makeAugmentedSchema({
  typeDefs,
  config: { auth: { hasScope: true } }
});

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'letmein')
);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      req,
      driver
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});
