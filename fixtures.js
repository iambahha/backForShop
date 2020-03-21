const mongoose = require('mongoose');
const config = require('./config');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const user = await User.create(
    {
      username: 'admin',
      password: 'admin',
      displayname: 'Admin',
      phone: 996501561561,
      token: '1',
    },
    {
      username: 'user',
      password: 'pass',
      displayname: 'My friend',
      phone: 996550505050,
      token: '2',
    }
  );

  const [real_estate, cars, computers, hookah] = await Category.create(
    {title: 'Real estate'},
    {title: 'Cars'},
    {title: 'Computers'},
    {title: 'Hookah'},
  );

  await Product.create(
    {
      title: 'Дом 150кв.м',
      price: 5000000,
      description: 'Новый уютный дом',
      image: "house.jpg",
      category: real_estate._id,
      seller: user[0]._id
    },
    {
      title: 'Дом 250кв.м',
      price: 15000000,
      description: 'Большой комфортный дом',
      image: "house_250.jpg",
      category: real_estate._id,
      seller: user[1]._id
    },
    {
      title: 'Дом 350кв.м',
      price: 25000000,
      description: 'Большой комфортный дом',
      image: "house_350.jpg",
      category: real_estate._id,
      seller: user[2]._id
    },
    {
      title: 'Volkswagen Multivan T6',
      price: 5000000,
      description: 'Лучший вэн в своем классе',
      image: "multivan.jpg",
      category: cars._id,
      seller: user[2]._id
    },
    {
      title: 'MacBook Pro 2018 MR942 15.4',
      price: 185000,
      description: 'Макбук Apple MacBook Pro 2018 MR942 15.4' +
        ' Intel Core i7 8850H 16 Gb 512 Gb SSD Radeon Pro 560X серый космос',
      image: "macbook.jpg",
      category: computers._id,
      seller: user[1]._id
    },
    {
      title: 'Hookah MattPear Simple 3D model',
      price: 25000,
      description: 'Hookah MattPear Simple M Black color',
      image: "hookah-mattpear.jpg",
      category: hookah._id,
      seller: user[0]._id
    },

  );

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});