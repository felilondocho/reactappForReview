import React from 'react';
import { Collapse, Alert } from 'antd';
import PropTypes from 'prop-types';

import styles from './Card.scss';

import Comment from '../Comment';

const collapseCallback = (postId, fetchComments, comments) => {
  if (!comments[postId]) {
    fetchComments({ postId });
  }
};

const commentBlock = (comments, postId) => (
  comments[postId].map(comment => (
    <Comment key={comment.id} comment={comment} />
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
                            && !fetchCommentsError && !fetchingComments;

  return (
    <div className={styles.card}>
      <p>
        {post.id}
      </p>
      <h3>
        {post.title}
      </h3>
      <p>
        {post.body}
      </p>
      <Collapse
        onChange={() => collapseCallback(post.id, fetchComments, comments)}
      >
        <Collapse.Panel header="Comments">
          {fetchCommentsError && (errorInCommentsFetch(fetchCommentsError))}
          {displayLoader && (
            <h3>
              Loading Comments...
            </h3>
          )}
          {displayNoContent && (
            <h3>
              No comments to display
            </h3>
          )}
          {displayContent && (commentBlock(comments, post.id))}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

Card.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  fetchComments: PropTypes.func.isRequired,
  comments: PropTypes.shape({
    postId: PropTypes.arrayOf(PropTypes.shape({
      postId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      body: PropTypes.string,
    })),
  }).isRequired,
  fetchingComments: PropTypes.bool.isRequired,
  fetchCommentsError: PropTypes.string.isRequired,
};

export default Card;
