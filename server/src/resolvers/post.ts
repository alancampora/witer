import { Resolver, Query, Ctx } from "type-graphql";
import { Post } from "../entities/post";
import { MyContext } from "../types";

@Resolver()
export default class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.em.find(Post, {});
  }
}
