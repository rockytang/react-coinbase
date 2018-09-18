import axios from 'axios';

export const updateBtcPrice = () => {
  return (dispatch) => {
    axios
    .get('https://api.pro.coinbase.com/products/BTC-USD/ticker')
    .then(response => {
      const price = response.price;
      return dispatch({
        type: 'updateBTCPrice',
        btcPrice: price
      })
    })
    .catch((error) => {
      // TODO: add error handler
      console.log('Error in response: ', error);
    })
  }
}

export const updateEthPrice= () => {
  return (dispatch) => {
    axios
      .get('https://api.pro.coinbase.com/products/ETH-USD/ticker')
      .then(response => {
        const price = response.price;
        return dispatch({
          type: 'updateETHPrice',
          ethPrice: price
        })
      })
      .catch((error) => {
        // TODO: add error handler
        console.log('Error in response: ', error);
      })
  }
}
