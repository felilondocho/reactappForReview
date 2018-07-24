import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './Header.component';
import { logOut } from '../../actions/rootActions';

const mapStateToProps = state => state.logIn;

const mapDispatchToProps = dispatch => (
  bindActionCreators( { logOut }, dispatch )
);

export default (connect(mapStateToProps, mapDispatchToProps)(Header));