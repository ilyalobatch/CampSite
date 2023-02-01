const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/campsite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63cdc58a83fe0d86d2c3199f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus deleniti quia rerum accusamus ipsa ipsam, quis eius obcaecati distinctio consequuntur laboriosam perspiciatis facere architecto doloremque, fuga illum adipisci ea iure!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
                
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtsc5hqmp/image/upload/v1674730340/CampSite/wyvolrsukt9jyqnk9dok.jpg',
                    filename: 'CampSite/wyvolrsukt9jyqnk9dok',
                },
                {
                    url: 'https://res.cloudinary.com/dtsc5hqmp/image/upload/v1674730344/CampSite/smas5brfg9ujqave3yar.png',
                    filename: 'CampSite/smas5brfg9ujqave3yar',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})