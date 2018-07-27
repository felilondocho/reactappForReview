import React from 'react';
import PropTypes from 'prop-types';

import styles from './Comment.scss';

const Comment = ({ comment }) => (
  <div className={styles.comment}>
    <h4>
      {comment.name}
    </h4>
    <p>
      {comment.body}
    </p>
    <p>
      {comment.email}
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    postId: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Comment;
