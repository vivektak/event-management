import Axios from 'axios';

export const http = {
    get: async function (url) {
        return await Axios.get(url)
    },

    post: async function (url, data) {
        return await Axios.post(url, data);
    }

}
