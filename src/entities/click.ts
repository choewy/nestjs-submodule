import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user';

export class ClickRelations {
  @OneToOne(() => User, (e) => e.click, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

@Entity({ name: 'click' })
export class Click extends ClickRelations {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'User PK',
  })
  readonly userId: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '클릭수',
  })
  count: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
