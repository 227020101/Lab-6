import * as db from '../helpers/database'

//get a single user by the (unique) username
export const findByUsername = async (username: string) => {
  const query = 'SELECT * from users where username = ?';
  const user = await db.run_query(query, [username]);
  return user;
}

//create a new user in the database
export const add = async (user: any) => {
  let keys = Object.keys(user);
  let values = Object.values(user);
  let key = keys.join(',');
  let parm = '';
  for (let i: number = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  let query = `INSERT INTO users (${key}) VALUES (${parm})`;
  console.log(`testing ${query}`);
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}