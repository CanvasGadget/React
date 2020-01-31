//import FormService from "../services/FormService";
var FormService = require("../services/FormService");
//import Util from "../utils/Utils";
var Util = require("../utils/Utils");

const util = new Util();

class FormController {
  static async getAllForms(req, res) {
    try {
      const allForms = await FormService.getAllForms();
      if (allForms.length > 0) {
        util.setSuccess(200, "Forms retrieved", allForms);
      } else {
        util.setSuccess(200, "No Forms found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

//export default FormController;
module.exports = FormController;
