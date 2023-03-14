import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import { basicAuth } from '../controllers/auth'
const router = new Router({prefix: '/api/v1'});
import * as model from '../models/users';

// Just for testing
router.get('/', async(ctx: RouterContext, next: any) => {
 ctx.body= {
  message: 'Public API return'
 };
 await next();
})

const createUser = async (ctx: RouterContext, next: any) => {

  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }

  await next();
}


// Add a protected route that requires authentication
router.get("/private", basicAuth);
router.post("/private", basicAuth, bodyParser(), createUser);
router.put("/private", basicAuth);
router.del("/private", basicAuth);

export {router};