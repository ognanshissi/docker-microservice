const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async (url, method, body, params) => {
    try {
        const base_url = `${process.env.API_URL}/${url}`;
        let endpoint = base_url;
        if (params){
            const query = querystring.stringify(params);
            endpoint = base_url + '?' + query;
        }

        const response = await  axios({
            method: method,
            url: endpoint,
            data: body,
        });
        return response;
    } catch (e){
        // console.log(e);
        throw new Error(e);
    }
};
