
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');


exports.createRoutes = (app) => {
    app.use("/category", categoryRouter);
    app.use("/product", productRouter);
    app.use("/users", userRouter);
}