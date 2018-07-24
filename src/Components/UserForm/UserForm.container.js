import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logIn } from '../../actions/logInActions';
import UserForm from './UserForm.component';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => (
  bindActionCreators({ logIn }, dispatch)
);

export default (connect(mapStateToProps, mapDispatchToProps)(UserForm));