// import { query } from "./connection";
var query = require("./connection");

class AccountInvService {
  static async getTransactions() {
    var sql = `SELECT id, DATE_FORMAT(event_date, '%m/%d/%Y') as transDate, transType, payor, amount, method, description 
      from testevent 
      WHERE transType = 'Payment' OR transType = 'Discount' or transType = 'Refund' ORDER BY transDate DESC`;

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  static async getPayors() {
    let sql = "SELECT DISTINCT billing_full_name, billing_email FROM clients";

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  // Accounts table
  static async getAccountsParam(param) {
    const { startDate, endDate, keyword } = param;
    const sql = `SELECT 
                DATE_FORMAT(max(x.trans_date), '%m/%d/%Y') as last_pay_date, 
                SUM(x.session_cost)-SUM(x.amount) as balance, 
                y.payor, 
                y.billing_email, 
                y.billing_full_name, 
                y.client_type, 
                y.billing_phone, 
                y.payment_type, 
                y.client 
              FROM 
                (SELECT 
                  CONCAT_WS(', ', billing_last_name, billing_first_name) AS payor, 
                  billing_email, 
                  billing_full_name, 
                  client_type, 
                  billing_phone, 
                  payment_type, 
                  GROUP_CONCAT(client_full_name SEPARATOR ', ') AS client 
                FROM 
                  clients GROUP BY payor , 
                  billing_email , 
                  billing_full_name ,
                  client_type , 
                  client_type , 
                  billing_phone , 
                  payment_type) as y 
              INNER JOIN 
                testevent x ON x.billing_email = y.billing_email `;
    const groupByClause = ` group by  
                            y.payor, 
                            y.billing_email, 
                            y.billing_full_name, 
                            y.client_type, 
                            y.billing_phone, 
                            y.payment_type, 
                            y.client`;
    let whereClasue = ``;
    if (startDate.length > 0) {
      whereClasue = ` WHERE '${startDate}' <= x.trans_date `;
    }
    if (endDate.length > 0) {
      if (whereClasue.length > 0) {
        whereClasue = whereClasue + ` AND x.trans_date <= '${endDate}' `;
      } else {
        whereClasue = ` WHERE x.trans_date <= '${endDate}' `;
      }
    }
    if (keyword.length > 0) {
      const keywordClause = ` y.payor LIKE '%${keyword}%' OR
                              y.billing_email LIKE '%${keyword}%' OR
                              y.billing_full_name LIKE '%${keyword}%' OR
                              y.client_type LIKE '%${keyword}%' OR
                              y.billing_phone LIKE '%${keyword}%' OR
                              y.payment_type LIKE '%${keyword}%' OR
                              y.client LIKE '%${keyword}%' `;
      if (whereClasue.length > 0) {
        whereClasue = whereClasue + ` AND ${keywordClause} `;
      } else {
        whereClasue = ` WHERE ${keywordClause} `;
      }
    }
    try {
      return await query(sql + whereClasue + groupByClause);
    } catch (error) {
      throw error;
    }
  }

  // Account Details
  static async getAccountDetailByBE(param) {
    const { bEmail } = param;
    let sql = `SELECT 
                  DATE_FORMAT(x.event_date, '%m/%d/%Y') as date, x.description,  
                  x.clients, 
                  x.session_cost, 
                  x.amount,  
                  SUM(y.bal) 
                  balance 
                FROM 
                  (SELECT *, session_cost-amount bal FROM testevent WHERE billing_email = '${bEmail}') x 
                  JOIN (SELECT *, session_cost-amount bal FROM testevent WHERE billing_email = '${bEmail}') y 
                ON 
                  y.event_date <= x.event_date 
                GROUP BY 
                  x.id 
                ORDER BY 
                  x.event_date DESC`;

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  static async getInvoices() {
    var sql = `SELECT id, status,  DATE_FORMAT(inv_date, '%m/%d/%Y') as inv_date, payor, DATE_FORMAT(start_date, 
        '%m/%d/%Y') as start_date, DATE_FORMAT(end_date, '%m/%d/%Y') as end_date, amount 
        from invoices`;

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  static async deleteOneTransaction(id) {
    const sql = `DELETE FROM testevent WHERE id = ${id}`;

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  static async addOneTrans(newOne) {
    const sql = `INSERT INTO testevent (transType, payor, amount, method, description, billing_email, trans_date) 
      VALUES (?,?,?,?,?,?,?) `;
    const {
      transType,
      payor,
      amount,
      method,
      description,
      billingEmail,
      transDate
    } = newOne;

    try {
      return await query(sql, [
        transType,
        payor,
        amount,
        method,
        description,
        billingEmail,
        transDate
      ]);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  static async addOneManualInvoice(newOne) {
    const sql =
      "INSERT INTO invoices (inv_date, payor, start_date, end_date, amount) VALUES (?, ?, ?, ?, ?) ";
    const { invoiceDate, payor, startDate, endDate, amount } = newOne;

    try {
      return await query(sql, [
        invoiceDate,
        payor,
        startDate,
        endDate,
        //dueDate,
        amount
      ]);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  static async deleteManyTransactions(ids) {
    if (!ids || ids.length === 0) throw Error("ids not valid.");
    let sql = "DELETE FROM testevent WHERE id IN (";
    for (const id of ids) {
      sql += id + ", ";
    }

    sql = sql.substr(0, sql.length - 2);
    sql += ")";

    try {
      return await query(sql);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }
}

//export default AccountInvService;
module.exports = AccountInvService;
