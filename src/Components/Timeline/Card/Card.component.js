import React from 'react';
import { Collapse, Alert } from 'antd';
import PropTypes from 'prop-types';

import styles from './Card.scss';

import Comment from '../Comment';
import { postType, commentType } from '../../../types';

class Card extends React.Component {
  commentBlock = (comments, postId) => comments[postId].map(comment => (
    <Comment key={comment.id} comment={comment} />
  ));

  collapseCallback = (postId) => {
    const { fetchComments, comments } = this.props;
    if (!comments[postId]) {
      fetchComments({ postId });
    }
  };

  errorInCommentsFetch = fetchCommentsError => (
    <Alert
      className={styles.loginError}
      message={fetchCommentsError}
      type="error"
    />
  );

  render() {
    const {
      post, comments, fetchingComments, fetchCommentsError,
    } = this.props;
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
          data-post={post.id}
          onChange={() => this.collapseCallback(post.id)}
        >
          <Collapse.Panel header="Comments">
            {fetchCommentsError && this.errorInCommentsFetch(fetchCommentsError)}
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
            {displayContent && this.commentBlock(comments, post.id)}
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }
}

Card.propTypes = {
  post: postType.isRequired,
  fetchComments: PropTypes.func.isRequired,
  comments: PropTypes.shape({
    postId: PropTypes.arrayOf(commentType),
  }).isRequired,
  fetchingComments: PropTypes.bool.isRequired,
  fetchCommentsError: PropTypes.string.isRequired,
};

export default Card;
