import {MigrationInterface, QueryRunner} from "typeorm";

export class addCategoryToIngredient1733411826890 implements MigrationInterface {
    name = 'addCategoryToIngredient1733411826890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ingredient_category_enum" AS ENUM('vegetable', 'protein', 'starch')`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "category" "public"."ingredient_category_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."ingredient_category_enum"`);
    }

}
