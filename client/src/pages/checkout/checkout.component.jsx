import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selector';

import { 
    CheckoutHeaderContainer, 
    CheckoutPageContainer, 
    HeaderBlockContainer, 
    TotalContainer, 
    WarningContainer 
} from './checkout.styles';

const CheckoutPage = ({ cartItems, total }) => (
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            {
                ['Product', 'Description', 'Quantity', 'Price', 'Remove'].map( (item, idx) => (
                    <HeaderBlockContainer key={idx}>
                        <span>{item}</span>
                    </HeaderBlockContainer>
                ) )
            }
        </CheckoutHeaderContainer>
        {
            cartItems.map( item => (
                <CheckoutItem cartItem={item} key={item.id} />
            ) )   
        }
        <TotalContainer>TOTAL: ${total}</TotalContainer>
        <WarningContainer>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
        </WarningContainer>
        <StripeButton price={total} />
    </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);