import { GraphQLInt } from 'graphql';
import { buildNeo4jTypes } from './types';

export const CountType = {
  COUNT: 'Count'
};
/**
 * A map of the Neo4j Count from the _Neo4jCount query
 */
export const Neo4jCount = {
  count: GraphQLInt.name
};

export const augmentCountTypes = ({ typeMap, config = {} }) => {
  return buildNeo4jTypes({
    typeMap,
    neo4jTypes: CountType,
    config
  });
};
