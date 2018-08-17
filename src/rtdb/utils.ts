import { database as firebaseDatabase } from '../firebase';
import * as mapValues from 'lodash/mapValues';
import * as trimStart from 'lodash/trimStart';
import * as isFunction from 'lodash/isFunction';
import * as isUndefined from 'lodash/isUndefined';
import { DirectiveArgs } from './types';

export const createQuery = ({
  database, directives, exportVal, snapshot
}: {
  database,
  directives: DirectiveArgs,
  exportVal?: any,
  snapshot?
}) => {
  directives = mapValues(directives, val => {
    // customizer
    if (isFunction(val)) {
      return val({root: snapshot, exportVal});
    }

    // replace $export$field
    if (val.startsWith && val.startsWith('$export$')) {
      return exportVal[trimStart(val, '$export$')];
    }
    return val;
  });

  let query = database.ref(directives.ref);

  // orderBy
  if (directives.orderByChild) {
    query = query.orderByChild(directives.orderByChild);
  } else if (directives.orderByKey) {
    query = query.orderByKey();
  } else if (directives.orderByValue) {
    query = query.orderByValue();
  }

  // filter
  if (!isUndefined(directives.limitToFirst)) {
    query = query.limitToFirst(directives.limitToFirst);
  }
  if (!isUndefined(directives.limitToLast)) {
    query = query.limitToLast(directives.limitToLast);
  }
  if (!isUndefined(directives.startAt)) {
    query = query.startAt(directives.startAt);
  }
  if (!isUndefined(directives.endAt)) {
    query = query.endAt(directives.endAt);
  }
  if (!isUndefined(directives.equalTo)) {
    query = query.equalTo(directives.equalTo);
  }
  return query;
};
