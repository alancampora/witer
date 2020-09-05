import { User } from "../entities/user";
import {
  Resolver,
  InputType,
  Mutation,
  Ctx,
  Field,
  Arg,
  ObjectType,
  Query,
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export default class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length should be bigger than 2",
          },
        ],
      };
    }

    if (options.password.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "length should be bigger than 5",
          },
        ],
      };
    }

    const hashedPass = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPass,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    //store cookie after register
    req.session.userId = user.id;

    return { user };
  }

  @Query(() => [User])
  async users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => UserResponse)
  async me(@Ctx() { em, req }: MyContext): Promise<UserResponse> {
    const userId = req.session.userId;
    if (!userId) {
      return {
        errors: [
          {
            field: "user",
            message: "you are not logged in",
          },
        ],
      };
    }

    const user = await em.findOne(User, {
      id: userId,
    });

    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "user does not exist",
          },
        ],
      };
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username,
    });

    if (!user) {
      return {
        errors: [{ field: "username", message: "Check username" }],
      };
    }

    const validPassword = await argon2.verify(user.password, options.password);

    if (!validPassword) {
      return {
        errors: [{ field: "password", message: "Check password" }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
}
