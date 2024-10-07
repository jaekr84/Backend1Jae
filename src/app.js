import express from 'express'
import productsRouter from './routes/Products.router.js'
import cartRouter from './routes/Carts.router.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

