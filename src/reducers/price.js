import { fromJS } from 'immutable';

const initialState = {
  btcPrice: null,
  ethPrice: null
};

const price = (state = initialState, action) => {
  const clone = fromJS(state);
  switch (action.type) {
    case 'updateBTCPrice':
      return clone.set('btcPrice', action.btcPrice);
    case 'updateETHPrice':
      return clone.set('ethPrice', action.ethPrice);
    default:
      return state;
  }
}

export default price;
