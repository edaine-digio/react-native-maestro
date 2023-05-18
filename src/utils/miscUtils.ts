import { PostObj } from 'src/features/home/feed/Feed.component'

export const sortPosts = (posts: PostObj[]) =>
  posts.sort(
    (a: PostObj, b: PostObj) =>
      Date.parse(b.datePosted) - Date.parse(a.datePosted)
  )
