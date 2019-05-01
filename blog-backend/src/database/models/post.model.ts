import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Tag } from './tag.model';
import { User } from './user.model';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 50 })
  public title: string;

  @Column({ type: 'varchar', length: 300 })
  public description: string;

  @Column({ type: 'text' })
  public article: string;

  @Column({ type: 'boolean', default: false })
  public isPublished: boolean;

  @Column({ type: 'int', default: 0 })
  public like: number;

  @ManyToOne(type => User, user => user.posts)
  public user: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  public deletedAt: Date;

  @ManyToMany(type => Tag, tag => tag.posts)
  @JoinTable()
  public tags: Tag[];
}
