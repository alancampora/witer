import {Resolver, Query} from 'type-graphql';

@Resolver()
export default class HelloResolver {
	@Query(() => String)
	hello() {
		return 'hellouu graphql';
	}
}
