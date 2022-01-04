import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useQuery } from 'react-query';

import Logo from '../../assets/crown.svg';
import { cartPayment } from '../../Api/Api';

const StripeButton = ({ price }) => {
    const [ paymentToken, setPaymentToken ] = useState(null);
    const priceForStripe = price * 100;
    const Publishable_Key = 'pk_test_51K29eGSGwA8MYAS8djCakSF8HWpscAz3wwP9K9vePfAo8jnlJ1BnZXHlrcNn03PKIx3GP44X7dqBUk8omADjH3dj00iEcqp1kc';
    
    const { data, isSuccess, isIdle, refetch } = useQuery(['payment', paymentToken], async () => await cartPayment('payment',paymentToken, priceForStripe ), {
        enabled: !!paymentToken,
        refetchOnWindowFocus: false
    });
    
    const onToken = token => {
        setPaymentToken(token);
        refetch();
    }

    !isIdle && isSuccess && console.log("Query Response Data: ", data);  

    return (
        <StripeCheckout
            label = "Pay Now"
            name = 'CRWN Clothing'
            billingAddress
            shippingAddress
            image={Logo}
            description={ `Your total price is $${price}` }
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={Publishable_Key}
        />    
    )
};

export default StripeButton;