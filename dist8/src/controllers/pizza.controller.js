"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const pizza_repository_1 = require("../repositories/pizza.repository");
const repository_1 = require("@loopback/repository");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let PizzaController = class PizzaController {
    constructor(pizzaRepo) {
        this.pizzaRepo = pizzaRepo;
    }
    // we need to tell Loopback how we get this function
    async getAllPizzas(toppings) {
        // var pizzas = []; // new Array<any>();
        // if (toppings == "pineapple") {
        //   pizzas.push("With Pinapple");
        // } else {
        //   pizzas.push("Yum");
        // }
        // return pizzas;
        return await this.pizzaRepo.find();
    }
    getSpecificPizza(pizzaID) {
        if (pizzaID = "A") {
            return "ABC";
        }
        if (pizzaID = "B") {
            return "BCD";
        }
        throw new rest_1.HttpErrors.NotFound("Sorry, pizza not found");
    }
    // @post("/pizzas")
    // createPizza(
    //   @requestBody() pizza: any
    // ): any {
    //   pizza.status = "received"
    // }
    // we need to wait for the information to come back before we use it
    // we use asynchronous. says this function is asynchornous
    // synchronous is an instant request, asynchornous waits until
    async createPizza(pizza) {
        // pizza.status = "received";
        // return pizza;
        // this.pizzaRepo.create(pizza);
        let createdPizza = await this.pizzaRepo.create(pizza);
        return createdPizza;
    }
};
__decorate([
    rest_1.get("/pizzas"),
    __param(0, rest_1.param.query.string("toppings")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "getAllPizzas", null);
__decorate([
    rest_1.get("/pizzas/{pizzaID}"),
    __param(0, rest_1.param.path.string("pizzaID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], PizzaController.prototype, "getSpecificPizza", null);
__decorate([
    rest_1.post("/pizzas"),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "createPizza", null);
PizzaController = __decorate([
    __param(0, repository_1.repository(pizza_repository_1.PizzaRepository.name)),
    __metadata("design:paramtypes", [pizza_repository_1.PizzaRepository])
], PizzaController);
exports.PizzaController = PizzaController;
//# sourceMappingURL=pizza.controller.js.map