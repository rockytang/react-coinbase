import React from 'react';
import { connect } from 'react-redux';
import { updateBtcPrice, updateEthPrice } from '../../actions/price';
import { Grid, Row, Col, Navbar, Alert, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import getWeb3 from '../../utils/getWeb3';
import './index.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    web3: null,
    accounts: null,
    toAddress: "",
    latestTxHash: null
  }

  async componentWillMount() {
    this.props._updateBtcPrice();
    this.props._updateEthPrice();
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({ web3, accounts });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.setBtcInterval = setInterval(
      () => this.updateBtc(),
      60000
    );
    this.setEthInterval = setInterval(
      () => this.updateEth(),
      60000
    )
  }

  updateBtc() {
    this.props._updateBtcPrice(this.props.btcPrice)
  }

  updateEth() {
    this.props._updateEthPrice(this.props.ethPrice)
  }

  componentWillUnmount() {
    clearInterval(this.setBtcInterval);
    clearInterval(this.setEthInterval);
  }

  handleSubmit() {
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
      this.setState({ latestTxHash: transactionHash });
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
              <a href="/">Prices Dashboard</a>
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
                  <h2 className="text-center">BTC Price</h2>
                </Col>
                <Col xs={12}>
                  <p className="text-center bigger-font">
                    <NumberFormat value={this.props.btcPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </p>
                </Col>
              </Row>
              <Row className="text-center">
                <Col xs={12}>
                  {this.props.goodTimeToBuyBtc ? (
                    <Alert bsStyle="success">
                      It's a good time to buy BTC!
                    </Alert>
                  ) : (
                      <Alert bsStyle="warning">
                        It's a bad time to buy BTC!
                    </Alert>
                    )}
                </Col>
              </Row>
              <Row className="text-center">
                <Button bsStyle="primary" onClick={this.updateBtc.bind(this)}>
                  Refresh BTC Price
                </Button>
              </Row>
            </Col>
            <Col xs={12} sm={6}>
              <Row>
                <Col xs={12}>
                  <h2 className="text-center">ETH Price</h2>
                </Col>
                <Col xs={12}>
                  <p className="text-center bigger-font">
                    <NumberFormat value={this.props.ethPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </p>
                </Col>
              </Row>
              <Row className="text-center">
                <Col xs={12}>
                  {this.props.goodTimeToBuyEth ? (
                    <Alert bsStyle="success">
                      It's a good time to buy ETH!
                    </Alert>
                  ) : (
                      <Alert bsStyle="warning">
                        It's a bad time to buy ETH!
                    </Alert>
                    )}
                </Col>
              </Row>
              <Row className="text-center">
                <Button bsStyle="primary" onClick={this.updateEth.bind(this)}>
                  Refresh ETH Price
                </Button>
              </Row>
              <Form className="padding-top-40">
                <FormGroup>
                  <ControlLabel>Send $5 of Ether</ControlLabel>
                  <FormControl
                    name="toAddress"
                    type="text"
                    onChange={this.handleChange.bind(this)}
                    placeholder="Send to Address"
                  />
                </FormGroup>
                <FormGroup>
                  <Button onClick={this.handleSubmit.bind(this)}>Send ETH</Button>
                </FormGroup>
                {this.state.latestTxHash ? (
                  <FormGroup>
                    <Alert bsStyle="success">
                      <strong>Successful Transaction: </strong>
                      <p className="wrap-word">{this.state.latestTxHash}</p>
                    </Alert>
                  </FormGroup>
                ) : (
                    // Improvement: Add error handling
                    <FormGroup>
                    </FormGroup>
                  )}
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
    ethPrice: state.price.get('ethPrice'),
    goodTimeToBuyBtc: state.price.get('goodTimeToBuyBtc'),
    goodTimeToBuyEth: state.price.get('goodTimeToBuyEth')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _updateBtcPrice: (btcPrice) => {
      dispatch(updateBtcPrice(btcPrice))
    },
    _updateEthPrice: (ethPrice) => {
      dispatch(updateEthPrice(ethPrice))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
