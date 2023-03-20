
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter')


exports.createRoutes = (app) => {
    app.use("/category", categoryRouter);
    app.use("/product", productRouter);
    app.use("/users", userRouter);
    app.use("/carts", cartRouter);
}   