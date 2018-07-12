import { PizzaRepository } from "../repositories/pizza.repository";
import { Pizza } from "../models/pizza";
export declare class PizzaController {
    private pizzaRepo;
    constructor(pizzaRepo: PizzaRepository);
    getAllPizzas(toppings: string): Promise<Array<any>>;
    getSpecificPizza(pizzaID: string): any;
    createPizza(pizza: any): Promise<Pizza>;
}
