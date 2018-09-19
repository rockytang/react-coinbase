import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Navbar, Alert, Form, FormGroup, FormControl } from 'react-bootstrap';
import { updateBtcPrice, updateEthPrice } from '../../actions/price';
import styled from 'styled-components';
import getWeb3 from '../../utils/getWeb3';

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

  state = { 
    web3: null, 
    accounts: null,
    toAddress: ""
  }

  componentWillMount() {
    this.props._updateBtcPrice();
    this.props._updateEthPrice();
  }

  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({ web3, accounts });
    } catch (error) {
      console.log(error);
    }
    this.setBtcInterval = setInterval(
      () => this.props._updateBtcPrice(),
      60000
    );
    this.setEthInterval = setInterval(
      () => this.props._updateEthPrice(),
      60000
    )
  }

  componentWillUnmount() {
    clearInterval(this.setBtcInterval);
    clearInterval(this.setEthInterval);
  }
  
  handleSubmit() {
    // send $5 worth of ETH
    let amountOfEth = 5 / Number(this.props.ethPrice);
    amountOfEth = amountOfEth.toString();
    amountOfEth = this.state.web3.utils.toWei(amountOfEth, 'ether');
    this.state.web3.eth.sendTransaction({
      from: this.state.accounts[0],
      to: this.state.toAddress,
      value: amountOfEth
    }, (err, transactionHash) => {
      if (err) {
        console.log(err);
      }
      // TODO: 
      console.log(transactionHash);
    })
  }

  handleChange(e) {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Coinbase API</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        {this.state.web3 ? (
          <Alert bsStyle="success">
            <strong>Web3 connected successfully.</strong> You may now transfer ETH.
          </Alert>
        ) : (
          <Alert bsStyle="warning">
            <strong>Web3 not detected.</strong> Please install metamask to transfer ETH.
          </Alert>          
        )}
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
              <Form>
                <FormGroup>
                  <FormControl 
                    name="toAddress"
                    type="text" 
                    onChange={this.handleChange.bind(this)}
                    placeholder="Send to Address"
                  />
                  <Button onClick={this.handleSubmit.bind(this)}>Send ETH</Button>
                </FormGroup>
              </Form>
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
