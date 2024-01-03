import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserEntitiesMigration1704286840685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
            name: 'first_name',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'last_name',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'password',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'email',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'otp',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'is_email_verified',
            default: false,
            type: 'boolean',
          },
          {
            name: 'otp_sent_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
