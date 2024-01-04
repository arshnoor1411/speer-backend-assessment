import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ShareNotesEnityMigartion1704371425938
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'share_notes',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'owner_id',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'note_id',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'shared_id',
            isNullable: false,
            type: 'varchar',
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
