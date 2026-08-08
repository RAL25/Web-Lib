
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Funcionario
 * 
 */
export type Funcionario = $Result.DefaultSelection<Prisma.$FuncionarioPayload>
/**
 * Model Livro
 * 
 */
export type Livro = $Result.DefaultSelection<Prisma.$LivroPayload>
/**
 * Model ExemplarLivro
 * 
 */
export type ExemplarLivro = $Result.DefaultSelection<Prisma.$ExemplarLivroPayload>
/**
 * Model Emprestimo
 * 
 */
export type Emprestimo = $Result.DefaultSelection<Prisma.$EmprestimoPayload>
/**
 * Model ItemEmprestimo
 * 
 */
export type ItemEmprestimo = $Result.DefaultSelection<Prisma.$ItemEmprestimoPayload>
/**
 * Model Configuracao
 * 
 */
export type Configuracao = $Result.DefaultSelection<Prisma.$ConfiguracaoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  Cliente: 'Cliente',
  Funcionario: 'Funcionario',
  Admin: 'Admin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const LivroStatus: {
  Disponivel: 'Disponivel',
  Emprestado: 'Emprestado'
};

export type LivroStatus = (typeof LivroStatus)[keyof typeof LivroStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type LivroStatus = $Enums.LivroStatus

export const LivroStatus: typeof $Enums.LivroStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.funcionario`: Exposes CRUD operations for the **Funcionario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Funcionarios
    * const funcionarios = await prisma.funcionario.findMany()
    * ```
    */
  get funcionario(): Prisma.FuncionarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.livro`: Exposes CRUD operations for the **Livro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Livros
    * const livros = await prisma.livro.findMany()
    * ```
    */
  get livro(): Prisma.LivroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exemplarLivro`: Exposes CRUD operations for the **ExemplarLivro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExemplarLivros
    * const exemplarLivros = await prisma.exemplarLivro.findMany()
    * ```
    */
  get exemplarLivro(): Prisma.ExemplarLivroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emprestimo`: Exposes CRUD operations for the **Emprestimo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emprestimos
    * const emprestimos = await prisma.emprestimo.findMany()
    * ```
    */
  get emprestimo(): Prisma.EmprestimoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemEmprestimo`: Exposes CRUD operations for the **ItemEmprestimo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemEmprestimos
    * const itemEmprestimos = await prisma.itemEmprestimo.findMany()
    * ```
    */
  get itemEmprestimo(): Prisma.ItemEmprestimoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuracao`: Exposes CRUD operations for the **Configuracao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configuracaos
    * const configuracaos = await prisma.configuracao.findMany()
    * ```
    */
  get configuracao(): Prisma.ConfiguracaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Cliente: 'Cliente',
    Funcionario: 'Funcionario',
    Livro: 'Livro',
    ExemplarLivro: 'ExemplarLivro',
    Emprestimo: 'Emprestimo',
    ItemEmprestimo: 'ItemEmprestimo',
    Configuracao: 'Configuracao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "cliente" | "funcionario" | "livro" | "exemplarLivro" | "emprestimo" | "itemEmprestimo" | "configuracao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Funcionario: {
        payload: Prisma.$FuncionarioPayload<ExtArgs>
        fields: Prisma.FuncionarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FuncionarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FuncionarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload>
          }
          findFirst: {
            args: Prisma.FuncionarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FuncionarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload>
          }
          findMany: {
            args: Prisma.FuncionarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload>[]
          }
          create: {
            args: Prisma.FuncionarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload>
          }
          createMany: {
            args: Prisma.FuncionarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FuncionarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload>
          }
          update: {
            args: Prisma.FuncionarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload>
          }
          deleteMany: {
            args: Prisma.FuncionarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FuncionarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FuncionarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuncionarioPayload>
          }
          aggregate: {
            args: Prisma.FuncionarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFuncionario>
          }
          groupBy: {
            args: Prisma.FuncionarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<FuncionarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.FuncionarioCountArgs<ExtArgs>
            result: $Utils.Optional<FuncionarioCountAggregateOutputType> | number
          }
        }
      }
      Livro: {
        payload: Prisma.$LivroPayload<ExtArgs>
        fields: Prisma.LivroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LivroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LivroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload>
          }
          findFirst: {
            args: Prisma.LivroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LivroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload>
          }
          findMany: {
            args: Prisma.LivroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload>[]
          }
          create: {
            args: Prisma.LivroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload>
          }
          createMany: {
            args: Prisma.LivroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LivroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload>
          }
          update: {
            args: Prisma.LivroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload>
          }
          deleteMany: {
            args: Prisma.LivroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LivroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LivroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LivroPayload>
          }
          aggregate: {
            args: Prisma.LivroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLivro>
          }
          groupBy: {
            args: Prisma.LivroGroupByArgs<ExtArgs>
            result: $Utils.Optional<LivroGroupByOutputType>[]
          }
          count: {
            args: Prisma.LivroCountArgs<ExtArgs>
            result: $Utils.Optional<LivroCountAggregateOutputType> | number
          }
        }
      }
      ExemplarLivro: {
        payload: Prisma.$ExemplarLivroPayload<ExtArgs>
        fields: Prisma.ExemplarLivroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExemplarLivroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExemplarLivroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload>
          }
          findFirst: {
            args: Prisma.ExemplarLivroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExemplarLivroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload>
          }
          findMany: {
            args: Prisma.ExemplarLivroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload>[]
          }
          create: {
            args: Prisma.ExemplarLivroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload>
          }
          createMany: {
            args: Prisma.ExemplarLivroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ExemplarLivroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload>
          }
          update: {
            args: Prisma.ExemplarLivroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload>
          }
          deleteMany: {
            args: Prisma.ExemplarLivroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExemplarLivroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExemplarLivroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExemplarLivroPayload>
          }
          aggregate: {
            args: Prisma.ExemplarLivroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExemplarLivro>
          }
          groupBy: {
            args: Prisma.ExemplarLivroGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExemplarLivroGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExemplarLivroCountArgs<ExtArgs>
            result: $Utils.Optional<ExemplarLivroCountAggregateOutputType> | number
          }
        }
      }
      Emprestimo: {
        payload: Prisma.$EmprestimoPayload<ExtArgs>
        fields: Prisma.EmprestimoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmprestimoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmprestimoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload>
          }
          findFirst: {
            args: Prisma.EmprestimoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmprestimoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload>
          }
          findMany: {
            args: Prisma.EmprestimoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload>[]
          }
          create: {
            args: Prisma.EmprestimoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload>
          }
          createMany: {
            args: Prisma.EmprestimoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmprestimoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload>
          }
          update: {
            args: Prisma.EmprestimoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload>
          }
          deleteMany: {
            args: Prisma.EmprestimoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmprestimoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmprestimoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmprestimoPayload>
          }
          aggregate: {
            args: Prisma.EmprestimoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmprestimo>
          }
          groupBy: {
            args: Prisma.EmprestimoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmprestimoGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmprestimoCountArgs<ExtArgs>
            result: $Utils.Optional<EmprestimoCountAggregateOutputType> | number
          }
        }
      }
      ItemEmprestimo: {
        payload: Prisma.$ItemEmprestimoPayload<ExtArgs>
        fields: Prisma.ItemEmprestimoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemEmprestimoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemEmprestimoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload>
          }
          findFirst: {
            args: Prisma.ItemEmprestimoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemEmprestimoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload>
          }
          findMany: {
            args: Prisma.ItemEmprestimoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload>[]
          }
          create: {
            args: Prisma.ItemEmprestimoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload>
          }
          createMany: {
            args: Prisma.ItemEmprestimoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ItemEmprestimoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload>
          }
          update: {
            args: Prisma.ItemEmprestimoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload>
          }
          deleteMany: {
            args: Prisma.ItemEmprestimoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemEmprestimoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemEmprestimoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemEmprestimoPayload>
          }
          aggregate: {
            args: Prisma.ItemEmprestimoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemEmprestimo>
          }
          groupBy: {
            args: Prisma.ItemEmprestimoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemEmprestimoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemEmprestimoCountArgs<ExtArgs>
            result: $Utils.Optional<ItemEmprestimoCountAggregateOutputType> | number
          }
        }
      }
      Configuracao: {
        payload: Prisma.$ConfiguracaoPayload<ExtArgs>
        fields: Prisma.ConfiguracaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfiguracaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfiguracaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload>
          }
          findFirst: {
            args: Prisma.ConfiguracaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfiguracaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload>
          }
          findMany: {
            args: Prisma.ConfiguracaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload>[]
          }
          create: {
            args: Prisma.ConfiguracaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload>
          }
          createMany: {
            args: Prisma.ConfiguracaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConfiguracaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload>
          }
          update: {
            args: Prisma.ConfiguracaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload>
          }
          deleteMany: {
            args: Prisma.ConfiguracaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfiguracaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConfiguracaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracaoPayload>
          }
          aggregate: {
            args: Prisma.ConfiguracaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguracao>
          }
          groupBy: {
            args: Prisma.ConfiguracaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfiguracaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfiguracaoCountArgs<ExtArgs>
            result: $Utils.Optional<ConfiguracaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    cliente?: ClienteOmit
    funcionario?: FuncionarioOmit
    livro?: LivroOmit
    exemplarLivro?: ExemplarLivroOmit
    emprestimo?: EmprestimoOmit
    itemEmprestimo?: ItemEmprestimoOmit
    configuracao?: ConfiguracaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    emprestimos: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emprestimos?: boolean | ClienteCountOutputTypeCountEmprestimosArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountEmprestimosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmprestimoWhereInput
  }


  /**
   * Count Type LivroCountOutputType
   */

  export type LivroCountOutputType = {
    exemplares: number
  }

  export type LivroCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exemplares?: boolean | LivroCountOutputTypeCountExemplaresArgs
  }

  // Custom InputTypes
  /**
   * LivroCountOutputType without action
   */
  export type LivroCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LivroCountOutputType
     */
    select?: LivroCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LivroCountOutputType without action
   */
  export type LivroCountOutputTypeCountExemplaresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExemplarLivroWhereInput
  }


  /**
   * Count Type ExemplarLivroCountOutputType
   */

  export type ExemplarLivroCountOutputType = {
    itens: number
  }

  export type ExemplarLivroCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | ExemplarLivroCountOutputTypeCountItensArgs
  }

  // Custom InputTypes
  /**
   * ExemplarLivroCountOutputType without action
   */
  export type ExemplarLivroCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivroCountOutputType
     */
    select?: ExemplarLivroCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExemplarLivroCountOutputType without action
   */
  export type ExemplarLivroCountOutputTypeCountItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemEmprestimoWhereInput
  }


  /**
   * Count Type EmprestimoCountOutputType
   */

  export type EmprestimoCountOutputType = {
    itens: number
  }

  export type EmprestimoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | EmprestimoCountOutputTypeCountItensArgs
  }

  // Custom InputTypes
  /**
   * EmprestimoCountOutputType without action
   */
  export type EmprestimoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmprestimoCountOutputType
     */
    select?: EmprestimoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmprestimoCountOutputType without action
   */
  export type EmprestimoCountOutputTypeCountItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemEmprestimoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    role: $Enums.Role | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    role: $Enums.Role | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    role: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nome: string
    email: string | null
    senha: string | null
    role: $Enums.Role
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    cliente?: boolean | Usuario$clienteArgs<ExtArgs>
    funcionario?: boolean | Usuario$funcionarioArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>



  export type UsuarioSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "role", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | Usuario$clienteArgs<ExtArgs>
    funcionario?: boolean | Usuario$funcionarioArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs> | null
      funcionario: Prisma.$FuncionarioPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      email: string | null
      senha: string | null
      role: $Enums.Role
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends Usuario$clienteArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$clienteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    funcionario<T extends Usuario$funcionarioArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$funcionarioArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senha: FieldRef<"Usuario", 'String'>
    readonly role: FieldRef<"Usuario", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.cliente
   */
  export type Usuario$clienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    where?: ClienteWhereInput
  }

  /**
   * Usuario.funcionario
   */
  export type Usuario$funcionarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    where?: FuncionarioWhereInput
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteAvgAggregateOutputType = {
    id: number | null
  }

  export type ClienteSumAggregateOutputType = {
    id: number | null
  }

  export type ClienteMinAggregateOutputType = {
    id: number | null
    cpf: string | null
    telefone: string | null
    data_penalidade: Date | null
    emailVerificado: boolean | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: number | null
    cpf: string | null
    telefone: string | null
    data_penalidade: Date | null
    emailVerificado: boolean | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    cpf: number
    telefone: number
    data_penalidade: number
    emailVerificado: number
    _all: number
  }


  export type ClienteAvgAggregateInputType = {
    id?: true
  }

  export type ClienteSumAggregateInputType = {
    id?: true
  }

  export type ClienteMinAggregateInputType = {
    id?: true
    cpf?: true
    telefone?: true
    data_penalidade?: true
    emailVerificado?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    cpf?: true
    telefone?: true
    data_penalidade?: true
    emailVerificado?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    cpf?: true
    telefone?: true
    data_penalidade?: true
    emailVerificado?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClienteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClienteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _avg?: ClienteAvgAggregateInputType
    _sum?: ClienteSumAggregateInputType
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: number
    cpf: string | null
    telefone: string | null
    data_penalidade: Date | null
    emailVerificado: boolean
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cpf?: boolean
    telefone?: boolean
    data_penalidade?: boolean
    emailVerificado?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    emprestimos?: boolean | Cliente$emprestimosArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>



  export type ClienteSelectScalar = {
    id?: boolean
    cpf?: boolean
    telefone?: boolean
    data_penalidade?: boolean
    emailVerificado?: boolean
  }

  export type ClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cpf" | "telefone" | "data_penalidade" | "emailVerificado", ExtArgs["result"]["cliente"]>
  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    emprestimos?: boolean | Cliente$emprestimosArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      emprestimos: Prisma.$EmprestimoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cpf: string | null
      telefone: string | null
      data_penalidade: Date | null
      emailVerificado: boolean
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emprestimos<T extends Cliente$emprestimosArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$emprestimosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'Int'>
    readonly cpf: FieldRef<"Cliente", 'String'>
    readonly telefone: FieldRef<"Cliente", 'String'>
    readonly data_penalidade: FieldRef<"Cliente", 'DateTime'>
    readonly emailVerificado: FieldRef<"Cliente", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Cliente.emprestimos
   */
  export type Cliente$emprestimosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    where?: EmprestimoWhereInput
    orderBy?: EmprestimoOrderByWithRelationInput | EmprestimoOrderByWithRelationInput[]
    cursor?: EmprestimoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmprestimoScalarFieldEnum | EmprestimoScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Funcionario
   */

  export type AggregateFuncionario = {
    _count: FuncionarioCountAggregateOutputType | null
    _avg: FuncionarioAvgAggregateOutputType | null
    _sum: FuncionarioSumAggregateOutputType | null
    _min: FuncionarioMinAggregateOutputType | null
    _max: FuncionarioMaxAggregateOutputType | null
  }

  export type FuncionarioAvgAggregateOutputType = {
    id: number | null
    salario: Decimal | null
  }

  export type FuncionarioSumAggregateOutputType = {
    id: number | null
    salario: Decimal | null
  }

  export type FuncionarioMinAggregateOutputType = {
    id: number | null
    salario: Decimal | null
    data_contratacao: Date | null
  }

  export type FuncionarioMaxAggregateOutputType = {
    id: number | null
    salario: Decimal | null
    data_contratacao: Date | null
  }

  export type FuncionarioCountAggregateOutputType = {
    id: number
    salario: number
    data_contratacao: number
    _all: number
  }


  export type FuncionarioAvgAggregateInputType = {
    id?: true
    salario?: true
  }

  export type FuncionarioSumAggregateInputType = {
    id?: true
    salario?: true
  }

  export type FuncionarioMinAggregateInputType = {
    id?: true
    salario?: true
    data_contratacao?: true
  }

  export type FuncionarioMaxAggregateInputType = {
    id?: true
    salario?: true
    data_contratacao?: true
  }

  export type FuncionarioCountAggregateInputType = {
    id?: true
    salario?: true
    data_contratacao?: true
    _all?: true
  }

  export type FuncionarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Funcionario to aggregate.
     */
    where?: FuncionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Funcionarios to fetch.
     */
    orderBy?: FuncionarioOrderByWithRelationInput | FuncionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FuncionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Funcionarios
    **/
    _count?: true | FuncionarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FuncionarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FuncionarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FuncionarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FuncionarioMaxAggregateInputType
  }

  export type GetFuncionarioAggregateType<T extends FuncionarioAggregateArgs> = {
        [P in keyof T & keyof AggregateFuncionario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFuncionario[P]>
      : GetScalarType<T[P], AggregateFuncionario[P]>
  }




  export type FuncionarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FuncionarioWhereInput
    orderBy?: FuncionarioOrderByWithAggregationInput | FuncionarioOrderByWithAggregationInput[]
    by: FuncionarioScalarFieldEnum[] | FuncionarioScalarFieldEnum
    having?: FuncionarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FuncionarioCountAggregateInputType | true
    _avg?: FuncionarioAvgAggregateInputType
    _sum?: FuncionarioSumAggregateInputType
    _min?: FuncionarioMinAggregateInputType
    _max?: FuncionarioMaxAggregateInputType
  }

  export type FuncionarioGroupByOutputType = {
    id: number
    salario: Decimal
    data_contratacao: Date
    _count: FuncionarioCountAggregateOutputType | null
    _avg: FuncionarioAvgAggregateOutputType | null
    _sum: FuncionarioSumAggregateOutputType | null
    _min: FuncionarioMinAggregateOutputType | null
    _max: FuncionarioMaxAggregateOutputType | null
  }

  type GetFuncionarioGroupByPayload<T extends FuncionarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FuncionarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FuncionarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FuncionarioGroupByOutputType[P]>
            : GetScalarType<T[P], FuncionarioGroupByOutputType[P]>
        }
      >
    >


  export type FuncionarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    salario?: boolean
    data_contratacao?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["funcionario"]>



  export type FuncionarioSelectScalar = {
    id?: boolean
    salario?: boolean
    data_contratacao?: boolean
  }

  export type FuncionarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "salario" | "data_contratacao", ExtArgs["result"]["funcionario"]>
  export type FuncionarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $FuncionarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Funcionario"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      salario: Prisma.Decimal
      data_contratacao: Date
    }, ExtArgs["result"]["funcionario"]>
    composites: {}
  }

  type FuncionarioGetPayload<S extends boolean | null | undefined | FuncionarioDefaultArgs> = $Result.GetResult<Prisma.$FuncionarioPayload, S>

  type FuncionarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FuncionarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FuncionarioCountAggregateInputType | true
    }

  export interface FuncionarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Funcionario'], meta: { name: 'Funcionario' } }
    /**
     * Find zero or one Funcionario that matches the filter.
     * @param {FuncionarioFindUniqueArgs} args - Arguments to find a Funcionario
     * @example
     * // Get one Funcionario
     * const funcionario = await prisma.funcionario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FuncionarioFindUniqueArgs>(args: SelectSubset<T, FuncionarioFindUniqueArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Funcionario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FuncionarioFindUniqueOrThrowArgs} args - Arguments to find a Funcionario
     * @example
     * // Get one Funcionario
     * const funcionario = await prisma.funcionario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FuncionarioFindUniqueOrThrowArgs>(args: SelectSubset<T, FuncionarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Funcionario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionarioFindFirstArgs} args - Arguments to find a Funcionario
     * @example
     * // Get one Funcionario
     * const funcionario = await prisma.funcionario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FuncionarioFindFirstArgs>(args?: SelectSubset<T, FuncionarioFindFirstArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Funcionario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionarioFindFirstOrThrowArgs} args - Arguments to find a Funcionario
     * @example
     * // Get one Funcionario
     * const funcionario = await prisma.funcionario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FuncionarioFindFirstOrThrowArgs>(args?: SelectSubset<T, FuncionarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Funcionarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Funcionarios
     * const funcionarios = await prisma.funcionario.findMany()
     * 
     * // Get first 10 Funcionarios
     * const funcionarios = await prisma.funcionario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const funcionarioWithIdOnly = await prisma.funcionario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FuncionarioFindManyArgs>(args?: SelectSubset<T, FuncionarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Funcionario.
     * @param {FuncionarioCreateArgs} args - Arguments to create a Funcionario.
     * @example
     * // Create one Funcionario
     * const Funcionario = await prisma.funcionario.create({
     *   data: {
     *     // ... data to create a Funcionario
     *   }
     * })
     * 
     */
    create<T extends FuncionarioCreateArgs>(args: SelectSubset<T, FuncionarioCreateArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Funcionarios.
     * @param {FuncionarioCreateManyArgs} args - Arguments to create many Funcionarios.
     * @example
     * // Create many Funcionarios
     * const funcionario = await prisma.funcionario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FuncionarioCreateManyArgs>(args?: SelectSubset<T, FuncionarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Funcionario.
     * @param {FuncionarioDeleteArgs} args - Arguments to delete one Funcionario.
     * @example
     * // Delete one Funcionario
     * const Funcionario = await prisma.funcionario.delete({
     *   where: {
     *     // ... filter to delete one Funcionario
     *   }
     * })
     * 
     */
    delete<T extends FuncionarioDeleteArgs>(args: SelectSubset<T, FuncionarioDeleteArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Funcionario.
     * @param {FuncionarioUpdateArgs} args - Arguments to update one Funcionario.
     * @example
     * // Update one Funcionario
     * const funcionario = await prisma.funcionario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FuncionarioUpdateArgs>(args: SelectSubset<T, FuncionarioUpdateArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Funcionarios.
     * @param {FuncionarioDeleteManyArgs} args - Arguments to filter Funcionarios to delete.
     * @example
     * // Delete a few Funcionarios
     * const { count } = await prisma.funcionario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FuncionarioDeleteManyArgs>(args?: SelectSubset<T, FuncionarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Funcionarios
     * const funcionario = await prisma.funcionario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FuncionarioUpdateManyArgs>(args: SelectSubset<T, FuncionarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Funcionario.
     * @param {FuncionarioUpsertArgs} args - Arguments to update or create a Funcionario.
     * @example
     * // Update or create a Funcionario
     * const funcionario = await prisma.funcionario.upsert({
     *   create: {
     *     // ... data to create a Funcionario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Funcionario we want to update
     *   }
     * })
     */
    upsert<T extends FuncionarioUpsertArgs>(args: SelectSubset<T, FuncionarioUpsertArgs<ExtArgs>>): Prisma__FuncionarioClient<$Result.GetResult<Prisma.$FuncionarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionarioCountArgs} args - Arguments to filter Funcionarios to count.
     * @example
     * // Count the number of Funcionarios
     * const count = await prisma.funcionario.count({
     *   where: {
     *     // ... the filter for the Funcionarios we want to count
     *   }
     * })
    **/
    count<T extends FuncionarioCountArgs>(
      args?: Subset<T, FuncionarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FuncionarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Funcionario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FuncionarioAggregateArgs>(args: Subset<T, FuncionarioAggregateArgs>): Prisma.PrismaPromise<GetFuncionarioAggregateType<T>>

    /**
     * Group by Funcionario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FuncionarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FuncionarioGroupByArgs['orderBy'] }
        : { orderBy?: FuncionarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FuncionarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFuncionarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Funcionario model
   */
  readonly fields: FuncionarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Funcionario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FuncionarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Funcionario model
   */
  interface FuncionarioFieldRefs {
    readonly id: FieldRef<"Funcionario", 'Int'>
    readonly salario: FieldRef<"Funcionario", 'Decimal'>
    readonly data_contratacao: FieldRef<"Funcionario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Funcionario findUnique
   */
  export type FuncionarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * Filter, which Funcionario to fetch.
     */
    where: FuncionarioWhereUniqueInput
  }

  /**
   * Funcionario findUniqueOrThrow
   */
  export type FuncionarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * Filter, which Funcionario to fetch.
     */
    where: FuncionarioWhereUniqueInput
  }

  /**
   * Funcionario findFirst
   */
  export type FuncionarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * Filter, which Funcionario to fetch.
     */
    where?: FuncionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Funcionarios to fetch.
     */
    orderBy?: FuncionarioOrderByWithRelationInput | FuncionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Funcionarios.
     */
    cursor?: FuncionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Funcionarios.
     */
    distinct?: FuncionarioScalarFieldEnum | FuncionarioScalarFieldEnum[]
  }

  /**
   * Funcionario findFirstOrThrow
   */
  export type FuncionarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * Filter, which Funcionario to fetch.
     */
    where?: FuncionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Funcionarios to fetch.
     */
    orderBy?: FuncionarioOrderByWithRelationInput | FuncionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Funcionarios.
     */
    cursor?: FuncionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Funcionarios.
     */
    distinct?: FuncionarioScalarFieldEnum | FuncionarioScalarFieldEnum[]
  }

  /**
   * Funcionario findMany
   */
  export type FuncionarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * Filter, which Funcionarios to fetch.
     */
    where?: FuncionarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Funcionarios to fetch.
     */
    orderBy?: FuncionarioOrderByWithRelationInput | FuncionarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Funcionarios.
     */
    cursor?: FuncionarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Funcionarios.
     */
    distinct?: FuncionarioScalarFieldEnum | FuncionarioScalarFieldEnum[]
  }

  /**
   * Funcionario create
   */
  export type FuncionarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Funcionario.
     */
    data: XOR<FuncionarioCreateInput, FuncionarioUncheckedCreateInput>
  }

  /**
   * Funcionario createMany
   */
  export type FuncionarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Funcionarios.
     */
    data: FuncionarioCreateManyInput | FuncionarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Funcionario update
   */
  export type FuncionarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Funcionario.
     */
    data: XOR<FuncionarioUpdateInput, FuncionarioUncheckedUpdateInput>
    /**
     * Choose, which Funcionario to update.
     */
    where: FuncionarioWhereUniqueInput
  }

  /**
   * Funcionario updateMany
   */
  export type FuncionarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Funcionarios.
     */
    data: XOR<FuncionarioUpdateManyMutationInput, FuncionarioUncheckedUpdateManyInput>
    /**
     * Filter which Funcionarios to update
     */
    where?: FuncionarioWhereInput
    /**
     * Limit how many Funcionarios to update.
     */
    limit?: number
  }

  /**
   * Funcionario upsert
   */
  export type FuncionarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Funcionario to update in case it exists.
     */
    where: FuncionarioWhereUniqueInput
    /**
     * In case the Funcionario found by the `where` argument doesn't exist, create a new Funcionario with this data.
     */
    create: XOR<FuncionarioCreateInput, FuncionarioUncheckedCreateInput>
    /**
     * In case the Funcionario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FuncionarioUpdateInput, FuncionarioUncheckedUpdateInput>
  }

  /**
   * Funcionario delete
   */
  export type FuncionarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
    /**
     * Filter which Funcionario to delete.
     */
    where: FuncionarioWhereUniqueInput
  }

  /**
   * Funcionario deleteMany
   */
  export type FuncionarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Funcionarios to delete
     */
    where?: FuncionarioWhereInput
    /**
     * Limit how many Funcionarios to delete.
     */
    limit?: number
  }

  /**
   * Funcionario without action
   */
  export type FuncionarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Funcionario
     */
    select?: FuncionarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Funcionario
     */
    omit?: FuncionarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuncionarioInclude<ExtArgs> | null
  }


  /**
   * Model Livro
   */

  export type AggregateLivro = {
    _count: LivroCountAggregateOutputType | null
    _avg: LivroAvgAggregateOutputType | null
    _sum: LivroSumAggregateOutputType | null
    _min: LivroMinAggregateOutputType | null
    _max: LivroMaxAggregateOutputType | null
  }

  export type LivroAvgAggregateOutputType = {
    id: number | null
  }

  export type LivroSumAggregateOutputType = {
    id: number | null
  }

  export type LivroMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    autor: string | null
  }

  export type LivroMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    autor: string | null
  }

  export type LivroCountAggregateOutputType = {
    id: number
    titulo: number
    autor: number
    _all: number
  }


  export type LivroAvgAggregateInputType = {
    id?: true
  }

  export type LivroSumAggregateInputType = {
    id?: true
  }

  export type LivroMinAggregateInputType = {
    id?: true
    titulo?: true
    autor?: true
  }

  export type LivroMaxAggregateInputType = {
    id?: true
    titulo?: true
    autor?: true
  }

  export type LivroCountAggregateInputType = {
    id?: true
    titulo?: true
    autor?: true
    _all?: true
  }

  export type LivroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Livro to aggregate.
     */
    where?: LivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Livros to fetch.
     */
    orderBy?: LivroOrderByWithRelationInput | LivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Livros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Livros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Livros
    **/
    _count?: true | LivroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LivroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LivroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LivroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LivroMaxAggregateInputType
  }

  export type GetLivroAggregateType<T extends LivroAggregateArgs> = {
        [P in keyof T & keyof AggregateLivro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLivro[P]>
      : GetScalarType<T[P], AggregateLivro[P]>
  }




  export type LivroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LivroWhereInput
    orderBy?: LivroOrderByWithAggregationInput | LivroOrderByWithAggregationInput[]
    by: LivroScalarFieldEnum[] | LivroScalarFieldEnum
    having?: LivroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LivroCountAggregateInputType | true
    _avg?: LivroAvgAggregateInputType
    _sum?: LivroSumAggregateInputType
    _min?: LivroMinAggregateInputType
    _max?: LivroMaxAggregateInputType
  }

  export type LivroGroupByOutputType = {
    id: number
    titulo: string
    autor: string | null
    _count: LivroCountAggregateOutputType | null
    _avg: LivroAvgAggregateOutputType | null
    _sum: LivroSumAggregateOutputType | null
    _min: LivroMinAggregateOutputType | null
    _max: LivroMaxAggregateOutputType | null
  }

  type GetLivroGroupByPayload<T extends LivroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LivroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LivroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LivroGroupByOutputType[P]>
            : GetScalarType<T[P], LivroGroupByOutputType[P]>
        }
      >
    >


  export type LivroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    autor?: boolean
    exemplares?: boolean | Livro$exemplaresArgs<ExtArgs>
    _count?: boolean | LivroCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["livro"]>



  export type LivroSelectScalar = {
    id?: boolean
    titulo?: boolean
    autor?: boolean
  }

  export type LivroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "autor", ExtArgs["result"]["livro"]>
  export type LivroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exemplares?: boolean | Livro$exemplaresArgs<ExtArgs>
    _count?: boolean | LivroCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LivroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Livro"
    objects: {
      exemplares: Prisma.$ExemplarLivroPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      autor: string | null
    }, ExtArgs["result"]["livro"]>
    composites: {}
  }

  type LivroGetPayload<S extends boolean | null | undefined | LivroDefaultArgs> = $Result.GetResult<Prisma.$LivroPayload, S>

  type LivroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LivroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LivroCountAggregateInputType | true
    }

  export interface LivroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Livro'], meta: { name: 'Livro' } }
    /**
     * Find zero or one Livro that matches the filter.
     * @param {LivroFindUniqueArgs} args - Arguments to find a Livro
     * @example
     * // Get one Livro
     * const livro = await prisma.livro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LivroFindUniqueArgs>(args: SelectSubset<T, LivroFindUniqueArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Livro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LivroFindUniqueOrThrowArgs} args - Arguments to find a Livro
     * @example
     * // Get one Livro
     * const livro = await prisma.livro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LivroFindUniqueOrThrowArgs>(args: SelectSubset<T, LivroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Livro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LivroFindFirstArgs} args - Arguments to find a Livro
     * @example
     * // Get one Livro
     * const livro = await prisma.livro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LivroFindFirstArgs>(args?: SelectSubset<T, LivroFindFirstArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Livro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LivroFindFirstOrThrowArgs} args - Arguments to find a Livro
     * @example
     * // Get one Livro
     * const livro = await prisma.livro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LivroFindFirstOrThrowArgs>(args?: SelectSubset<T, LivroFindFirstOrThrowArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Livros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LivroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Livros
     * const livros = await prisma.livro.findMany()
     * 
     * // Get first 10 Livros
     * const livros = await prisma.livro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const livroWithIdOnly = await prisma.livro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LivroFindManyArgs>(args?: SelectSubset<T, LivroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Livro.
     * @param {LivroCreateArgs} args - Arguments to create a Livro.
     * @example
     * // Create one Livro
     * const Livro = await prisma.livro.create({
     *   data: {
     *     // ... data to create a Livro
     *   }
     * })
     * 
     */
    create<T extends LivroCreateArgs>(args: SelectSubset<T, LivroCreateArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Livros.
     * @param {LivroCreateManyArgs} args - Arguments to create many Livros.
     * @example
     * // Create many Livros
     * const livro = await prisma.livro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LivroCreateManyArgs>(args?: SelectSubset<T, LivroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Livro.
     * @param {LivroDeleteArgs} args - Arguments to delete one Livro.
     * @example
     * // Delete one Livro
     * const Livro = await prisma.livro.delete({
     *   where: {
     *     // ... filter to delete one Livro
     *   }
     * })
     * 
     */
    delete<T extends LivroDeleteArgs>(args: SelectSubset<T, LivroDeleteArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Livro.
     * @param {LivroUpdateArgs} args - Arguments to update one Livro.
     * @example
     * // Update one Livro
     * const livro = await prisma.livro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LivroUpdateArgs>(args: SelectSubset<T, LivroUpdateArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Livros.
     * @param {LivroDeleteManyArgs} args - Arguments to filter Livros to delete.
     * @example
     * // Delete a few Livros
     * const { count } = await prisma.livro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LivroDeleteManyArgs>(args?: SelectSubset<T, LivroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Livros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LivroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Livros
     * const livro = await prisma.livro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LivroUpdateManyArgs>(args: SelectSubset<T, LivroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Livro.
     * @param {LivroUpsertArgs} args - Arguments to update or create a Livro.
     * @example
     * // Update or create a Livro
     * const livro = await prisma.livro.upsert({
     *   create: {
     *     // ... data to create a Livro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Livro we want to update
     *   }
     * })
     */
    upsert<T extends LivroUpsertArgs>(args: SelectSubset<T, LivroUpsertArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Livros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LivroCountArgs} args - Arguments to filter Livros to count.
     * @example
     * // Count the number of Livros
     * const count = await prisma.livro.count({
     *   where: {
     *     // ... the filter for the Livros we want to count
     *   }
     * })
    **/
    count<T extends LivroCountArgs>(
      args?: Subset<T, LivroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LivroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Livro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LivroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LivroAggregateArgs>(args: Subset<T, LivroAggregateArgs>): Prisma.PrismaPromise<GetLivroAggregateType<T>>

    /**
     * Group by Livro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LivroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LivroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LivroGroupByArgs['orderBy'] }
        : { orderBy?: LivroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LivroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLivroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Livro model
   */
  readonly fields: LivroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Livro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LivroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exemplares<T extends Livro$exemplaresArgs<ExtArgs> = {}>(args?: Subset<T, Livro$exemplaresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Livro model
   */
  interface LivroFieldRefs {
    readonly id: FieldRef<"Livro", 'Int'>
    readonly titulo: FieldRef<"Livro", 'String'>
    readonly autor: FieldRef<"Livro", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Livro findUnique
   */
  export type LivroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * Filter, which Livro to fetch.
     */
    where: LivroWhereUniqueInput
  }

  /**
   * Livro findUniqueOrThrow
   */
  export type LivroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * Filter, which Livro to fetch.
     */
    where: LivroWhereUniqueInput
  }

  /**
   * Livro findFirst
   */
  export type LivroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * Filter, which Livro to fetch.
     */
    where?: LivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Livros to fetch.
     */
    orderBy?: LivroOrderByWithRelationInput | LivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Livros.
     */
    cursor?: LivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Livros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Livros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Livros.
     */
    distinct?: LivroScalarFieldEnum | LivroScalarFieldEnum[]
  }

  /**
   * Livro findFirstOrThrow
   */
  export type LivroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * Filter, which Livro to fetch.
     */
    where?: LivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Livros to fetch.
     */
    orderBy?: LivroOrderByWithRelationInput | LivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Livros.
     */
    cursor?: LivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Livros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Livros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Livros.
     */
    distinct?: LivroScalarFieldEnum | LivroScalarFieldEnum[]
  }

  /**
   * Livro findMany
   */
  export type LivroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * Filter, which Livros to fetch.
     */
    where?: LivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Livros to fetch.
     */
    orderBy?: LivroOrderByWithRelationInput | LivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Livros.
     */
    cursor?: LivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Livros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Livros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Livros.
     */
    distinct?: LivroScalarFieldEnum | LivroScalarFieldEnum[]
  }

  /**
   * Livro create
   */
  export type LivroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * The data needed to create a Livro.
     */
    data: XOR<LivroCreateInput, LivroUncheckedCreateInput>
  }

  /**
   * Livro createMany
   */
  export type LivroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Livros.
     */
    data: LivroCreateManyInput | LivroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Livro update
   */
  export type LivroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * The data needed to update a Livro.
     */
    data: XOR<LivroUpdateInput, LivroUncheckedUpdateInput>
    /**
     * Choose, which Livro to update.
     */
    where: LivroWhereUniqueInput
  }

  /**
   * Livro updateMany
   */
  export type LivroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Livros.
     */
    data: XOR<LivroUpdateManyMutationInput, LivroUncheckedUpdateManyInput>
    /**
     * Filter which Livros to update
     */
    where?: LivroWhereInput
    /**
     * Limit how many Livros to update.
     */
    limit?: number
  }

  /**
   * Livro upsert
   */
  export type LivroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * The filter to search for the Livro to update in case it exists.
     */
    where: LivroWhereUniqueInput
    /**
     * In case the Livro found by the `where` argument doesn't exist, create a new Livro with this data.
     */
    create: XOR<LivroCreateInput, LivroUncheckedCreateInput>
    /**
     * In case the Livro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LivroUpdateInput, LivroUncheckedUpdateInput>
  }

  /**
   * Livro delete
   */
  export type LivroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
    /**
     * Filter which Livro to delete.
     */
    where: LivroWhereUniqueInput
  }

  /**
   * Livro deleteMany
   */
  export type LivroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Livros to delete
     */
    where?: LivroWhereInput
    /**
     * Limit how many Livros to delete.
     */
    limit?: number
  }

  /**
   * Livro.exemplares
   */
  export type Livro$exemplaresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    where?: ExemplarLivroWhereInput
    orderBy?: ExemplarLivroOrderByWithRelationInput | ExemplarLivroOrderByWithRelationInput[]
    cursor?: ExemplarLivroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExemplarLivroScalarFieldEnum | ExemplarLivroScalarFieldEnum[]
  }

  /**
   * Livro without action
   */
  export type LivroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Livro
     */
    select?: LivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Livro
     */
    omit?: LivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LivroInclude<ExtArgs> | null
  }


  /**
   * Model ExemplarLivro
   */

  export type AggregateExemplarLivro = {
    _count: ExemplarLivroCountAggregateOutputType | null
    _avg: ExemplarLivroAvgAggregateOutputType | null
    _sum: ExemplarLivroSumAggregateOutputType | null
    _min: ExemplarLivroMinAggregateOutputType | null
    _max: ExemplarLivroMaxAggregateOutputType | null
  }

  export type ExemplarLivroAvgAggregateOutputType = {
    id: number | null
    livroId: number | null
  }

  export type ExemplarLivroSumAggregateOutputType = {
    id: number | null
    livroId: number | null
  }

  export type ExemplarLivroMinAggregateOutputType = {
    id: number | null
    livroId: number | null
    status: $Enums.LivroStatus | null
  }

  export type ExemplarLivroMaxAggregateOutputType = {
    id: number | null
    livroId: number | null
    status: $Enums.LivroStatus | null
  }

  export type ExemplarLivroCountAggregateOutputType = {
    id: number
    livroId: number
    status: number
    _all: number
  }


  export type ExemplarLivroAvgAggregateInputType = {
    id?: true
    livroId?: true
  }

  export type ExemplarLivroSumAggregateInputType = {
    id?: true
    livroId?: true
  }

  export type ExemplarLivroMinAggregateInputType = {
    id?: true
    livroId?: true
    status?: true
  }

  export type ExemplarLivroMaxAggregateInputType = {
    id?: true
    livroId?: true
    status?: true
  }

  export type ExemplarLivroCountAggregateInputType = {
    id?: true
    livroId?: true
    status?: true
    _all?: true
  }

  export type ExemplarLivroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExemplarLivro to aggregate.
     */
    where?: ExemplarLivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExemplarLivros to fetch.
     */
    orderBy?: ExemplarLivroOrderByWithRelationInput | ExemplarLivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExemplarLivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExemplarLivros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExemplarLivros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExemplarLivros
    **/
    _count?: true | ExemplarLivroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExemplarLivroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExemplarLivroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExemplarLivroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExemplarLivroMaxAggregateInputType
  }

  export type GetExemplarLivroAggregateType<T extends ExemplarLivroAggregateArgs> = {
        [P in keyof T & keyof AggregateExemplarLivro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExemplarLivro[P]>
      : GetScalarType<T[P], AggregateExemplarLivro[P]>
  }




  export type ExemplarLivroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExemplarLivroWhereInput
    orderBy?: ExemplarLivroOrderByWithAggregationInput | ExemplarLivroOrderByWithAggregationInput[]
    by: ExemplarLivroScalarFieldEnum[] | ExemplarLivroScalarFieldEnum
    having?: ExemplarLivroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExemplarLivroCountAggregateInputType | true
    _avg?: ExemplarLivroAvgAggregateInputType
    _sum?: ExemplarLivroSumAggregateInputType
    _min?: ExemplarLivroMinAggregateInputType
    _max?: ExemplarLivroMaxAggregateInputType
  }

  export type ExemplarLivroGroupByOutputType = {
    id: number
    livroId: number
    status: $Enums.LivroStatus
    _count: ExemplarLivroCountAggregateOutputType | null
    _avg: ExemplarLivroAvgAggregateOutputType | null
    _sum: ExemplarLivroSumAggregateOutputType | null
    _min: ExemplarLivroMinAggregateOutputType | null
    _max: ExemplarLivroMaxAggregateOutputType | null
  }

  type GetExemplarLivroGroupByPayload<T extends ExemplarLivroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExemplarLivroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExemplarLivroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExemplarLivroGroupByOutputType[P]>
            : GetScalarType<T[P], ExemplarLivroGroupByOutputType[P]>
        }
      >
    >


  export type ExemplarLivroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    livroId?: boolean
    status?: boolean
    livro?: boolean | LivroDefaultArgs<ExtArgs>
    itens?: boolean | ExemplarLivro$itensArgs<ExtArgs>
    _count?: boolean | ExemplarLivroCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exemplarLivro"]>



  export type ExemplarLivroSelectScalar = {
    id?: boolean
    livroId?: boolean
    status?: boolean
  }

  export type ExemplarLivroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "livroId" | "status", ExtArgs["result"]["exemplarLivro"]>
  export type ExemplarLivroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    livro?: boolean | LivroDefaultArgs<ExtArgs>
    itens?: boolean | ExemplarLivro$itensArgs<ExtArgs>
    _count?: boolean | ExemplarLivroCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ExemplarLivroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExemplarLivro"
    objects: {
      livro: Prisma.$LivroPayload<ExtArgs>
      itens: Prisma.$ItemEmprestimoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      livroId: number
      status: $Enums.LivroStatus
    }, ExtArgs["result"]["exemplarLivro"]>
    composites: {}
  }

  type ExemplarLivroGetPayload<S extends boolean | null | undefined | ExemplarLivroDefaultArgs> = $Result.GetResult<Prisma.$ExemplarLivroPayload, S>

  type ExemplarLivroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExemplarLivroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExemplarLivroCountAggregateInputType | true
    }

  export interface ExemplarLivroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExemplarLivro'], meta: { name: 'ExemplarLivro' } }
    /**
     * Find zero or one ExemplarLivro that matches the filter.
     * @param {ExemplarLivroFindUniqueArgs} args - Arguments to find a ExemplarLivro
     * @example
     * // Get one ExemplarLivro
     * const exemplarLivro = await prisma.exemplarLivro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExemplarLivroFindUniqueArgs>(args: SelectSubset<T, ExemplarLivroFindUniqueArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExemplarLivro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExemplarLivroFindUniqueOrThrowArgs} args - Arguments to find a ExemplarLivro
     * @example
     * // Get one ExemplarLivro
     * const exemplarLivro = await prisma.exemplarLivro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExemplarLivroFindUniqueOrThrowArgs>(args: SelectSubset<T, ExemplarLivroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExemplarLivro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExemplarLivroFindFirstArgs} args - Arguments to find a ExemplarLivro
     * @example
     * // Get one ExemplarLivro
     * const exemplarLivro = await prisma.exemplarLivro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExemplarLivroFindFirstArgs>(args?: SelectSubset<T, ExemplarLivroFindFirstArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExemplarLivro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExemplarLivroFindFirstOrThrowArgs} args - Arguments to find a ExemplarLivro
     * @example
     * // Get one ExemplarLivro
     * const exemplarLivro = await prisma.exemplarLivro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExemplarLivroFindFirstOrThrowArgs>(args?: SelectSubset<T, ExemplarLivroFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExemplarLivros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExemplarLivroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExemplarLivros
     * const exemplarLivros = await prisma.exemplarLivro.findMany()
     * 
     * // Get first 10 ExemplarLivros
     * const exemplarLivros = await prisma.exemplarLivro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exemplarLivroWithIdOnly = await prisma.exemplarLivro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExemplarLivroFindManyArgs>(args?: SelectSubset<T, ExemplarLivroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExemplarLivro.
     * @param {ExemplarLivroCreateArgs} args - Arguments to create a ExemplarLivro.
     * @example
     * // Create one ExemplarLivro
     * const ExemplarLivro = await prisma.exemplarLivro.create({
     *   data: {
     *     // ... data to create a ExemplarLivro
     *   }
     * })
     * 
     */
    create<T extends ExemplarLivroCreateArgs>(args: SelectSubset<T, ExemplarLivroCreateArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExemplarLivros.
     * @param {ExemplarLivroCreateManyArgs} args - Arguments to create many ExemplarLivros.
     * @example
     * // Create many ExemplarLivros
     * const exemplarLivro = await prisma.exemplarLivro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExemplarLivroCreateManyArgs>(args?: SelectSubset<T, ExemplarLivroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ExemplarLivro.
     * @param {ExemplarLivroDeleteArgs} args - Arguments to delete one ExemplarLivro.
     * @example
     * // Delete one ExemplarLivro
     * const ExemplarLivro = await prisma.exemplarLivro.delete({
     *   where: {
     *     // ... filter to delete one ExemplarLivro
     *   }
     * })
     * 
     */
    delete<T extends ExemplarLivroDeleteArgs>(args: SelectSubset<T, ExemplarLivroDeleteArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExemplarLivro.
     * @param {ExemplarLivroUpdateArgs} args - Arguments to update one ExemplarLivro.
     * @example
     * // Update one ExemplarLivro
     * const exemplarLivro = await prisma.exemplarLivro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExemplarLivroUpdateArgs>(args: SelectSubset<T, ExemplarLivroUpdateArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExemplarLivros.
     * @param {ExemplarLivroDeleteManyArgs} args - Arguments to filter ExemplarLivros to delete.
     * @example
     * // Delete a few ExemplarLivros
     * const { count } = await prisma.exemplarLivro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExemplarLivroDeleteManyArgs>(args?: SelectSubset<T, ExemplarLivroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExemplarLivros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExemplarLivroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExemplarLivros
     * const exemplarLivro = await prisma.exemplarLivro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExemplarLivroUpdateManyArgs>(args: SelectSubset<T, ExemplarLivroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExemplarLivro.
     * @param {ExemplarLivroUpsertArgs} args - Arguments to update or create a ExemplarLivro.
     * @example
     * // Update or create a ExemplarLivro
     * const exemplarLivro = await prisma.exemplarLivro.upsert({
     *   create: {
     *     // ... data to create a ExemplarLivro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExemplarLivro we want to update
     *   }
     * })
     */
    upsert<T extends ExemplarLivroUpsertArgs>(args: SelectSubset<T, ExemplarLivroUpsertArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExemplarLivros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExemplarLivroCountArgs} args - Arguments to filter ExemplarLivros to count.
     * @example
     * // Count the number of ExemplarLivros
     * const count = await prisma.exemplarLivro.count({
     *   where: {
     *     // ... the filter for the ExemplarLivros we want to count
     *   }
     * })
    **/
    count<T extends ExemplarLivroCountArgs>(
      args?: Subset<T, ExemplarLivroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExemplarLivroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExemplarLivro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExemplarLivroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExemplarLivroAggregateArgs>(args: Subset<T, ExemplarLivroAggregateArgs>): Prisma.PrismaPromise<GetExemplarLivroAggregateType<T>>

    /**
     * Group by ExemplarLivro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExemplarLivroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExemplarLivroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExemplarLivroGroupByArgs['orderBy'] }
        : { orderBy?: ExemplarLivroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExemplarLivroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExemplarLivroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExemplarLivro model
   */
  readonly fields: ExemplarLivroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExemplarLivro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExemplarLivroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    livro<T extends LivroDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LivroDefaultArgs<ExtArgs>>): Prisma__LivroClient<$Result.GetResult<Prisma.$LivroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    itens<T extends ExemplarLivro$itensArgs<ExtArgs> = {}>(args?: Subset<T, ExemplarLivro$itensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExemplarLivro model
   */
  interface ExemplarLivroFieldRefs {
    readonly id: FieldRef<"ExemplarLivro", 'Int'>
    readonly livroId: FieldRef<"ExemplarLivro", 'Int'>
    readonly status: FieldRef<"ExemplarLivro", 'LivroStatus'>
  }
    

  // Custom InputTypes
  /**
   * ExemplarLivro findUnique
   */
  export type ExemplarLivroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * Filter, which ExemplarLivro to fetch.
     */
    where: ExemplarLivroWhereUniqueInput
  }

  /**
   * ExemplarLivro findUniqueOrThrow
   */
  export type ExemplarLivroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * Filter, which ExemplarLivro to fetch.
     */
    where: ExemplarLivroWhereUniqueInput
  }

  /**
   * ExemplarLivro findFirst
   */
  export type ExemplarLivroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * Filter, which ExemplarLivro to fetch.
     */
    where?: ExemplarLivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExemplarLivros to fetch.
     */
    orderBy?: ExemplarLivroOrderByWithRelationInput | ExemplarLivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExemplarLivros.
     */
    cursor?: ExemplarLivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExemplarLivros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExemplarLivros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExemplarLivros.
     */
    distinct?: ExemplarLivroScalarFieldEnum | ExemplarLivroScalarFieldEnum[]
  }

  /**
   * ExemplarLivro findFirstOrThrow
   */
  export type ExemplarLivroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * Filter, which ExemplarLivro to fetch.
     */
    where?: ExemplarLivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExemplarLivros to fetch.
     */
    orderBy?: ExemplarLivroOrderByWithRelationInput | ExemplarLivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExemplarLivros.
     */
    cursor?: ExemplarLivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExemplarLivros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExemplarLivros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExemplarLivros.
     */
    distinct?: ExemplarLivroScalarFieldEnum | ExemplarLivroScalarFieldEnum[]
  }

  /**
   * ExemplarLivro findMany
   */
  export type ExemplarLivroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * Filter, which ExemplarLivros to fetch.
     */
    where?: ExemplarLivroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExemplarLivros to fetch.
     */
    orderBy?: ExemplarLivroOrderByWithRelationInput | ExemplarLivroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExemplarLivros.
     */
    cursor?: ExemplarLivroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExemplarLivros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExemplarLivros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExemplarLivros.
     */
    distinct?: ExemplarLivroScalarFieldEnum | ExemplarLivroScalarFieldEnum[]
  }

  /**
   * ExemplarLivro create
   */
  export type ExemplarLivroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * The data needed to create a ExemplarLivro.
     */
    data: XOR<ExemplarLivroCreateInput, ExemplarLivroUncheckedCreateInput>
  }

  /**
   * ExemplarLivro createMany
   */
  export type ExemplarLivroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExemplarLivros.
     */
    data: ExemplarLivroCreateManyInput | ExemplarLivroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExemplarLivro update
   */
  export type ExemplarLivroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * The data needed to update a ExemplarLivro.
     */
    data: XOR<ExemplarLivroUpdateInput, ExemplarLivroUncheckedUpdateInput>
    /**
     * Choose, which ExemplarLivro to update.
     */
    where: ExemplarLivroWhereUniqueInput
  }

  /**
   * ExemplarLivro updateMany
   */
  export type ExemplarLivroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExemplarLivros.
     */
    data: XOR<ExemplarLivroUpdateManyMutationInput, ExemplarLivroUncheckedUpdateManyInput>
    /**
     * Filter which ExemplarLivros to update
     */
    where?: ExemplarLivroWhereInput
    /**
     * Limit how many ExemplarLivros to update.
     */
    limit?: number
  }

  /**
   * ExemplarLivro upsert
   */
  export type ExemplarLivroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * The filter to search for the ExemplarLivro to update in case it exists.
     */
    where: ExemplarLivroWhereUniqueInput
    /**
     * In case the ExemplarLivro found by the `where` argument doesn't exist, create a new ExemplarLivro with this data.
     */
    create: XOR<ExemplarLivroCreateInput, ExemplarLivroUncheckedCreateInput>
    /**
     * In case the ExemplarLivro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExemplarLivroUpdateInput, ExemplarLivroUncheckedUpdateInput>
  }

  /**
   * ExemplarLivro delete
   */
  export type ExemplarLivroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
    /**
     * Filter which ExemplarLivro to delete.
     */
    where: ExemplarLivroWhereUniqueInput
  }

  /**
   * ExemplarLivro deleteMany
   */
  export type ExemplarLivroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExemplarLivros to delete
     */
    where?: ExemplarLivroWhereInput
    /**
     * Limit how many ExemplarLivros to delete.
     */
    limit?: number
  }

  /**
   * ExemplarLivro.itens
   */
  export type ExemplarLivro$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    where?: ItemEmprestimoWhereInput
    orderBy?: ItemEmprestimoOrderByWithRelationInput | ItemEmprestimoOrderByWithRelationInput[]
    cursor?: ItemEmprestimoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemEmprestimoScalarFieldEnum | ItemEmprestimoScalarFieldEnum[]
  }

  /**
   * ExemplarLivro without action
   */
  export type ExemplarLivroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExemplarLivro
     */
    select?: ExemplarLivroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExemplarLivro
     */
    omit?: ExemplarLivroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExemplarLivroInclude<ExtArgs> | null
  }


  /**
   * Model Emprestimo
   */

  export type AggregateEmprestimo = {
    _count: EmprestimoCountAggregateOutputType | null
    _avg: EmprestimoAvgAggregateOutputType | null
    _sum: EmprestimoSumAggregateOutputType | null
    _min: EmprestimoMinAggregateOutputType | null
    _max: EmprestimoMaxAggregateOutputType | null
  }

  export type EmprestimoAvgAggregateOutputType = {
    id: number | null
    id_cliente: number | null
  }

  export type EmprestimoSumAggregateOutputType = {
    id: number | null
    id_cliente: number | null
  }

  export type EmprestimoMinAggregateOutputType = {
    id: number | null
    id_cliente: number | null
    data_saida: Date | null
  }

  export type EmprestimoMaxAggregateOutputType = {
    id: number | null
    id_cliente: number | null
    data_saida: Date | null
  }

  export type EmprestimoCountAggregateOutputType = {
    id: number
    id_cliente: number
    data_saida: number
    _all: number
  }


  export type EmprestimoAvgAggregateInputType = {
    id?: true
    id_cliente?: true
  }

  export type EmprestimoSumAggregateInputType = {
    id?: true
    id_cliente?: true
  }

  export type EmprestimoMinAggregateInputType = {
    id?: true
    id_cliente?: true
    data_saida?: true
  }

  export type EmprestimoMaxAggregateInputType = {
    id?: true
    id_cliente?: true
    data_saida?: true
  }

  export type EmprestimoCountAggregateInputType = {
    id?: true
    id_cliente?: true
    data_saida?: true
    _all?: true
  }

  export type EmprestimoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emprestimo to aggregate.
     */
    where?: EmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emprestimos to fetch.
     */
    orderBy?: EmprestimoOrderByWithRelationInput | EmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emprestimos
    **/
    _count?: true | EmprestimoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmprestimoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmprestimoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmprestimoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmprestimoMaxAggregateInputType
  }

  export type GetEmprestimoAggregateType<T extends EmprestimoAggregateArgs> = {
        [P in keyof T & keyof AggregateEmprestimo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmprestimo[P]>
      : GetScalarType<T[P], AggregateEmprestimo[P]>
  }




  export type EmprestimoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmprestimoWhereInput
    orderBy?: EmprestimoOrderByWithAggregationInput | EmprestimoOrderByWithAggregationInput[]
    by: EmprestimoScalarFieldEnum[] | EmprestimoScalarFieldEnum
    having?: EmprestimoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmprestimoCountAggregateInputType | true
    _avg?: EmprestimoAvgAggregateInputType
    _sum?: EmprestimoSumAggregateInputType
    _min?: EmprestimoMinAggregateInputType
    _max?: EmprestimoMaxAggregateInputType
  }

  export type EmprestimoGroupByOutputType = {
    id: number
    id_cliente: number
    data_saida: Date
    _count: EmprestimoCountAggregateOutputType | null
    _avg: EmprestimoAvgAggregateOutputType | null
    _sum: EmprestimoSumAggregateOutputType | null
    _min: EmprestimoMinAggregateOutputType | null
    _max: EmprestimoMaxAggregateOutputType | null
  }

  type GetEmprestimoGroupByPayload<T extends EmprestimoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmprestimoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmprestimoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmprestimoGroupByOutputType[P]>
            : GetScalarType<T[P], EmprestimoGroupByOutputType[P]>
        }
      >
    >


  export type EmprestimoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cliente?: boolean
    data_saida?: boolean
    itens?: boolean | Emprestimo$itensArgs<ExtArgs>
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    _count?: boolean | EmprestimoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emprestimo"]>



  export type EmprestimoSelectScalar = {
    id?: boolean
    id_cliente?: boolean
    data_saida?: boolean
  }

  export type EmprestimoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_cliente" | "data_saida", ExtArgs["result"]["emprestimo"]>
  export type EmprestimoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | Emprestimo$itensArgs<ExtArgs>
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    _count?: boolean | EmprestimoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmprestimoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Emprestimo"
    objects: {
      itens: Prisma.$ItemEmprestimoPayload<ExtArgs>[]
      cliente: Prisma.$ClientePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      id_cliente: number
      data_saida: Date
    }, ExtArgs["result"]["emprestimo"]>
    composites: {}
  }

  type EmprestimoGetPayload<S extends boolean | null | undefined | EmprestimoDefaultArgs> = $Result.GetResult<Prisma.$EmprestimoPayload, S>

  type EmprestimoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmprestimoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmprestimoCountAggregateInputType | true
    }

  export interface EmprestimoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Emprestimo'], meta: { name: 'Emprestimo' } }
    /**
     * Find zero or one Emprestimo that matches the filter.
     * @param {EmprestimoFindUniqueArgs} args - Arguments to find a Emprestimo
     * @example
     * // Get one Emprestimo
     * const emprestimo = await prisma.emprestimo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmprestimoFindUniqueArgs>(args: SelectSubset<T, EmprestimoFindUniqueArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Emprestimo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmprestimoFindUniqueOrThrowArgs} args - Arguments to find a Emprestimo
     * @example
     * // Get one Emprestimo
     * const emprestimo = await prisma.emprestimo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmprestimoFindUniqueOrThrowArgs>(args: SelectSubset<T, EmprestimoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Emprestimo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmprestimoFindFirstArgs} args - Arguments to find a Emprestimo
     * @example
     * // Get one Emprestimo
     * const emprestimo = await prisma.emprestimo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmprestimoFindFirstArgs>(args?: SelectSubset<T, EmprestimoFindFirstArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Emprestimo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmprestimoFindFirstOrThrowArgs} args - Arguments to find a Emprestimo
     * @example
     * // Get one Emprestimo
     * const emprestimo = await prisma.emprestimo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmprestimoFindFirstOrThrowArgs>(args?: SelectSubset<T, EmprestimoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Emprestimos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmprestimoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emprestimos
     * const emprestimos = await prisma.emprestimo.findMany()
     * 
     * // Get first 10 Emprestimos
     * const emprestimos = await prisma.emprestimo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emprestimoWithIdOnly = await prisma.emprestimo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmprestimoFindManyArgs>(args?: SelectSubset<T, EmprestimoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Emprestimo.
     * @param {EmprestimoCreateArgs} args - Arguments to create a Emprestimo.
     * @example
     * // Create one Emprestimo
     * const Emprestimo = await prisma.emprestimo.create({
     *   data: {
     *     // ... data to create a Emprestimo
     *   }
     * })
     * 
     */
    create<T extends EmprestimoCreateArgs>(args: SelectSubset<T, EmprestimoCreateArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Emprestimos.
     * @param {EmprestimoCreateManyArgs} args - Arguments to create many Emprestimos.
     * @example
     * // Create many Emprestimos
     * const emprestimo = await prisma.emprestimo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmprestimoCreateManyArgs>(args?: SelectSubset<T, EmprestimoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Emprestimo.
     * @param {EmprestimoDeleteArgs} args - Arguments to delete one Emprestimo.
     * @example
     * // Delete one Emprestimo
     * const Emprestimo = await prisma.emprestimo.delete({
     *   where: {
     *     // ... filter to delete one Emprestimo
     *   }
     * })
     * 
     */
    delete<T extends EmprestimoDeleteArgs>(args: SelectSubset<T, EmprestimoDeleteArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Emprestimo.
     * @param {EmprestimoUpdateArgs} args - Arguments to update one Emprestimo.
     * @example
     * // Update one Emprestimo
     * const emprestimo = await prisma.emprestimo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmprestimoUpdateArgs>(args: SelectSubset<T, EmprestimoUpdateArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Emprestimos.
     * @param {EmprestimoDeleteManyArgs} args - Arguments to filter Emprestimos to delete.
     * @example
     * // Delete a few Emprestimos
     * const { count } = await prisma.emprestimo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmprestimoDeleteManyArgs>(args?: SelectSubset<T, EmprestimoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emprestimos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmprestimoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emprestimos
     * const emprestimo = await prisma.emprestimo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmprestimoUpdateManyArgs>(args: SelectSubset<T, EmprestimoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Emprestimo.
     * @param {EmprestimoUpsertArgs} args - Arguments to update or create a Emprestimo.
     * @example
     * // Update or create a Emprestimo
     * const emprestimo = await prisma.emprestimo.upsert({
     *   create: {
     *     // ... data to create a Emprestimo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Emprestimo we want to update
     *   }
     * })
     */
    upsert<T extends EmprestimoUpsertArgs>(args: SelectSubset<T, EmprestimoUpsertArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Emprestimos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmprestimoCountArgs} args - Arguments to filter Emprestimos to count.
     * @example
     * // Count the number of Emprestimos
     * const count = await prisma.emprestimo.count({
     *   where: {
     *     // ... the filter for the Emprestimos we want to count
     *   }
     * })
    **/
    count<T extends EmprestimoCountArgs>(
      args?: Subset<T, EmprestimoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmprestimoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Emprestimo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmprestimoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmprestimoAggregateArgs>(args: Subset<T, EmprestimoAggregateArgs>): Prisma.PrismaPromise<GetEmprestimoAggregateType<T>>

    /**
     * Group by Emprestimo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmprestimoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmprestimoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmprestimoGroupByArgs['orderBy'] }
        : { orderBy?: EmprestimoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmprestimoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmprestimoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Emprestimo model
   */
  readonly fields: EmprestimoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Emprestimo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmprestimoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itens<T extends Emprestimo$itensArgs<ExtArgs> = {}>(args?: Subset<T, Emprestimo$itensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Emprestimo model
   */
  interface EmprestimoFieldRefs {
    readonly id: FieldRef<"Emprestimo", 'Int'>
    readonly id_cliente: FieldRef<"Emprestimo", 'Int'>
    readonly data_saida: FieldRef<"Emprestimo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Emprestimo findUnique
   */
  export type EmprestimoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which Emprestimo to fetch.
     */
    where: EmprestimoWhereUniqueInput
  }

  /**
   * Emprestimo findUniqueOrThrow
   */
  export type EmprestimoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which Emprestimo to fetch.
     */
    where: EmprestimoWhereUniqueInput
  }

  /**
   * Emprestimo findFirst
   */
  export type EmprestimoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which Emprestimo to fetch.
     */
    where?: EmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emprestimos to fetch.
     */
    orderBy?: EmprestimoOrderByWithRelationInput | EmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emprestimos.
     */
    cursor?: EmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emprestimos.
     */
    distinct?: EmprestimoScalarFieldEnum | EmprestimoScalarFieldEnum[]
  }

  /**
   * Emprestimo findFirstOrThrow
   */
  export type EmprestimoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which Emprestimo to fetch.
     */
    where?: EmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emprestimos to fetch.
     */
    orderBy?: EmprestimoOrderByWithRelationInput | EmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emprestimos.
     */
    cursor?: EmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emprestimos.
     */
    distinct?: EmprestimoScalarFieldEnum | EmprestimoScalarFieldEnum[]
  }

  /**
   * Emprestimo findMany
   */
  export type EmprestimoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which Emprestimos to fetch.
     */
    where?: EmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emprestimos to fetch.
     */
    orderBy?: EmprestimoOrderByWithRelationInput | EmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emprestimos.
     */
    cursor?: EmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emprestimos.
     */
    distinct?: EmprestimoScalarFieldEnum | EmprestimoScalarFieldEnum[]
  }

  /**
   * Emprestimo create
   */
  export type EmprestimoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * The data needed to create a Emprestimo.
     */
    data: XOR<EmprestimoCreateInput, EmprestimoUncheckedCreateInput>
  }

  /**
   * Emprestimo createMany
   */
  export type EmprestimoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Emprestimos.
     */
    data: EmprestimoCreateManyInput | EmprestimoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Emprestimo update
   */
  export type EmprestimoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * The data needed to update a Emprestimo.
     */
    data: XOR<EmprestimoUpdateInput, EmprestimoUncheckedUpdateInput>
    /**
     * Choose, which Emprestimo to update.
     */
    where: EmprestimoWhereUniqueInput
  }

  /**
   * Emprestimo updateMany
   */
  export type EmprestimoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Emprestimos.
     */
    data: XOR<EmprestimoUpdateManyMutationInput, EmprestimoUncheckedUpdateManyInput>
    /**
     * Filter which Emprestimos to update
     */
    where?: EmprestimoWhereInput
    /**
     * Limit how many Emprestimos to update.
     */
    limit?: number
  }

  /**
   * Emprestimo upsert
   */
  export type EmprestimoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * The filter to search for the Emprestimo to update in case it exists.
     */
    where: EmprestimoWhereUniqueInput
    /**
     * In case the Emprestimo found by the `where` argument doesn't exist, create a new Emprestimo with this data.
     */
    create: XOR<EmprestimoCreateInput, EmprestimoUncheckedCreateInput>
    /**
     * In case the Emprestimo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmprestimoUpdateInput, EmprestimoUncheckedUpdateInput>
  }

  /**
   * Emprestimo delete
   */
  export type EmprestimoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
    /**
     * Filter which Emprestimo to delete.
     */
    where: EmprestimoWhereUniqueInput
  }

  /**
   * Emprestimo deleteMany
   */
  export type EmprestimoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emprestimos to delete
     */
    where?: EmprestimoWhereInput
    /**
     * Limit how many Emprestimos to delete.
     */
    limit?: number
  }

  /**
   * Emprestimo.itens
   */
  export type Emprestimo$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    where?: ItemEmprestimoWhereInput
    orderBy?: ItemEmprestimoOrderByWithRelationInput | ItemEmprestimoOrderByWithRelationInput[]
    cursor?: ItemEmprestimoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemEmprestimoScalarFieldEnum | ItemEmprestimoScalarFieldEnum[]
  }

  /**
   * Emprestimo without action
   */
  export type EmprestimoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emprestimo
     */
    select?: EmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emprestimo
     */
    omit?: EmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmprestimoInclude<ExtArgs> | null
  }


  /**
   * Model ItemEmprestimo
   */

  export type AggregateItemEmprestimo = {
    _count: ItemEmprestimoCountAggregateOutputType | null
    _avg: ItemEmprestimoAvgAggregateOutputType | null
    _sum: ItemEmprestimoSumAggregateOutputType | null
    _min: ItemEmprestimoMinAggregateOutputType | null
    _max: ItemEmprestimoMaxAggregateOutputType | null
  }

  export type ItemEmprestimoAvgAggregateOutputType = {
    id: number | null
    emprestimoId: number | null
    exemplarId: number | null
    count_adiar: number | null
  }

  export type ItemEmprestimoSumAggregateOutputType = {
    id: number | null
    emprestimoId: number | null
    exemplarId: number | null
    count_adiar: number | null
  }

  export type ItemEmprestimoMinAggregateOutputType = {
    id: number | null
    emprestimoId: number | null
    exemplarId: number | null
    count_adiar: number | null
    data_prazo: Date | null
    data_devolucao: Date | null
  }

  export type ItemEmprestimoMaxAggregateOutputType = {
    id: number | null
    emprestimoId: number | null
    exemplarId: number | null
    count_adiar: number | null
    data_prazo: Date | null
    data_devolucao: Date | null
  }

  export type ItemEmprestimoCountAggregateOutputType = {
    id: number
    emprestimoId: number
    exemplarId: number
    count_adiar: number
    data_prazo: number
    data_devolucao: number
    _all: number
  }


  export type ItemEmprestimoAvgAggregateInputType = {
    id?: true
    emprestimoId?: true
    exemplarId?: true
    count_adiar?: true
  }

  export type ItemEmprestimoSumAggregateInputType = {
    id?: true
    emprestimoId?: true
    exemplarId?: true
    count_adiar?: true
  }

  export type ItemEmprestimoMinAggregateInputType = {
    id?: true
    emprestimoId?: true
    exemplarId?: true
    count_adiar?: true
    data_prazo?: true
    data_devolucao?: true
  }

  export type ItemEmprestimoMaxAggregateInputType = {
    id?: true
    emprestimoId?: true
    exemplarId?: true
    count_adiar?: true
    data_prazo?: true
    data_devolucao?: true
  }

  export type ItemEmprestimoCountAggregateInputType = {
    id?: true
    emprestimoId?: true
    exemplarId?: true
    count_adiar?: true
    data_prazo?: true
    data_devolucao?: true
    _all?: true
  }

  export type ItemEmprestimoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemEmprestimo to aggregate.
     */
    where?: ItemEmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEmprestimos to fetch.
     */
    orderBy?: ItemEmprestimoOrderByWithRelationInput | ItemEmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemEmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEmprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEmprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemEmprestimos
    **/
    _count?: true | ItemEmprestimoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemEmprestimoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemEmprestimoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemEmprestimoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemEmprestimoMaxAggregateInputType
  }

  export type GetItemEmprestimoAggregateType<T extends ItemEmprestimoAggregateArgs> = {
        [P in keyof T & keyof AggregateItemEmprestimo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemEmprestimo[P]>
      : GetScalarType<T[P], AggregateItemEmprestimo[P]>
  }




  export type ItemEmprestimoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemEmprestimoWhereInput
    orderBy?: ItemEmprestimoOrderByWithAggregationInput | ItemEmprestimoOrderByWithAggregationInput[]
    by: ItemEmprestimoScalarFieldEnum[] | ItemEmprestimoScalarFieldEnum
    having?: ItemEmprestimoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemEmprestimoCountAggregateInputType | true
    _avg?: ItemEmprestimoAvgAggregateInputType
    _sum?: ItemEmprestimoSumAggregateInputType
    _min?: ItemEmprestimoMinAggregateInputType
    _max?: ItemEmprestimoMaxAggregateInputType
  }

  export type ItemEmprestimoGroupByOutputType = {
    id: number
    emprestimoId: number
    exemplarId: number
    count_adiar: number
    data_prazo: Date
    data_devolucao: Date | null
    _count: ItemEmprestimoCountAggregateOutputType | null
    _avg: ItemEmprestimoAvgAggregateOutputType | null
    _sum: ItemEmprestimoSumAggregateOutputType | null
    _min: ItemEmprestimoMinAggregateOutputType | null
    _max: ItemEmprestimoMaxAggregateOutputType | null
  }

  type GetItemEmprestimoGroupByPayload<T extends ItemEmprestimoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemEmprestimoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemEmprestimoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemEmprestimoGroupByOutputType[P]>
            : GetScalarType<T[P], ItemEmprestimoGroupByOutputType[P]>
        }
      >
    >


  export type ItemEmprestimoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emprestimoId?: boolean
    exemplarId?: boolean
    count_adiar?: boolean
    data_prazo?: boolean
    data_devolucao?: boolean
    emprestimo?: boolean | EmprestimoDefaultArgs<ExtArgs>
    exemplarLivro?: boolean | ExemplarLivroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemEmprestimo"]>



  export type ItemEmprestimoSelectScalar = {
    id?: boolean
    emprestimoId?: boolean
    exemplarId?: boolean
    count_adiar?: boolean
    data_prazo?: boolean
    data_devolucao?: boolean
  }

  export type ItemEmprestimoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "emprestimoId" | "exemplarId" | "count_adiar" | "data_prazo" | "data_devolucao", ExtArgs["result"]["itemEmprestimo"]>
  export type ItemEmprestimoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emprestimo?: boolean | EmprestimoDefaultArgs<ExtArgs>
    exemplarLivro?: boolean | ExemplarLivroDefaultArgs<ExtArgs>
  }

  export type $ItemEmprestimoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemEmprestimo"
    objects: {
      emprestimo: Prisma.$EmprestimoPayload<ExtArgs>
      exemplarLivro: Prisma.$ExemplarLivroPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      emprestimoId: number
      exemplarId: number
      count_adiar: number
      data_prazo: Date
      data_devolucao: Date | null
    }, ExtArgs["result"]["itemEmprestimo"]>
    composites: {}
  }

  type ItemEmprestimoGetPayload<S extends boolean | null | undefined | ItemEmprestimoDefaultArgs> = $Result.GetResult<Prisma.$ItemEmprestimoPayload, S>

  type ItemEmprestimoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemEmprestimoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemEmprestimoCountAggregateInputType | true
    }

  export interface ItemEmprestimoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemEmprestimo'], meta: { name: 'ItemEmprestimo' } }
    /**
     * Find zero or one ItemEmprestimo that matches the filter.
     * @param {ItemEmprestimoFindUniqueArgs} args - Arguments to find a ItemEmprestimo
     * @example
     * // Get one ItemEmprestimo
     * const itemEmprestimo = await prisma.itemEmprestimo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemEmprestimoFindUniqueArgs>(args: SelectSubset<T, ItemEmprestimoFindUniqueArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemEmprestimo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemEmprestimoFindUniqueOrThrowArgs} args - Arguments to find a ItemEmprestimo
     * @example
     * // Get one ItemEmprestimo
     * const itemEmprestimo = await prisma.itemEmprestimo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemEmprestimoFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemEmprestimoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemEmprestimo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEmprestimoFindFirstArgs} args - Arguments to find a ItemEmprestimo
     * @example
     * // Get one ItemEmprestimo
     * const itemEmprestimo = await prisma.itemEmprestimo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemEmprestimoFindFirstArgs>(args?: SelectSubset<T, ItemEmprestimoFindFirstArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemEmprestimo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEmprestimoFindFirstOrThrowArgs} args - Arguments to find a ItemEmprestimo
     * @example
     * // Get one ItemEmprestimo
     * const itemEmprestimo = await prisma.itemEmprestimo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemEmprestimoFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemEmprestimoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemEmprestimos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEmprestimoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemEmprestimos
     * const itemEmprestimos = await prisma.itemEmprestimo.findMany()
     * 
     * // Get first 10 ItemEmprestimos
     * const itemEmprestimos = await prisma.itemEmprestimo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemEmprestimoWithIdOnly = await prisma.itemEmprestimo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemEmprestimoFindManyArgs>(args?: SelectSubset<T, ItemEmprestimoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemEmprestimo.
     * @param {ItemEmprestimoCreateArgs} args - Arguments to create a ItemEmprestimo.
     * @example
     * // Create one ItemEmprestimo
     * const ItemEmprestimo = await prisma.itemEmprestimo.create({
     *   data: {
     *     // ... data to create a ItemEmprestimo
     *   }
     * })
     * 
     */
    create<T extends ItemEmprestimoCreateArgs>(args: SelectSubset<T, ItemEmprestimoCreateArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemEmprestimos.
     * @param {ItemEmprestimoCreateManyArgs} args - Arguments to create many ItemEmprestimos.
     * @example
     * // Create many ItemEmprestimos
     * const itemEmprestimo = await prisma.itemEmprestimo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemEmprestimoCreateManyArgs>(args?: SelectSubset<T, ItemEmprestimoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ItemEmprestimo.
     * @param {ItemEmprestimoDeleteArgs} args - Arguments to delete one ItemEmprestimo.
     * @example
     * // Delete one ItemEmprestimo
     * const ItemEmprestimo = await prisma.itemEmprestimo.delete({
     *   where: {
     *     // ... filter to delete one ItemEmprestimo
     *   }
     * })
     * 
     */
    delete<T extends ItemEmprestimoDeleteArgs>(args: SelectSubset<T, ItemEmprestimoDeleteArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemEmprestimo.
     * @param {ItemEmprestimoUpdateArgs} args - Arguments to update one ItemEmprestimo.
     * @example
     * // Update one ItemEmprestimo
     * const itemEmprestimo = await prisma.itemEmprestimo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemEmprestimoUpdateArgs>(args: SelectSubset<T, ItemEmprestimoUpdateArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemEmprestimos.
     * @param {ItemEmprestimoDeleteManyArgs} args - Arguments to filter ItemEmprestimos to delete.
     * @example
     * // Delete a few ItemEmprestimos
     * const { count } = await prisma.itemEmprestimo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemEmprestimoDeleteManyArgs>(args?: SelectSubset<T, ItemEmprestimoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemEmprestimos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEmprestimoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemEmprestimos
     * const itemEmprestimo = await prisma.itemEmprestimo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemEmprestimoUpdateManyArgs>(args: SelectSubset<T, ItemEmprestimoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemEmprestimo.
     * @param {ItemEmprestimoUpsertArgs} args - Arguments to update or create a ItemEmprestimo.
     * @example
     * // Update or create a ItemEmprestimo
     * const itemEmprestimo = await prisma.itemEmprestimo.upsert({
     *   create: {
     *     // ... data to create a ItemEmprestimo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemEmprestimo we want to update
     *   }
     * })
     */
    upsert<T extends ItemEmprestimoUpsertArgs>(args: SelectSubset<T, ItemEmprestimoUpsertArgs<ExtArgs>>): Prisma__ItemEmprestimoClient<$Result.GetResult<Prisma.$ItemEmprestimoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemEmprestimos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEmprestimoCountArgs} args - Arguments to filter ItemEmprestimos to count.
     * @example
     * // Count the number of ItemEmprestimos
     * const count = await prisma.itemEmprestimo.count({
     *   where: {
     *     // ... the filter for the ItemEmprestimos we want to count
     *   }
     * })
    **/
    count<T extends ItemEmprestimoCountArgs>(
      args?: Subset<T, ItemEmprestimoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemEmprestimoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemEmprestimo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEmprestimoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemEmprestimoAggregateArgs>(args: Subset<T, ItemEmprestimoAggregateArgs>): Prisma.PrismaPromise<GetItemEmprestimoAggregateType<T>>

    /**
     * Group by ItemEmprestimo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemEmprestimoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemEmprestimoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemEmprestimoGroupByArgs['orderBy'] }
        : { orderBy?: ItemEmprestimoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemEmprestimoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemEmprestimoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemEmprestimo model
   */
  readonly fields: ItemEmprestimoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemEmprestimo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemEmprestimoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emprestimo<T extends EmprestimoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmprestimoDefaultArgs<ExtArgs>>): Prisma__EmprestimoClient<$Result.GetResult<Prisma.$EmprestimoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    exemplarLivro<T extends ExemplarLivroDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExemplarLivroDefaultArgs<ExtArgs>>): Prisma__ExemplarLivroClient<$Result.GetResult<Prisma.$ExemplarLivroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemEmprestimo model
   */
  interface ItemEmprestimoFieldRefs {
    readonly id: FieldRef<"ItemEmprestimo", 'Int'>
    readonly emprestimoId: FieldRef<"ItemEmprestimo", 'Int'>
    readonly exemplarId: FieldRef<"ItemEmprestimo", 'Int'>
    readonly count_adiar: FieldRef<"ItemEmprestimo", 'Int'>
    readonly data_prazo: FieldRef<"ItemEmprestimo", 'DateTime'>
    readonly data_devolucao: FieldRef<"ItemEmprestimo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemEmprestimo findUnique
   */
  export type ItemEmprestimoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which ItemEmprestimo to fetch.
     */
    where: ItemEmprestimoWhereUniqueInput
  }

  /**
   * ItemEmprestimo findUniqueOrThrow
   */
  export type ItemEmprestimoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which ItemEmprestimo to fetch.
     */
    where: ItemEmprestimoWhereUniqueInput
  }

  /**
   * ItemEmprestimo findFirst
   */
  export type ItemEmprestimoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which ItemEmprestimo to fetch.
     */
    where?: ItemEmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEmprestimos to fetch.
     */
    orderBy?: ItemEmprestimoOrderByWithRelationInput | ItemEmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemEmprestimos.
     */
    cursor?: ItemEmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEmprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEmprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemEmprestimos.
     */
    distinct?: ItemEmprestimoScalarFieldEnum | ItemEmprestimoScalarFieldEnum[]
  }

  /**
   * ItemEmprestimo findFirstOrThrow
   */
  export type ItemEmprestimoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which ItemEmprestimo to fetch.
     */
    where?: ItemEmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEmprestimos to fetch.
     */
    orderBy?: ItemEmprestimoOrderByWithRelationInput | ItemEmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemEmprestimos.
     */
    cursor?: ItemEmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEmprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEmprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemEmprestimos.
     */
    distinct?: ItemEmprestimoScalarFieldEnum | ItemEmprestimoScalarFieldEnum[]
  }

  /**
   * ItemEmprestimo findMany
   */
  export type ItemEmprestimoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * Filter, which ItemEmprestimos to fetch.
     */
    where?: ItemEmprestimoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemEmprestimos to fetch.
     */
    orderBy?: ItemEmprestimoOrderByWithRelationInput | ItemEmprestimoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemEmprestimos.
     */
    cursor?: ItemEmprestimoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemEmprestimos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemEmprestimos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemEmprestimos.
     */
    distinct?: ItemEmprestimoScalarFieldEnum | ItemEmprestimoScalarFieldEnum[]
  }

  /**
   * ItemEmprestimo create
   */
  export type ItemEmprestimoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemEmprestimo.
     */
    data: XOR<ItemEmprestimoCreateInput, ItemEmprestimoUncheckedCreateInput>
  }

  /**
   * ItemEmprestimo createMany
   */
  export type ItemEmprestimoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemEmprestimos.
     */
    data: ItemEmprestimoCreateManyInput | ItemEmprestimoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemEmprestimo update
   */
  export type ItemEmprestimoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemEmprestimo.
     */
    data: XOR<ItemEmprestimoUpdateInput, ItemEmprestimoUncheckedUpdateInput>
    /**
     * Choose, which ItemEmprestimo to update.
     */
    where: ItemEmprestimoWhereUniqueInput
  }

  /**
   * ItemEmprestimo updateMany
   */
  export type ItemEmprestimoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemEmprestimos.
     */
    data: XOR<ItemEmprestimoUpdateManyMutationInput, ItemEmprestimoUncheckedUpdateManyInput>
    /**
     * Filter which ItemEmprestimos to update
     */
    where?: ItemEmprestimoWhereInput
    /**
     * Limit how many ItemEmprestimos to update.
     */
    limit?: number
  }

  /**
   * ItemEmprestimo upsert
   */
  export type ItemEmprestimoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemEmprestimo to update in case it exists.
     */
    where: ItemEmprestimoWhereUniqueInput
    /**
     * In case the ItemEmprestimo found by the `where` argument doesn't exist, create a new ItemEmprestimo with this data.
     */
    create: XOR<ItemEmprestimoCreateInput, ItemEmprestimoUncheckedCreateInput>
    /**
     * In case the ItemEmprestimo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemEmprestimoUpdateInput, ItemEmprestimoUncheckedUpdateInput>
  }

  /**
   * ItemEmprestimo delete
   */
  export type ItemEmprestimoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
    /**
     * Filter which ItemEmprestimo to delete.
     */
    where: ItemEmprestimoWhereUniqueInput
  }

  /**
   * ItemEmprestimo deleteMany
   */
  export type ItemEmprestimoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemEmprestimos to delete
     */
    where?: ItemEmprestimoWhereInput
    /**
     * Limit how many ItemEmprestimos to delete.
     */
    limit?: number
  }

  /**
   * ItemEmprestimo without action
   */
  export type ItemEmprestimoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemEmprestimo
     */
    select?: ItemEmprestimoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemEmprestimo
     */
    omit?: ItemEmprestimoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemEmprestimoInclude<ExtArgs> | null
  }


  /**
   * Model Configuracao
   */

  export type AggregateConfiguracao = {
    _count: ConfiguracaoCountAggregateOutputType | null
    _avg: ConfiguracaoAvgAggregateOutputType | null
    _sum: ConfiguracaoSumAggregateOutputType | null
    _min: ConfiguracaoMinAggregateOutputType | null
    _max: ConfiguracaoMaxAggregateOutputType | null
  }

  export type ConfiguracaoAvgAggregateOutputType = {
    id: number | null
    limite_global: number | null
    limite_por_titulo: number | null
    prazo_padrao_dias: number | null
    dias_penalidade: number | null
  }

  export type ConfiguracaoSumAggregateOutputType = {
    id: number | null
    limite_global: number | null
    limite_por_titulo: number | null
    prazo_padrao_dias: number | null
    dias_penalidade: number | null
  }

  export type ConfiguracaoMinAggregateOutputType = {
    id: number | null
    limite_global: number | null
    limite_por_titulo: number | null
    prazo_padrao_dias: number | null
    dias_penalidade: number | null
  }

  export type ConfiguracaoMaxAggregateOutputType = {
    id: number | null
    limite_global: number | null
    limite_por_titulo: number | null
    prazo_padrao_dias: number | null
    dias_penalidade: number | null
  }

  export type ConfiguracaoCountAggregateOutputType = {
    id: number
    limite_global: number
    limite_por_titulo: number
    prazo_padrao_dias: number
    dias_penalidade: number
    _all: number
  }


  export type ConfiguracaoAvgAggregateInputType = {
    id?: true
    limite_global?: true
    limite_por_titulo?: true
    prazo_padrao_dias?: true
    dias_penalidade?: true
  }

  export type ConfiguracaoSumAggregateInputType = {
    id?: true
    limite_global?: true
    limite_por_titulo?: true
    prazo_padrao_dias?: true
    dias_penalidade?: true
  }

  export type ConfiguracaoMinAggregateInputType = {
    id?: true
    limite_global?: true
    limite_por_titulo?: true
    prazo_padrao_dias?: true
    dias_penalidade?: true
  }

  export type ConfiguracaoMaxAggregateInputType = {
    id?: true
    limite_global?: true
    limite_por_titulo?: true
    prazo_padrao_dias?: true
    dias_penalidade?: true
  }

  export type ConfiguracaoCountAggregateInputType = {
    id?: true
    limite_global?: true
    limite_por_titulo?: true
    prazo_padrao_dias?: true
    dias_penalidade?: true
    _all?: true
  }

  export type ConfiguracaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configuracao to aggregate.
     */
    where?: ConfiguracaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracaos to fetch.
     */
    orderBy?: ConfiguracaoOrderByWithRelationInput | ConfiguracaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfiguracaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Configuracaos
    **/
    _count?: true | ConfiguracaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConfiguracaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConfiguracaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfiguracaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfiguracaoMaxAggregateInputType
  }

  export type GetConfiguracaoAggregateType<T extends ConfiguracaoAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguracao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguracao[P]>
      : GetScalarType<T[P], AggregateConfiguracao[P]>
  }




  export type ConfiguracaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfiguracaoWhereInput
    orderBy?: ConfiguracaoOrderByWithAggregationInput | ConfiguracaoOrderByWithAggregationInput[]
    by: ConfiguracaoScalarFieldEnum[] | ConfiguracaoScalarFieldEnum
    having?: ConfiguracaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfiguracaoCountAggregateInputType | true
    _avg?: ConfiguracaoAvgAggregateInputType
    _sum?: ConfiguracaoSumAggregateInputType
    _min?: ConfiguracaoMinAggregateInputType
    _max?: ConfiguracaoMaxAggregateInputType
  }

  export type ConfiguracaoGroupByOutputType = {
    id: number
    limite_global: number
    limite_por_titulo: number
    prazo_padrao_dias: number
    dias_penalidade: number
    _count: ConfiguracaoCountAggregateOutputType | null
    _avg: ConfiguracaoAvgAggregateOutputType | null
    _sum: ConfiguracaoSumAggregateOutputType | null
    _min: ConfiguracaoMinAggregateOutputType | null
    _max: ConfiguracaoMaxAggregateOutputType | null
  }

  type GetConfiguracaoGroupByPayload<T extends ConfiguracaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfiguracaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfiguracaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfiguracaoGroupByOutputType[P]>
            : GetScalarType<T[P], ConfiguracaoGroupByOutputType[P]>
        }
      >
    >


  export type ConfiguracaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    limite_global?: boolean
    limite_por_titulo?: boolean
    prazo_padrao_dias?: boolean
    dias_penalidade?: boolean
  }, ExtArgs["result"]["configuracao"]>



  export type ConfiguracaoSelectScalar = {
    id?: boolean
    limite_global?: boolean
    limite_por_titulo?: boolean
    prazo_padrao_dias?: boolean
    dias_penalidade?: boolean
  }

  export type ConfiguracaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "limite_global" | "limite_por_titulo" | "prazo_padrao_dias" | "dias_penalidade", ExtArgs["result"]["configuracao"]>

  export type $ConfiguracaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Configuracao"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      limite_global: number
      limite_por_titulo: number
      prazo_padrao_dias: number
      dias_penalidade: number
    }, ExtArgs["result"]["configuracao"]>
    composites: {}
  }

  type ConfiguracaoGetPayload<S extends boolean | null | undefined | ConfiguracaoDefaultArgs> = $Result.GetResult<Prisma.$ConfiguracaoPayload, S>

  type ConfiguracaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfiguracaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfiguracaoCountAggregateInputType | true
    }

  export interface ConfiguracaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Configuracao'], meta: { name: 'Configuracao' } }
    /**
     * Find zero or one Configuracao that matches the filter.
     * @param {ConfiguracaoFindUniqueArgs} args - Arguments to find a Configuracao
     * @example
     * // Get one Configuracao
     * const configuracao = await prisma.configuracao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfiguracaoFindUniqueArgs>(args: SelectSubset<T, ConfiguracaoFindUniqueArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuracao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfiguracaoFindUniqueOrThrowArgs} args - Arguments to find a Configuracao
     * @example
     * // Get one Configuracao
     * const configuracao = await prisma.configuracao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfiguracaoFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfiguracaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracaoFindFirstArgs} args - Arguments to find a Configuracao
     * @example
     * // Get one Configuracao
     * const configuracao = await prisma.configuracao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfiguracaoFindFirstArgs>(args?: SelectSubset<T, ConfiguracaoFindFirstArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracaoFindFirstOrThrowArgs} args - Arguments to find a Configuracao
     * @example
     * // Get one Configuracao
     * const configuracao = await prisma.configuracao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfiguracaoFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfiguracaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configuracaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configuracaos
     * const configuracaos = await prisma.configuracao.findMany()
     * 
     * // Get first 10 Configuracaos
     * const configuracaos = await prisma.configuracao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configuracaoWithIdOnly = await prisma.configuracao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConfiguracaoFindManyArgs>(args?: SelectSubset<T, ConfiguracaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuracao.
     * @param {ConfiguracaoCreateArgs} args - Arguments to create a Configuracao.
     * @example
     * // Create one Configuracao
     * const Configuracao = await prisma.configuracao.create({
     *   data: {
     *     // ... data to create a Configuracao
     *   }
     * })
     * 
     */
    create<T extends ConfiguracaoCreateArgs>(args: SelectSubset<T, ConfiguracaoCreateArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configuracaos.
     * @param {ConfiguracaoCreateManyArgs} args - Arguments to create many Configuracaos.
     * @example
     * // Create many Configuracaos
     * const configuracao = await prisma.configuracao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfiguracaoCreateManyArgs>(args?: SelectSubset<T, ConfiguracaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Configuracao.
     * @param {ConfiguracaoDeleteArgs} args - Arguments to delete one Configuracao.
     * @example
     * // Delete one Configuracao
     * const Configuracao = await prisma.configuracao.delete({
     *   where: {
     *     // ... filter to delete one Configuracao
     *   }
     * })
     * 
     */
    delete<T extends ConfiguracaoDeleteArgs>(args: SelectSubset<T, ConfiguracaoDeleteArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuracao.
     * @param {ConfiguracaoUpdateArgs} args - Arguments to update one Configuracao.
     * @example
     * // Update one Configuracao
     * const configuracao = await prisma.configuracao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfiguracaoUpdateArgs>(args: SelectSubset<T, ConfiguracaoUpdateArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configuracaos.
     * @param {ConfiguracaoDeleteManyArgs} args - Arguments to filter Configuracaos to delete.
     * @example
     * // Delete a few Configuracaos
     * const { count } = await prisma.configuracao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfiguracaoDeleteManyArgs>(args?: SelectSubset<T, ConfiguracaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configuracaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configuracaos
     * const configuracao = await prisma.configuracao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfiguracaoUpdateManyArgs>(args: SelectSubset<T, ConfiguracaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Configuracao.
     * @param {ConfiguracaoUpsertArgs} args - Arguments to update or create a Configuracao.
     * @example
     * // Update or create a Configuracao
     * const configuracao = await prisma.configuracao.upsert({
     *   create: {
     *     // ... data to create a Configuracao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuracao we want to update
     *   }
     * })
     */
    upsert<T extends ConfiguracaoUpsertArgs>(args: SelectSubset<T, ConfiguracaoUpsertArgs<ExtArgs>>): Prisma__ConfiguracaoClient<$Result.GetResult<Prisma.$ConfiguracaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configuracaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracaoCountArgs} args - Arguments to filter Configuracaos to count.
     * @example
     * // Count the number of Configuracaos
     * const count = await prisma.configuracao.count({
     *   where: {
     *     // ... the filter for the Configuracaos we want to count
     *   }
     * })
    **/
    count<T extends ConfiguracaoCountArgs>(
      args?: Subset<T, ConfiguracaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfiguracaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuracao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfiguracaoAggregateArgs>(args: Subset<T, ConfiguracaoAggregateArgs>): Prisma.PrismaPromise<GetConfiguracaoAggregateType<T>>

    /**
     * Group by Configuracao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfiguracaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfiguracaoGroupByArgs['orderBy'] }
        : { orderBy?: ConfiguracaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfiguracaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfiguracaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Configuracao model
   */
  readonly fields: ConfiguracaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Configuracao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfiguracaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Configuracao model
   */
  interface ConfiguracaoFieldRefs {
    readonly id: FieldRef<"Configuracao", 'Int'>
    readonly limite_global: FieldRef<"Configuracao", 'Int'>
    readonly limite_por_titulo: FieldRef<"Configuracao", 'Int'>
    readonly prazo_padrao_dias: FieldRef<"Configuracao", 'Int'>
    readonly dias_penalidade: FieldRef<"Configuracao", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Configuracao findUnique
   */
  export type ConfiguracaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * Filter, which Configuracao to fetch.
     */
    where: ConfiguracaoWhereUniqueInput
  }

  /**
   * Configuracao findUniqueOrThrow
   */
  export type ConfiguracaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * Filter, which Configuracao to fetch.
     */
    where: ConfiguracaoWhereUniqueInput
  }

  /**
   * Configuracao findFirst
   */
  export type ConfiguracaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * Filter, which Configuracao to fetch.
     */
    where?: ConfiguracaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracaos to fetch.
     */
    orderBy?: ConfiguracaoOrderByWithRelationInput | ConfiguracaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configuracaos.
     */
    cursor?: ConfiguracaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configuracaos.
     */
    distinct?: ConfiguracaoScalarFieldEnum | ConfiguracaoScalarFieldEnum[]
  }

  /**
   * Configuracao findFirstOrThrow
   */
  export type ConfiguracaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * Filter, which Configuracao to fetch.
     */
    where?: ConfiguracaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracaos to fetch.
     */
    orderBy?: ConfiguracaoOrderByWithRelationInput | ConfiguracaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configuracaos.
     */
    cursor?: ConfiguracaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configuracaos.
     */
    distinct?: ConfiguracaoScalarFieldEnum | ConfiguracaoScalarFieldEnum[]
  }

  /**
   * Configuracao findMany
   */
  export type ConfiguracaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * Filter, which Configuracaos to fetch.
     */
    where?: ConfiguracaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracaos to fetch.
     */
    orderBy?: ConfiguracaoOrderByWithRelationInput | ConfiguracaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Configuracaos.
     */
    cursor?: ConfiguracaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configuracaos.
     */
    distinct?: ConfiguracaoScalarFieldEnum | ConfiguracaoScalarFieldEnum[]
  }

  /**
   * Configuracao create
   */
  export type ConfiguracaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * The data needed to create a Configuracao.
     */
    data?: XOR<ConfiguracaoCreateInput, ConfiguracaoUncheckedCreateInput>
  }

  /**
   * Configuracao createMany
   */
  export type ConfiguracaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Configuracaos.
     */
    data: ConfiguracaoCreateManyInput | ConfiguracaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuracao update
   */
  export type ConfiguracaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * The data needed to update a Configuracao.
     */
    data: XOR<ConfiguracaoUpdateInput, ConfiguracaoUncheckedUpdateInput>
    /**
     * Choose, which Configuracao to update.
     */
    where: ConfiguracaoWhereUniqueInput
  }

  /**
   * Configuracao updateMany
   */
  export type ConfiguracaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Configuracaos.
     */
    data: XOR<ConfiguracaoUpdateManyMutationInput, ConfiguracaoUncheckedUpdateManyInput>
    /**
     * Filter which Configuracaos to update
     */
    where?: ConfiguracaoWhereInput
    /**
     * Limit how many Configuracaos to update.
     */
    limit?: number
  }

  /**
   * Configuracao upsert
   */
  export type ConfiguracaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * The filter to search for the Configuracao to update in case it exists.
     */
    where: ConfiguracaoWhereUniqueInput
    /**
     * In case the Configuracao found by the `where` argument doesn't exist, create a new Configuracao with this data.
     */
    create: XOR<ConfiguracaoCreateInput, ConfiguracaoUncheckedCreateInput>
    /**
     * In case the Configuracao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfiguracaoUpdateInput, ConfiguracaoUncheckedUpdateInput>
  }

  /**
   * Configuracao delete
   */
  export type ConfiguracaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
    /**
     * Filter which Configuracao to delete.
     */
    where: ConfiguracaoWhereUniqueInput
  }

  /**
   * Configuracao deleteMany
   */
  export type ConfiguracaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configuracaos to delete
     */
    where?: ConfiguracaoWhereInput
    /**
     * Limit how many Configuracaos to delete.
     */
    limit?: number
  }

  /**
   * Configuracao without action
   */
  export type ConfiguracaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracao
     */
    select?: ConfiguracaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracao
     */
    omit?: ConfiguracaoOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    role: 'role'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    cpf: 'cpf',
    telefone: 'telefone',
    data_penalidade: 'data_penalidade',
    emailVerificado: 'emailVerificado'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const FuncionarioScalarFieldEnum: {
    id: 'id',
    salario: 'salario',
    data_contratacao: 'data_contratacao'
  };

  export type FuncionarioScalarFieldEnum = (typeof FuncionarioScalarFieldEnum)[keyof typeof FuncionarioScalarFieldEnum]


  export const LivroScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    autor: 'autor'
  };

  export type LivroScalarFieldEnum = (typeof LivroScalarFieldEnum)[keyof typeof LivroScalarFieldEnum]


  export const ExemplarLivroScalarFieldEnum: {
    id: 'id',
    livroId: 'livroId',
    status: 'status'
  };

  export type ExemplarLivroScalarFieldEnum = (typeof ExemplarLivroScalarFieldEnum)[keyof typeof ExemplarLivroScalarFieldEnum]


  export const EmprestimoScalarFieldEnum: {
    id: 'id',
    id_cliente: 'id_cliente',
    data_saida: 'data_saida'
  };

  export type EmprestimoScalarFieldEnum = (typeof EmprestimoScalarFieldEnum)[keyof typeof EmprestimoScalarFieldEnum]


  export const ItemEmprestimoScalarFieldEnum: {
    id: 'id',
    emprestimoId: 'emprestimoId',
    exemplarId: 'exemplarId',
    count_adiar: 'count_adiar',
    data_prazo: 'data_prazo',
    data_devolucao: 'data_devolucao'
  };

  export type ItemEmprestimoScalarFieldEnum = (typeof ItemEmprestimoScalarFieldEnum)[keyof typeof ItemEmprestimoScalarFieldEnum]


  export const ConfiguracaoScalarFieldEnum: {
    id: 'id',
    limite_global: 'limite_global',
    limite_por_titulo: 'limite_por_titulo',
    prazo_padrao_dias: 'prazo_padrao_dias',
    dias_penalidade: 'dias_penalidade'
  };

  export type ConfiguracaoScalarFieldEnum = (typeof ConfiguracaoScalarFieldEnum)[keyof typeof ConfiguracaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UsuarioOrderByRelevanceFieldEnum: {
    nome: 'nome',
    email: 'email',
    senha: 'senha'
  };

  export type UsuarioOrderByRelevanceFieldEnum = (typeof UsuarioOrderByRelevanceFieldEnum)[keyof typeof UsuarioOrderByRelevanceFieldEnum]


  export const ClienteOrderByRelevanceFieldEnum: {
    cpf: 'cpf',
    telefone: 'telefone'
  };

  export type ClienteOrderByRelevanceFieldEnum = (typeof ClienteOrderByRelevanceFieldEnum)[keyof typeof ClienteOrderByRelevanceFieldEnum]


  export const LivroOrderByRelevanceFieldEnum: {
    titulo: 'titulo',
    autor: 'autor'
  };

  export type LivroOrderByRelevanceFieldEnum = (typeof LivroOrderByRelevanceFieldEnum)[keyof typeof LivroOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'LivroStatus'
   */
  export type EnumLivroStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LivroStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nome?: StringFilter<"Usuario"> | string
    email?: StringNullableFilter<"Usuario"> | string | null
    senha?: StringNullableFilter<"Usuario"> | string | null
    role?: EnumRoleFilter<"Usuario"> | $Enums.Role
    cliente?: XOR<ClienteNullableScalarRelationFilter, ClienteWhereInput> | null
    funcionario?: XOR<FuncionarioNullableScalarRelationFilter, FuncionarioWhereInput> | null
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrderInput | SortOrder
    senha?: SortOrderInput | SortOrder
    role?: SortOrder
    cliente?: ClienteOrderByWithRelationInput
    funcionario?: FuncionarioOrderByWithRelationInput
    _relevance?: UsuarioOrderByRelevanceInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nome?: StringFilter<"Usuario"> | string
    senha?: StringNullableFilter<"Usuario"> | string | null
    role?: EnumRoleFilter<"Usuario"> | $Enums.Role
    cliente?: XOR<ClienteNullableScalarRelationFilter, ClienteWhereInput> | null
    funcionario?: XOR<FuncionarioNullableScalarRelationFilter, FuncionarioWhereInput> | null
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrderInput | SortOrder
    senha?: SortOrderInput | SortOrder
    role?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    senha?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    role?: EnumRoleWithAggregatesFilter<"Usuario"> | $Enums.Role
  }

  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: IntFilter<"Cliente"> | number
    cpf?: StringNullableFilter<"Cliente"> | string | null
    telefone?: StringNullableFilter<"Cliente"> | string | null
    data_penalidade?: DateTimeNullableFilter<"Cliente"> | Date | string | null
    emailVerificado?: BoolFilter<"Cliente"> | boolean
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    emprestimos?: EmprestimoListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    cpf?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    data_penalidade?: SortOrderInput | SortOrder
    emailVerificado?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    emprestimos?: EmprestimoOrderByRelationAggregateInput
    _relevance?: ClienteOrderByRelevanceInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cpf?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    telefone?: StringNullableFilter<"Cliente"> | string | null
    data_penalidade?: DateTimeNullableFilter<"Cliente"> | Date | string | null
    emailVerificado?: BoolFilter<"Cliente"> | boolean
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    emprestimos?: EmprestimoListRelationFilter
  }, "id" | "cpf">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    cpf?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    data_penalidade?: SortOrderInput | SortOrder
    emailVerificado?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _avg?: ClienteAvgOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
    _sum?: ClienteSumOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cliente"> | number
    cpf?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    telefone?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    data_penalidade?: DateTimeNullableWithAggregatesFilter<"Cliente"> | Date | string | null
    emailVerificado?: BoolWithAggregatesFilter<"Cliente"> | boolean
  }

  export type FuncionarioWhereInput = {
    AND?: FuncionarioWhereInput | FuncionarioWhereInput[]
    OR?: FuncionarioWhereInput[]
    NOT?: FuncionarioWhereInput | FuncionarioWhereInput[]
    id?: IntFilter<"Funcionario"> | number
    salario?: DecimalFilter<"Funcionario"> | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFilter<"Funcionario"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type FuncionarioOrderByWithRelationInput = {
    id?: SortOrder
    salario?: SortOrder
    data_contratacao?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type FuncionarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FuncionarioWhereInput | FuncionarioWhereInput[]
    OR?: FuncionarioWhereInput[]
    NOT?: FuncionarioWhereInput | FuncionarioWhereInput[]
    salario?: DecimalFilter<"Funcionario"> | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFilter<"Funcionario"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type FuncionarioOrderByWithAggregationInput = {
    id?: SortOrder
    salario?: SortOrder
    data_contratacao?: SortOrder
    _count?: FuncionarioCountOrderByAggregateInput
    _avg?: FuncionarioAvgOrderByAggregateInput
    _max?: FuncionarioMaxOrderByAggregateInput
    _min?: FuncionarioMinOrderByAggregateInput
    _sum?: FuncionarioSumOrderByAggregateInput
  }

  export type FuncionarioScalarWhereWithAggregatesInput = {
    AND?: FuncionarioScalarWhereWithAggregatesInput | FuncionarioScalarWhereWithAggregatesInput[]
    OR?: FuncionarioScalarWhereWithAggregatesInput[]
    NOT?: FuncionarioScalarWhereWithAggregatesInput | FuncionarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Funcionario"> | number
    salario?: DecimalWithAggregatesFilter<"Funcionario"> | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeWithAggregatesFilter<"Funcionario"> | Date | string
  }

  export type LivroWhereInput = {
    AND?: LivroWhereInput | LivroWhereInput[]
    OR?: LivroWhereInput[]
    NOT?: LivroWhereInput | LivroWhereInput[]
    id?: IntFilter<"Livro"> | number
    titulo?: StringFilter<"Livro"> | string
    autor?: StringNullableFilter<"Livro"> | string | null
    exemplares?: ExemplarLivroListRelationFilter
  }

  export type LivroOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    autor?: SortOrderInput | SortOrder
    exemplares?: ExemplarLivroOrderByRelationAggregateInput
    _relevance?: LivroOrderByRelevanceInput
  }

  export type LivroWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LivroWhereInput | LivroWhereInput[]
    OR?: LivroWhereInput[]
    NOT?: LivroWhereInput | LivroWhereInput[]
    titulo?: StringFilter<"Livro"> | string
    autor?: StringNullableFilter<"Livro"> | string | null
    exemplares?: ExemplarLivroListRelationFilter
  }, "id">

  export type LivroOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    autor?: SortOrderInput | SortOrder
    _count?: LivroCountOrderByAggregateInput
    _avg?: LivroAvgOrderByAggregateInput
    _max?: LivroMaxOrderByAggregateInput
    _min?: LivroMinOrderByAggregateInput
    _sum?: LivroSumOrderByAggregateInput
  }

  export type LivroScalarWhereWithAggregatesInput = {
    AND?: LivroScalarWhereWithAggregatesInput | LivroScalarWhereWithAggregatesInput[]
    OR?: LivroScalarWhereWithAggregatesInput[]
    NOT?: LivroScalarWhereWithAggregatesInput | LivroScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Livro"> | number
    titulo?: StringWithAggregatesFilter<"Livro"> | string
    autor?: StringNullableWithAggregatesFilter<"Livro"> | string | null
  }

  export type ExemplarLivroWhereInput = {
    AND?: ExemplarLivroWhereInput | ExemplarLivroWhereInput[]
    OR?: ExemplarLivroWhereInput[]
    NOT?: ExemplarLivroWhereInput | ExemplarLivroWhereInput[]
    id?: IntFilter<"ExemplarLivro"> | number
    livroId?: IntFilter<"ExemplarLivro"> | number
    status?: EnumLivroStatusFilter<"ExemplarLivro"> | $Enums.LivroStatus
    livro?: XOR<LivroScalarRelationFilter, LivroWhereInput>
    itens?: ItemEmprestimoListRelationFilter
  }

  export type ExemplarLivroOrderByWithRelationInput = {
    id?: SortOrder
    livroId?: SortOrder
    status?: SortOrder
    livro?: LivroOrderByWithRelationInput
    itens?: ItemEmprestimoOrderByRelationAggregateInput
  }

  export type ExemplarLivroWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ExemplarLivroWhereInput | ExemplarLivroWhereInput[]
    OR?: ExemplarLivroWhereInput[]
    NOT?: ExemplarLivroWhereInput | ExemplarLivroWhereInput[]
    livroId?: IntFilter<"ExemplarLivro"> | number
    status?: EnumLivroStatusFilter<"ExemplarLivro"> | $Enums.LivroStatus
    livro?: XOR<LivroScalarRelationFilter, LivroWhereInput>
    itens?: ItemEmprestimoListRelationFilter
  }, "id">

  export type ExemplarLivroOrderByWithAggregationInput = {
    id?: SortOrder
    livroId?: SortOrder
    status?: SortOrder
    _count?: ExemplarLivroCountOrderByAggregateInput
    _avg?: ExemplarLivroAvgOrderByAggregateInput
    _max?: ExemplarLivroMaxOrderByAggregateInput
    _min?: ExemplarLivroMinOrderByAggregateInput
    _sum?: ExemplarLivroSumOrderByAggregateInput
  }

  export type ExemplarLivroScalarWhereWithAggregatesInput = {
    AND?: ExemplarLivroScalarWhereWithAggregatesInput | ExemplarLivroScalarWhereWithAggregatesInput[]
    OR?: ExemplarLivroScalarWhereWithAggregatesInput[]
    NOT?: ExemplarLivroScalarWhereWithAggregatesInput | ExemplarLivroScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExemplarLivro"> | number
    livroId?: IntWithAggregatesFilter<"ExemplarLivro"> | number
    status?: EnumLivroStatusWithAggregatesFilter<"ExemplarLivro"> | $Enums.LivroStatus
  }

  export type EmprestimoWhereInput = {
    AND?: EmprestimoWhereInput | EmprestimoWhereInput[]
    OR?: EmprestimoWhereInput[]
    NOT?: EmprestimoWhereInput | EmprestimoWhereInput[]
    id?: IntFilter<"Emprestimo"> | number
    id_cliente?: IntFilter<"Emprestimo"> | number
    data_saida?: DateTimeFilter<"Emprestimo"> | Date | string
    itens?: ItemEmprestimoListRelationFilter
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
  }

  export type EmprestimoOrderByWithRelationInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    data_saida?: SortOrder
    itens?: ItemEmprestimoOrderByRelationAggregateInput
    cliente?: ClienteOrderByWithRelationInput
  }

  export type EmprestimoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmprestimoWhereInput | EmprestimoWhereInput[]
    OR?: EmprestimoWhereInput[]
    NOT?: EmprestimoWhereInput | EmprestimoWhereInput[]
    id_cliente?: IntFilter<"Emprestimo"> | number
    data_saida?: DateTimeFilter<"Emprestimo"> | Date | string
    itens?: ItemEmprestimoListRelationFilter
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
  }, "id">

  export type EmprestimoOrderByWithAggregationInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    data_saida?: SortOrder
    _count?: EmprestimoCountOrderByAggregateInput
    _avg?: EmprestimoAvgOrderByAggregateInput
    _max?: EmprestimoMaxOrderByAggregateInput
    _min?: EmprestimoMinOrderByAggregateInput
    _sum?: EmprestimoSumOrderByAggregateInput
  }

  export type EmprestimoScalarWhereWithAggregatesInput = {
    AND?: EmprestimoScalarWhereWithAggregatesInput | EmprestimoScalarWhereWithAggregatesInput[]
    OR?: EmprestimoScalarWhereWithAggregatesInput[]
    NOT?: EmprestimoScalarWhereWithAggregatesInput | EmprestimoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Emprestimo"> | number
    id_cliente?: IntWithAggregatesFilter<"Emprestimo"> | number
    data_saida?: DateTimeWithAggregatesFilter<"Emprestimo"> | Date | string
  }

  export type ItemEmprestimoWhereInput = {
    AND?: ItemEmprestimoWhereInput | ItemEmprestimoWhereInput[]
    OR?: ItemEmprestimoWhereInput[]
    NOT?: ItemEmprestimoWhereInput | ItemEmprestimoWhereInput[]
    id?: IntFilter<"ItemEmprestimo"> | number
    emprestimoId?: IntFilter<"ItemEmprestimo"> | number
    exemplarId?: IntFilter<"ItemEmprestimo"> | number
    count_adiar?: IntFilter<"ItemEmprestimo"> | number
    data_prazo?: DateTimeFilter<"ItemEmprestimo"> | Date | string
    data_devolucao?: DateTimeNullableFilter<"ItemEmprestimo"> | Date | string | null
    emprestimo?: XOR<EmprestimoScalarRelationFilter, EmprestimoWhereInput>
    exemplarLivro?: XOR<ExemplarLivroScalarRelationFilter, ExemplarLivroWhereInput>
  }

  export type ItemEmprestimoOrderByWithRelationInput = {
    id?: SortOrder
    emprestimoId?: SortOrder
    exemplarId?: SortOrder
    count_adiar?: SortOrder
    data_prazo?: SortOrder
    data_devolucao?: SortOrderInput | SortOrder
    emprestimo?: EmprestimoOrderByWithRelationInput
    exemplarLivro?: ExemplarLivroOrderByWithRelationInput
  }

  export type ItemEmprestimoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItemEmprestimoWhereInput | ItemEmprestimoWhereInput[]
    OR?: ItemEmprestimoWhereInput[]
    NOT?: ItemEmprestimoWhereInput | ItemEmprestimoWhereInput[]
    emprestimoId?: IntFilter<"ItemEmprestimo"> | number
    exemplarId?: IntFilter<"ItemEmprestimo"> | number
    count_adiar?: IntFilter<"ItemEmprestimo"> | number
    data_prazo?: DateTimeFilter<"ItemEmprestimo"> | Date | string
    data_devolucao?: DateTimeNullableFilter<"ItemEmprestimo"> | Date | string | null
    emprestimo?: XOR<EmprestimoScalarRelationFilter, EmprestimoWhereInput>
    exemplarLivro?: XOR<ExemplarLivroScalarRelationFilter, ExemplarLivroWhereInput>
  }, "id">

  export type ItemEmprestimoOrderByWithAggregationInput = {
    id?: SortOrder
    emprestimoId?: SortOrder
    exemplarId?: SortOrder
    count_adiar?: SortOrder
    data_prazo?: SortOrder
    data_devolucao?: SortOrderInput | SortOrder
    _count?: ItemEmprestimoCountOrderByAggregateInput
    _avg?: ItemEmprestimoAvgOrderByAggregateInput
    _max?: ItemEmprestimoMaxOrderByAggregateInput
    _min?: ItemEmprestimoMinOrderByAggregateInput
    _sum?: ItemEmprestimoSumOrderByAggregateInput
  }

  export type ItemEmprestimoScalarWhereWithAggregatesInput = {
    AND?: ItemEmprestimoScalarWhereWithAggregatesInput | ItemEmprestimoScalarWhereWithAggregatesInput[]
    OR?: ItemEmprestimoScalarWhereWithAggregatesInput[]
    NOT?: ItemEmprestimoScalarWhereWithAggregatesInput | ItemEmprestimoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ItemEmprestimo"> | number
    emprestimoId?: IntWithAggregatesFilter<"ItemEmprestimo"> | number
    exemplarId?: IntWithAggregatesFilter<"ItemEmprestimo"> | number
    count_adiar?: IntWithAggregatesFilter<"ItemEmprestimo"> | number
    data_prazo?: DateTimeWithAggregatesFilter<"ItemEmprestimo"> | Date | string
    data_devolucao?: DateTimeNullableWithAggregatesFilter<"ItemEmprestimo"> | Date | string | null
  }

  export type ConfiguracaoWhereInput = {
    AND?: ConfiguracaoWhereInput | ConfiguracaoWhereInput[]
    OR?: ConfiguracaoWhereInput[]
    NOT?: ConfiguracaoWhereInput | ConfiguracaoWhereInput[]
    id?: IntFilter<"Configuracao"> | number
    limite_global?: IntFilter<"Configuracao"> | number
    limite_por_titulo?: IntFilter<"Configuracao"> | number
    prazo_padrao_dias?: IntFilter<"Configuracao"> | number
    dias_penalidade?: IntFilter<"Configuracao"> | number
  }

  export type ConfiguracaoOrderByWithRelationInput = {
    id?: SortOrder
    limite_global?: SortOrder
    limite_por_titulo?: SortOrder
    prazo_padrao_dias?: SortOrder
    dias_penalidade?: SortOrder
  }

  export type ConfiguracaoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ConfiguracaoWhereInput | ConfiguracaoWhereInput[]
    OR?: ConfiguracaoWhereInput[]
    NOT?: ConfiguracaoWhereInput | ConfiguracaoWhereInput[]
    limite_global?: IntFilter<"Configuracao"> | number
    limite_por_titulo?: IntFilter<"Configuracao"> | number
    prazo_padrao_dias?: IntFilter<"Configuracao"> | number
    dias_penalidade?: IntFilter<"Configuracao"> | number
  }, "id">

  export type ConfiguracaoOrderByWithAggregationInput = {
    id?: SortOrder
    limite_global?: SortOrder
    limite_por_titulo?: SortOrder
    prazo_padrao_dias?: SortOrder
    dias_penalidade?: SortOrder
    _count?: ConfiguracaoCountOrderByAggregateInput
    _avg?: ConfiguracaoAvgOrderByAggregateInput
    _max?: ConfiguracaoMaxOrderByAggregateInput
    _min?: ConfiguracaoMinOrderByAggregateInput
    _sum?: ConfiguracaoSumOrderByAggregateInput
  }

  export type ConfiguracaoScalarWhereWithAggregatesInput = {
    AND?: ConfiguracaoScalarWhereWithAggregatesInput | ConfiguracaoScalarWhereWithAggregatesInput[]
    OR?: ConfiguracaoScalarWhereWithAggregatesInput[]
    NOT?: ConfiguracaoScalarWhereWithAggregatesInput | ConfiguracaoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Configuracao"> | number
    limite_global?: IntWithAggregatesFilter<"Configuracao"> | number
    limite_por_titulo?: IntWithAggregatesFilter<"Configuracao"> | number
    prazo_padrao_dias?: IntWithAggregatesFilter<"Configuracao"> | number
    dias_penalidade?: IntWithAggregatesFilter<"Configuracao"> | number
  }

  export type UsuarioCreateInput = {
    nome: string
    email?: string | null
    senha?: string | null
    role?: $Enums.Role
    cliente?: ClienteCreateNestedOneWithoutUsuarioInput
    funcionario?: FuncionarioCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nome: string
    email?: string | null
    senha?: string | null
    role?: $Enums.Role
    cliente?: ClienteUncheckedCreateNestedOneWithoutUsuarioInput
    funcionario?: FuncionarioUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    cliente?: ClienteUpdateOneWithoutUsuarioNestedInput
    funcionario?: FuncionarioUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    cliente?: ClienteUncheckedUpdateOneWithoutUsuarioNestedInput
    funcionario?: FuncionarioUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nome: string
    email?: string | null
    senha?: string | null
    role?: $Enums.Role
  }

  export type UsuarioUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type ClienteCreateInput = {
    cpf?: string | null
    telefone?: string | null
    data_penalidade?: Date | string | null
    emailVerificado?: boolean
    usuario: UsuarioCreateNestedOneWithoutClienteInput
    emprestimos?: EmprestimoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id: number
    cpf?: string | null
    telefone?: string | null
    data_penalidade?: Date | string | null
    emailVerificado?: boolean
    emprestimos?: EmprestimoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
    usuario?: UsuarioUpdateOneRequiredWithoutClienteNestedInput
    emprestimos?: EmprestimoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
    emprestimos?: EmprestimoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id: number
    cpf?: string | null
    telefone?: string | null
    data_penalidade?: Date | string | null
    emailVerificado?: boolean
  }

  export type ClienteUpdateManyMutationInput = {
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FuncionarioCreateInput = {
    salario: Decimal | DecimalJsLike | number | string
    data_contratacao: Date | string
    usuario: UsuarioCreateNestedOneWithoutFuncionarioInput
  }

  export type FuncionarioUncheckedCreateInput = {
    id: number
    salario: Decimal | DecimalJsLike | number | string
    data_contratacao: Date | string
  }

  export type FuncionarioUpdateInput = {
    salario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutFuncionarioNestedInput
  }

  export type FuncionarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    salario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuncionarioCreateManyInput = {
    id: number
    salario: Decimal | DecimalJsLike | number | string
    data_contratacao: Date | string
  }

  export type FuncionarioUpdateManyMutationInput = {
    salario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuncionarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    salario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LivroCreateInput = {
    titulo: string
    autor?: string | null
    exemplares?: ExemplarLivroCreateNestedManyWithoutLivroInput
  }

  export type LivroUncheckedCreateInput = {
    id?: number
    titulo: string
    autor?: string | null
    exemplares?: ExemplarLivroUncheckedCreateNestedManyWithoutLivroInput
  }

  export type LivroUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    autor?: NullableStringFieldUpdateOperationsInput | string | null
    exemplares?: ExemplarLivroUpdateManyWithoutLivroNestedInput
  }

  export type LivroUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    autor?: NullableStringFieldUpdateOperationsInput | string | null
    exemplares?: ExemplarLivroUncheckedUpdateManyWithoutLivroNestedInput
  }

  export type LivroCreateManyInput = {
    id?: number
    titulo: string
    autor?: string | null
  }

  export type LivroUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LivroUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExemplarLivroCreateInput = {
    status?: $Enums.LivroStatus
    livro: LivroCreateNestedOneWithoutExemplaresInput
    itens?: ItemEmprestimoCreateNestedManyWithoutExemplarLivroInput
  }

  export type ExemplarLivroUncheckedCreateInput = {
    id?: number
    livroId: number
    status?: $Enums.LivroStatus
    itens?: ItemEmprestimoUncheckedCreateNestedManyWithoutExemplarLivroInput
  }

  export type ExemplarLivroUpdateInput = {
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
    livro?: LivroUpdateOneRequiredWithoutExemplaresNestedInput
    itens?: ItemEmprestimoUpdateManyWithoutExemplarLivroNestedInput
  }

  export type ExemplarLivroUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    livroId?: IntFieldUpdateOperationsInput | number
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
    itens?: ItemEmprestimoUncheckedUpdateManyWithoutExemplarLivroNestedInput
  }

  export type ExemplarLivroCreateManyInput = {
    id?: number
    livroId: number
    status?: $Enums.LivroStatus
  }

  export type ExemplarLivroUpdateManyMutationInput = {
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
  }

  export type ExemplarLivroUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    livroId?: IntFieldUpdateOperationsInput | number
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
  }

  export type EmprestimoCreateInput = {
    data_saida?: Date | string
    itens?: ItemEmprestimoCreateNestedManyWithoutEmprestimoInput
    cliente: ClienteCreateNestedOneWithoutEmprestimosInput
  }

  export type EmprestimoUncheckedCreateInput = {
    id?: number
    id_cliente: number
    data_saida?: Date | string
    itens?: ItemEmprestimoUncheckedCreateNestedManyWithoutEmprestimoInput
  }

  export type EmprestimoUpdateInput = {
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
    itens?: ItemEmprestimoUpdateManyWithoutEmprestimoNestedInput
    cliente?: ClienteUpdateOneRequiredWithoutEmprestimosNestedInput
  }

  export type EmprestimoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cliente?: IntFieldUpdateOperationsInput | number
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
    itens?: ItemEmprestimoUncheckedUpdateManyWithoutEmprestimoNestedInput
  }

  export type EmprestimoCreateManyInput = {
    id?: number
    id_cliente: number
    data_saida?: Date | string
  }

  export type EmprestimoUpdateManyMutationInput = {
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmprestimoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cliente?: IntFieldUpdateOperationsInput | number
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemEmprestimoCreateInput = {
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
    emprestimo: EmprestimoCreateNestedOneWithoutItensInput
    exemplarLivro: ExemplarLivroCreateNestedOneWithoutItensInput
  }

  export type ItemEmprestimoUncheckedCreateInput = {
    id?: number
    emprestimoId: number
    exemplarId: number
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
  }

  export type ItemEmprestimoUpdateInput = {
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emprestimo?: EmprestimoUpdateOneRequiredWithoutItensNestedInput
    exemplarLivro?: ExemplarLivroUpdateOneRequiredWithoutItensNestedInput
  }

  export type ItemEmprestimoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    emprestimoId?: IntFieldUpdateOperationsInput | number
    exemplarId?: IntFieldUpdateOperationsInput | number
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemEmprestimoCreateManyInput = {
    id?: number
    emprestimoId: number
    exemplarId: number
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
  }

  export type ItemEmprestimoUpdateManyMutationInput = {
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemEmprestimoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    emprestimoId?: IntFieldUpdateOperationsInput | number
    exemplarId?: IntFieldUpdateOperationsInput | number
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConfiguracaoCreateInput = {
    id?: number
    limite_global?: number
    limite_por_titulo?: number
    prazo_padrao_dias?: number
    dias_penalidade?: number
  }

  export type ConfiguracaoUncheckedCreateInput = {
    id?: number
    limite_global?: number
    limite_por_titulo?: number
    prazo_padrao_dias?: number
    dias_penalidade?: number
  }

  export type ConfiguracaoUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    limite_global?: IntFieldUpdateOperationsInput | number
    limite_por_titulo?: IntFieldUpdateOperationsInput | number
    prazo_padrao_dias?: IntFieldUpdateOperationsInput | number
    dias_penalidade?: IntFieldUpdateOperationsInput | number
  }

  export type ConfiguracaoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    limite_global?: IntFieldUpdateOperationsInput | number
    limite_por_titulo?: IntFieldUpdateOperationsInput | number
    prazo_padrao_dias?: IntFieldUpdateOperationsInput | number
    dias_penalidade?: IntFieldUpdateOperationsInput | number
  }

  export type ConfiguracaoCreateManyInput = {
    id?: number
    limite_global?: number
    limite_por_titulo?: number
    prazo_padrao_dias?: number
    dias_penalidade?: number
  }

  export type ConfiguracaoUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    limite_global?: IntFieldUpdateOperationsInput | number
    limite_por_titulo?: IntFieldUpdateOperationsInput | number
    prazo_padrao_dias?: IntFieldUpdateOperationsInput | number
    dias_penalidade?: IntFieldUpdateOperationsInput | number
  }

  export type ConfiguracaoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    limite_global?: IntFieldUpdateOperationsInput | number
    limite_por_titulo?: IntFieldUpdateOperationsInput | number
    prazo_padrao_dias?: IntFieldUpdateOperationsInput | number
    dias_penalidade?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type ClienteNullableScalarRelationFilter = {
    is?: ClienteWhereInput | null
    isNot?: ClienteWhereInput | null
  }

  export type FuncionarioNullableScalarRelationFilter = {
    is?: FuncionarioWhereInput | null
    isNot?: FuncionarioWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsuarioOrderByRelevanceInput = {
    fields: UsuarioOrderByRelevanceFieldEnum | UsuarioOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type EmprestimoListRelationFilter = {
    every?: EmprestimoWhereInput
    some?: EmprestimoWhereInput
    none?: EmprestimoWhereInput
  }

  export type EmprestimoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClienteOrderByRelevanceInput = {
    fields: ClienteOrderByRelevanceFieldEnum | ClienteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    telefone?: SortOrder
    data_penalidade?: SortOrder
    emailVerificado?: SortOrder
  }

  export type ClienteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    telefone?: SortOrder
    data_penalidade?: SortOrder
    emailVerificado?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    cpf?: SortOrder
    telefone?: SortOrder
    data_penalidade?: SortOrder
    emailVerificado?: SortOrder
  }

  export type ClienteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FuncionarioCountOrderByAggregateInput = {
    id?: SortOrder
    salario?: SortOrder
    data_contratacao?: SortOrder
  }

  export type FuncionarioAvgOrderByAggregateInput = {
    id?: SortOrder
    salario?: SortOrder
  }

  export type FuncionarioMaxOrderByAggregateInput = {
    id?: SortOrder
    salario?: SortOrder
    data_contratacao?: SortOrder
  }

  export type FuncionarioMinOrderByAggregateInput = {
    id?: SortOrder
    salario?: SortOrder
    data_contratacao?: SortOrder
  }

  export type FuncionarioSumOrderByAggregateInput = {
    id?: SortOrder
    salario?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ExemplarLivroListRelationFilter = {
    every?: ExemplarLivroWhereInput
    some?: ExemplarLivroWhereInput
    none?: ExemplarLivroWhereInput
  }

  export type ExemplarLivroOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LivroOrderByRelevanceInput = {
    fields: LivroOrderByRelevanceFieldEnum | LivroOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LivroCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    autor?: SortOrder
  }

  export type LivroAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LivroMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    autor?: SortOrder
  }

  export type LivroMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    autor?: SortOrder
  }

  export type LivroSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumLivroStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LivroStatus | EnumLivroStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LivroStatus[]
    notIn?: $Enums.LivroStatus[]
    not?: NestedEnumLivroStatusFilter<$PrismaModel> | $Enums.LivroStatus
  }

  export type LivroScalarRelationFilter = {
    is?: LivroWhereInput
    isNot?: LivroWhereInput
  }

  export type ItemEmprestimoListRelationFilter = {
    every?: ItemEmprestimoWhereInput
    some?: ItemEmprestimoWhereInput
    none?: ItemEmprestimoWhereInput
  }

  export type ItemEmprestimoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExemplarLivroCountOrderByAggregateInput = {
    id?: SortOrder
    livroId?: SortOrder
    status?: SortOrder
  }

  export type ExemplarLivroAvgOrderByAggregateInput = {
    id?: SortOrder
    livroId?: SortOrder
  }

  export type ExemplarLivroMaxOrderByAggregateInput = {
    id?: SortOrder
    livroId?: SortOrder
    status?: SortOrder
  }

  export type ExemplarLivroMinOrderByAggregateInput = {
    id?: SortOrder
    livroId?: SortOrder
    status?: SortOrder
  }

  export type ExemplarLivroSumOrderByAggregateInput = {
    id?: SortOrder
    livroId?: SortOrder
  }

  export type EnumLivroStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LivroStatus | EnumLivroStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LivroStatus[]
    notIn?: $Enums.LivroStatus[]
    not?: NestedEnumLivroStatusWithAggregatesFilter<$PrismaModel> | $Enums.LivroStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLivroStatusFilter<$PrismaModel>
    _max?: NestedEnumLivroStatusFilter<$PrismaModel>
  }

  export type ClienteScalarRelationFilter = {
    is?: ClienteWhereInput
    isNot?: ClienteWhereInput
  }

  export type EmprestimoCountOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    data_saida?: SortOrder
  }

  export type EmprestimoAvgOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
  }

  export type EmprestimoMaxOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    data_saida?: SortOrder
  }

  export type EmprestimoMinOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    data_saida?: SortOrder
  }

  export type EmprestimoSumOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
  }

  export type EmprestimoScalarRelationFilter = {
    is?: EmprestimoWhereInput
    isNot?: EmprestimoWhereInput
  }

  export type ExemplarLivroScalarRelationFilter = {
    is?: ExemplarLivroWhereInput
    isNot?: ExemplarLivroWhereInput
  }

  export type ItemEmprestimoCountOrderByAggregateInput = {
    id?: SortOrder
    emprestimoId?: SortOrder
    exemplarId?: SortOrder
    count_adiar?: SortOrder
    data_prazo?: SortOrder
    data_devolucao?: SortOrder
  }

  export type ItemEmprestimoAvgOrderByAggregateInput = {
    id?: SortOrder
    emprestimoId?: SortOrder
    exemplarId?: SortOrder
    count_adiar?: SortOrder
  }

  export type ItemEmprestimoMaxOrderByAggregateInput = {
    id?: SortOrder
    emprestimoId?: SortOrder
    exemplarId?: SortOrder
    count_adiar?: SortOrder
    data_prazo?: SortOrder
    data_devolucao?: SortOrder
  }

  export type ItemEmprestimoMinOrderByAggregateInput = {
    id?: SortOrder
    emprestimoId?: SortOrder
    exemplarId?: SortOrder
    count_adiar?: SortOrder
    data_prazo?: SortOrder
    data_devolucao?: SortOrder
  }

  export type ItemEmprestimoSumOrderByAggregateInput = {
    id?: SortOrder
    emprestimoId?: SortOrder
    exemplarId?: SortOrder
    count_adiar?: SortOrder
  }

  export type ConfiguracaoCountOrderByAggregateInput = {
    id?: SortOrder
    limite_global?: SortOrder
    limite_por_titulo?: SortOrder
    prazo_padrao_dias?: SortOrder
    dias_penalidade?: SortOrder
  }

  export type ConfiguracaoAvgOrderByAggregateInput = {
    id?: SortOrder
    limite_global?: SortOrder
    limite_por_titulo?: SortOrder
    prazo_padrao_dias?: SortOrder
    dias_penalidade?: SortOrder
  }

  export type ConfiguracaoMaxOrderByAggregateInput = {
    id?: SortOrder
    limite_global?: SortOrder
    limite_por_titulo?: SortOrder
    prazo_padrao_dias?: SortOrder
    dias_penalidade?: SortOrder
  }

  export type ConfiguracaoMinOrderByAggregateInput = {
    id?: SortOrder
    limite_global?: SortOrder
    limite_por_titulo?: SortOrder
    prazo_padrao_dias?: SortOrder
    dias_penalidade?: SortOrder
  }

  export type ConfiguracaoSumOrderByAggregateInput = {
    id?: SortOrder
    limite_global?: SortOrder
    limite_por_titulo?: SortOrder
    prazo_padrao_dias?: SortOrder
    dias_penalidade?: SortOrder
  }

  export type ClienteCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<ClienteCreateWithoutUsuarioInput, ClienteUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutUsuarioInput
    connect?: ClienteWhereUniqueInput
  }

  export type FuncionarioCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<FuncionarioCreateWithoutUsuarioInput, FuncionarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: FuncionarioCreateOrConnectWithoutUsuarioInput
    connect?: FuncionarioWhereUniqueInput
  }

  export type ClienteUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<ClienteCreateWithoutUsuarioInput, ClienteUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutUsuarioInput
    connect?: ClienteWhereUniqueInput
  }

  export type FuncionarioUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<FuncionarioCreateWithoutUsuarioInput, FuncionarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: FuncionarioCreateOrConnectWithoutUsuarioInput
    connect?: FuncionarioWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type ClienteUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<ClienteCreateWithoutUsuarioInput, ClienteUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutUsuarioInput
    upsert?: ClienteUpsertWithoutUsuarioInput
    disconnect?: ClienteWhereInput | boolean
    delete?: ClienteWhereInput | boolean
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutUsuarioInput, ClienteUpdateWithoutUsuarioInput>, ClienteUncheckedUpdateWithoutUsuarioInput>
  }

  export type FuncionarioUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<FuncionarioCreateWithoutUsuarioInput, FuncionarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: FuncionarioCreateOrConnectWithoutUsuarioInput
    upsert?: FuncionarioUpsertWithoutUsuarioInput
    disconnect?: FuncionarioWhereInput | boolean
    delete?: FuncionarioWhereInput | boolean
    connect?: FuncionarioWhereUniqueInput
    update?: XOR<XOR<FuncionarioUpdateToOneWithWhereWithoutUsuarioInput, FuncionarioUpdateWithoutUsuarioInput>, FuncionarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClienteUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<ClienteCreateWithoutUsuarioInput, ClienteUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutUsuarioInput
    upsert?: ClienteUpsertWithoutUsuarioInput
    disconnect?: ClienteWhereInput | boolean
    delete?: ClienteWhereInput | boolean
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutUsuarioInput, ClienteUpdateWithoutUsuarioInput>, ClienteUncheckedUpdateWithoutUsuarioInput>
  }

  export type FuncionarioUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<FuncionarioCreateWithoutUsuarioInput, FuncionarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: FuncionarioCreateOrConnectWithoutUsuarioInput
    upsert?: FuncionarioUpsertWithoutUsuarioInput
    disconnect?: FuncionarioWhereInput | boolean
    delete?: FuncionarioWhereInput | boolean
    connect?: FuncionarioWhereUniqueInput
    update?: XOR<XOR<FuncionarioUpdateToOneWithWhereWithoutUsuarioInput, FuncionarioUpdateWithoutUsuarioInput>, FuncionarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type UsuarioCreateNestedOneWithoutClienteInput = {
    create?: XOR<UsuarioCreateWithoutClienteInput, UsuarioUncheckedCreateWithoutClienteInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutClienteInput
    connect?: UsuarioWhereUniqueInput
  }

  export type EmprestimoCreateNestedManyWithoutClienteInput = {
    create?: XOR<EmprestimoCreateWithoutClienteInput, EmprestimoUncheckedCreateWithoutClienteInput> | EmprestimoCreateWithoutClienteInput[] | EmprestimoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: EmprestimoCreateOrConnectWithoutClienteInput | EmprestimoCreateOrConnectWithoutClienteInput[]
    createMany?: EmprestimoCreateManyClienteInputEnvelope
    connect?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
  }

  export type EmprestimoUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<EmprestimoCreateWithoutClienteInput, EmprestimoUncheckedCreateWithoutClienteInput> | EmprestimoCreateWithoutClienteInput[] | EmprestimoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: EmprestimoCreateOrConnectWithoutClienteInput | EmprestimoCreateOrConnectWithoutClienteInput[]
    createMany?: EmprestimoCreateManyClienteInputEnvelope
    connect?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UsuarioUpdateOneRequiredWithoutClienteNestedInput = {
    create?: XOR<UsuarioCreateWithoutClienteInput, UsuarioUncheckedCreateWithoutClienteInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutClienteInput
    upsert?: UsuarioUpsertWithoutClienteInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutClienteInput, UsuarioUpdateWithoutClienteInput>, UsuarioUncheckedUpdateWithoutClienteInput>
  }

  export type EmprestimoUpdateManyWithoutClienteNestedInput = {
    create?: XOR<EmprestimoCreateWithoutClienteInput, EmprestimoUncheckedCreateWithoutClienteInput> | EmprestimoCreateWithoutClienteInput[] | EmprestimoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: EmprestimoCreateOrConnectWithoutClienteInput | EmprestimoCreateOrConnectWithoutClienteInput[]
    upsert?: EmprestimoUpsertWithWhereUniqueWithoutClienteInput | EmprestimoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: EmprestimoCreateManyClienteInputEnvelope
    set?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    disconnect?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    delete?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    connect?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    update?: EmprestimoUpdateWithWhereUniqueWithoutClienteInput | EmprestimoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: EmprestimoUpdateManyWithWhereWithoutClienteInput | EmprestimoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: EmprestimoScalarWhereInput | EmprestimoScalarWhereInput[]
  }

  export type EmprestimoUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<EmprestimoCreateWithoutClienteInput, EmprestimoUncheckedCreateWithoutClienteInput> | EmprestimoCreateWithoutClienteInput[] | EmprestimoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: EmprestimoCreateOrConnectWithoutClienteInput | EmprestimoCreateOrConnectWithoutClienteInput[]
    upsert?: EmprestimoUpsertWithWhereUniqueWithoutClienteInput | EmprestimoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: EmprestimoCreateManyClienteInputEnvelope
    set?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    disconnect?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    delete?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    connect?: EmprestimoWhereUniqueInput | EmprestimoWhereUniqueInput[]
    update?: EmprestimoUpdateWithWhereUniqueWithoutClienteInput | EmprestimoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: EmprestimoUpdateManyWithWhereWithoutClienteInput | EmprestimoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: EmprestimoScalarWhereInput | EmprestimoScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutFuncionarioInput = {
    create?: XOR<UsuarioCreateWithoutFuncionarioInput, UsuarioUncheckedCreateWithoutFuncionarioInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutFuncionarioInput
    connect?: UsuarioWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UsuarioUpdateOneRequiredWithoutFuncionarioNestedInput = {
    create?: XOR<UsuarioCreateWithoutFuncionarioInput, UsuarioUncheckedCreateWithoutFuncionarioInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutFuncionarioInput
    upsert?: UsuarioUpsertWithoutFuncionarioInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutFuncionarioInput, UsuarioUpdateWithoutFuncionarioInput>, UsuarioUncheckedUpdateWithoutFuncionarioInput>
  }

  export type ExemplarLivroCreateNestedManyWithoutLivroInput = {
    create?: XOR<ExemplarLivroCreateWithoutLivroInput, ExemplarLivroUncheckedCreateWithoutLivroInput> | ExemplarLivroCreateWithoutLivroInput[] | ExemplarLivroUncheckedCreateWithoutLivroInput[]
    connectOrCreate?: ExemplarLivroCreateOrConnectWithoutLivroInput | ExemplarLivroCreateOrConnectWithoutLivroInput[]
    createMany?: ExemplarLivroCreateManyLivroInputEnvelope
    connect?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
  }

  export type ExemplarLivroUncheckedCreateNestedManyWithoutLivroInput = {
    create?: XOR<ExemplarLivroCreateWithoutLivroInput, ExemplarLivroUncheckedCreateWithoutLivroInput> | ExemplarLivroCreateWithoutLivroInput[] | ExemplarLivroUncheckedCreateWithoutLivroInput[]
    connectOrCreate?: ExemplarLivroCreateOrConnectWithoutLivroInput | ExemplarLivroCreateOrConnectWithoutLivroInput[]
    createMany?: ExemplarLivroCreateManyLivroInputEnvelope
    connect?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
  }

  export type ExemplarLivroUpdateManyWithoutLivroNestedInput = {
    create?: XOR<ExemplarLivroCreateWithoutLivroInput, ExemplarLivroUncheckedCreateWithoutLivroInput> | ExemplarLivroCreateWithoutLivroInput[] | ExemplarLivroUncheckedCreateWithoutLivroInput[]
    connectOrCreate?: ExemplarLivroCreateOrConnectWithoutLivroInput | ExemplarLivroCreateOrConnectWithoutLivroInput[]
    upsert?: ExemplarLivroUpsertWithWhereUniqueWithoutLivroInput | ExemplarLivroUpsertWithWhereUniqueWithoutLivroInput[]
    createMany?: ExemplarLivroCreateManyLivroInputEnvelope
    set?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    disconnect?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    delete?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    connect?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    update?: ExemplarLivroUpdateWithWhereUniqueWithoutLivroInput | ExemplarLivroUpdateWithWhereUniqueWithoutLivroInput[]
    updateMany?: ExemplarLivroUpdateManyWithWhereWithoutLivroInput | ExemplarLivroUpdateManyWithWhereWithoutLivroInput[]
    deleteMany?: ExemplarLivroScalarWhereInput | ExemplarLivroScalarWhereInput[]
  }

  export type ExemplarLivroUncheckedUpdateManyWithoutLivroNestedInput = {
    create?: XOR<ExemplarLivroCreateWithoutLivroInput, ExemplarLivroUncheckedCreateWithoutLivroInput> | ExemplarLivroCreateWithoutLivroInput[] | ExemplarLivroUncheckedCreateWithoutLivroInput[]
    connectOrCreate?: ExemplarLivroCreateOrConnectWithoutLivroInput | ExemplarLivroCreateOrConnectWithoutLivroInput[]
    upsert?: ExemplarLivroUpsertWithWhereUniqueWithoutLivroInput | ExemplarLivroUpsertWithWhereUniqueWithoutLivroInput[]
    createMany?: ExemplarLivroCreateManyLivroInputEnvelope
    set?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    disconnect?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    delete?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    connect?: ExemplarLivroWhereUniqueInput | ExemplarLivroWhereUniqueInput[]
    update?: ExemplarLivroUpdateWithWhereUniqueWithoutLivroInput | ExemplarLivroUpdateWithWhereUniqueWithoutLivroInput[]
    updateMany?: ExemplarLivroUpdateManyWithWhereWithoutLivroInput | ExemplarLivroUpdateManyWithWhereWithoutLivroInput[]
    deleteMany?: ExemplarLivroScalarWhereInput | ExemplarLivroScalarWhereInput[]
  }

  export type LivroCreateNestedOneWithoutExemplaresInput = {
    create?: XOR<LivroCreateWithoutExemplaresInput, LivroUncheckedCreateWithoutExemplaresInput>
    connectOrCreate?: LivroCreateOrConnectWithoutExemplaresInput
    connect?: LivroWhereUniqueInput
  }

  export type ItemEmprestimoCreateNestedManyWithoutExemplarLivroInput = {
    create?: XOR<ItemEmprestimoCreateWithoutExemplarLivroInput, ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput> | ItemEmprestimoCreateWithoutExemplarLivroInput[] | ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput | ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput[]
    createMany?: ItemEmprestimoCreateManyExemplarLivroInputEnvelope
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
  }

  export type ItemEmprestimoUncheckedCreateNestedManyWithoutExemplarLivroInput = {
    create?: XOR<ItemEmprestimoCreateWithoutExemplarLivroInput, ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput> | ItemEmprestimoCreateWithoutExemplarLivroInput[] | ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput | ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput[]
    createMany?: ItemEmprestimoCreateManyExemplarLivroInputEnvelope
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
  }

  export type EnumLivroStatusFieldUpdateOperationsInput = {
    set?: $Enums.LivroStatus
  }

  export type LivroUpdateOneRequiredWithoutExemplaresNestedInput = {
    create?: XOR<LivroCreateWithoutExemplaresInput, LivroUncheckedCreateWithoutExemplaresInput>
    connectOrCreate?: LivroCreateOrConnectWithoutExemplaresInput
    upsert?: LivroUpsertWithoutExemplaresInput
    connect?: LivroWhereUniqueInput
    update?: XOR<XOR<LivroUpdateToOneWithWhereWithoutExemplaresInput, LivroUpdateWithoutExemplaresInput>, LivroUncheckedUpdateWithoutExemplaresInput>
  }

  export type ItemEmprestimoUpdateManyWithoutExemplarLivroNestedInput = {
    create?: XOR<ItemEmprestimoCreateWithoutExemplarLivroInput, ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput> | ItemEmprestimoCreateWithoutExemplarLivroInput[] | ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput | ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput[]
    upsert?: ItemEmprestimoUpsertWithWhereUniqueWithoutExemplarLivroInput | ItemEmprestimoUpsertWithWhereUniqueWithoutExemplarLivroInput[]
    createMany?: ItemEmprestimoCreateManyExemplarLivroInputEnvelope
    set?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    disconnect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    delete?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    update?: ItemEmprestimoUpdateWithWhereUniqueWithoutExemplarLivroInput | ItemEmprestimoUpdateWithWhereUniqueWithoutExemplarLivroInput[]
    updateMany?: ItemEmprestimoUpdateManyWithWhereWithoutExemplarLivroInput | ItemEmprestimoUpdateManyWithWhereWithoutExemplarLivroInput[]
    deleteMany?: ItemEmprestimoScalarWhereInput | ItemEmprestimoScalarWhereInput[]
  }

  export type ItemEmprestimoUncheckedUpdateManyWithoutExemplarLivroNestedInput = {
    create?: XOR<ItemEmprestimoCreateWithoutExemplarLivroInput, ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput> | ItemEmprestimoCreateWithoutExemplarLivroInput[] | ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput | ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput[]
    upsert?: ItemEmprestimoUpsertWithWhereUniqueWithoutExemplarLivroInput | ItemEmprestimoUpsertWithWhereUniqueWithoutExemplarLivroInput[]
    createMany?: ItemEmprestimoCreateManyExemplarLivroInputEnvelope
    set?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    disconnect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    delete?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    update?: ItemEmprestimoUpdateWithWhereUniqueWithoutExemplarLivroInput | ItemEmprestimoUpdateWithWhereUniqueWithoutExemplarLivroInput[]
    updateMany?: ItemEmprestimoUpdateManyWithWhereWithoutExemplarLivroInput | ItemEmprestimoUpdateManyWithWhereWithoutExemplarLivroInput[]
    deleteMany?: ItemEmprestimoScalarWhereInput | ItemEmprestimoScalarWhereInput[]
  }

  export type ItemEmprestimoCreateNestedManyWithoutEmprestimoInput = {
    create?: XOR<ItemEmprestimoCreateWithoutEmprestimoInput, ItemEmprestimoUncheckedCreateWithoutEmprestimoInput> | ItemEmprestimoCreateWithoutEmprestimoInput[] | ItemEmprestimoUncheckedCreateWithoutEmprestimoInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutEmprestimoInput | ItemEmprestimoCreateOrConnectWithoutEmprestimoInput[]
    createMany?: ItemEmprestimoCreateManyEmprestimoInputEnvelope
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
  }

  export type ClienteCreateNestedOneWithoutEmprestimosInput = {
    create?: XOR<ClienteCreateWithoutEmprestimosInput, ClienteUncheckedCreateWithoutEmprestimosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutEmprestimosInput
    connect?: ClienteWhereUniqueInput
  }

  export type ItemEmprestimoUncheckedCreateNestedManyWithoutEmprestimoInput = {
    create?: XOR<ItemEmprestimoCreateWithoutEmprestimoInput, ItemEmprestimoUncheckedCreateWithoutEmprestimoInput> | ItemEmprestimoCreateWithoutEmprestimoInput[] | ItemEmprestimoUncheckedCreateWithoutEmprestimoInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutEmprestimoInput | ItemEmprestimoCreateOrConnectWithoutEmprestimoInput[]
    createMany?: ItemEmprestimoCreateManyEmprestimoInputEnvelope
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
  }

  export type ItemEmprestimoUpdateManyWithoutEmprestimoNestedInput = {
    create?: XOR<ItemEmprestimoCreateWithoutEmprestimoInput, ItemEmprestimoUncheckedCreateWithoutEmprestimoInput> | ItemEmprestimoCreateWithoutEmprestimoInput[] | ItemEmprestimoUncheckedCreateWithoutEmprestimoInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutEmprestimoInput | ItemEmprestimoCreateOrConnectWithoutEmprestimoInput[]
    upsert?: ItemEmprestimoUpsertWithWhereUniqueWithoutEmprestimoInput | ItemEmprestimoUpsertWithWhereUniqueWithoutEmprestimoInput[]
    createMany?: ItemEmprestimoCreateManyEmprestimoInputEnvelope
    set?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    disconnect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    delete?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    update?: ItemEmprestimoUpdateWithWhereUniqueWithoutEmprestimoInput | ItemEmprestimoUpdateWithWhereUniqueWithoutEmprestimoInput[]
    updateMany?: ItemEmprestimoUpdateManyWithWhereWithoutEmprestimoInput | ItemEmprestimoUpdateManyWithWhereWithoutEmprestimoInput[]
    deleteMany?: ItemEmprestimoScalarWhereInput | ItemEmprestimoScalarWhereInput[]
  }

  export type ClienteUpdateOneRequiredWithoutEmprestimosNestedInput = {
    create?: XOR<ClienteCreateWithoutEmprestimosInput, ClienteUncheckedCreateWithoutEmprestimosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutEmprestimosInput
    upsert?: ClienteUpsertWithoutEmprestimosInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutEmprestimosInput, ClienteUpdateWithoutEmprestimosInput>, ClienteUncheckedUpdateWithoutEmprestimosInput>
  }

  export type ItemEmprestimoUncheckedUpdateManyWithoutEmprestimoNestedInput = {
    create?: XOR<ItemEmprestimoCreateWithoutEmprestimoInput, ItemEmprestimoUncheckedCreateWithoutEmprestimoInput> | ItemEmprestimoCreateWithoutEmprestimoInput[] | ItemEmprestimoUncheckedCreateWithoutEmprestimoInput[]
    connectOrCreate?: ItemEmprestimoCreateOrConnectWithoutEmprestimoInput | ItemEmprestimoCreateOrConnectWithoutEmprestimoInput[]
    upsert?: ItemEmprestimoUpsertWithWhereUniqueWithoutEmprestimoInput | ItemEmprestimoUpsertWithWhereUniqueWithoutEmprestimoInput[]
    createMany?: ItemEmprestimoCreateManyEmprestimoInputEnvelope
    set?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    disconnect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    delete?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    connect?: ItemEmprestimoWhereUniqueInput | ItemEmprestimoWhereUniqueInput[]
    update?: ItemEmprestimoUpdateWithWhereUniqueWithoutEmprestimoInput | ItemEmprestimoUpdateWithWhereUniqueWithoutEmprestimoInput[]
    updateMany?: ItemEmprestimoUpdateManyWithWhereWithoutEmprestimoInput | ItemEmprestimoUpdateManyWithWhereWithoutEmprestimoInput[]
    deleteMany?: ItemEmprestimoScalarWhereInput | ItemEmprestimoScalarWhereInput[]
  }

  export type EmprestimoCreateNestedOneWithoutItensInput = {
    create?: XOR<EmprestimoCreateWithoutItensInput, EmprestimoUncheckedCreateWithoutItensInput>
    connectOrCreate?: EmprestimoCreateOrConnectWithoutItensInput
    connect?: EmprestimoWhereUniqueInput
  }

  export type ExemplarLivroCreateNestedOneWithoutItensInput = {
    create?: XOR<ExemplarLivroCreateWithoutItensInput, ExemplarLivroUncheckedCreateWithoutItensInput>
    connectOrCreate?: ExemplarLivroCreateOrConnectWithoutItensInput
    connect?: ExemplarLivroWhereUniqueInput
  }

  export type EmprestimoUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<EmprestimoCreateWithoutItensInput, EmprestimoUncheckedCreateWithoutItensInput>
    connectOrCreate?: EmprestimoCreateOrConnectWithoutItensInput
    upsert?: EmprestimoUpsertWithoutItensInput
    connect?: EmprestimoWhereUniqueInput
    update?: XOR<XOR<EmprestimoUpdateToOneWithWhereWithoutItensInput, EmprestimoUpdateWithoutItensInput>, EmprestimoUncheckedUpdateWithoutItensInput>
  }

  export type ExemplarLivroUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<ExemplarLivroCreateWithoutItensInput, ExemplarLivroUncheckedCreateWithoutItensInput>
    connectOrCreate?: ExemplarLivroCreateOrConnectWithoutItensInput
    upsert?: ExemplarLivroUpsertWithoutItensInput
    connect?: ExemplarLivroWhereUniqueInput
    update?: XOR<XOR<ExemplarLivroUpdateToOneWithWhereWithoutItensInput, ExemplarLivroUpdateWithoutItensInput>, ExemplarLivroUncheckedUpdateWithoutItensInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumLivroStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LivroStatus | EnumLivroStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LivroStatus[]
    notIn?: $Enums.LivroStatus[]
    not?: NestedEnumLivroStatusFilter<$PrismaModel> | $Enums.LivroStatus
  }

  export type NestedEnumLivroStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LivroStatus | EnumLivroStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LivroStatus[]
    notIn?: $Enums.LivroStatus[]
    not?: NestedEnumLivroStatusWithAggregatesFilter<$PrismaModel> | $Enums.LivroStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLivroStatusFilter<$PrismaModel>
    _max?: NestedEnumLivroStatusFilter<$PrismaModel>
  }

  export type ClienteCreateWithoutUsuarioInput = {
    cpf?: string | null
    telefone?: string | null
    data_penalidade?: Date | string | null
    emailVerificado?: boolean
    emprestimos?: EmprestimoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutUsuarioInput = {
    cpf?: string | null
    telefone?: string | null
    data_penalidade?: Date | string | null
    emailVerificado?: boolean
    emprestimos?: EmprestimoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutUsuarioInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutUsuarioInput, ClienteUncheckedCreateWithoutUsuarioInput>
  }

  export type FuncionarioCreateWithoutUsuarioInput = {
    salario: Decimal | DecimalJsLike | number | string
    data_contratacao: Date | string
  }

  export type FuncionarioUncheckedCreateWithoutUsuarioInput = {
    salario: Decimal | DecimalJsLike | number | string
    data_contratacao: Date | string
  }

  export type FuncionarioCreateOrConnectWithoutUsuarioInput = {
    where: FuncionarioWhereUniqueInput
    create: XOR<FuncionarioCreateWithoutUsuarioInput, FuncionarioUncheckedCreateWithoutUsuarioInput>
  }

  export type ClienteUpsertWithoutUsuarioInput = {
    update: XOR<ClienteUpdateWithoutUsuarioInput, ClienteUncheckedUpdateWithoutUsuarioInput>
    create: XOR<ClienteCreateWithoutUsuarioInput, ClienteUncheckedCreateWithoutUsuarioInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutUsuarioInput, ClienteUncheckedUpdateWithoutUsuarioInput>
  }

  export type ClienteUpdateWithoutUsuarioInput = {
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
    emprestimos?: EmprestimoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutUsuarioInput = {
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
    emprestimos?: EmprestimoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type FuncionarioUpsertWithoutUsuarioInput = {
    update: XOR<FuncionarioUpdateWithoutUsuarioInput, FuncionarioUncheckedUpdateWithoutUsuarioInput>
    create: XOR<FuncionarioCreateWithoutUsuarioInput, FuncionarioUncheckedCreateWithoutUsuarioInput>
    where?: FuncionarioWhereInput
  }

  export type FuncionarioUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: FuncionarioWhereInput
    data: XOR<FuncionarioUpdateWithoutUsuarioInput, FuncionarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type FuncionarioUpdateWithoutUsuarioInput = {
    salario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuncionarioUncheckedUpdateWithoutUsuarioInput = {
    salario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data_contratacao?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateWithoutClienteInput = {
    nome: string
    email?: string | null
    senha?: string | null
    role?: $Enums.Role
    funcionario?: FuncionarioCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutClienteInput = {
    id?: number
    nome: string
    email?: string | null
    senha?: string | null
    role?: $Enums.Role
    funcionario?: FuncionarioUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutClienteInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutClienteInput, UsuarioUncheckedCreateWithoutClienteInput>
  }

  export type EmprestimoCreateWithoutClienteInput = {
    data_saida?: Date | string
    itens?: ItemEmprestimoCreateNestedManyWithoutEmprestimoInput
  }

  export type EmprestimoUncheckedCreateWithoutClienteInput = {
    id?: number
    data_saida?: Date | string
    itens?: ItemEmprestimoUncheckedCreateNestedManyWithoutEmprestimoInput
  }

  export type EmprestimoCreateOrConnectWithoutClienteInput = {
    where: EmprestimoWhereUniqueInput
    create: XOR<EmprestimoCreateWithoutClienteInput, EmprestimoUncheckedCreateWithoutClienteInput>
  }

  export type EmprestimoCreateManyClienteInputEnvelope = {
    data: EmprestimoCreateManyClienteInput | EmprestimoCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutClienteInput = {
    update: XOR<UsuarioUpdateWithoutClienteInput, UsuarioUncheckedUpdateWithoutClienteInput>
    create: XOR<UsuarioCreateWithoutClienteInput, UsuarioUncheckedCreateWithoutClienteInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutClienteInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutClienteInput, UsuarioUncheckedUpdateWithoutClienteInput>
  }

  export type UsuarioUpdateWithoutClienteInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    funcionario?: FuncionarioUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    funcionario?: FuncionarioUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type EmprestimoUpsertWithWhereUniqueWithoutClienteInput = {
    where: EmprestimoWhereUniqueInput
    update: XOR<EmprestimoUpdateWithoutClienteInput, EmprestimoUncheckedUpdateWithoutClienteInput>
    create: XOR<EmprestimoCreateWithoutClienteInput, EmprestimoUncheckedCreateWithoutClienteInput>
  }

  export type EmprestimoUpdateWithWhereUniqueWithoutClienteInput = {
    where: EmprestimoWhereUniqueInput
    data: XOR<EmprestimoUpdateWithoutClienteInput, EmprestimoUncheckedUpdateWithoutClienteInput>
  }

  export type EmprestimoUpdateManyWithWhereWithoutClienteInput = {
    where: EmprestimoScalarWhereInput
    data: XOR<EmprestimoUpdateManyMutationInput, EmprestimoUncheckedUpdateManyWithoutClienteInput>
  }

  export type EmprestimoScalarWhereInput = {
    AND?: EmprestimoScalarWhereInput | EmprestimoScalarWhereInput[]
    OR?: EmprestimoScalarWhereInput[]
    NOT?: EmprestimoScalarWhereInput | EmprestimoScalarWhereInput[]
    id?: IntFilter<"Emprestimo"> | number
    id_cliente?: IntFilter<"Emprestimo"> | number
    data_saida?: DateTimeFilter<"Emprestimo"> | Date | string
  }

  export type UsuarioCreateWithoutFuncionarioInput = {
    nome: string
    email?: string | null
    senha?: string | null
    role?: $Enums.Role
    cliente?: ClienteCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutFuncionarioInput = {
    id?: number
    nome: string
    email?: string | null
    senha?: string | null
    role?: $Enums.Role
    cliente?: ClienteUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutFuncionarioInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutFuncionarioInput, UsuarioUncheckedCreateWithoutFuncionarioInput>
  }

  export type UsuarioUpsertWithoutFuncionarioInput = {
    update: XOR<UsuarioUpdateWithoutFuncionarioInput, UsuarioUncheckedUpdateWithoutFuncionarioInput>
    create: XOR<UsuarioCreateWithoutFuncionarioInput, UsuarioUncheckedCreateWithoutFuncionarioInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutFuncionarioInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutFuncionarioInput, UsuarioUncheckedUpdateWithoutFuncionarioInput>
  }

  export type UsuarioUpdateWithoutFuncionarioInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    cliente?: ClienteUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutFuncionarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    cliente?: ClienteUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type ExemplarLivroCreateWithoutLivroInput = {
    status?: $Enums.LivroStatus
    itens?: ItemEmprestimoCreateNestedManyWithoutExemplarLivroInput
  }

  export type ExemplarLivroUncheckedCreateWithoutLivroInput = {
    id?: number
    status?: $Enums.LivroStatus
    itens?: ItemEmprestimoUncheckedCreateNestedManyWithoutExemplarLivroInput
  }

  export type ExemplarLivroCreateOrConnectWithoutLivroInput = {
    where: ExemplarLivroWhereUniqueInput
    create: XOR<ExemplarLivroCreateWithoutLivroInput, ExemplarLivroUncheckedCreateWithoutLivroInput>
  }

  export type ExemplarLivroCreateManyLivroInputEnvelope = {
    data: ExemplarLivroCreateManyLivroInput | ExemplarLivroCreateManyLivroInput[]
    skipDuplicates?: boolean
  }

  export type ExemplarLivroUpsertWithWhereUniqueWithoutLivroInput = {
    where: ExemplarLivroWhereUniqueInput
    update: XOR<ExemplarLivroUpdateWithoutLivroInput, ExemplarLivroUncheckedUpdateWithoutLivroInput>
    create: XOR<ExemplarLivroCreateWithoutLivroInput, ExemplarLivroUncheckedCreateWithoutLivroInput>
  }

  export type ExemplarLivroUpdateWithWhereUniqueWithoutLivroInput = {
    where: ExemplarLivroWhereUniqueInput
    data: XOR<ExemplarLivroUpdateWithoutLivroInput, ExemplarLivroUncheckedUpdateWithoutLivroInput>
  }

  export type ExemplarLivroUpdateManyWithWhereWithoutLivroInput = {
    where: ExemplarLivroScalarWhereInput
    data: XOR<ExemplarLivroUpdateManyMutationInput, ExemplarLivroUncheckedUpdateManyWithoutLivroInput>
  }

  export type ExemplarLivroScalarWhereInput = {
    AND?: ExemplarLivroScalarWhereInput | ExemplarLivroScalarWhereInput[]
    OR?: ExemplarLivroScalarWhereInput[]
    NOT?: ExemplarLivroScalarWhereInput | ExemplarLivroScalarWhereInput[]
    id?: IntFilter<"ExemplarLivro"> | number
    livroId?: IntFilter<"ExemplarLivro"> | number
    status?: EnumLivroStatusFilter<"ExemplarLivro"> | $Enums.LivroStatus
  }

  export type LivroCreateWithoutExemplaresInput = {
    titulo: string
    autor?: string | null
  }

  export type LivroUncheckedCreateWithoutExemplaresInput = {
    id?: number
    titulo: string
    autor?: string | null
  }

  export type LivroCreateOrConnectWithoutExemplaresInput = {
    where: LivroWhereUniqueInput
    create: XOR<LivroCreateWithoutExemplaresInput, LivroUncheckedCreateWithoutExemplaresInput>
  }

  export type ItemEmprestimoCreateWithoutExemplarLivroInput = {
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
    emprestimo: EmprestimoCreateNestedOneWithoutItensInput
  }

  export type ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput = {
    id?: number
    emprestimoId: number
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
  }

  export type ItemEmprestimoCreateOrConnectWithoutExemplarLivroInput = {
    where: ItemEmprestimoWhereUniqueInput
    create: XOR<ItemEmprestimoCreateWithoutExemplarLivroInput, ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput>
  }

  export type ItemEmprestimoCreateManyExemplarLivroInputEnvelope = {
    data: ItemEmprestimoCreateManyExemplarLivroInput | ItemEmprestimoCreateManyExemplarLivroInput[]
    skipDuplicates?: boolean
  }

  export type LivroUpsertWithoutExemplaresInput = {
    update: XOR<LivroUpdateWithoutExemplaresInput, LivroUncheckedUpdateWithoutExemplaresInput>
    create: XOR<LivroCreateWithoutExemplaresInput, LivroUncheckedCreateWithoutExemplaresInput>
    where?: LivroWhereInput
  }

  export type LivroUpdateToOneWithWhereWithoutExemplaresInput = {
    where?: LivroWhereInput
    data: XOR<LivroUpdateWithoutExemplaresInput, LivroUncheckedUpdateWithoutExemplaresInput>
  }

  export type LivroUpdateWithoutExemplaresInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LivroUncheckedUpdateWithoutExemplaresInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemEmprestimoUpsertWithWhereUniqueWithoutExemplarLivroInput = {
    where: ItemEmprestimoWhereUniqueInput
    update: XOR<ItemEmprestimoUpdateWithoutExemplarLivroInput, ItemEmprestimoUncheckedUpdateWithoutExemplarLivroInput>
    create: XOR<ItemEmprestimoCreateWithoutExemplarLivroInput, ItemEmprestimoUncheckedCreateWithoutExemplarLivroInput>
  }

  export type ItemEmprestimoUpdateWithWhereUniqueWithoutExemplarLivroInput = {
    where: ItemEmprestimoWhereUniqueInput
    data: XOR<ItemEmprestimoUpdateWithoutExemplarLivroInput, ItemEmprestimoUncheckedUpdateWithoutExemplarLivroInput>
  }

  export type ItemEmprestimoUpdateManyWithWhereWithoutExemplarLivroInput = {
    where: ItemEmprestimoScalarWhereInput
    data: XOR<ItemEmprestimoUpdateManyMutationInput, ItemEmprestimoUncheckedUpdateManyWithoutExemplarLivroInput>
  }

  export type ItemEmprestimoScalarWhereInput = {
    AND?: ItemEmprestimoScalarWhereInput | ItemEmprestimoScalarWhereInput[]
    OR?: ItemEmprestimoScalarWhereInput[]
    NOT?: ItemEmprestimoScalarWhereInput | ItemEmprestimoScalarWhereInput[]
    id?: IntFilter<"ItemEmprestimo"> | number
    emprestimoId?: IntFilter<"ItemEmprestimo"> | number
    exemplarId?: IntFilter<"ItemEmprestimo"> | number
    count_adiar?: IntFilter<"ItemEmprestimo"> | number
    data_prazo?: DateTimeFilter<"ItemEmprestimo"> | Date | string
    data_devolucao?: DateTimeNullableFilter<"ItemEmprestimo"> | Date | string | null
  }

  export type ItemEmprestimoCreateWithoutEmprestimoInput = {
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
    exemplarLivro: ExemplarLivroCreateNestedOneWithoutItensInput
  }

  export type ItemEmprestimoUncheckedCreateWithoutEmprestimoInput = {
    id?: number
    exemplarId: number
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
  }

  export type ItemEmprestimoCreateOrConnectWithoutEmprestimoInput = {
    where: ItemEmprestimoWhereUniqueInput
    create: XOR<ItemEmprestimoCreateWithoutEmprestimoInput, ItemEmprestimoUncheckedCreateWithoutEmprestimoInput>
  }

  export type ItemEmprestimoCreateManyEmprestimoInputEnvelope = {
    data: ItemEmprestimoCreateManyEmprestimoInput | ItemEmprestimoCreateManyEmprestimoInput[]
    skipDuplicates?: boolean
  }

  export type ClienteCreateWithoutEmprestimosInput = {
    cpf?: string | null
    telefone?: string | null
    data_penalidade?: Date | string | null
    emailVerificado?: boolean
    usuario: UsuarioCreateNestedOneWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutEmprestimosInput = {
    id: number
    cpf?: string | null
    telefone?: string | null
    data_penalidade?: Date | string | null
    emailVerificado?: boolean
  }

  export type ClienteCreateOrConnectWithoutEmprestimosInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutEmprestimosInput, ClienteUncheckedCreateWithoutEmprestimosInput>
  }

  export type ItemEmprestimoUpsertWithWhereUniqueWithoutEmprestimoInput = {
    where: ItemEmprestimoWhereUniqueInput
    update: XOR<ItemEmprestimoUpdateWithoutEmprestimoInput, ItemEmprestimoUncheckedUpdateWithoutEmprestimoInput>
    create: XOR<ItemEmprestimoCreateWithoutEmprestimoInput, ItemEmprestimoUncheckedCreateWithoutEmprestimoInput>
  }

  export type ItemEmprestimoUpdateWithWhereUniqueWithoutEmprestimoInput = {
    where: ItemEmprestimoWhereUniqueInput
    data: XOR<ItemEmprestimoUpdateWithoutEmprestimoInput, ItemEmprestimoUncheckedUpdateWithoutEmprestimoInput>
  }

  export type ItemEmprestimoUpdateManyWithWhereWithoutEmprestimoInput = {
    where: ItemEmprestimoScalarWhereInput
    data: XOR<ItemEmprestimoUpdateManyMutationInput, ItemEmprestimoUncheckedUpdateManyWithoutEmprestimoInput>
  }

  export type ClienteUpsertWithoutEmprestimosInput = {
    update: XOR<ClienteUpdateWithoutEmprestimosInput, ClienteUncheckedUpdateWithoutEmprestimosInput>
    create: XOR<ClienteCreateWithoutEmprestimosInput, ClienteUncheckedCreateWithoutEmprestimosInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutEmprestimosInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutEmprestimosInput, ClienteUncheckedUpdateWithoutEmprestimosInput>
  }

  export type ClienteUpdateWithoutEmprestimosInput = {
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
    usuario?: UsuarioUpdateOneRequiredWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutEmprestimosInput = {
    id?: IntFieldUpdateOperationsInput | number
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    data_penalidade?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmprestimoCreateWithoutItensInput = {
    data_saida?: Date | string
    cliente: ClienteCreateNestedOneWithoutEmprestimosInput
  }

  export type EmprestimoUncheckedCreateWithoutItensInput = {
    id?: number
    id_cliente: number
    data_saida?: Date | string
  }

  export type EmprestimoCreateOrConnectWithoutItensInput = {
    where: EmprestimoWhereUniqueInput
    create: XOR<EmprestimoCreateWithoutItensInput, EmprestimoUncheckedCreateWithoutItensInput>
  }

  export type ExemplarLivroCreateWithoutItensInput = {
    status?: $Enums.LivroStatus
    livro: LivroCreateNestedOneWithoutExemplaresInput
  }

  export type ExemplarLivroUncheckedCreateWithoutItensInput = {
    id?: number
    livroId: number
    status?: $Enums.LivroStatus
  }

  export type ExemplarLivroCreateOrConnectWithoutItensInput = {
    where: ExemplarLivroWhereUniqueInput
    create: XOR<ExemplarLivroCreateWithoutItensInput, ExemplarLivroUncheckedCreateWithoutItensInput>
  }

  export type EmprestimoUpsertWithoutItensInput = {
    update: XOR<EmprestimoUpdateWithoutItensInput, EmprestimoUncheckedUpdateWithoutItensInput>
    create: XOR<EmprestimoCreateWithoutItensInput, EmprestimoUncheckedCreateWithoutItensInput>
    where?: EmprestimoWhereInput
  }

  export type EmprestimoUpdateToOneWithWhereWithoutItensInput = {
    where?: EmprestimoWhereInput
    data: XOR<EmprestimoUpdateWithoutItensInput, EmprestimoUncheckedUpdateWithoutItensInput>
  }

  export type EmprestimoUpdateWithoutItensInput = {
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutEmprestimosNestedInput
  }

  export type EmprestimoUncheckedUpdateWithoutItensInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cliente?: IntFieldUpdateOperationsInput | number
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExemplarLivroUpsertWithoutItensInput = {
    update: XOR<ExemplarLivroUpdateWithoutItensInput, ExemplarLivroUncheckedUpdateWithoutItensInput>
    create: XOR<ExemplarLivroCreateWithoutItensInput, ExemplarLivroUncheckedCreateWithoutItensInput>
    where?: ExemplarLivroWhereInput
  }

  export type ExemplarLivroUpdateToOneWithWhereWithoutItensInput = {
    where?: ExemplarLivroWhereInput
    data: XOR<ExemplarLivroUpdateWithoutItensInput, ExemplarLivroUncheckedUpdateWithoutItensInput>
  }

  export type ExemplarLivroUpdateWithoutItensInput = {
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
    livro?: LivroUpdateOneRequiredWithoutExemplaresNestedInput
  }

  export type ExemplarLivroUncheckedUpdateWithoutItensInput = {
    id?: IntFieldUpdateOperationsInput | number
    livroId?: IntFieldUpdateOperationsInput | number
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
  }

  export type EmprestimoCreateManyClienteInput = {
    id?: number
    data_saida?: Date | string
  }

  export type EmprestimoUpdateWithoutClienteInput = {
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
    itens?: ItemEmprestimoUpdateManyWithoutEmprestimoNestedInput
  }

  export type EmprestimoUncheckedUpdateWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
    itens?: ItemEmprestimoUncheckedUpdateManyWithoutEmprestimoNestedInput
  }

  export type EmprestimoUncheckedUpdateManyWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    data_saida?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExemplarLivroCreateManyLivroInput = {
    id?: number
    status?: $Enums.LivroStatus
  }

  export type ExemplarLivroUpdateWithoutLivroInput = {
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
    itens?: ItemEmprestimoUpdateManyWithoutExemplarLivroNestedInput
  }

  export type ExemplarLivroUncheckedUpdateWithoutLivroInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
    itens?: ItemEmprestimoUncheckedUpdateManyWithoutExemplarLivroNestedInput
  }

  export type ExemplarLivroUncheckedUpdateManyWithoutLivroInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: EnumLivroStatusFieldUpdateOperationsInput | $Enums.LivroStatus
  }

  export type ItemEmprestimoCreateManyExemplarLivroInput = {
    id?: number
    emprestimoId: number
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
  }

  export type ItemEmprestimoUpdateWithoutExemplarLivroInput = {
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emprestimo?: EmprestimoUpdateOneRequiredWithoutItensNestedInput
  }

  export type ItemEmprestimoUncheckedUpdateWithoutExemplarLivroInput = {
    id?: IntFieldUpdateOperationsInput | number
    emprestimoId?: IntFieldUpdateOperationsInput | number
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemEmprestimoUncheckedUpdateManyWithoutExemplarLivroInput = {
    id?: IntFieldUpdateOperationsInput | number
    emprestimoId?: IntFieldUpdateOperationsInput | number
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemEmprestimoCreateManyEmprestimoInput = {
    id?: number
    exemplarId: number
    count_adiar?: number
    data_prazo: Date | string
    data_devolucao?: Date | string | null
  }

  export type ItemEmprestimoUpdateWithoutEmprestimoInput = {
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exemplarLivro?: ExemplarLivroUpdateOneRequiredWithoutItensNestedInput
  }

  export type ItemEmprestimoUncheckedUpdateWithoutEmprestimoInput = {
    id?: IntFieldUpdateOperationsInput | number
    exemplarId?: IntFieldUpdateOperationsInput | number
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemEmprestimoUncheckedUpdateManyWithoutEmprestimoInput = {
    id?: IntFieldUpdateOperationsInput | number
    exemplarId?: IntFieldUpdateOperationsInput | number
    count_adiar?: IntFieldUpdateOperationsInput | number
    data_prazo?: DateTimeFieldUpdateOperationsInput | Date | string
    data_devolucao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}