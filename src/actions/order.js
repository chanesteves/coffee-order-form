import axios from 'axios';

export function submitOrder(data) {
    return dispatch => {
        return axios.post(`/orders`,data);
    }
}