const sequelize = require("./index");
const bcrypt = require("bcrypt");

const setup = async () => {
  await sequelize.sync({ force: true });

  const johnPassword = await bcrypt.hash("12345", 10);
  const annePassword = await bcrypt.hash("anne1", 10);
  const mariaPassword = await bcrypt.hash("m1998", 10);
  const emmanuelPassword = await bcrypt.hash("emm223", 10);

  await sequelize.models.user
    .bulkCreate([
      { username: "john", password: johnPassword },
      { username: "anne", password: annePassword },
      { username: "maria", password: mariaPassword },
      { username: "emmanuel", password: emmanuelPassword },
    ])
    .then(([john, anne, maria, emmanuel]) => {
      john.createListing({
        name: "Mercedes-Benz",
        description: "Brand new Mercedes A-Class Diesel",
        price: 500000,
        currency: "GBP",
      });
      john.createListing({
        name: "Electric Bikes",
        description: "Lot of 35 electric bikes with 48V 10Ah battery",
        price: 40000,
        currency: "USD",
      });
      anne.createListing({
        name: "Lot of disposable masks",
        description:
          "Box of 100 bundles of disposable masks. Each bundle contains 20 masks. Covid-19 safe.",
        price: 2000,
        currency: "EUR",
      });
      anne.createListing({
        name: "Linnen",
        description: "1km worth of linen.",
        price: 4500,
        currency: "GBP",
      });
      anne.createListing({
        name: "Mattress Molaflex AIRVEX",
        description: "",
        price: 500,
        currency: "EUR",
      });
      maria.createListing({
        name: "Acoustic Guitar",
        description: "Rosewood body and Mahogany neck. Nylon strings.",
        price: 1500,
        currency: "EUR",
      });
      maria.createListing({
        name: "Samsung Fridge",
        description: "No Frost - 178 cm - 617 L - Inox",
        price: 980,
        currency: "GBP",
      });
      maria.createListing({
        name: "Nintendo Switch Lite",
        description: "Turquoise",
        price: 200,
        currency: "USD",
      });
      emmanuel.createListing({
        name: "Sushi Rice",
        description:
          "Crate of 100 bags of sushi rice, each bag with 10 kg. Origin: Japan",
        price: 500,
        currency: "USD",
      });
      emmanuel.createListing({
        name: "Supply of bananas",
        description:
          "Steady supply of bananas from Madeira (Portugal). New crates every month.",
        price: 250,
        currency: "EUR",
      });
    });
};

setup();
