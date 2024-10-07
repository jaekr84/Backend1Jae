import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carts.json');

export default class CartManager {
  constructor() {
    this.carts = []
    this.init()
  }

  async init() {
    try {
      const data = await fs.readFile(cartsFilePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (e) {
      this.carts = []
    }
  }

  saveToFile() {
    fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2))
  }

  getAllCarts() {
    return this.carts;
  }

  generateId() {
    const lastId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 1;
    return lastId + 1;
  }

  addCart(cart) {
    this.carts.push(cart);
    this.saveToFile();
  }

  getCartById(cartId) {
    const cart = this.carts.find(c => c.id === cartId);
    return cart || null;
  }
  generateId() {
    const lastId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 0;
    return lastId + 1;
  }

  addCart(cart) {
    this.carts.push(cart);
    this.saveToFile();
  }
}
