import { Migration } from '@mikro-orm/migrations';

export class Migration20200903041425 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null, "hidden" text not null);');

    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

}
