
const categoryRouter = require('./categoryRouter');



exports.createRoutes = (app) => {
    app.use("/category", categoryRouter);
    //app.use("/users", userRouter);
}