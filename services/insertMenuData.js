const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Menu = require("../models/Menu");

dotenv.config();

const menuData = [
  {
    category: "Soups",
    items: [
      {
        title: "Mushroom Soup",
        description: "Slow cooked mushroom in vegetable stock & cream",
        price: "20",
        image: "/images/menu/soup1.jpg",
      },
      {
        title: "Irish Style Seafood Chowder",
        description: "Seafoods cooked with cream and vegetables",
        price: "20",
        image: "/images/menu/soup2.jpg",
      },
    ],
  },
  {
    category: "Burgers",
    items: [
      {
        title: "Ones Café Signature Beef Burger",
        description:
          "Ones Café owned inspired chili coriander beef patty topped with beef bacon, tomatoes, gherkins, gruyere cheese, guacamole & fries",
        price: "31",
        image: "/images/menu/burger1.jpg",
      },
      {
        title: "Spicy Deep Fried Chicken Sandwich",
        description:
          "Deep fried crisp chicken, lettuces, tomatoes, signature dip & fries",
        price: "30",
        image: "/images/menu/burger2.jpg",
      },
      {
        title: "Smoked Salmon Sandwich",
        description:
          "Brioche bun, smoked salmon, lettuce, poached egg, tomatoes, caper mayo & fries",
        price: "34",
        image: "/images/menu/burger3.jpg",
      },
      {
        title: "Classic Beef Burger",
        description:
          "Homemade beef patty lettuce, tomatoes, gherkins, cheese & fries",
        price: "37",
        image: "/images/menu/burger4.jpg",
      },
    ],
  },
  {
    category: "Pastas",
    items: [
      {
        title: "Spaghetti Aglio e Olio",
        description: "Pasta tossed with olive oil, garlic, and chilly flakes",
        price: "22",
        image: "/images/menu/pasta1.jpg",
      },
      {
        title: "Spaghetti with Buttered Lemon Greens",
        description:
          "Spaghetti cooked in buttered lemon sauce with french bean, green peas & spinach",
        price: "27",
        image: "/images/menu/pasta2.jpg",
      },
      {
        title: "Chicken & Shrimp Divola",
        description:
          "Chicken & shrimp sauteed in olive oil, then blended with our fiery tomato diavola sauce",
        price: "37",
        image: "/images/menu/pasta3.jpg",
      },
      {
        title: "Ones Café Creamy Butter Prawn Pasta",
        description: "Prawns sauteed with chillies, curry",
        price: "37",
        image: "/images/menu/pasta4.jpg",
      },
      {
        title: "Salted Egg Pasta",
        description:
          "Spaghetti and freshly caught tiger prawns with salted egg, cream & chillies",
        price: "37",
        image: "/images/menu/pasta5.jpg",
      },
      {
        title: "Spaghetti Bolognese",
        description:
          "Slow cooked minced meat in choice of beef or chicken with vegetables in tomato concasse",
        price: "28",
        image: "/images/menu/pasta6.jpg",
      },
      {
        title: "Spaghetti Carbonara",
        description: "Pasta cooked in cream, smoked duck breast & garlic",
        price: "28",
        image: "/images/menu/pasta7.jpg",
      },
    ],
  },
  {
    category: "Pizzas",
    items: [
      {
        title: "Spinach & Cream Cheese",
        description: "Cream base, mozzarella, cheddar, spinach & cream cheese",
        price: "30",
        image: "/images/menu/pizza1.jpg",
      },
      {
        title: "Teriyaki Chicken",
        description: "Tomatoes, teriyaki chicken, pineapples, capsicum & onion",
        price: "30",
        image: "/images/menu/pizza2.jpg",
      },
      {
        title: "Chicken Ham & Pineapple",
        description:
          "Chicken ham, pineapple, bell peppers, onions, tomatoes & cheese",
        price: "36",
        image: "/images/menu/pizza3.jpg",
      },
      {
        title: "Diavola",
        description:
          "Beef pepperoni, bell peppers, onions, chilies, cheese & tomatoes",
        price: "37",
        image: "/images/menu/pizza4.jpg",
      },
      {
        title: "Smoked Salmon",
        description:
          "Egg with avocado and onion cream base, smoked salmon, mozzarella, cheddar, avocado & onions",
        price: "40",
        image: "/images/menu/pizza5.jpg",
      },
      {
        title: "Creamy Butter Shrimp Pizza",
        description:
          "Malaysian inspired pizza with shrimp, curry leaves & chilies",
        price: "27",
        image: "/images/menu/pizza6.jpg",
      },
      {
        title: "Margherita",
        description: "Tomato, cheese & basil",
        price: "27",
        image: "/images/menu/pizza7.jpg",
      },
    ],
  },
  {
    category: "Mains",
    items: [
      {
        title: "Tenderloin Steak",
        description:
          "Choice of your done-ness served with garlic mashed potatoes, roasted vegetables and black pepper sauce on the side",
        price: "62",
        image: "/images/menu/main1.jpg",
      },
      {
        title: "Breaded Chicken Chop",
        description:
          "Deep fried chicken fillet, french fries, cabbage slaw & pepper reduction",
        price: "32",
        image: "/images/menu/main2.jpg",
      },
      {
        title: "Grilled Chicken Chop",
        description:
          "Spiced marinated chicken leg fillet, tortilla chips, pica de gallo & capsicum relish.",
        price: "32",
        image: "/images/menu/main3.jpg",
      },
      {
        title: "English Style Fish & Chips",
        description:
          "Fish fillet dipped in our homemade batter, lime mayo, chips & cabbage slaw",
        price: "32",
        image: "/images/menu/main4.jpg",
      },
      {
        title: "Pan Seared Salmon Fillet",
        description:
          "Roasted vegetables, couscous and puteh spicy butter cream sauce",
        price: "50",
        image: "/images/menu/main5.jpg",
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        title: "Chilled Mango Cheesecake",
        description:
          "Chilled cheesecake topped with fresh mango, mango compote & mango puree",
        price: "20",
        image: "/images/menu/dessert1.jpg",
      },
      {
        title: "Classic Tiramisu",
        description:
          "Savolardi biscuits, eggs, mascarpone, coffee, and chocolate",
        price: "20",
        image: "/images/menu/dessert2.jpg",
      },
      {
        title: "Sizzling Brownies",
        description:
          "Homemade chocolate almond brownies served on a hot cast iron pan, chocolate sauce & vanilla ice cream",
        price: "20",
        image: "/images/menu/dessert3.jpg",
      },
      {
        title: "Sundae",
        description: "Selection of ice cream, chocolate sauce & chocolate bar",
        price: "20",
        image: "/images/menu/dessert4.jpg",
      },
    ],
  },
  {
    category: "Smoothies",
    items: [
      {
        title: "Milkshake",
        description: "Choice of vanilla, chocolate or strawberry",
        price: "20",
        image: "/images/menu/smoothie1.jpg",
      },
      {
        title: "Banana Explosion",
        description: "Bananas, yoghurt, milk, honey & cinnamon",
        price: "20",
        image: "/images/menu/smoothie2.jpg",
      },
      {
        title: "Banana Ginger Smoothie",
        description: "Banana, yoghurt, honey & ginger",
        price: "20",
        image: "/images/menu/smoothie3.jpg",
      },
      {
        title: "Orange Dream Creamsicle",
        description: "Orange fruit, yoghurt & vanilla extract",
        price: "20",
        image: "/images/menu/smoothie4.jpg",
      },
      {
        title: "Breakfast Smoothie",
        description: "Banana, yoghurt, orange juice & strawberries",
        price: "20",
        image: "/images/menu/smoothie5.jpg",
      },
    ],
  },
  {
    category: "Soft Drinks",
    items: [
      {
        title: "Coca-Cola",
        description: "",
        price: "12",
        image: "/images/menu/soft1.jpg",
      },
      {
        title: "Coca-Cola Zero",
        description: "",
        price: "12",
        image: "/images/menu/soft2.jpg",
      },
      {
        title: "Sprite",
        description: "",
        price: "12",
        image: "/images/menu/soft3.jpg",
      },
      {
        title: "Tonic Water",
        description: "",
        price: "12",
        image: "/images/menu/soft4.jpg",
      },
      {
        title: "Ginger Ale",
        description: "",
        price: "12",
        image: "/images/menu/soft5.jpg",
      },
      {
        title: "Redbull",
        description: "",
        price: "12",
        image: "/images/menu/soft6.jpg",
      },
      {
        title: "Acqua Panna",
        description: "500ml still water",
        price: "16",
        image: "/images/menu/soft7.jpg",
      },
      {
        title: "San Pellegrino",
        description: "500ml sparkling water",
        price: "16",
        image: "/images/menu/soft8.jpg",
      },
      {
        title: "Langkawi Pure",
        description: "380ml aquifer mineral water",
        price: "16",
        image: "/images/menu/soft9.jpg",
      },
    ],
  },
  {
    category: "Coffee",
    items: [
      {
        title: "Espresso",
        description: "",
        price: "12",
        image: "/images/menu/coffee1.jpg",
      },
      {
        title: "Americano",
        description: "",
        price: "12",
        image: "/images/menu/coffee2.jpg",
      },
      {
        title: "Ones Café Signature Charcoal Latte",
        description: "",
        price: "12",
        image: "/images/menu/coffee3.jpg",
      },
      {
        title: "Cappuccino",
        description: "",
        price: "12",
        image: "/images/menu/coffee4.jpg",
      },
      {
        title: "Mocha",
        description: "",
        price: "12",
        image: "/images/menu/coffee5.jpg",
      },
    ],
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(async () => {
    console.log("Connected to MongoDB");

    await Menu.deleteMany({}); // Clear existing data

    for (const categoryData of menuData) {
      const menu = new Menu(categoryData);
      await menu.save();
    }

    console.log("Menu data inserted");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
