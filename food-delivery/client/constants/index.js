export const categories = [
    {
        id: 1,
        name: 'Pizza',
        image: require('../assets/images/categories/Pizzas.png')
    },
    {
        id: 2,
        name: 'Burgers',
        image: require('../assets/images/categories/Burgers.png')
    },
    {
        id: 3,
        name: 'Drinks',
        image: require('../assets/images/categories/Drinks.png')
    },
    {
        id: 4,
        name: 'Pasta',
        image: require('../assets/images/categories/Pastas.png')
    },
    {
        id: 5,
        name: 'Noodles',
        image: require('../assets/images/categories/Noodles.png')
    },
    {
        id: 6,
        name: 'Cakes',
        image: require('../assets/images/categories/Cakes.png')
    },
    {
        id: 7,
        name: 'Seafood',
        image: require('../assets/images/categories/SeaFood.png')
    },

]

export const eateries = {
    id: 1,
    title: 'IU Dining',
    restaurants: [
        {
            id: 1,
            name: 'Read Dining Hall',
            image: require('../assets/images/restaurants/ReadQuadrangle.jpg'),
            description: 'Student Housing Center',
            lng: -86.5148891, 
            lat: 39.1658280,
            address: '125 Jordan Ave #7514, Bloomington',
            stars: 4.5,
            reviews: 120,
            category: 'Eatery',
            dishes: [
                {
                    id: 1,
                    name: 'Macaroni Pizza',
                    price: 12.99,
                    image: require('../assets/images/dishes/MacaroniPizza.jpeg'),
                    description: 'Loaded with pepperoni, jalapenos, and hot sauce.'
                },
                {
                    id: 2,
                    name: 'Red Sauce Pasts',
                    price: 14.99,
                    image: require('../assets/images/dishes/RedSaucePasta.jpeg'),
                    description: 'Grilled chicken with a smoky BBQ sauce base and extra cheese.'
                },
                {
                    id: 3,
                    name: 'ManChow Noodles',
                    price: 10.99,
                    image: require('../assets/images/dishes/ManChowNoodles.jpeg'),
                    description: 'A healthy option with bell peppers, olives, onions, and mushrooms.'
                }
            ]
        },
        {
            id: 2,
            name: 'McNutt Dining Hall',
            image: require('../assets/images/restaurants/McNutt.jpg'),
            lng: -74.0060, 
            lat: 40.7128, 
            address: '1101 N Fee Ln #7502, Bloomington',
            stars: 4.7,
            reviews: 200,
            category: 'Eatery',
            dishes: [
                {
                    id: 1,
                    name: 'Chicken Tikka Masala',
                    price: 15.99,
                    image: require('../assets/images/dishes/FriedRice.jpeg'),
                    description: 'Creamy and rich curry with tender chicken pieces.'
                },
                {
                    id: 2,
                    name: 'Samosa',
                    price: 18.99,
                    image: require('../assets/images/dishes/Samosa.jpeg'),
                    description: 'Spicy lamb curry with a tangy and bold flavor.'
                },
                {
                    id: 3,
                    name: 'Mutton Curry',
                    price: 13.99,
                    image: require('../assets/images/dishes/MuttonCurry.jpeg'),
                    description: 'Soft paneer cubes in a buttery tomato sauce.'
                }
            ]
        },
        {
            id: 3,
            name: 'Ballantine Cafe',
            image: require('../assets/images/cafes/BallentineCafe.jpg'),
            lng: -86.5137, 
            lat: 39.1660, 
            address: '200 S Jordan Ave, Bloomington',
            stars: 4.5,
            reviews: 150,
            category: 'Cafe',
            dishes: [
                {
                    id: 1,
                    name: 'Espresso',
                    price: 3.00,
                    image: require('../assets/images/cafes/Ballentine/Expresso.webp'),
                    description: 'Rich and bold espresso made from premium coffee beans.'
                },
                {
                    id: 2,
                    name: 'Blueberry Muffin',
                    price: 2.50,
                    image: require('../assets/images/cafes/Ballentine/Muffin.jpg'),
                    description: 'Freshly baked blueberry muffin with a buttery crumble topping.'
                },
                {
                    id: 3,
                    name: 'Cappuccino',
                    price: 4.00,
                    image: require('../assets/images/cafes/Ballentine/Cappuccino.jpg'),
                    description: 'A classic cappuccino with rich foam and a sprinkle of cocoa.'
                }
            ]
        },
        {
            id: 4,
            name: 'SPEA Cafe',
            image: require('../assets/images/cafes/SPEACafe.avif'),
            lng: -86.5172, 
            lat: 39.1698, 
            address: '1234 E 3rd St, Bloomington',
            stars: 4.8,
            reviews: 200,
            category: 'Cafe',
            dishes: [
                {
                    id: 1,
                    name: 'Caramel Latte',
                    price: 4.50,
                    image: require('../assets/images/cafes/SPEA/CaramelLatte.jpg'),
                    description: 'Smooth latte with a rich caramel flavor and whipped cream.'
                },
                {
                    id: 2,
                    name: 'Bagel with Cream Cheese',
                    price: 3.50,
                    image: require('../assets/images/cafes/SPEA/Bagel.webp'),
                    description: 'Toasted bagel served with a generous layer of cream cheese.'
                },
                {
                    id: 3,
                    name: 'Chai Tea',
                    price: 3.75,
                    image: require('../assets/images/cafes/SPEA/ChaiTea.jpg'),
                    description: 'A blend of spiced tea with steamed milk, perfect for tea lovers.'
                }
            ]
        },
        {
            id: 5,
            name: 'Eskenazi Museum Cafe',
            image: require('../assets/images/cafes/EskenaziMuseumCafe.jpg'),
            lng: -86.5165, 
            lat: 39.1682, 
            address: '456 W 4th St, Bloomington',
            stars: 4.6,
            reviews: 175,
            category: 'Cafe',
            dishes: [
                {
                    id: 1,
                    name: 'Mocha',
                    price: 4.75,
                    image: require('../assets/images/cafes/Eskenazi/Mocha.jpg'),
                    description: 'Rich chocolate mocha topped with whipped cream.'
                },
                {
                    id: 2,
                    name: 'Croissant',
                    price: 2.00,
                    image: require('../assets/images/cafes/Eskenazi/Croissant.jpeg'),
                    description: 'Flaky and buttery croissant, perfect with your coffee.'
                },
                {
                    id: 3,
                    name: 'Iced Coffee',
                    price: 3.25,
                    image: require('../assets/images/cafes/Eskenazi/InstantIcedCoffee.jpg'),
                    description: 'Refreshing iced coffee served with milk and sugar.'
                }
            ]
        }
        
    ]
};




