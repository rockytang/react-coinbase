import React from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col, Nav, NavItem, Navbar} from 'react-bootstrap';
import { updateBtcPrice, updateEthPrice } from '../../actions/price';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props._updateBtcPrice();
    this.props._updateEthPrice();
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6}>
            <Row>
              <Col xs={12}>
                BTC Price
              </Col>
              <Col xs={12}>
                { this.props.btcPrice }
              </Col>
            </Row>  
          </Col>
          <Col xs={12} sm={6}>
            <Row>
              <Col xs={12}>
                ETH Price
              </Col>
              <Col xs={12}>
                {this.props.ethPrice}
              </Col>
            </Row>
          </Col>

        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    btcPrice: state.btcPrice,
    ethPrice: state.ethPrice
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    _updateBtcPrice: () => {
      dispatch(updateBtcPrice())
    },
    _updateEthPrice: () => {
      dispatch(updateEthPrice())
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Dashboard)
