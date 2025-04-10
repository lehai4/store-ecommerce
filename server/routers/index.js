const userRouter = require("./router_user/user");
const roleRouter = require("./router_role/index");
function router(app) {
  app.use("/api/users", userRouter);
  app.use("/api/roles", roleRouter);
}
module.exports = router;
