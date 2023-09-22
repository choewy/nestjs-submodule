import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user';

export class ClickCountRelations {
  @OneToOne(() => User, (e) => e.clickCount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

@Entity({ name: 'click_count' })
export class ClickCount extends ClickCountRelations {
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
