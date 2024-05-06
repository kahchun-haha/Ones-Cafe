const menuData = [
    {
        category: 'Soups',
        items: [
            {
                name: 'Mushroom Soup',
                description: 'Slow cooked mushroom in vegetable stock & cream',
                price: 'RM20',
                image: '/static/images/menu/soup1.jpg'
            },
            {
                name: 'Irish Style Seafood Chowder',
                description: 'Seafoods cooked with cream and vegetables',
                price: 'RM20',
                image: '/static/images/menu/soup2.jpg'
            }
        ]
    },
    {
        category: 'Burgers',
        items: [
            {
                name: 'Ones Café Signature Beef Burger',
                description: 'Ones Café owned inspired chili coriander beef patty topped with beef bacon, tomatoes, gherkins, gruyere cheese, guacamole & fries',
                price: 'RM31',
                image: '/static/images/menu/burger1.jpg'
            },
            {
                name: 'Spicy Deep Fried Chicken Sandwich',
                description: 'Deep fried crisp chicken, lettuces, tomatoes, signature dip & fries',
                price: 'RM30',
                image: '/static/images/menu/burger2.jpg'
            },
            {
                name: 'Smoked Salmon Sandwich',
                description: 'Brioche bun, smoked salmon, lettuce, poached egg, tomatoes, caper mayo & fries',
                price: 'RM34',
                image: '/static/images/menu/burger3.jpg'
            },
            {
                name: 'Classic Beef Burger',
                description: 'Homemade beef patty lettuce, tomatoes, gherkins, cheese & fries',
                price: 'RM37',
                image: '/static/images/menu/burger4.jpg'
            }
        ]
    },
    {
        category: 'Pastas',
        items: [
            {
                name: 'Spaghetti Aglio e Olio',
                description: 'Pasta tossed with olive oil, garlic, and chilly flakes',
                price: 'RM22',
                image: '/static/images/menu/pasta1.jpg'
            },
            {
                name: 'Spaghetti with Buttered Lemon Greens',
                description: 'Spaghetti cooked in buttered lemon sauce with french bean, green peas & spinach',
                price: 'RM27',
                image: '/static/images/menu/pasta2.jpg'
            },
            {
                name: 'Chicken & Shrimp Divola',
                description: 'Chicken & shrimp sauteed in olive oil, then blended with our fiery tomato diavola sauce',
                price: 'RM37',
                image: '/static/images/menu/pasta3.jpg'
            },
            {
                name: 'Ones Café Creamy Butter Prawn Pasta',
                description: 'Prawns sauteed with chillies, curry',
                price: 'RM37',
                image: '/static/images/menu/pasta4.jpg'
            },
            {
                name: 'Salted Egg Pasta',
                description: 'Spaghetti and freshly caught tiger prawns with salted egg, cream & chillies',
                price: 'RM37',
                image: '/static/images/menu/pasta5.jpg'
            },
            {
                name: 'Spaghetti Bolognese',
                description: 'Slow cooked minced meat in choice of beef or chicken with vegetables in tomato concasse',
                price: 'RM28',
                image: '/static/images/menu/pasta6.jpg'
            },
            {
                name: 'Spaghetti Carbonara',
                description: 'Pasta cooked in cream, smoked duck breast & garlic',
                price: 'RM28',
                image: '/static/images/menu/pasta7.jpg'
            }
        ]
    },
    {
        category: 'Pizzas',
        items: [
            {
                name: 'Spinach & Cream Cheese',
                description: 'Cream base, mozzarella, cheddar, spinach & cream cheese',
                price: 'RM30',
                image: '/static/images/menu/pizza1.jpg'
            },
            {
                name: 'Teriyaki Chicken',
                description: 'Tomatoes, teriyaki chicken, pineapples, capsicum & onion',
                price: 'RM30',
                image: '/static/images/menu/pizza2.jpg'
            },
            {
                name: 'Chicken Ham & Pineapple',
                description: 'Chicken ham, pineapple, bell peppers, onions, tomatoes & cheese',
                price: 'RM36',
                image: '/static/images/menu/pizza3.jpg'
            },
            {
                name: 'Diavola',
                description: 'Beef pepperoni, bell peppers, onions, chilies, cheese & tomatoes',
                price: 'RM37',
                image: '/static/images/menu/pizza4.jpg'
            },
            {
                name: 'Smoked Salmon',
                description: 'Egg with avocado and onion cream base, smoked salmon, mozzarella, cheddar, avocado & onions',
                price: 'RM40',
                image: '/static/images/menu/pizza5.jpg'
            },
            {
                name: 'Creamy Butter Shrimp Pizza',
                description: 'Malaysian inspired pizza with shrimp, curry leaves & chilies',
                price: 'RM27',
                image: '/static/images/menu/pizza6.jpg'
            },
            {
                name: 'Margherita',
                description: 'Tomato, cheese & basil',
                price: 'RM27',
                image: '/static/images/menu/pizza7.jpg'
            }
        ]
    },
    {
        category: 'Mains',
        items: [
            {
                name: 'Tenderloin Steak',
                description: 'Choice of your done-ness served with garlic mashed potatoes, roasted vegetables and black pepper sauce on the side',
                price: 'RM62',
                image: '/static/images/menu/main1.jpg'
            },
            {
                name: 'Breaded Chicken Chop',
                description: 'Deep fried chicken fillet, french fries, cabbage slaw & pepper reduction',
                price: 'RM32',
                image: '/static/images/menu/main2.jpg'
            },
            {
                name: 'Grilled Chicken Chop',
                description: 'Spiced marinated chicken leg fillet, tortilla chips, pica de gallo & capsicum relish.',
                price: 'RM32',
                image: '/static/images/menu/main3.jpg'
            },
            {
                name: 'English Style Fish & Chips',
                description: 'Fish fillet dipped in our homemade batter, lime mayo, chips & cabbage slaw',
                price: 'RM32',
                image: '/static/images/menu/main4.jpg'
            },
            {
                name: 'Pan Seared Salmon Fillet',
                description: 'Roasted vegetables, couscous and puteh spicy butter cream sauce',
                price: 'RM50',
                image: '/static/images/menu/main5.jpg'
            }
        ]
    },
    {
        category: 'Desserts',
        items: [
            {
                name: 'Chilled Mango Cheesecake',
                description: 'Chilled cheesecake topped with fresh mango, mango compote & mango puree',
                price: 'RM20',
                image: '/static/images/menu/dessert1.jpg'
            },
            {
                name: 'Classic Tiramisu',
                description: 'Savolardi biscuits, eggs, mascarpone, coffee, and chocolate',
                price: 'RM20',
                image: '/static/images/menu/dessert2.jpg'
            },
            {
                name: 'Sizzling Brownies',
                description: 'Homemade chocolate almond brownies served on a hot cast iron pan, chocolate sauce & vanilla ice cream',
                price: 'RM20',
                image: '/static/images/menu/dessert3.jpg'
            },
            {
                name: 'Sundae',
                description: 'Selection of ice cream, chocolate sauce & chocolate bar',
                price: 'RM20',
                image: '/static/images/menu/dessert4.jpg'
            }
        ]
    },
    {
        category: 'Smoothies',
        items: [
            {
                name: 'Milkshake',
                description: 'Choice of vanilla, chocolate or strawberry',
                price: 'RM20',
                image: '/static/images/menu/smoothie1.jpg'
            },
            {
                name: 'Banana Explosion',
                description: 'Bananas, yoghurt, milk, honey & cinnamon',
                price: 'RM20',
                image: '/static/images/menu/smoothie2.jpg'
            },
            {
                name: 'Banana Ginger Smoothie',
                description: 'Banana, yoghurt, honey & ginger',
                price: 'RM20',
                image: '/static/images/menu/smoothie3.jpg'
            },
            {
                name: 'Orange Dream Creamsicle',
                description: 'Orange fruit, yoghurt & vanilla extract',
                price: 'RM20',
                image: '/static/images/menu/smoothie4.jpg'
            },
            {
                name: 'Breakfast Smoothie',
                description: 'Banana, yoghurt, orange juice & strawberries',
                price: 'RM20',
                image: '/static/images/menu/smoothie5.jpg'
            }
        ]
    },
    {
        category: 'Soft Drinks',
        items: [
            {
                name: 'Coca-Cola',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/soft1.jpg'
            },
            {
                name: 'Coca-Cola Zero',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/soft2.jpg'
            },
            {
                name: 'Sprite',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/soft3.jpg'
            },
            {
                name: 'Tonic Water',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/soft4.jpg'
            },
            {
                name: 'Ginger Ale',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/soft5.jpg'
            },
            {
                name: 'Redbull',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/soft6.jpg'
            },
            {
                name: 'Acqua Panna',
                description: '500ml still water',
                price: 'RM16',
                image: '/static/images/menu/soft7.jpg'
            },
            {
                name: 'San Pellegrino',
                description: '500ml sparkling water',
                price: 'RM16',
                image: '/static/images/menu/soft8.jpg'
            },
            {
                name: 'Langkawi Pure',
                description: '380ml aquifer mineral water',
                price: 'RM16',
                image: '/static/images/menu/soft9.jpg'
            }
        ]
    },
    {
        category: 'Coffee',
        items: [
            {
                name: 'Espresso',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/coffee1.jpg'
            },
            {
                name: 'Americano',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/coffee2.jpg'
            },
            {
                name: 'Ones Café Signature Charcoal Latte',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/coffee3.jpg'
            },
            {
                name: 'Cappuccino',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/coffee4.jpg'
            },
            {
                name: 'Mocha',
                description: '',
                price: 'RM12',
                image: '/static/images/menu/coffee5.jpg'
            }
        ]
    }
];
