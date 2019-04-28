import { Post, User } from 'database/models';
import { forkJoin, Observable } from 'rxjs';
import { FindManyOptions, FindOneOptions, IsNull, Repository, UpdateResult } from 'typeorm';

export const getPosts = (
  trans: {
    entity: Repository<Post>;
    select: Partial<Post>;
  },
  option: FindManyOptions<Post> = {}
): Promise<Post[]> =>
  trans.entity.find({
    where: {
      ...trans.select,
      deletedAt: IsNull()
    },
    ...option
  });

export const getPostByPostId = (
  trans: {
    entity: Repository<Post>;
    postId: number;
  },
  option: FindOneOptions<Post> = {}
): Promise<Post> =>
  trans.entity.findOne({
    where: {
      deletedAt: IsNull(),
      id: trans.postId
    },
    ...option
  });

export const getPostByPostTitle = (
  trans: {
    entity: Repository<Post>;
    postTitle: string;
  },
  option: FindOneOptions<Post> = {}
): Promise<Post> =>
  trans.entity.findOne({
    where: {
      deletedAt: IsNull(),
      title: trans.postTitle
    },
    ...option
  });

export const createPost = (trans: {
  entity: Repository<Post>;
  tags: string[];
  user: User;
  title: string;
  description: string;
  isPublished: boolean;
  article: string;
  name: string;
}) => {
  const post = new Post();
  post.title = trans.title;
  post.description = trans.description;
  post.isPublished = trans.isPublished;
  post.like = 0;
  post.article = trans.article;
  post.user = trans.user;
  return trans.entity.save(post);
};

export const updatePost = (trans: { entity: Repository<Post>; post: Post; changeThings: Partial<Post> }) =>
  trans.entity.update(trans.post, trans.changeThings);

export const deletePost = (trans: { entity: Repository<Post>; post: Post[] }): Observable<UpdateResult[]> =>
  forkJoin(trans.post.map(postUnit => trans.entity.update(postUnit, { deletedAt: new Date() })));
