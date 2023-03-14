import * as db from '../helpers/database'

//get a single article by its id
export const getById = async (id: any) => {
  let query = 'SELECT * FROM articles WHERE ID = ?';
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

//list all the articles in the database
export const getAll = async () => {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM articles;"
  let data = await db.run_query(query, null);
  return data
}

//create a new article in the database
export const add = async (article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  //keys.push('authorid');
  //values.push(2);
  let key = keys.join(',');
  let parm = '';
  // let parms = values.join(',');
  // console.log(`test${parms}`);
  for (let i: number = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  let query = `INSERT INTO articles (${key}) VALUES (${parm})`;
  console.log(`testing ${query}`);
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//delete a single article by its id
export const deleteById = async (id: any) => {
  let query = 'delete FROM articles WHERE ID = ?';
  let values = [id]
  try {
    await db.run_delete(query, values);
    return { status: 204 };
  } catch (err: any) {
    return err;
  }
}

//update a article in the database by its id
export const update = async (id: any, article: any) => {
  let values = Object.keys(article) + " = " + Object.values(article);
  let parm = '';
  // let parms = values.join(',');
  // console.log(`test${parms}`);
  for (let i: number = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  let query = `UPDATE table_name (${parm}) SET WHERE ID = ?`;
  console.log(`testing ${query}`);
  try {
    await db.run_update(query, id);
    let articles = await getById(id);
    return { articles };
  } catch (err: any) {
    return err;
  }
}
