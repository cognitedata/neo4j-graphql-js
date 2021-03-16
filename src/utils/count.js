import { Neo4jTypeName } from '../augment/types/types';
import { lowFirstLetter } from '../utils';

export const isCountQuery = returnVariable =>
  returnVariable === `${Neo4jTypeName}Count`;

export const getReturnTypeDetails = (
  isCount,
  resolveInfo,
  returnVariableName,
  returnTypeName,
  returnSchemaType
) => {
  const variableName = isCount
    ? lowFirstLetter(resolveInfo.fieldName.substr(5))
    : returnVariableName;
  const typeName = isCount ? resolveInfo.fieldName.substr(5) : returnTypeName;
  const schemaType = isCount
    ? resolveInfo.schema.getType(typeName)
    : returnSchemaType;

  return { variableName, typeName, schemaType };
};
