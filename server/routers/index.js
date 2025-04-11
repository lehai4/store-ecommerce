const userRouter = require("./router_admin/router_user/user");
const roleRouter = require("./router_admin/router_role/index");
const categoryRouter = require("./router_admin/router_category/index");
const productRouter = require("./router_admin/router_product/index");
const userForRouter = require("./router_user/index");
function router(app) {
  app.use("/api/admin/users", userRouter);
  app.use("/api/admin/roles", roleRouter);
  app.use("/api/admin/categories", categoryRouter);
  app.use("/api/admin/products", productRouter);

  // User
  app.use("/api/users", userForRouter);
}
module.exports = router;
