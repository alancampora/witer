import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import { Post } from './entities/post';

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);

	orm.getMigrator().up();

	const post = orm.em.create(Post, { title: 'my first post' });
	await orm.em.persistAndFlush(post);

	console.log('it is working padreee');
};

main().catch((err) => {
	console.error(err);
});
