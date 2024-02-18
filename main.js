const input = require('sync-input');

machine = {
  n_cup: 9,
  n_money: 550,
  n_water: 400,
  n_bean: 120,
  n_milk: 540,
  to_exit: false
};

machine.logState = function() {
  console.log("The coffee machine has:");
  console.log(this.n_water + " ml of water");
  console.log(this.n_milk + " ml of milk");
  console.log(this.n_bean + " g of coffee beans");
  console.log(this.n_cup + " disposable cups");
  console.log("$" + this.n_money + " of money");
};

machine.fillSupply = function() {
  let add_water = parseInt(input("Write how many ml of water you want to add: "));
  this.n_water += add_water;
  let add_milk = parseInt(input("Write how many ml of milk you want to add: "));
  this.n_milk += add_milk;
  let add_bean = parseInt(input("Write how many grams of coffee beans you want to add: "));
  this.n_bean += add_bean;
  let add_cup = parseInt(input("Write how many disposable cups you want to add: "));
  this.n_cup += add_cup;
  // this.logState();
};

machine.takeMoney = function(){
  console.log("I give you " + this.n_money);
  this.n_money = 0;
  // this.logState();
};

// For one espresso, the coffee machine needs 250 ml of water and 16 g of coffee beans. 
  // It costs $4.
// For a latte, the coffee machine needs 350 ml of water, 75 ml of milk, 
  // and 20 g of coffee beans. It costs $7.
// And for a cappuccino, the coffee machine needs 200 ml of water, 
  // 100 ml of milk, and 12 g of coffee beans. It costs $6.

// function checkSupply(r_cup, r_water, r_bean, r_milk)
machine.createCoffee = function(r_water, r_milk, r_bean, a_money) {
  this.n_cup -= 1;
  this.n_water -= r_water;
  this.n_bean -= r_bean;
  this.n_milk -= r_milk;
  this.n_money += a_money;
};

machine.checkSupplyAndServe = function(coffeeType){
  switch(coffeeType){
    case "1":
      if (this.n_cup < 1){
        console.log("Sorry, not enough cup!");
      } else if (this.n_water < 250){
        console.log("Sorry, not enough water!");
      } else if (this.n_bean < 16){
        console.log("Sorry, not enough bean!");
      } else {
        console.log("I have enough resources, making you a coffee!");
        this.createCoffee(r_water = 250, r_milk = 0, r_bean = 16, a_money = 4);
      }
      break;
    case "2":
      if (this.n_cup < 1){
        console.log("Sorry, not enough cup!");
      } else if (this.n_water < 350){
        console.log("Sorry, not enough water!");
      } else if (this.n_bean < 20){
        console.log("Sorry, not enough bean!");
      } else if (this.n_milk < 75){
        console.log("Sorry, not enough milk!");
      } else {
        console.log("I have enough resources, making you a coffee!");
        this.createCoffee(r_water = 350, r_milk = 75, r_bean = 20, a_money = 7);
      }
      break;
    case "3":
      if (this.n_cup < 1){
        console.log("Sorry, not enough cup!");
      } else if (this.n_water < 350){
        console.log("Sorry, not enough water!");
      } else if (this.n_bean < 20){
        console.log("Sorry, not enough bean!");
      } else if (this.n_milk < 75){
        console.log("Sorry, not enough milk!");
      } else {
        console.log("I have enough resources, making you a coffee!");
        this.createCoffee(r_water = 200, r_milk = 100, r_bean = 12, a_money = 6);
      }
      break;
    case "back":
      break;
  }
};

machine.buyCoffeeMenu = function() {
  let coffeeType = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ");
  this.checkSupplyAndServe(coffeeType);
};

machine.exitProgram = function(){
  this.to_exit = true;
};

// actions include buy, fill, take, remaining, exit
machine.askAction = function() {
  let action = input("Write action (buy, fill, take, remaining, exit): ");
  switch(action) {
    case "buy":
      this.buyCoffeeMenu();
      break;
    case "fill":
      this.fillSupply();
      break;
    case "take":
      this.takeMoney();
      break;
    case "exit":
      this.exitProgram();
      break;
    case "remaining":
      this.logState();
      break;
  }
};

while (machine.to_exit == false){
  // machine.logState();
  machine.askAction();
}
