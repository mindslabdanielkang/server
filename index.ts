import * as Koa from "koa";
import * as koaLogger from "koa-logger";
import * as Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
    ctx.body = {msg: "Hello "}
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(80,() => {
	console.log("Server Started");
});
