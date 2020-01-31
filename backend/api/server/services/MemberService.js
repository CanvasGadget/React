//import { query } from "./connection";
var query = require("./connection");
//var query = connection.query();

class MemberService {
  static async getAllMembers() {
    const sql =
      "SELECT *, concat(substring(member_first_name, 1, 1), substring(member_last_name, 1, 1)) initials FROM members";

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  static async getActiveMembers() {
    const sql = `SELECT *, concat(substring(member_first_name, 1, 1), substring(member_last_name, 1, 1)) initials 
      FROM members
      WHERE active = 1`;

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  // showing the active therapists in the dropdown selection box
  static async getActiveTherapistsDropDown() {
    const sql = "SELECT id, member_full_name FROM members WHERE active =1";

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  static async addOne(newOne) {
    const sql =
      "INSERT INTO members (active, member_full_name, member_first_name, member_last_name, email, role, title, phone, street_address, location, npi, city, zip, notes, bday) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const {
      checkedActive,
      memberFullName,
      memberFirstName,
      memberLastName,
      memberEmail,
      memberRole,
      memberTitle,
      memberPhone,
      memberAddress,
      memberLocation,
      memberNpi,
      memberCity,
      memberZipCode,
      memberNotes,
      memberBday
    } = newOne;
    try {
      return await query(sql, [
        checkedActive,
        memberFullName,
        memberFirstName,
        memberLastName,
        memberEmail,
        memberRole,
        memberTitle,
        memberPhone,
        memberAddress,
        memberLocation,
        memberNpi,
        memberCity,
        memberZipCode,
        memberNotes,
        memberBday
      ]);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  // updates information for member
  static async updateInfo(updatedOne) {
    const {
      id,
      checkedActive,
      memberFullName,
      memberFirstName,
      memberLastName,
      memberEmail,
      memberRole,
      memberTitle,
      memberPhone,
      memberAddress,
      memberLocation,
      memberNpi,
      memberCity,
      memberState,
      memberZipCode,
      memberNotes,
      memberBday
    } = updatedOne;
    const sql = `UPDATE members
    SET active = ?,
    member_full_name = ?,
    member_first_name = ?,
    member_last_name = ?,
    email = ?,
    role = ?,
    title = ?,
    phone = ?,
    street_address = ?,
    location = ?,
    npi = ?,
    city = ?,
    state = ?,
    zip =?,
    notes = ?,
    bday =?
    WHERE id = ?`;
    try {
      return await query(sql, [
        checkedActive,
        memberFullName,
        memberFirstName,
        memberLastName,
        memberEmail,
        memberRole,
        memberTitle,
        memberPhone,
        memberAddress,
        memberLocation,
        memberNpi,
        memberCity,
        memberState,
        memberZipCode,
        memberNotes,
        memberBday,
        id
      ]);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  // updates privileges
  static async updatePriv(updatedOne) {
    const {
      id,
      invBilling,
      calEvery,
      vOtherCli,
      eOtherSched,
      vOtherSched,
      eOtherInfo,
      vOtherInfo,
      addCli,
      recAtt,
      takePay,
      vNote,
      vCreateRep,
      vOwnCal,
      vOwnCli
    } = updatedOne;
    const sql = `UPDATE members
    SET inv_billing = ?,
    cal_every = ?,
    view_other_clients = ?,
    edit_other_sched = ?,
    view_other_sched = ?,
    edit_other_info = ?,
    view_other_info = ?,
    add_client = ?,
    record_attendance = ?,
    take_pay = ?,
    view_note_hist = ?,
    view_create_rep = ?,
    view_own_cal = ?,
    view_own_clients = ?
    WHERE id = ?`;
    try {
      return await query(sql, [
        invBilling,
        calEvery,
        vOtherCli,
        eOtherSched,
        vOtherSched,
        eOtherInfo,
        vOtherInfo,
        addCli,
        recAtt,
        takePay,
        vNote,
        vCreateRep,
        vOwnCal,
        vOwnCli,
        id
      ]);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  // current draft of assigning client
  static async assignClient(updatedOne) {
    var formdata = updatedOne;
    var id = formdata.id;
    var assiCli = formdata.assiCli;
    const sql =
      `UPDATE members SET clients =` + "'" + assiCli + "'" + `WHERE id =` + id;
    try {
      return await query(sql);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }
}

//export default MemberService;
module.exports = MemberService;
