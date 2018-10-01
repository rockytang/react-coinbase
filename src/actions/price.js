import axios from 'axios';

export const updateBtcPrice = (oldPrice = 100000) => {
  // set arbitrary beginning oldPrice
  return (dispatch) => {
    axios
      .get('https://api.pro.coinbase.com/products/BTC-USD/ticker')
      .then((response) => {
        const price = Number(response.data.price).toFixed(2);
        const goodTimeToBuy = price <= Number(oldPrice) ? true : false;
        return dispatch({
          type: 'updateBTCPrice',
          btcPrice: price,
          goodTimeToBuyBtc: goodTimeToBuy
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const updateEthPrice = (oldPrice = 100000) => {
  // set arbitrary beginning oldPrice
  return (dispatch) => {
    axios
      .get('https://api.pro.coinbase.com/products/ETH-USD/ticker')
      .then(response => {
        const price = Number(response.data.price).toFixed(2);
        const goodTimeToBuy = price <= Number(oldPrice) ? true : false;
        return dispatch({
          type: 'updateETHPrice',
          ethPrice: price,
          goodTimeToBuyEth: goodTimeToBuy
        })
      })
      .catch((error) => {
        // TODO: add error handler
        console.log('Error in response: ', error);
      })
  }
}
