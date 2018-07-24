import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPosts } from '../../../actions/fetchPostsActions';
import Timeline from './Timeline.component';

const mapStateToProps = state => state.fetchPosts;

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchPosts }, dispatch)
);

export default (connect(mapStateToProps, mapDispatchToProps)(Timeline));