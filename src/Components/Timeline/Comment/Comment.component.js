import React from 'react';

import styles from './Comment.scss';
import { commentType } from '../../../types';

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
  comment: commentType.isRequired,
};

export default Comment;
