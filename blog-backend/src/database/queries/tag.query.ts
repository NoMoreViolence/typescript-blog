import { exportObjectKeys } from '@utils';
import { Post, Tag } from 'database/models';
import { Brackets, FindOneOptions, getRepository, IsNull, Repository } from 'typeorm';

export const getTagWithPosts = (
  trans: {
    entity: Repository<Tag>;
    select: Partial<Tag>;
  },
  option: FindOneOptions<Tag> = {}
) => trans.entity.createQueryBuilder();
// trans.entity
//   .findOne({
//     where: { ...trans.select, deletedAt: IsNull() },
//     relations: ['posts'],
//     join: {
//       alias: 'tag',
//       leftJoinAndSelect: {
//         posts: 'tag.posts'
//       }
//     }
//   })
//   .then(response => {
//     return {
//       ...response,
//       posts: response.posts
//         .filter(post => post.deletedAt === null)
//         .map(post => exportObjectKeys(post, 'isPublished', 'article', 'tags'))
//     };
//   });

// getRepository(Post).findOne({
//   where: { name: '2324' },
//   relations: ['tags']
// });

// trans.entity.findOne({
//   where: {
//     ...trans.select,
//     deletedAt: IsNull()
//   },
//   relations: ['posts'],
//   // join: {
//   //   alias: 'posts',
//   //   leftJoinAndSelect: {
//   //     id: 'posts.id',
//   //     title: 'posts.title',
//   //     description: 'posts.description',
//   //     createdAt: 'posts.createdAt',
//   //     updatedAt: 'posts.updatedAt',
//   //     like: 'posts.like'
//   //   }
//   // },
//   ...option
// });
