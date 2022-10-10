const express = require("express");
const request = require("request-promise");
const app = express();

const PORT = process.env.PORT || 5000;
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`

app.use(express.json());

app.get('/', (req , res) => {
    res.send('Welcome to Amazon Scraper API! :)');
})

app.listen(PORT , () => console.log(`Server running on PORT ${PORT}`));

//GETTING PRODUCT DETAILS
app.get('/products/:productId' , async (req , res) => {
    const { productId } = req.params;
    const { api_key } = req.res;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        
        //response back from server if successful
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

//GETTING PRODUCT REVIEWS
app.get('/products/:productId/reviews' , async (req , res) => {
    const { productId } = req.params;
    const { api_key } = req.res;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        //response back from server if successful
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

//GETTING PRODUCT OFFERS
app.get('/products/:productId/offers' , async (req , res) => {
    const { productId } = req.params;
    const { api_key } = req.res;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        //response back from server if successful
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

//GETTING SEARCH RESULTS
app.get('/search/:searchQuery' , async (req , res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.res;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        //response back from server if successful
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});