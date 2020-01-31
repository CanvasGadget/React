//import AccountInvService from "../services/AccountInvService";
var AccountInvService = require("../services/AccountInvService");
var Util = require("../utils/Utils");
//import Util from "../utils/Utils";

const util = new Util();

class AccountInvController {
  static async getAllTransactions(req, res) {
    try {
      const allTransactions = await AccountInvService.getTransactions();
      if (allTransactions.length > 0) {
        util.setSuccess(200, "Transactions retrieved", allTransactions);
      } else {
        util.setSuccess(200, "No Transaction found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getDistinctPayors(req, res) {
    try {
      const destinctPayors = await AccountInvService.getPayors();
      if (destinctPayors.length > 0) {
        util.setSuccess(200, "Payors retrieved", destinctPayors);
      } else {
        util.setSuccess(200, "No payors found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getAllInvoices(req, res) {
    try {
      const allInvoices = await AccountInvService.getInvoices();
      if (allInvoices.length > 0) {
        util.setSuccess(200, "Invoices retrieved", allInvoices);
      } else {
        util.setSuccess(200, "No Invoices found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async deleteOneTransaction(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const oneToDelete = await AccountInvService.deleteOneTransaction(id);

      if (oneToDelete) {
        util.setSuccess(200, "Transaction deleted");
      } else {
        util.setError(404, `Transaction with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async deleteManyTransactions(req, res) {
    try {
      const deletedMany = await AccountInvService.deleteManyTransactions(
        req.body
      );
      util.setSuccess(201, "Transactions Deleted!", deletedMany);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async addTransaction(req, res) {
    // if (
    //   !req.body.date ||
    //   !req.body.transType ||
    //   !req.body.payor ||
    //   !req.body.amount ||
    //   !req.body.method
    // ) {
    //   util.setError(400, 'Please provide complete details')
    //   return util.send(res)
    // }
    const newOne = req.body;
    try {
      const createdOne = await AccountInvService.addOneTrans(newOne);
      util.setSuccess(201, "Transaction Added!", createdOne);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async addManualInvoice(req, res) {
    // if (
    //   !req.body.date ||
    //   !req.body.transType ||
    //   !req.body.payor ||
    //   !req.body.amount ||
    //   !req.body.method
    // ) {
    //   util.setError(400, 'Please provide complete details')
    //   return util.send(res)
    // }
    const newOne = req.body;
    try {
      const createdOne = await AccountInvService.addOneManualInvoice(newOne);
      util.setSuccess(201, "Invoice Added!", createdOne);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  // Accounts Table
  static async getAllAccountsParam(req, res) {
    try {
      const allAccounts = await AccountInvService.getAccountsParam(req.body);
      if (allAccounts.length > 0) {
        util.setSuccess(200, "Accounts retrieved", allAccounts);
      } else {
        util.setSuccess(200, "No Accounts found", []);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  // Account Details  Table
  static async getDetailAccountsBE(req, res) {
    const data = req.body;
    try {
      const detailAccounts = await AccountInvService.getAccountDetailByBE(data);
      if (detailAccounts.length > 0) {
        util.setSuccess(200, "Account details retrieved", detailAccounts);
      } else {
        util.setSuccess(200, "No Account details found", []);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

//export default AccountInvController;
module.exports = AccountInvController;
