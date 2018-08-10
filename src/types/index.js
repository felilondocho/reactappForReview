import {
  shape, number, string,
} from 'prop-types';

export const postType = shape({
  userId: number,
  id: number,
  title: string,
  body: string,
});

export const commentType = shape({
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
});
