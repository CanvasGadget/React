//import { query } from "./connection";
var query = require("./connection");

class FormService {
  static async getAllForms() {
    const sql = "SELECT * FROM forms";

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }
}

//export default FormService;
module.exports = FormService;
