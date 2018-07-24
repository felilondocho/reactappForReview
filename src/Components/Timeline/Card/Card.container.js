import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchComments } from '../../../actions/fetchComments';
import Card from './Card.component';

const mapStateToProps = state => state.fetchComments;

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchComments }, dispatch)
);

export default (connect(mapStateToProps, mapDispatchToProps)(Card));