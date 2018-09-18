import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Navbar } from 'react-bootstrap';
import { updateBtcPrice, updateEthPrice } from '../../actions/price';
import styled from 'styled-components';

const P = styled.p`
  font-size: 22px;
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`
const RowCentered = styled(Row)`
  text-align: center;
`

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props._updateBtcPrice();
    this.props._updateEthPrice();
  }

  componentDidMount() {
    // this.setBtcInterval = setInterval(
    //   () => this.props._updateBtcPrice(),
    //   60000
    // );
    // this.setEthInterval = setInterval(
    //   () => this.props._updateEthPrice(),
    //   60000
    // )
  }

  componentWillUnmount() {
    clearInterval(this.setBtcInterval);
    clearInterval(this.setEthInterval);
  }
  
  render () {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Coinbase API</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col xs={12} sm={6}>
              <Row>
                <Col xs={12}>
                  <H2>BTC Price</H2>
                </Col>
                <Col xs={12}>
                  <P>{this.props.btcPrice}</P>
                </Col>
              </Row>
              <RowCentered>
                <Button bsStyle="primary" onClick={this.props._updateBtcPrice}>
                  Refresh BTC Price
                </Button>
              </RowCentered>
            </Col>
            <Col xs={12} sm={6}>
              <Row>
                <Col xs={12}>
                  <H2>ETH Price</H2>
                </Col>
                <Col xs={12}>
                  <P>{this.props.ethPrice}</P>
                </Col>
              </Row>
              <RowCentered>
                <Button bsStyle="primary" onClick={this.props._updateEthPrice}>
                  Refresh ETH Price
                </Button>
              </RowCentered>
            </Col>

          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    btcPrice: state.price.get('btcPrice'),
    ethPrice: state.price.get('ethPrice')
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
