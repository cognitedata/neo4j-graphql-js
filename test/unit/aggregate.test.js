import test from 'ava';
import { makeAugmentedSchema } from '../../src/index';
import { gql } from 'apollo-server';
import { buildSchema, graphql, printSchema } from 'graphql';
import { diff } from '@graphql-inspector/core';
import { augmentedSchemaCypherTestRunner } from '../helpers/cypherTestHelpers';

test('Test aggregate schema', async t => {
  const parseTypeDefs = gql`
    type A {
      b: String!
      c: String!
    }
  `;

  const sourceSchema = makeAugmentedSchema({
    typeDefs: parseTypeDefs,
    config: { experimental: true }
  });

  const expectedTypeDefs = /* GraphQL */ `
    directive @cypher(
      statement: String
    ) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

    directive @relation(
      name: String
      direction: _RelationDirections
      from: String
      to: String
    ) on FIELD_DEFINITION | OBJECT

    directive @additionalLabels(labels: [String]) on OBJECT

    directive @MutationMeta(
      relationship: String
      from: String
      to: String
    ) on FIELD_DEFINITION

    directive @neo4j_ignore on FIELD_DEFINITION

    directive @id on FIELD_DEFINITION

    directive @unique on FIELD_DEFINITION

    directive @index on FIELD_DEFINITION

    directive @search(index: String) on FIELD_DEFINITION

    input _ACreate {
      b: String!
      c: String!
    }

    input _AUpdate {
      b: String
      c: String
    }

    input _AWhere {
      AND: [_AWhere!]
      OR: [_AWhere!]
      b: String
      b_not: String
      b_in: [String!]
      b_not_in: [String!]
      b_regexp: String
      b_contains: String
      b_not_contains: String
      b_starts_with: String
      b_not_starts_with: String
      b_ends_with: String
      b_not_ends_with: String
    }

    input _AKeys {
      b: String
    }

    enum _AOrdering {
      b_asc
      b_desc
      c_asc
      c_desc
      _id_asc
      _id_desc
    }

    input _AFilter {
      AND: [_AFilter!]
      OR: [_AFilter!]
      b: String
      b_not: String
      b_in: [String!]
      b_not_in: [String!]
      b_regexp: String
      b_contains: String
      b_not_contains: String
      b_starts_with: String
      b_not_starts_with: String
      b_ends_with: String
      b_not_ends_with: String
      c: String
      c_not: String
      c_in: [String!]
      c_not_in: [String!]
      c_regexp: String
      c_contains: String
      c_not_contains: String
      c_starts_with: String
      c_not_starts_with: String
      c_ends_with: String
      c_not_ends_with: String
    }

    type A {
      b: String!
      c: String!

      """
      Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node.
      """
      _id: String
    }

    """
    Generated Time input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments).
    """
    input _Neo4jTimeInput {
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int
      timezone: String

      """
      Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) Time value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/time/#functions-time-create-string).
      """
      formatted: String
    }

    """
    Generated Time object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries).
    """
    type _Neo4jTime {
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int
      timezone: String

      """
      Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) Time value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function.
      """
      formatted: String
    }

    """
    Generated Date input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments).
    """
    input _Neo4jDateInput {
      year: Int
      month: Int
      day: Int

      """
      Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) Date value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/date/#functions-date-create-string).
      """
      formatted: String
    }

    """
    Generated Date object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries).
    """
    type _Neo4jDate {
      year: Int
      month: Int
      day: Int

      """
      Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) Date value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function.
      """
      formatted: String
    }

    """
    Generated DateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments).
    """
    input _Neo4jDateTimeInput {
      year: Int
      month: Int
      day: Int
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int
      timezone: String

      """
      Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) DateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/datetime/#functions-datetime-create-string).
      """
      formatted: String
    }

    """
    Generated DateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries).
    """
    type _Neo4jDateTime {
      year: Int
      month: Int
      day: Int
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int
      timezone: String

      """
      Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) DateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function.
      """
      formatted: String
    }

    """
    Generated LocalTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments).
    """
    input _Neo4jLocalTimeInput {
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int

      """
      Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) LocalTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localtime/#functions-localtime-create-string).
      """
      formatted: String
    }

    """
    Generated LocalTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries).
    """
    type _Neo4jLocalTime {
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int

      """
      Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) LocalTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function.
      """
      formatted: String
    }

    """
    Generated LocalDateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments).
    """
    input _Neo4jLocalDateTimeInput {
      year: Int
      month: Int
      day: Int
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int

      """
      Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) LocalDateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localdatetime/#functions-localdatetime-create-string).
      """
      formatted: String
    }

    """
    Generated LocalDateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries).
    """
    type _Neo4jLocalDateTime {
      year: Int
      month: Int
      day: Int
      hour: Int
      minute: Int
      second: Int
      millisecond: Int
      microsecond: Int
      nanosecond: Int

      """
      Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) LocalDateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function.
      """
      formatted: String
    }

    input _Neo4jPointDistanceFilter {
      point: _Neo4jPointInput!
      distance: Float!
    }

    """
    Generated Point input object for Neo4j [Spatial field arguments](https://grandstack.io/docs/graphql-spatial-types/#point-query-arguments).
    """
    input _Neo4jPointInput {
      x: Float
      y: Float
      z: Float
      longitude: Float
      latitude: Float
      height: Float
      crs: String
      srid: Int
    }

    """
    Generated Point object type for Neo4j [Spatial fields](https://grandstack.io/docs/graphql-spatial-types#using-point-in-queries).
    """
    type _Neo4jPoint {
      x: Float
      y: Float
      z: Float
      longitude: Float
      latitude: Float
      height: Float
      crs: String
      srid: Int
    }

    """
    Generated Count object type for Neo4j [Count fields](https://grandstack.io/docs/graphql-spatial-types#using-count-in-queries).
    """
    type _Neo4jCount {
      count: Int
    }

    enum _RelationDirections {
      IN
      OUT
    }

    type Query {
      """
      [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for A type nodes.
      """
      A(
        b: String
        c: String
        _id: String
        first: Int
        offset: Int
        orderBy: [_AOrdering]
        filter: _AFilter
      ): [A]

      """
      [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for counting A type nodes.
      """
      CountA(filter: _AFilter): [_Neo4jCount!]
    }

    type Mutation {
      """
      [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a A node.
      """
      CreateA(data: _ACreate!): A

      """
      [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#update) for [updating](https://neo4j.com/docs/cypher-manual/4.1/clauses/set/#set-update-a-property) a A node.
      """
      UpdateA(where: _AWhere!, data: _AUpdate!): A

      """
      [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#delete) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-single-node) a A node.
      """
      DeleteA(where: _AWhere!): A

      """
      [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#merge) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-node-derived) a A node.
      """
      MergeA(where: _AKeys!, data: _ACreate!): A
    }
  `;

  const expectedSchema = buildSchema(expectedTypeDefs);
  const differences = diff(sourceSchema, expectedSchema);

  t.assert(differences.length === 0);

  // Disabled case
  const sourceSchemaFailed = makeAugmentedSchema({
    typeDefs: parseTypeDefs,
    config: {
      count: false,
      experimental: true
    }
  });
  const differencesFailed = diff(sourceSchemaFailed, expectedSchema);

  // Added type, Added Query
  t.assert(differencesFailed.length === 2);

  try {
    await augmentedSchemaCypherTestRunner(
      t,
      `query {
        CountPerson(filter:{userId: 123}) {
          count
        }
      }`,
      {},
      'MATCH (`Person`:`Person`) WHERE (`Person`.userId = $filter.userId) RETURN {count: count(`Person`)} AS _Neo4jCount ',
      {
        cypherParams: {
          userId: 'user-id'
        },
        filter: { userId: '123' },
        first: -1,
        offset: 0
      }
    );
    return;
  } catch (e) {
    console.log(e);
    t.fail();
  }
});
