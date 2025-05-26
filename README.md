# ArmienStore

## Project Overview

ArmienStore is an e-commerce website that allows users to browse and purchase personalized gifts and custom products. This project includes a fully functional "Add to Cart" feature, enabling users to manage their shopping cart seamlessly.

## Project Structure

The project consists of the following files and directories:

```
mark7raw
├── assets
│   └── images          # Contains images used in the website, such as product images.
├── css
│   └── styles.css      # Contains the styles for the website, including layout, typography, and responsive design.
├── js
│   └── cart.js         # Handles the "Add to Cart" functionality, managing the cart's state.
├── index.html          # The main HTML file for the website, containing the structure of the webpage.
└── README.md           # Documentation for the project, explaining how to set up and use the "Add to Cart" feature.
```

## Setting Up the Project

1. **Clone the Repository**: 
   Clone the repository to your local machine using the following command:
   ```
   git clone <repository-url>
   ```

2. **Open the Project**: 
   Navigate to the project directory:
   ```
   cd mark7raw
   ```

3. **Open `index.html`**: 
   Open the `index.html` file in your web browser to view the website.

## Using the "Add to Cart" Feature

### Adding Items to the Cart

- Each product card on the website has an "Add to Cart" button.
- When a user clicks this button, the product is added to the shopping cart.
- A notification will alert the user that the item has been added.

### Viewing the Cart

- The cart state is managed using local storage, allowing users to refresh the page without losing their cart items.
- You can implement a separate cart view page to display the items in the cart, which can be developed further.

### Removing Items from the Cart

- Users can remove items from the cart by implementing a "Remove" button in the cart view (not included in this version).

## Dependencies

- This project uses Bootstrap for styling. Ensure you have an internet connection to load Bootstrap from the CDN.
- JavaScript is used for the "Add to Cart" functionality, which is included in the `cart.js` file.

## Future Improvements

- Implement a cart view page to display all items in the cart.
- Add functionality to update item quantities in the cart.
- Enhance user experience with better notifications and modals.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.