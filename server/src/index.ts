import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';

import express from 'express'
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql'
import HelloResolver from './resolvers/hello';
//import { Post } from './entities/post';

const main = async () => {
	const orm = await MikroORM.init(mikroOrmConfig);
	orm.getMigrator().up();

	const app = express();

	app.get("/", (_, res) => {
		res.send('hellou');
	})

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver], 
			validate: false, 
		})
	});

	apolloServer.applyMiddleware({app});


	app.listen(4000, () => {
		console.log('-> server started on http://localhost:4000');
	})

	//const post = orm.em.create(Post, { title: 'my first post' });
	//await orm.em.persistAndFlush(post);

};

main().catch((err) => {
	console.error(err);
});
