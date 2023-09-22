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

import { Click } from './click';

export class UserRelations {
  @OneToOne(() => Click, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable()
  click: Click;
}

@Entity({ name: 'user' })
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
    comment: '아이디',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '비밀번호',
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
