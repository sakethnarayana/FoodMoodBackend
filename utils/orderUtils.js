// utils/orderUtils.js
const DishAvailability = require('../models/DishAvailability');
const Dish = require('../models/Dish');

const generatePastOrders = async () => {
  const orders = [];
  try {
    const dishAvailabilities = await DishAvailability.find();

    if (!dishAvailabilities.length) {
      // console.log('No dish availabilities found.');
      return orders;
    }

    const today = new Date();
    const dateDistributions = [3, 3, 4, 2, 5, 3]; 

    let orderIndex = 0;

    for (let i = 1; i <= dateDistributions.length; i++) {
      const numOrdersToday = dateDistributions[i-1];

      const orderDate = new Date(today);
      orderDate.setDate(today.getDate() - i);

      for (let j = 0; j < numOrdersToday; j++) {
        const randomDishAvailability = dishAvailabilities[Math.floor(Math.random() * dishAvailabilities.length)];
        const quantity = Math.floor(Math.random() * 5) + 1;

        const order = {
          dishId: randomDishAvailability.dish_id,
          restaurantId: randomDishAvailability.restaurant_id,
          quantity: quantity,
          totalPrice: randomDishAvailability.price * quantity,
          date: new Date(orderDate),
        };

        orders.push(order);
        orderIndex++;

        if (orderIndex >= 20) break;
      }

      if (orderIndex >= 20) break;
    }
  } catch (err) {
    console.error('Error generating past orders:', err);
  }

  return orders;
};

const getRecommendedDishes = async () => {
  const dishes = await Dish.aggregate([{ $sample: { size: 10 } }]);
  return dishes;
};

module.exports = { generatePastOrders, getRecommendedDishes };
