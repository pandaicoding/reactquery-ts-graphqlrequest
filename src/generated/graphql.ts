import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A author */
export type Author = {
  __typename?: 'Author';
  /** id of the author */
  authorId: Scalars['ID'];
  /** authors username */
  username?: Maybe<Scalars['String']>;
  /** list of authors books */
  books?: Maybe<Array<Maybe<Book>>>;
};

/** A book */
export type Book = {
  __typename?: 'Book';
  /** id of the book */
  bookId: Scalars['ID'];
  /** title of book */
  title?: Maybe<Scalars['String']>;
  /** author of book */
  author?: Maybe<Author>;
  /** id of the author */
  authorId?: Maybe<Scalars['Int']>;
};

/** Create author input */
export type CreateAuthorInput = {
  /** The authors username */
  username: Scalars['String'];
};

/** Create book input */
export type CreateBookInput = {
  /** The books title. */
  title: Scalars['String'];
  /** The authors id. */
  authorId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create book */
  createBook?: Maybe<Book>;
  /** create author */
  createAuthor?: Maybe<Author>;
};

export type MutationCreateBookArgs = {
  input?: Maybe<CreateBookInput>;
};

export type MutationCreateAuthorArgs = {
  input?: Maybe<CreateAuthorInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Get all books query */
  books?: Maybe<Array<Maybe<Book>>>;
  /** Get all authors query */
  authors?: Maybe<Array<Maybe<Author>>>;
};

export type CreateAuthorMutationVariables = Exact<{
  input?: Maybe<CreateAuthorInput>;
}>;

export type CreateAuthorMutation = { __typename?: 'Mutation' } & {
  createAuthor?: Maybe<{ __typename?: 'Author' } & Pick<Author, 'authorId' | 'username'>>;
};

export type GetAllAuthorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllAuthorsQuery = { __typename?: 'Query' } & {
  authors?: Maybe<Array<Maybe<{ __typename?: 'Author' } & Pick<Author, 'authorId' | 'username'>>>>;
};

export type GetAllBooksQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllBooksQuery = { __typename?: 'Query' } & {
  books?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Book' } & Pick<Book, 'bookId' | 'title'> & {
            author?: Maybe<{ __typename?: 'Author' } & Pick<Author, 'authorId' | 'username'>>;
          }
      >
    >
  >;
};

export const CreateAuthorDocument = `
    mutation CreateAuthor($input: CreateAuthorInput) {
  createAuthor(input: $input) {
    authorId
    username
  }
}
    `;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCreateAuthorMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<CreateAuthorMutation, TError, CreateAuthorMutationVariables, TContext>
) =>
  useMutation<CreateAuthorMutation, TError, CreateAuthorMutationVariables, TContext>(
    (variables?: CreateAuthorMutationVariables) =>
      fetcher<CreateAuthorMutation, CreateAuthorMutationVariables>(client, CreateAuthorDocument, variables)(),
    options
  );
export const GetAllAuthorsDocument = `
    query GetAllAuthors {
  authors {
    authorId
    username
  }
}
    `;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetAllAuthorsQuery = <TData = GetAllAuthorsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetAllAuthorsQueryVariables,
  options?: UseQueryOptions<GetAllAuthorsQuery, TError, TData>
) =>
  useQuery<GetAllAuthorsQuery, TError, TData>(
    ['GetAllAuthors', variables],
    fetcher<GetAllAuthorsQuery, GetAllAuthorsQueryVariables>(client, GetAllAuthorsDocument, variables),
    options
  );
export const GetAllBooksDocument = `
    query GetAllBooks {
  books {
    bookId
    title
    author {
      authorId
      username
    }
  }
}
    `;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetAllBooksQuery = <TData = GetAllBooksQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetAllBooksQueryVariables,
  options?: UseQueryOptions<GetAllBooksQuery, TError, TData>
) =>
  useQuery<GetAllBooksQuery, TError, TData>(
    ['GetAllBooks', variables],
    fetcher<GetAllBooksQuery, GetAllBooksQueryVariables>(client, GetAllBooksDocument, variables),
    options
  );
