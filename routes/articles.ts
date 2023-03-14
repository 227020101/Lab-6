import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/articles';
import { basicAuth } from '../controllers/auth';
import { validateArticle } from '../controllers/validation';


// Temporarily define some random articles in an array.
// Later this will come from the DB.

const articles = [
  { title: 'hello article', fullText: 'some text here to fill the body', dateModified: '' },
  { title: 'another article', fullText: 'again here is some text here to fill', dateModified: '' },
  { title: 'coventry university ', fullText: 'some news about coventry university', dateModified: '' },
  { title: 'smart campus', fullText: 'smart campus is coming to IVE', dateModified: '' }
];


// Since we are handling articles use a URI that begins with an appropriate path
const router = new Router({ prefix: '/api/v1/articles' });

// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {
  // Use the response body to send the articles as JSON.
  //ctx.body = articles; //hardcode for test 
  //connect to DB
  let articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  } else {
    ctx.body = {}
    ctx.status = 404;
  }
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  // Get the ID from the route parameters.
  let id = +ctx.params.id;
  let articles = await model.getById(id);
  // If it exists then return the article as JSON.
  // Otherwise return a 404 Not Found status code
  /** 
  if ((id < articles.length + 1) && (id > 0)) {
    ctx.body = articles[id - 1];
  } else {
    ctx.status = 404;
  }
  **/
  if (articles.length) {
    ctx.body = articles[0];
  } else {
    ctx.body = {}
    ctx.status = 404;
  }
  await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
  // The body parser gives us access to the request body on ctx.request.body.
  // Use this to extract the title and fullText we were sent.
  //let { title, fullText } = ctx.request.body;
  //let now = new Date();
  // In turn, define a new article for addition to the array.
  //let newArticle = { title: title, fullText: fullText, dateCreated: now };
  // articles.push(newArticle);
  // Finally send back appropriate JSON and status code.
  // Once we move to a DB store, the newArticle sent back will now have its ID.
  //ctx.status = 201;
  //ctx.body = newArticle;

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
const updateArticle = async (ctx: RouterContext, next: any) => {
  //TODO: edit an article
  // Get the ID from the route parameters.
  let id = +ctx.params.id;
  //let now = new Date.now().toLocaleString();
  //let { title, fullText } = ctx.request.body;
  // In turn, define a new article for addition to the array.
  //let updateArticle = { title: title, fullText: fullText };
  // Finally send back appropriate JSON and status code.
  //if ((id < articles.length + 1) && (id > 0)) {
  //articles[id - 1].title = title;
  //articles[id - 1].fullText = fullText;
  //articles[id - 1].dateModified = now;
  //ctx.body = articles[id - 1];
  //} else {
  //ctx.status = 404;
  //}
  //updateArticleByID(id,title,fullText);
  // Once we move to a DB store, the newArticle sent back will now have its ID.
  const body = ctx.request.body;

  let articles = await model.update(id, body);
  if (articles.length) {
    ctx.body = articles[0];
    ctx.status = 202;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
  //TODO: delete an article
  // Get the ID from the route parameters.
  let id = +ctx.params.id;
  // Finally send back appropriate JSON and status code.
  /** 
  if ((id < articles.length + 1) && (id > 0)) {
    articles.splice(id - 1, 1);

  } else {
    ctx.status = 404;
    
  }
  ctx.status = 202;
  ctx.body = articles;
  */

  let result = await model.deleteById(id);
  if (result.status == 204) {
    ctx.status = 204;
    ctx.body = result;
  } else {
    ctx.status = 500;
    ctx.body = { err: "delete data failed" };
  }
  //updateArticleByID(id,title,fullText);
  // Once we move to a DB store, the newArticle sent back will now have its ID.

  await next();
}
/* Routes are needed to connect path endpoints to handler functions.
 When an Article id needs to be matched we use a pattern to match
 a named route parameter. Here the name of the parameter will be 'id'
 and we will define the pattern to match at least 1 numeral. */
router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateArticle, createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), updateArticle);
router.del('/:id([0-9]{1,})', basicAuth, deleteArticle);
// Finally, define the exported object when import from other scripts.
export { router };
