JavaScript is a multi-paradigm language, and supports:
 * POP - Procedure Oriented Programming: Functional Programing, short learning curve, and with few LOC deploy full applications. JavaScript functions are instances of Object class.
 * OOP - Object Oriented Programming: Prototypal Inheritance (instantiated via factory functions or Object.create()) and Class Inheritance (instantiated via constructor functions with the new keyword,). Prototypal Inheritance is simpler, executes faster and consumes less Hardware Resources than Class Inheritance.
 
Application's purpose:
 * Pizza Delivery Application, client can check items, add to shopping cart and buy pizzas. Pizza Cooker Team processes the order. And the Delivery Team delivers the order. This app helps the client to buy pizzas from home in an easy way and add new jobs (cookers, drivers, developers).

How would people use it:
 * Using a browser (Ex: Chrome, Safari) with internet connection.
 
User Stories:
 1. New users can be created, their information can be edited, and they can be deleted. Their name, phone, email address, profile, and street address are stored in Json Files.
 2. Users can log in and log out by creating or destroying a token.
  2.1 Users profiles: clients, cookers, delivery and/or admin.
 3. When a user is logged in, depends on profile it show:
  3.1 Clients:
   3.1.1 They are able to GET all the possible menu items.
   3.1.2 They are able to fill a shopping cart with menu items.
   3.1.3 When an order is placed, the application sends a receipt to the user by email and the Cookers Team is able to process it.
  3.2 Cookers:
   3.2.1 Check orders created and items to make it.
   3.2.2 Update order status from created to done.
  3.3 Delivery Team: Able to see orders and items to delivery.
   3.3.1 Check orders with status done.
   3.3.2 Pickup order and delivery to the user's address.
   3.3.3 Update order status from done to delivered.
  3.4 Admin Team: Are able to see the whole application for troubleshooting or add/maintain features.
 
Conclusion:
 * A good programming practice is to use smaller units of functionality and Prototypal Inheritance into new objects instead of inheriting from classes and creating object taxonomies. This makes it easy to read and maintain the application code of Pizza Delivery Application.