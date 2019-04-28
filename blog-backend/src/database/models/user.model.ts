import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 200 })
  public name: string;

  @Column({ type: 'varchar', length: 50 })
  public email: string;

  @Column({ type: 'varchar', length: 200 })
  public password: string;

  @Column({ type: 'varchar', length: 50 })
  public salt: string;

  @OneToMany(type => Post, post => post)
  public posts: Post[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  public deletedAt: Date;
}
