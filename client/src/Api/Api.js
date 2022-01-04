import axios from "axios";

export const cartPayment = (url,token, amount) => {
    if (token && amount) {
        return axios({
            url: url,
            method: 'POST',
            data: {
                amount: amount,
                token: token
            }
        }).then( res => res )
    }
}