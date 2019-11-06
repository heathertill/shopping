import config from '../config';
import * as knex from 'knex';

import Users from './queries/Users';
import Tokens from './queries/Tokens';
import Items from './queries/Items';
import Stores from './queries/Stores';

export const connection = knex(config.knex);

export default {
    Users,
    Tokens,
    Items,
    Stores
}