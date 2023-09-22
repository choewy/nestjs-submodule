import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClickCount } from './click-count';

export class UserRelations {
  @OneToOne(() => ClickCount, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable()
  clickCount: ClickCount;
}

@Entity()
export class User extends UserRelations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'PK',
  })
  readonly id: number;

  @Index({ fulltext: true })
  @Column({
    type: 'varchar',
    length: 50,
    comment: '이름',
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
