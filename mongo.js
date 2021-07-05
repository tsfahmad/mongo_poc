const MongoClient = require('mongodb').MongoClient;


const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
    }

    console.log(process.env.MONGO_URL);
    const client = MongoClient(
        process.env.MONGO_URL,
        {useNewUrlParser: true, useUnifiedTopology: true}
    );

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('products').insertOne(newProduct);
    }
    catch (error) {
        console.log(error);
        return res.json({message: 'Could not store data.'});
    }
    finally {
        client.close();
    }

    res.json(newProduct);
};

const getProducts = async (req, res, next) => {
    const client = MongoClient(
        process.env.MONGO_URL,
        {useNewUrlParser: true, useUnifiedTopology: true}
    );

    let products = [];

    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
    } catch (error) {
        console.log(error);
        return res.json({message: 'Could not retreive product.'});
    }
    finally {
        client.close();
    }

    res.json(products);
};


module.exports = {
    createProduct,
    getProducts
}