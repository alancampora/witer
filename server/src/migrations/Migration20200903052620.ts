import { Migration } from '@mikro-orm/migrations';

export class Migration20200903052620 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "hidden";');
  }

}
