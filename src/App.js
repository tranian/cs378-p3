import './App.css';
import MenuItem from './components/MenuItem';
import MenuHeader from './components/MenuHeader';
import React, { useState } from 'react'

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.

const menuHead = {description: 'Savor the authentic flavors of Japanese Cuisine', bottle: 'GET IT WHILE IT\'S HOT!', imageName: 'logo.png', title: 'TOKYO RESTAURANT'};

const menuItems = [
  {
    id: 0,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 1,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 2,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 3,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 4,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 5,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 6,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 7,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 8,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 9,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];


function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCounts, setItemCounts] = useState(menuItems.reduce((acc, item) => {
	  acc[item.id] = 0;		// set each item count to 0
	  return acc;
  }, {}));
  
  
  const updateItemCount = (id, operation) => {
	  const newItemCounts = { ...itemCounts};
	  const price = menuItems.find(item => item.id === id).price;		// access the price from MenuItems
	  
	  if (operation === 'add') {
		newItemCounts[id] += 1;
		setTotalPrice(prevTotal => prevTotal + price);
	  } else if (operation === 'subtract' && newItemCounts[id] > 0) {
		newItemCounts[id] -= 1;
		setTotalPrice(prevTotal => {
		  prevTotal -= price;
		  return prevTotal < 0 ? 0 : prevTotal;
		});
	  }
	  setItemCounts(newItemCounts);
  };
  
  const placeOrder = () => {
	  let output = "";
	  const orderedItems = Object.keys(itemCounts)
	  .filter(id => itemCounts[id] > 0).map(id => {
		  const item = menuItems.find(item => item.id === parseInt(id));
		  return `${itemCounts[id]} ${item.title}`;
	  }).join(", ");
	  if (orderedItems) {
		  output += "Order Placed!\n" + orderedItems;
	  } else {
		  output += "No Items in Cart.";
	  }
	  alert(output);
  };
  
  const clearOrder = () => {
	  setItemCounts(menuItems.reduce((acc, item) => {
		  acc[item.id] = 0;
		  return acc;
	  }, {}));
	  setTotalPrice(0);
  };
	  
  
  return (
    <div>
	  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia"/>
	  <MenuHeader bottle={menuHead.bottle} description={menuHead.description} imageName={menuHead.imageName} title={menuHead.title} />
	  <main className="container my-4 mx-auto">
      <div className="menu row g-4">
        {/* Display menu items dynamicaly here by iterating over the provided menuItems */
			menuItems.map(item => (
			<MenuItem key={item.id}
			id={item.id}
			title={item.title}
			description={item.description}
			imageName={item.imageName}
			price={item.price}
			count={itemCounts[item.id]}
			updateItemCount={updateItemCount}
			/>))
		}
      </div>
	    <div className="d-flex justify-content-between align-items-center">
	  	  <p className="mb-0">Subtotal: ${totalPrice.toFixed(2)}</p>
		  <div>
		    <button onClick={placeOrder} className="me-2">Order</button>
		    <button onClick={clearOrder} className="">Clear All</button>
		  </div>
	    </div>
	  </main>
    </div>
  );
}

export default App;
