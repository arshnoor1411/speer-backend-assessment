import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'share_notes',
})
export class ShareNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'owner_id',
    nullable: false,
  })
  ownerId: string;

  @Column({
    name: 'shared_id',
    nullable: false,
  })
  sharedId: string;

  @Column({
    name: 'note_id',
    nullable: false,
  })
  noteId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;
}
