import { database } from '../firebase';

export interface ResolverContext {
  database;
  exportVal: any;
  findType: (directives: {[key: string]: DirectiveArgs}) => string;
}

export interface MutationResolverContext extends ResolverContext {
  mutationRef?: string;
}

export interface ResolverRoot {
  __typename?: string;
  __snapshot?;
  rootSnapshot?;
}

export interface MutationResolverRoot {
  __typename?: string;
  __pushKey?: string;
  payload?: any;
}

export interface DirectiveArgs {
  ref: string;
  type: string;
  name: string;
  orderByChild?: string;
  orderByKey?: boolean;
  orderByValue?: boolean;
  limitToFirst?: number;
  limitToLast?: number;
  startAt?: any;
  endAt?: any;
  equalTo?: any;
}

export interface SubDirectiveArgs extends DirectiveArgs {
  event: string;
}
