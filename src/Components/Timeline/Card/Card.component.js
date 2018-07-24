import React from 'react';
import { Collapse, Alert } from 'antd';

import styles from './Card.scss';

import Comment from '../Comment';

const Panel = Collapse.Panel;

const collapseCallback = (postId, fetchComments, comments) => {
  (!comments[postId]) && (fetchComments({ postId }));
};

const commentBlock = (comments, postId) => (
  comments[postId].map((comment, index) => (
    <Comment key={index} comment={comment} />
  ))
);

const errorInCommentsFetch = fetchCommentsError => (
  <Alert
    className={styles.loginError}
    message={fetchCommentsError}
    type="error"
  />
);

const Card = ({
  post,
  fetchComments,
  comments,
  fetchingComments,
  fetchCommentsError,
}) => {
  const displayLoader = fetchingComments && !(comments[post.id]);
  const displayContent = comments[post.id] && !fetchCommentsError;
  const displayNoContent = comments[post.id] && comments[post.id].length < 0 
                            && !fetchError && !isFetching;

  return (
    <div className={styles.card}>
      <p>{post.id}</p>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Collapse
        onChange={() => collapseCallback(post.id, fetchComments, comments)}
      >
        <Panel header="Comments">
          {fetchCommentsError && (errorInCommentsFetch(fetchCommentsError))}
          {displayLoader && (<h3>Loading Comments...</h3>)}
          {displayNoContent && (<h3>No comments to display</h3>)}
          {displayContent && (commentBlock(comments, post.id))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Card;