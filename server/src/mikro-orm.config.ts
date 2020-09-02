import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/post';
import path from 'path';

const __prod__ = process.env.NODE_ENV === 'production';

export default {
	migrations: {
		path: path.join(__dirname, './migrations'),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	entities: [Post],
	dbName: 'witer',
	user: 'witer',
	password: 'witer',
	type: 'postgresql',
	debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
