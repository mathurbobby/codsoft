const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.DB_KEY;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {useNewUrlParser : true});
        console.log('connnected to db...')
        const fetched_data = await mongoose.connection.db.collection('products');
        const data = await fetched_data.find({}).toArray();
        global.products_data = data;
        // console.log(products_data);
        // console.log(data);
        const category_Data = await mongoose.connection.db.collection('products_types');
        const catData = await category_Data.find({}).toArray();
        global.products_category = catData;
        // console.log(cat Data)
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoDB;
