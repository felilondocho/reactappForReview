import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from './App.component';
import { checkToken } from '../../actions/logInActions';

const mapStateToProps = state => state.logIn;

const mapDispatchToProps = dispatch => (
  bindActionCreators({ checkToken }, dispatch)
);

export default (connect(mapStateToProps, mapDispatchToProps)(App));