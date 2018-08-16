import { concat, ApolloLink } from 'apollo-link';
import RtdbQueryLink from './rtdb/link';
import RtdbSubLink from './rtdb/subscriptionLink';

export const createRtdbLink = ({database}) => {
  return concat(new RtdbQueryLink({database}), new RtdbSubLink({database}));
};
