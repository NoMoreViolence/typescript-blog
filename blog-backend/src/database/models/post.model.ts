import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ type: 'int', default: 0 })
  public views: number;

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
}
