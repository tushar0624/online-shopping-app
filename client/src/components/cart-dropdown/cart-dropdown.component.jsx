import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import { selectCartItems } from '../../redux/cart/cart.selector'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import CartItem from '../cart-item/cart-item.component';

import { 
  CartDropDownButton,
  CartDropDownCOntainer,
  CartItemsContainer, 
  EmptyMessageContainer 
} from './cart-dropdown.styles';

const CartDropDown = ({ cartItems, history, dispatch }) => (
  <CartDropDownCOntainer>
    <CartItemsContainer>
      {
        cartItems.length ? (
          cartItems.map( cartItem => 
            <CartItem key={cartItem.id} item={cartItem} />
          )
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )
      }
    </CartItemsContainer>
    <CartDropDownButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden())
      }
    }>
        GO TO CHECKOUT
    </CartDropDownButton>
  </CartDropDownCOntainer>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropDown));