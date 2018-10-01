import { fromJS } from 'immutable';

const initialState = fromJS({
  btcPrice: null,
  ethPrice: null,
  goodTimeToBuyBtc: true,
  goodTimeToBuyEth: true
});

const price = (state = initialState, action) => {
  const clone = fromJS(state);
  switch (action.type) {
    case 'updateBTCPrice':
      return clone.set('btcPrice', action.btcPrice).set('goodTimeToBuyBtc', action.goodTimeToBuyBtc);
    case 'updateETHPrice':
      return clone.set('ethPrice', action.ethPrice).set('goodTimeToBuyEth', action.goodTimeToBuyEth);
    default:
      return state;
  }
}

export default price;
