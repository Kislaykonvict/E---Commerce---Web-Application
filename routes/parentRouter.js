
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter')


exports.createRoutes = (app) => {
    app.use("/category", categoryRouter);
    //app.use("/users", userRouter);
    app.use("/product", productRouter);
}