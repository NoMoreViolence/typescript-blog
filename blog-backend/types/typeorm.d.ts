export class AbstractRepository {
  createQueryBuilder(alias: any): any;
  createQueryBuilderFor(entity: any, alias: any): any;
  getCustomRepositoryTarget(customRepository: any): any;
  getRepositoryFor(entity: any): any;
  getTreeRepositoryFor(entity: any): any;
}
export class AdvancedConsoleLogger {
  constructor(options: any);
  options: any;
  log(level: any, message: any, queryRunner: any): void;
  logMigration(message: any, queryRunner: any): void;
  logQuery(query: any, parameters: any, queryRunner: any): void;
  logQueryError(error: any, query: any, parameters: any, queryRunner: any): void;
  logQuerySlow(time: any, query: any, parameters: any, queryRunner: any): void;
  logSchemaBuild(message: any, queryRunner: any): void;
  stringifyParams(parameters: any): any;
}
export function AfterInsert(): any;
export function AfterLoad(): any;
export function AfterRemove(): any;
export function AfterUpdate(): any;
export function Any(value: any): any;
export class BaseEntity {
  static clear(): any;
  static count(optionsOrConditions: any): any;
  static create(entityOrEntities: any): any;
  static createQueryBuilder(alias: any): any;
  static find(optionsOrConditions: any): any;
  static findAndCount(optionsOrConditions: any): any;
  static findByIds(ids: any, optionsOrConditions: any): any;
  static findOne(optionsOrConditions: any, maybeOptions: any): any;
  static findOneOrFail(optionsOrConditions: any, maybeOptions: any): any;
  static getId(entity: any): any;
  static getRepository(): any;
  static hasId(entity: any): any;
  static insert(entity: any, options: any): any;
  static merge(mergeIntoEntity: any, ...args: any[]): any;
  static preload(entityLike: any): any;
  static query(query: any, parameters: any): any;
  static remove(entityOrEntities: any, options: any): any;
  static save(entityOrEntities: any, options: any): any;
  static target: any;
  static update(criteria: any, partialEntity: any, options: any): any;
  static useConnection(connection: any): void;
  hasId(): any;
  reload(): any;
  remove(): any;
  save(): any;
}
export function BeforeInsert(): any;
export function BeforeRemove(): any;
export function BeforeUpdate(): any;
export function Between(from: any, to: any): any;
export class Brackets {
  constructor(whereFactory: any);
  whereFactory: any;
}
export function Check(nameOrExpression: any, maybeExpression: any): any;
export function ChildEntity(discriminatorValue: any): any;
export function Column(typeOrOptions: any, options: any): any;
export class Connection {
  constructor(options: any);
  isConnected: any;
  migrations: any;
  subscribers: any;
  entityMetadatas: any;
  name: any;
  options: any;
  logger: any;
  driver: any;
  manager: any;
  namingStrategy: any;
  queryResultCache: any;
  relationLoader: any;
  relationIdLoader: any;
  buildMetadatas(): void;
  close(): any;
  connect(): any;
  createEntityManager(queryRunner: any): any;
  createQueryBuilder(entityOrRunner: any, alias: any, queryRunner: any): any;
  createQueryRunner(mode: any): any;
  dropDatabase(): any;
  findMetadata(target: any): any;
  getCustomRepository(customRepository: any): any;
  getManyToManyMetadata(entityTarget: any, relationPropertyPath: any): any;
  getMetadata(target: any): any;
  getMongoRepository(target: any): any;
  getRepository(target: any): any;
  getTreeRepository(target: any): any;
  hasMetadata(target: any): any;
  query(query: any, parameters: any, queryRunner: any): any;
  runMigrations(options: any): any;
  synchronize(dropBeforeSync: any): any;
  transaction(isolationOrRunInTransaction: any, runInTransactionParam: any): any;
  undoLastMigration(options: any): any;
}
export class ConnectionManager {
  connections: any;
  create(options: any): any;
  get(name: any): any;
  has(name: any): any;
}
export class ConnectionOptionsReader {
  constructor(options: any);
  options: any;
  all(): any;
  get(name: any): any;
  has(name: any): any;
  load(): any;
  normalizeConnectionOptions(connectionOptions: any): any;
}
export function CreateDateColumn(options: any): any;
export class DefaultNamingStrategy {
  checkConstraintName(tableOrName: any, expression: any): any;
  closureJunctionTableName(originalClosureTableName: any): any;
  columnName(propertyName: any, customName: any, embeddedPrefixes: any): any;
  defaultConstraintName(tableOrName: any, columnName: any): any;
  exclusionConstraintName(tableOrName: any, expression: any): any;
  foreignKeyName(tableOrName: any, columnNames: any): any;
  indexName(tableOrName: any, columnNames: any, where: any): any;
  joinColumnName(relationName: any, referencedColumnName: any): any;
  joinTableColumnDuplicationPrefix(columnName: any, index: any): any;
  joinTableColumnName(tableName: any, propertyName: any, columnName: any): any;
  joinTableInverseColumnName(tableName: any, propertyName: any, columnName: any): any;
  joinTableName(firstTableName: any, secondTableName: any, firstPropertyName: any, secondPropertyName: any): any;
  prefixTableName(prefix: any, tableName: any): any;
  primaryKeyName(tableOrName: any, columnNames: any): any;
  relationConstraintName(tableOrName: any, columnNames: any, where: any): any;
  relationName(propertyName: any): any;
  tableName(targetName: any, userSpecifiedName: any): any;
  uniqueConstraintName(tableOrName: any, columnNames: any): any;
}
export class DeleteQueryBuilder {
  constructor(connectionOrQueryBuilder: any, queryRunner: any);
  andWhere(where: any, parameters: any): any;
  andWhereInIds(ids: any): any;
  callListeners(enabled: any): any;
  clone(): any;
  computeWhereParameter(where: any): any;
  createDeleteExpression(): any;
  createFromAlias(entityTarget: any, aliasName: any): any;
  createQueryBuilder(): any;
  createReturningExpression(): any;
  createWhereExpression(): any;
  createWhereExpressionString(): any;
  createWhereIdsExpression(ids: any): any;
  disableEscaping(): any;
  escape(name: any): any;
  execute(): any;
  from(entityTarget: any, aliasName: any): any;
  getMainTableName(): any;
  getParameters(): any;
  getQuery(): any;
  getQueryAndParameters(): any;
  getReturningColumns(): any;
  getSql(): any;
  getTableName(tablePath: any): any;
  hasRelation(target: any, relation: any): any;
  insert(): any;
  obtainQueryRunner(): any;
  orWhere(where: any, parameters: any): any;
  orWhereInIds(ids: any): any;
  output(output: any): any;
  printSql(): any;
  relation(entityTargetOrPropertyPath: any, maybePropertyPath: any, ...args: any[]): any;
  replacePropertyNames(statement: any): any;
  returning(returning: any): any;
  select(selection: any, selectionAliasName: any): any;
  setNativeParameters(parameters: any): any;
  setParameter(key: any, value: any): any;
  setParameters(parameters: any): any;
  setQueryRunner(queryRunner: any): any;
  update(entityOrTableNameUpdateSet: any, maybeUpdateSet: any): any;
  useTransaction(enabled: any): any;
  where(where: any, parameters: any): any;
  whereInIds(ids: any): any;
}
export function DeleteResult(): void;
export function Entity(nameOrOptions: any, maybeOptions: any): any;
export class EntityManager {
  constructor(connection: any, queryRunner: any);
  repositories: any;
  plainObjectToEntityTransformer: any;
  connection: any;
  queryRunner: any;
  clear(entityClass: any): any;
  count(entityClass: any, optionsOrConditions: any): any;
  create(entityClass: any, plainObjectOrObjects: any): any;
  createQueryBuilder(entityClass: any, alias: any, queryRunner: any): any;
  decrement(entityClass: any, conditions: any, propertyPath: any, value: any): any;
  find(entityClass: any, optionsOrConditions: any): any;
  findAndCount(entityClass: any, optionsOrConditions: any): any;
  findByIds(entityClass: any, ids: any, optionsOrConditions: any): any;
  findOne(entityClass: any, idOrOptionsOrConditions: any, maybeOptions: any): any;
  findOneOrFail(entityClass: any, idOrOptionsOrConditions: any, maybeOptions: any): any;
  getCustomRepository(customRepository: any): any;
  getId(targetOrEntity: any, maybeEntity: any, ...args: any[]): any;
  getMongoRepository(target: any): any;
  getRepository(target: any): any;
  getTreeRepository(target: any): any;
  hasId(targetOrEntity: any, maybeEntity: any, ...args: any[]): any;
  increment(entityClass: any, conditions: any, propertyPath: any, value: any): any;
  insert(target: any, entity: any): any;
  merge(entityClass: any, mergeIntoEntity: any, ...args: any[]): any;
  preload(entityClass: any, entityLike: any): any;
  query(query: any, parameters: any): any;
  release(): any;
  remove(targetOrEntity: any, maybeEntityOrOptions: any, maybeOptions: any, ...args: any[]): any;
  save(targetOrEntity: any, maybeEntityOrOptions: any, maybeOptions: any, ...args: any[]): any;
  transaction(isolationOrRunInTransaction: any, runInTransactionParam: any): any;
  update(target: any, criteria: any, partialEntity: any): any;
}
export class EntityMetadata {
  static compareIds(firstId: any, secondId: any): any;
  static createPropertyPath(metadata: any, entity: any, prefix: any): any;
  static difference(firstIdMaps: any, secondIdMaps: any): any;
  static getValueMap(entity: any, columns: any, options: any): any;
  constructor(options: any);
  childEntityMetadatas: any;
  inheritanceTree: any;
  tableType: any;
  synchronize: any;
  hasNonNullableRelations: any;
  isJunction: any;
  isClosureJunction: any;
  hasMultiplePrimaryKeys: any;
  hasUUIDGeneratedColumns: any;
  ownColumns: any;
  columns: any;
  ancestorColumns: any;
  descendantColumns: any;
  nonVirtualColumns: any;
  ownerColumns: any;
  inverseColumns: any;
  generatedColumns: any;
  primaryColumns: any;
  ownRelations: any;
  relations: any;
  eagerRelations: any;
  lazyRelations: any;
  oneToOneRelations: any;
  ownerOneToOneRelations: any;
  oneToManyRelations: any;
  manyToOneRelations: any;
  manyToManyRelations: any;
  ownerManyToManyRelations: any;
  relationsWithJoinColumns: any;
  relationIds: any;
  relationCounts: any;
  foreignKeys: any;
  embeddeds: any;
  allEmbeddeds: any;
  ownIndices: any;
  indices: any;
  uniques: any;
  ownUniques: any;
  checks: any;
  exclusions: any;
  ownListeners: any;
  listeners: any;
  afterLoadListeners: any;
  beforeInsertListeners: any;
  afterInsertListeners: any;
  beforeUpdateListeners: any;
  afterUpdateListeners: any;
  beforeRemoveListeners: any;
  afterRemoveListeners: any;
  connection: any;
  inheritancePattern: any;
  treeType: any;
  parentClosureEntityMetadata: any;
  tableMetadataArgs: any;
  target: any;
  build(): void;
  buildSchemaPath(): any;
  buildTablePath(): any;
  compareEntities(firstEntity: any, secondEntity: any): any;
  create(queryRunner: any): any;
  createPropertiesMap(): any;
  ensureEntityIdMap(id: any): any;
  extractRelationValuesFromEntity(entity: any, relations: any): any;
  findColumnWithDatabaseName(databaseName: any): any;
  findColumnWithPropertyName(propertyName: any): any;
  findColumnWithPropertyPath(propertyPath: any): any;
  findColumnsWithPropertyPath(propertyPath: any): any;
  findEmbeddedWithPropertyPath(propertyPath: any): any;
  findRelationWithPropertyPath(propertyPath: any): any;
  getEntityIdMap(entity: any): any;
  getEntityIdMixedMap(entity: any): any;
  hasAllPrimaryKeys(entity: any): any;
  hasEmbeddedWithPropertyPath(propertyPath: any): any;
  hasId(entity: any): any;
  registerColumn(column: any): void;
}
export function EntityRepository(entity: any): any;
export class EntitySchema {
  constructor(options: any);
  options: any;
}
export function Equal(value: any): any;
export function EventSubscriber(): any;
export function Exclusion(nameOrExpression: any, maybeExpression: any): any;
export class FileLogger {
  constructor(options: any);
  options: any;
  log(level: any, message: any, queryRunner: any): void;
  logMigration(message: any, queryRunner: any): void;
  logQuery(query: any, parameters: any, queryRunner: any): void;
  logQueryError(error: any, query: any, parameters: any, queryRunner: any): void;
  logQuerySlow(time: any, query: any, parameters: any, queryRunner: any): void;
  logSchemaBuild(message: any, queryRunner: any): void;
  stringifyParams(parameters: any): any;
  write(strings: any): void;
}
export class FindOperator {
  constructor(type: any, value: any, useParameter: any, multipleParameters: any);
  toSql(connection: any, aliasPath: any, parameters: any): any;
}
export function Generated(strategy: any): any;
export function In(value: any): any;
export function Index(nameOrFieldsOrOptions: any, maybeFieldsOrOptions: any, maybeOptions: any): any;
export class InsertQueryBuilder {
  constructor(...args: any[]);
  callListeners(enabled: any): any;
  clone(): any;
  computeWhereParameter(where: any): any;
  createColumnNamesExpression(): any;
  createFromAlias(entityTarget: any, aliasName: any): any;
  createInsertExpression(): any;
  createQueryBuilder(): any;
  createReturningExpression(): any;
  createValuesExpression(): any;
  createWhereExpression(): any;
  createWhereExpressionString(): any;
  createWhereIdsExpression(ids: any): any;
  disableEscaping(): any;
  escape(name: any): any;
  execute(): any;
  getInsertedColumns(): any;
  getMainTableName(): any;
  getParameters(): any;
  getQuery(): any;
  getQueryAndParameters(): any;
  getReturningColumns(): any;
  getSql(): any;
  getTableName(tablePath: any): any;
  getValueSets(): any;
  hasRelation(target: any, relation: any): any;
  insert(): any;
  into(entityTarget: any, columns: any): any;
  obtainQueryRunner(): any;
  onConflict(statement: any): any;
  orIgnore(statement: any): any;
  orUpdate(statement: any): any;
  output(output: any): any;
  printSql(): any;
  relation(entityTargetOrPropertyPath: any, maybePropertyPath: any, ...args: any[]): any;
  replacePropertyNames(statement: any): any;
  returning(returning: any): any;
  select(selection: any, selectionAliasName: any): any;
  setNativeParameters(parameters: any): any;
  setParameter(key: any, value: any): any;
  setParameters(parameters: any): any;
  setQueryRunner(queryRunner: any): any;
  update(entityOrTableNameUpdateSet: any, maybeUpdateSet: any): any;
  updateEntity(enabled: any): any;
  useTransaction(enabled: any): any;
  values(values: any): any;
}
export class InsertResult {
  identifiers: any;
  generatedMaps: any;
}
export function IsNull(): any;
export function JoinColumn(optionsOrOptionsArray: any): any;
export function JoinTable(options: any): any;
export function LessThan(value: any): any;
export function LessThanOrEqual(value: any): any;
export function Like(value: any): any;
export function ManyToMany(typeFunction: any, inverseSideOrOptions: any, options: any): any;
export function ManyToOne(typeFunction: any, inverseSideOrOptions: any, options: any): any;
export class MongoEntityManager {
  constructor(connection: any);
  aggregate(entityClassOrName: any, pipeline: any, options: any): any;
  aggregateEntity(entityClassOrName: any, pipeline: any, options: any): any;
  applyEntityTransformationToCursor(metadata: any, cursor: any): void;
  bulkWrite(entityClassOrName: any, operations: any, options: any): any;
  clear(entityClass: any): any;
  collectionIndexExists(entityClassOrName: any, indexes: any): any;
  collectionIndexInformation(entityClassOrName: any, options: any): any;
  collectionIndexes(entityClassOrName: any): any;
  convertFindManyOptionsOrConditionsToMongodbQuery(optionsOrConditions: any): any;
  convertFindOneOptionsOrConditionsToMongodbQuery(optionsOrConditions: any): any;
  convertFindOptionsOrderToOrderCriteria(order: any): any;
  convertFindOptionsSelectToProjectCriteria(selects: any): any;
  convertMixedCriteria(metadata: any, idMap: any): any;
  count(entityClassOrName: any, query: any, options: any): any;
  create(entityClass: any, plainObjectOrObjects: any): any;
  createCollectionIndex(entityClassOrName: any, fieldOrSpec: any, options: any): any;
  createCollectionIndexes(entityClassOrName: any, indexSpecs: any): any;
  createCursor(entityClassOrName: any, query: any): any;
  createEntityCursor(entityClassOrName: any, query: any): any;
  createQueryBuilder(entityClass: any, alias: any, queryRunner: any): any;
  decrement(entityClass: any, conditions: any, propertyPath: any, value: any): any;
  deleteMany(entityClassOrName: any, query: any, options: any): any;
  deleteOne(entityClassOrName: any, query: any, options: any): any;
  distinct(entityClassOrName: any, key: any, query: any, options: any): any;
  dropCollectionIndex(entityClassOrName: any, indexName: any, options: any): any;
  dropCollectionIndexes(entityClassOrName: any): any;
  find(entityClassOrName: any, optionsOrConditions: any): any;
  findAndCount(entityClassOrName: any, optionsOrConditions: any): any;
  findByIds(entityClassOrName: any, ids: any, optionsOrConditions: any): any;
  findOne(entityClassOrName: any, optionsOrConditions: any, maybeOptions: any): any;
  findOneAndDelete(entityClassOrName: any, query: any, options: any): any;
  findOneAndReplace(entityClassOrName: any, query: any, replacement: any, options: any): any;
  findOneAndUpdate(entityClassOrName: any, query: any, update: any, options: any): any;
  findOneOrFail(entityClass: any, idOrOptionsOrConditions: any, maybeOptions: any): any;
  geoHaystackSearch(entityClassOrName: any, x: any, y: any, options: any): any;
  geoNear(entityClassOrName: any, x: any, y: any, options: any): any;
  getCustomRepository(customRepository: any): any;
  getId(targetOrEntity: any, maybeEntity: any, ...args: any[]): any;
  getMongoRepository(target: any): any;
  getRepository(target: any): any;
  getTreeRepository(target: any): any;
  group(entityClassOrName: any, keys: any, condition: any, initial: any, reduce: any, finalize: any, command: any, options: any): any;
  hasId(targetOrEntity: any, maybeEntity: any, ...args: any[]): any;
  increment(entityClass: any, conditions: any, propertyPath: any, value: any): any;
  initializeOrderedBulkOp(entityClassOrName: any, options: any): any;
  initializeUnorderedBulkOp(entityClassOrName: any, options: any): any;
  insert(target: any, entity: any): any;
  insertMany(entityClassOrName: any, docs: any, options: any): any;
  insertOne(entityClassOrName: any, doc: any, options: any): any;
  isCapped(entityClassOrName: any): any;
  listCollectionIndexes(entityClassOrName: any, options: any): any;
  mapReduce(entityClassOrName: any, map: any, reduce: any, options: any): any;
  merge(entityClass: any, mergeIntoEntity: any, ...args: any[]): any;
  parallelCollectionScan(entityClassOrName: any, options: any): any;
  preload(entityClass: any, entityLike: any): any;
  query(query: any, parameters: any): any;
  reIndex(entityClassOrName: any): any;
  release(): any;
  remove(targetOrEntity: any, maybeEntityOrOptions: any, maybeOptions: any, ...args: any[]): any;
  rename(entityClassOrName: any, newName: any, options: any): any;
  replaceOne(entityClassOrName: any, query: any, doc: any, options: any): any;
  save(targetOrEntity: any, maybeEntityOrOptions: any, maybeOptions: any, ...args: any[]): any;
  stats(entityClassOrName: any, options: any): any;
  transaction(isolationOrRunInTransaction: any, runInTransactionParam: any): any;
  update(target: any, criteria: any, partialEntity: any): any;
  updateMany(entityClassOrName: any, query: any, update: any, options: any): any;
  updateOne(entityClassOrName: any, query: any, update: any, options: any): any;
  watch(entityClassOrName: any, pipeline: any, options: any): any;
}
export class MongoRepository {
  constructor(...args: any[]);
  aggregate(pipeline: any, options: any): any;
  aggregateEntity(pipeline: any, options: any): any;
  bulkWrite(operations: any, options: any): any;
  clear(): any;
  collectionIndexExists(indexes: any): any;
  collectionIndexInformation(options: any): any;
  collectionIndexes(): any;
  count(query: any, options: any): any;
  create(plainEntityLikeOrPlainEntityLikes: any): any;
  createCollectionIndex(fieldOrSpec: any, options: any): any;
  createCollectionIndexes(indexSpecs: any): any;
  createCursor(query: any): any;
  createEntityCursor(query: any): any;
  createQueryBuilder(alias: any, queryRunner: any): void;
  decrement(conditions: any, propertyPath: any, value: any): any;
  deleteMany(query: any, options: any): any;
  deleteOne(query: any, options: any): any;
  distinct(key: any, query: any, options: any): any;
  dropCollectionIndex(indexName: any, options: any): any;
  dropCollectionIndexes(): any;
  find(optionsOrConditions: any): any;
  findAndCount(optionsOrConditions: any): any;
  findByIds(ids: any, optionsOrConditions: any): any;
  findOne(optionsOrConditions: any, maybeOptions: any): any;
  findOneAndDelete(query: any, options: any): any;
  findOneAndReplace(query: any, replacement: any, options: any): any;
  findOneAndUpdate(query: any, update: any, options: any): any;
  findOneOrFail(optionsOrConditions: any, maybeOptions: any): any;
  geoHaystackSearch(x: any, y: any, options: any): any;
  geoNear(x: any, y: any, options: any): any;
  getId(entity: any): any;
  group(keys: any, condition: any, initial: any, reduce: any, finalize: any, command: any, options: any): any;
  hasId(entity: any): any;
  increment(conditions: any, propertyPath: any, value: any): any;
  initializeOrderedBulkOp(options: any): any;
  initializeUnorderedBulkOp(options: any): any;
  insert(entity: any): any;
  insertMany(docs: any, options: any): any;
  insertOne(doc: any, options: any): any;
  isCapped(): any;
  listCollectionIndexes(options: any): any;
  mapReduce(map: any, reduce: any, options: any): any;
  merge(mergeIntoEntity: any, ...args: any[]): any;
  parallelCollectionScan(options: any): any;
  preload(entityLike: any): any;
  query(query: any, parameters: any): void;
  reIndex(): any;
  remove(entityOrEntities: any, options: any): any;
  rename(newName: any, options: any): any;
  replaceOne(query: any, doc: any, options: any): any;
  save(entityOrEntities: any, options: any): any;
  stats(options: any): any;
  update(criteria: any, partialEntity: any): any;
  updateMany(query: any, update: any, options: any): any;
  updateOne(query: any, update: any, options: any): any;
}
export function MoreThan(value: any): any;
export function MoreThanOrEqual(value: any): any;
export class MssqlParameter {
  constructor(value: any, type: any, ...args: any[]);
  value: any;
  type: any;
  params: any;
}
export function Not(value: any): any;
export function ObjectIdColumn(options: any): any;
export function OneToMany(typeFunction: any, inverseSide: any, options: any): any;
export function OneToOne(typeFunction: any, inverseSideOrOptions: any, options: any): any;
export function PrimaryColumn(typeOrOptions: any, options: any): any;
export function PrimaryGeneratedColumn(strategyOrOptions: any, maybeOptions: any): any;
export function PromiseUtils(): void;
export namespace PromiseUtils {
  function create(value: any): any;
  function extractValue(object: any): any;
  function runInSequence(collection: any, callback: any): any;
  function settle(promises: any): any;
}
export class QueryBuilder {
  constructor(connectionOrQueryBuilder: any, queryRunner: any);
  connection: any;
  queryRunner: any;
  expressionMap: any;
  callListeners(enabled: any): any;
  clone(): any;
  computeWhereParameter(where: any): any;
  createFromAlias(entityTarget: any, aliasName: any): any;
  createQueryBuilder(): any;
  createReturningExpression(): any;
  createWhereExpression(): any;
  createWhereExpressionString(): any;
  createWhereIdsExpression(ids: any): any;
  disableEscaping(): any;
  escape(name: any): any;
  execute(): any;
  getMainTableName(): any;
  getParameters(): any;
  getQueryAndParameters(): any;
  getReturningColumns(): any;
  getSql(): any;
  getTableName(tablePath: any): any;
  hasRelation(target: any, relation: any): any;
  insert(): any;
  obtainQueryRunner(): any;
  printSql(): any;
  relation(entityTargetOrPropertyPath: any, maybePropertyPath: any, ...args: any[]): any;
  replacePropertyNames(statement: any): any;
  select(selection: any, selectionAliasName: any): any;
  setNativeParameters(parameters: any): any;
  setParameter(key: any, value: any): any;
  setParameters(parameters: any): any;
  setQueryRunner(queryRunner: any): any;
  update(entityOrTableNameUpdateSet: any, maybeUpdateSet: any): any;
  useTransaction(enabled: any): any;
}
export function QueryFailedError(query: any, parameters: any, driverError: any): any;
export namespace QueryFailedError {
  function captureStackTrace(p0: any, p1: any): any;
  const stackTraceLimit: number;
}
export function Raw(value: any): any;
export function RelationCount(relation: any, alias: any, queryBuilderFactory: any): any;
export function RelationId(relation: any, alias: any, queryBuilderFactory: any): any;
export class RelationQueryBuilder {
  constructor(...args: any[]);
  add(value: any): any;
  addAndRemove(added: any, removed: any): any;
  callListeners(enabled: any): any;
  clone(): any;
  computeWhereParameter(where: any): any;
  createFromAlias(entityTarget: any, aliasName: any): any;
  createQueryBuilder(): any;
  createReturningExpression(): any;
  createWhereExpression(): any;
  createWhereExpressionString(): any;
  createWhereIdsExpression(ids: any): any;
  disableEscaping(): any;
  escape(name: any): any;
  execute(): any;
  getMainTableName(): any;
  getParameters(): any;
  getQuery(): any;
  getQueryAndParameters(): any;
  getReturningColumns(): any;
  getSql(): any;
  getTableName(tablePath: any): any;
  hasRelation(target: any, relation: any): any;
  insert(): any;
  loadMany(): any;
  loadOne(): any;
  obtainQueryRunner(): any;
  of(entity: any): any;
  printSql(): any;
  relation(entityTargetOrPropertyPath: any, maybePropertyPath: any, ...args: any[]): any;
  remove(value: any): any;
  replacePropertyNames(statement: any): any;
  select(selection: any, selectionAliasName: any): any;
  set(value: any): any;
  setNativeParameters(parameters: any): any;
  setParameter(key: any, value: any): any;
  setParameters(parameters: any): any;
  setQueryRunner(queryRunner: any): any;
  update(entityOrTableNameUpdateSet: any, maybeUpdateSet: any): any;
  useTransaction(enabled: any): any;
}
export class Repository {
  clear(): any;
  count(optionsOrConditions: any): any;
  create(plainEntityLikeOrPlainEntityLikes: any): any;
  createQueryBuilder(alias: any, queryRunner: any): any;
  decrement(conditions: any, propertyPath: any, value: any): any;
  find(optionsOrConditions: any): any;
  findAndCount(optionsOrConditions: any): any;
  findByIds(ids: any, optionsOrConditions: any): any;
  findOne(optionsOrConditions: any, maybeOptions: any): any;
  findOneOrFail(optionsOrConditions: any, maybeOptions: any): any;
  getId(entity: any): any;
  hasId(entity: any): any;
  increment(conditions: any, propertyPath: any, value: any): any;
  insert(entity: any): any;
  merge(mergeIntoEntity: any, ...args: any[]): any;
  preload(entityLike: any): any;
  query(query: any, parameters: any): any;
  remove(entityOrEntities: any, options: any): any;
  save(entityOrEntities: any, options: any): any;
  update(criteria: any, partialEntity: any): any;
}
export class SelectQueryBuilder {
  constructor(...args: any[]);
  addFrom(entityTarget: any, aliasName: any): any;
  addGroupBy(groupBy: any): any;
  addOrderBy(sort: any, order: any, nulls: any): any;
  addSelect(selection: any, selectionAliasName: any): any;
  andHaving(having: any, parameters: any): any;
  andWhere(where: any, parameters: any): any;
  andWhereInIds(ids: any): any;
  buildEscapedEntityColumnSelects(aliasName: any, metadata: any): any;
  cache(enabledOrMillisecondsOrId: any, maybeMilliseconds: any): any;
  callListeners(enabled: any): any;
  clone(): any;
  computeWhereParameter(where: any): any;
  createFromAlias(entityTarget: any, aliasName: any): any;
  createGroupByExpression(): any;
  createHavingExpression(): any;
  createJoinExpression(): any;
  createLimitOffsetExpression(): any;
  createLockExpression(): any;
  createOrderByCombinedWithSelectExpression(parentAlias: any): any;
  createOrderByExpression(): any;
  createQueryBuilder(): any;
  createReturningExpression(): any;
  createSelectExpression(): any;
  createWhereExpression(): any;
  createWhereExpressionString(): any;
  createWhereIdsExpression(ids: any): any;
  disableEscaping(): any;
  escape(name: any): any;
  execute(): any;
  executeCountQuery(queryRunner: any): any;
  executeEntitiesAndRawResults(queryRunner: any): any;
  findEntityColumnSelects(aliasName: any, metadata: any): any;
  from(entityTarget: any, aliasName: any): any;
  getCount(): any;
  getMainTableName(): any;
  getMany(): any;
  getManyAndCount(): any;
  getOne(): any;
  getParameters(): any;
  getQuery(): any;
  getQueryAndParameters(): any;
  getRawAndEntities(): any;
  getRawMany(): any;
  getRawOne(): any;
  getReturningColumns(): any;
  getSql(): any;
  getTableName(tablePath: any): any;
  groupBy(groupBy: any): any;
  hasRelation(target: any, relation: any): any;
  having(having: any, parameters: any): any;
  innerJoin(entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  innerJoinAndMapMany(mapToProperty: any, entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  innerJoinAndMapOne(mapToProperty: any, entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  innerJoinAndSelect(entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  insert(): any;
  join(direction: any, entityOrProperty: any, aliasName: any, condition: any, parameters: any, mapToProperty: any, isMappingMany: any): void;
  leftJoin(entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  leftJoinAndMapMany(mapToProperty: any, entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  leftJoinAndMapOne(mapToProperty: any, entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  leftJoinAndSelect(entityOrProperty: any, alias: any, condition: any, parameters: any): any;
  limit(limit: any): any;
  loadAllRelationIds(options: any): any;
  loadRawResults(queryRunner: any): any;
  loadRelationCountAndMap(mapToProperty: any, relationName: any, aliasName: any, queryBuilderFactory: any): any;
  loadRelationIdAndMap(mapToProperty: any, relationName: any, aliasNameOrOptions: any, queryBuilderFactory: any): any;
  mergeExpressionMap(expressionMap: any): any;
  normalizeNumber(num: any): any;
  obtainQueryRunner(): any;
  offset(offset: any): any;
  orHaving(having: any, parameters: any): any;
  orWhere(where: any, parameters: any): any;
  orWhereInIds(ids: any): any;
  orderBy(sort: any, order: any, nulls: any): any;
  printSql(): any;
  relation(entityTargetOrPropertyPath: any, maybePropertyPath: any, ...args: any[]): any;
  replacePropertyNames(statement: any): any;
  select(selection: any, selectionAliasName: any): any;
  setLock(lockMode: any, lockVersion: any): any;
  setNativeParameters(parameters: any): any;
  setOption(option: any): any;
  setParameter(key: any, value: any): any;
  setParameters(parameters: any): any;
  setQueryRunner(queryRunner: any): any;
  skip(skip: any): any;
  stream(): any;
  subQuery(): any;
  take(take: any): any;
  update(entityOrTableNameUpdateSet: any, maybeUpdateSet: any): any;
  useTransaction(enabled: any): any;
  where(where: any, parameters: any): any;
  whereInIds(ids: any): any;
}
export class SimpleConsoleLogger {
  constructor(options: any);
  options: any;
  log(level: any, message: any, queryRunner: any): void;
  logMigration(message: any, queryRunner: any): void;
  logQuery(query: any, parameters: any, queryRunner: any): void;
  logQueryError(error: any, query: any, parameters: any, queryRunner: any): void;
  logQuerySlow(time: any, query: any, parameters: any, queryRunner: any): void;
  logSchemaBuild(message: any, queryRunner: any): void;
  stringifyParams(parameters: any): any;
}
export class Table {
  static create(entityMetadata: any, driver: any): any;
  constructor(options: any);
  columns: any;
  indices: any;
  foreignKeys: any;
  uniques: any;
  checks: any;
  exclusions: any;
  justCreated: any;
  name: any;
  engine: any;
  addCheckConstraint(checkConstraint: any): void;
  addColumn(column: any): void;
  addExclusionConstraint(exclusionConstraint: any): void;
  addForeignKey(foreignKey: any): void;
  addIndex(index: any, isMysql: any): void;
  addUniqueConstraint(uniqueConstraint: any): void;
  clone(): any;
  findColumnByName(name: any): any;
  findColumnChecks(column: any): any;
  findColumnForeignKeys(column: any): any;
  findColumnIndices(column: any): any;
  findColumnUniques(column: any): any;
  removeCheckConstraint(removedCheck: any): void;
  removeColumn(column: any): void;
  removeExclusionConstraint(removedExclusion: any): void;
  removeForeignKey(removedForeignKey: any): void;
  removeIndex(tableIndex: any, isMysql: any): void;
  removeUniqueConstraint(removedUnique: any): void;
}
export class TableColumn {
  constructor(options: any);
  isNullable: any;
  isGenerated: any;
  isPrimary: any;
  isUnique: any;
  isArray: any;
  length: any;
  zerofill: any;
  unsigned: any;
  name: any;
  type: any;
  width: any;
  charset: any;
  collation: any;
  precision: any;
  scale: any;
  default: any;
  onUpdate: any;
  generationStrategy: any;
  comment: any;
  enum: any;
  asExpression: any;
  generatedType: any;
  spatialFeatureType: any;
  srid: any;
  clone(): any;
}
export class TableForeignKey {
  static create(metadata: any): any;
  constructor(options: any);
  columnNames: any;
  referencedColumnNames: any;
  name: any;
  referencedTableName: any;
  onDelete: any;
  onUpdate: any;
  clone(): any;
}
export class TableIndex {
  static create(indexMetadata: any): any;
  constructor(options: any);
  columnNames: any;
  name: any;
  isUnique: any;
  isSpatial: any;
  isFulltext: any;
  where: any;
  clone(): any;
}
export function TableInheritance(options: any): any;
export function Transaction(connectionOrOptions: any): any;
export function TransactionManager(): any;
export function TransactionRepository(entityType: any): any;
export function Tree(type: any): any;
export function TreeChildren(options: any): any;
export function TreeLevelColumn(): any;
export function TreeParent(): any;
export class TreeRepository {
  constructor(...args: any[]);
  buildChildrenEntityTree(entity: any, entities: any, relationMaps: any): void;
  buildParentEntityTree(entity: any, entities: any, relationMaps: any): void;
  clear(): any;
  count(optionsOrConditions: any): any;
  countAncestors(entity: any): any;
  countDescendants(entity: any): any;
  create(plainEntityLikeOrPlainEntityLikes: any): any;
  createAncestorsQueryBuilder(alias: any, closureTableAlias: any, entity: any): any;
  createDescendantsQueryBuilder(alias: any, closureTableAlias: any, entity: any): any;
  createQueryBuilder(alias: any, queryRunner: any): any;
  createRelationMaps(alias: any, rawResults: any): any;
  decrement(conditions: any, propertyPath: any, value: any): any;
  find(optionsOrConditions: any): any;
  findAncestors(entity: any): any;
  findAncestorsTree(entity: any): any;
  findAndCount(optionsOrConditions: any): any;
  findByIds(ids: any, optionsOrConditions: any): any;
  findDescendants(entity: any): any;
  findDescendantsTree(entity: any): any;
  findOne(optionsOrConditions: any, maybeOptions: any): any;
  findOneOrFail(optionsOrConditions: any, maybeOptions: any): any;
  findRoots(): any;
  findTrees(): any;
  getId(entity: any): any;
  hasId(entity: any): any;
  increment(conditions: any, propertyPath: any, value: any): any;
  insert(entity: any): any;
  merge(mergeIntoEntity: any, ...args: any[]): any;
  preload(entityLike: any): any;
  query(query: any, parameters: any): any;
  remove(entityOrEntities: any, options: any): any;
  save(entityOrEntities: any, options: any): any;
  update(criteria: any, partialEntity: any): any;
}
export function Unique(nameOrFields: any, maybeFields: any): any;
export function UpdateDateColumn(options: any): any;
export class UpdateQueryBuilder {
  constructor(connectionOrQueryBuilder: any, queryRunner: any);
  addOrderBy(sort: any, order: any, nulls: any): any;
  andWhere(where: any, parameters: any): any;
  andWhereInIds(ids: any): any;
  callListeners(enabled: any): any;
  clone(): any;
  computeWhereParameter(where: any): any;
  createFromAlias(entityTarget: any, aliasName: any): any;
  createLimitExpression(): any;
  createOrderByExpression(): any;
  createQueryBuilder(): any;
  createReturningExpression(): any;
  createUpdateExpression(): any;
  createWhereExpression(): any;
  createWhereExpressionString(): any;
  createWhereIdsExpression(ids: any): any;
  disableEscaping(): any;
  escape(name: any): any;
  execute(): any;
  getMainTableName(): any;
  getParameters(): any;
  getQuery(): any;
  getQueryAndParameters(): any;
  getReturningColumns(): any;
  getSql(): any;
  getTableName(tablePath: any): any;
  getValueSet(): any;
  hasRelation(target: any, relation: any): any;
  insert(): any;
  limit(limit: any): any;
  obtainQueryRunner(): any;
  orWhere(where: any, parameters: any): any;
  orWhereInIds(ids: any): any;
  orderBy(sort: any, order: any, nulls: any): any;
  output(output: any): any;
  printSql(): any;
  relation(entityTargetOrPropertyPath: any, maybePropertyPath: any, ...args: any[]): any;
  replacePropertyNames(statement: any): any;
  returning(returning: any): any;
  select(selection: any, selectionAliasName: any): any;
  set(values: any): any;
  setNativeParameters(parameters: any): any;
  setParameter(key: any, value: any): any;
  setParameters(parameters: any): any;
  setQueryRunner(queryRunner: any): any;
  update(entityOrTableNameUpdateSet: any, maybeUpdateSet: any): any;
  updateEntity(enabled: any): any;
  useTransaction(enabled: any): any;
  where(where: any, parameters: any): any;
  whereEntity(entity: any): any;
  whereInIds(ids: any): any;
}
export class UpdateResult {
  generatedMaps: any;
}
export function VersionColumn(options: any): any;
export function createConnection(optionsOrName: any): any;
export function createConnections(options: any): any;
export function createQueryBuilder(entityClass: any, alias: any, connectionName: any): any;
export function getConnection(connectionName: any): any;
export function getConnectionManager(): any;
export function getConnectionOptions(connectionName: any): any;
export function getCustomRepository(customRepository: any, connectionName: any): any;
export function getFromContainer(someClass: any): any;
export function getManager(connectionName: any): any;
export function getMetadataArgsStorage(): any;
export function getMongoManager(connectionName: any): any;
export function getMongoRepository(entityClass: any, connectionName: any): any;
export function getRepository(entityClass: any, connectionName: any): any;
export function getSqljsManager(connectionName: any): any;
export function getTreeRepository(entityClass: any, connectionName: any): any;
export function useContainer(iocContainer: any, options: any): void;
