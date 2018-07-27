import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

import Card from '../Card';
import styles from './Timeline.scss';

const fetchedPosts = posts => (
  posts.map(post => (
    <Card key={post.id} post={post} />
  ))
);

const errorInFetch = fetchError => (
  <Alert
    className={styles.loginError}
    message={fetchError}
    type="error"
  />
);

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.scrollFunction = this.scrollFunction.bind(this);
  }

  componentDidMount() {
    const { fetchPosts, currentInitChunk, currentEndChunk } = this.props;
    fetchPosts(currentInitChunk, currentEndChunk);
    document.addEventListener('scroll', this.scrollFunction);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollFunction);
  }

  scrollFunction() {
    const root = document.getElementById('timeline');
    if (root.getBoundingClientRect().bottom <= window.innerHeight) {
      const {
        fetchPosts,
        currentInitChunk,
        currentEndChunk,
        isFetching,
      } = this.props;
      if (!isFetching) {
        fetchPosts(currentInitChunk, currentEndChunk);
      }
    }
  }

  render() {
    const {
      posts, fetchingMore, fetchError, isFetching,
    } = this.props;
    const displayLoader = !(posts.length > 0) && !fetchError && isFetching;
    const displayContent = (posts.length > 0) && !fetchError;
    const displayNoContent = !(posts.length > 0) && !fetchError && !isFetching;
    return (
      <div className={styles.timeline} id="timeline">
        {fetchError && (errorInFetch(fetchError))}
        {displayLoader && (
          <h1>
            Loading Posts...
          </h1>
        )}
        {displayNoContent && (
          <h1>
            No Content to display
          </h1>
        )}
        {displayContent && (fetchedPosts(posts))}
        {fetchingMore && (
          <h1>
            Loading more posts...
          </h1>
        )}
      </div>
    );
  }
}

Timeline.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  currentInitChunk: PropTypes.number.isRequired,
  currentEndChunk: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  })).isRequired,
  fetchingMore: PropTypes.bool.isRequired,
  fetchError: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default Timeline;
