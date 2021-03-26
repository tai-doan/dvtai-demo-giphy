
const apiKey = '1O6rgYcO7DdmXrZL4mt1shhb75NLscVM';
function getTrending(limit, rating) {
    const option = {
        method: 'GET'
    };
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&rating=${rating}`, option).then(handleResponse);
}

function loadMoreTrending(limit, rating, offset){
    const option = {
        method: 'GET'
    };
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&rating=${rating}&offset=${offset}`, option).then(handleResponse);
}

// convert data into json
function handleResponse(res) {
    return res.text().then(text => {
        const data = JSON.parse(text);
        if (!res.ok) {
            const err = data && data.message;
            return Promise.reject(err);
        }
        return data;
    });
}

export const Giphy_Services = {
    getTrending,
    loadMoreTrending
};
