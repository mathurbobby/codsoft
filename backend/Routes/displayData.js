const express = require('express');
const router = express.Router();

router.post('/fooddata', async (req,res) => {
    try {
        res.send([global.products_category, global.products_data]);
        // console.log(global.products_category);
    } catch (error) {
        console.log(error);
        res.send("Server Error..");
    }
})

module.exports = router;