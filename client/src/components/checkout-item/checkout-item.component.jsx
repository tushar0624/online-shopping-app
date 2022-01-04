import React from 'react';
import { connect } from 'react-redux';

import { clearCartItem, addItem, removeItem } from '../../redux/cart/cart.actions';

import { 
    CheckoutItemContainer, 
    ImageContainer, 
    QuantityContainer, 
    RemoveButtonContainer, 
    TextContainer 
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { imageUrl, name, quantity, price } = cartItem
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt="item" />
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>    
                <span className="value">{quantity}</span> 
                <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>    
            </QuantityContainer>
            <TextContainer>${price}</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem(cartItem)}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearCartItem(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);