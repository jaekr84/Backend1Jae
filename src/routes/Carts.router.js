import { Router } from "express";
import CartManager from "../services/CartsManager.js";

const router = Router()
const cartManager = new CartManager;
// endpoints

//get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts()
    res.json(carts)
  } catch (e) {
    res.status(500).json({ error: 'Algo salio mal' });
  }
})

router.post('/', async (req, res) => {
  try {
    const newCart = {
      id: await cartManager.generateId(),
      products: []
    };

    await cartManager.addCart(newCart);

    res.status(201).json({ message: 'Carrito creado con éxito', cart: newCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    await cartManager.saveToFile();

    res.status(200).json({ message: 'Producto agregado al carrito', cart });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});



export default router