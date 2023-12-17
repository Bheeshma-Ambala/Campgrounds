const mongoose = require('mongoose');
//const cities = require('./cities')
const cities = require('country-state-city').City.getCitiesOfCountry("IN");
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log('database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)]

// const seedDB = async () => {
//     await Campground.deleteMany({});
//     /*const c = new Campground({ title: 'india' });
//     await c.save();*/
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const price = Math.floor(Math.random() * 5000);
//         const camp = new Campground({
//             //your user id
//             author: "65670d73d25cf2c42eb71572",
//             location: `${cities[random1000].city},${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             //image: `http://source.unsplash.com/random/300*300?camping,${i}`,
//             description: 'this is a wonderful campground you will come across in the area',
//             price: price,
//             geometry: {
//                 type: 'Point',
//                 //jeellacheruvu coordinates: [80.009654, 17.234886]
//                 coordinates: [
//                     cities[random1000].longitude,
//                     cities[random1000].latitude,
//                 ]
//             },
//             images: [

//                 {
//                     url: 'https://res.cloudinary.com/duvn1evjy/image/upload/v1701673048/PROJECT-IB/fokfuwtmxuwx1f3pbfog.png',
//                     filename: 'PROJECT-IB/fokfuwtmxuwx1f3pbfog',

//                 },
//                 {
//                     url: 'https://res.cloudinary.com/duvn1evjy/image/upload/v1701673050/PROJECT-IB/pfe9gdtninvne5jujfjp.png',
//                     filename: 'PROJECT-IB/pfe9gdtninvne5jujfjp',

//                 }
//             ]
//         })
//         await camp.save();
//     }
// }

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}




const seedDB = async () => {
    await Campground.deleteMany({});
    /*const c = new Campground({ title: 'india' });
    await c.save();*/
    for (let i = 0; i < 300; i++) {
        const randomInt = Math.floor(Math.random() * cities.length);
        // const price = Math.floor(Math.random() * 5000);
        const price = randomIntFromInterval(1000, 5000)
        const camp = new Campground({
            //your user id
            author: "65670d73d25cf2c42eb71572",
            location: `${cities[randomInt].name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: `http://source.unsplash.com/random/300*300?camping,${i}`,
            description: 'this is a wonderful campground you will come across in the area',
            price: price,
            geometry: {
                type: 'Point',
                //jeellacheruvu coordinates: [80.009654, 17.234886]
                coordinates: [
                    cities[randomInt].longitude,
                    cities[randomInt].latitude,
                ]
            },
            images: [


                {
                    url: 'https://res.cloudinary.com/duvn1evjy/image/upload/v1702792617/PROJECT-IB/hf1isc2kdzteieygn8uf.jpg',
                    filename: 'PROJECT-IB/hf1isc2kdzteieygn8uf',

                },
                {
                    url: 'https://res.cloudinary.com/duvn1evjy/image/upload/v1702792924/PROJECT-IB/fp6uz07uwohwhhls8jyf.jpg',
                    filename: 'PROJECT-IB/fp6uz07uwohwhhls8jyf'
                }
            ]
        })
        await camp.save();
    }
}

// this can be  used to get names of indian cities;
/*const seedDB = async () => {
    await Campground.deleteMany({});
    const c = new Campground({ title: 'india' });
    await c.save();
    for (let i = 0; i < 50; i++) {
        const randomInt = Math.floor(Math.random() * cities.length)
        const camp = new Campground({
            location: `${ cities[randomInt].name }`,
        })
        await camp.save();
    }
}*/

seedDB().then(() => {
    mongoose.connection.close();
});