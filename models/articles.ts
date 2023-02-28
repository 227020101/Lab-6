import * as db from '../helpers/database'

//get a single article by its id
export const getById = async (id: any) => {
  let query = `SELECT * FROM articles WHERE ID = ${id}`
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