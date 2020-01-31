//import { query } from "./connection";
var query = require("./connection");
//import moment from "moment";
var moment = require("moment");

class EventService {
  static async getAll() {
    var sql = "SELECT * FROM testevent";

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  // Add calendar event

  static async insertOne(reqBody) {
    var formdata = reqBody;
    var newClient = formdata.newClient;
    var newBillType = formdata.newBillType;
    // var newClientType = formdata.newClientType;
    //var newClient = formdata.newClient;
    var newTherapist = formdata.newTherapist;
    var newLocation = formdata.newLocation;
    var newCategory = formdata.newCategory;
    var checkedRepeat = formdata.checkedRepeat; //true,false
    var repeatOption = formdata.repeatOption; //"Daily","Weekly","Monthly","Custom"
    var newEndRepeat = formdata.newEndRepeat; //"After","On Date"
    var newCustomFreq = formdata.newCustomFreq; //"Specifid Days","Every x days","Weekly","Monthly"
    var newRepeatEveryNumDays = formdata.newRepeatEveryNumDays;
    var newRepeatEveryNumWeeks = formdata.newRepeatEveryNumWeeks;
    var newRepeatEveryNumMonths = formdata.newRepeatEveryNumMonths;
    var sun = formdata.sun;
    var mon = formdata.mon;
    var tues = formdata.tues;
    var wed = formdata.wed;
    var thu = formdata.thu;
    var fri = formdata.fri;
    var sat = formdata.sat;
    var billingEmail = formdata.billingEmail || "";
    var sessionCost = formdata.sessionCost || 0;
    var sessionLength = formdata.sessionLength || 0;
    var selected_days = [sun, mon, tues, wed, thu, fri, sat];
    var start_dates = [];
    var end_dates = [];
    const newClients = formdata.newClients;
    const newTherapists = formdata.newTherapists;

    //------------------occurances-----------------------------
    var newNumOccurences = formdata.newNumOccurences; //"4"
    var occurances_to_add = 0;
    if (newNumOccurences) occurances_to_add = parseInt(newNumOccurences);
    var occurances_added = 0;
    var interval = 0;
    var interval_unit = "days";
    //---------------------------------------------------------
    //------------------dates----------------------------------
    var selectedDate = formdata.selectedDate; //start date
    var endSelectedDate = formdata.endSelectedDate; //end date
    var first_start_date = moment(selectedDate, "YYYY-MM-DD HH:mm:ss");
    var start_date_to_add = moment(selectedDate, "YYYY-MM-DD HH:mm:ss");
    var end_date_to_add = moment(endSelectedDate, "YYYY-MM-DD HH:mm:ss");

    var date_limit = moment(start_date_to_add).add(1, "seconds");
    var selectedDateOccurenceEnd = formdata.selectedDateOccurenceEnd; // repeat end date "2019-09-18 03:41:00"

    if (selectedDateOccurenceEnd) {
      var date_limit_str =
        selectedDateOccurenceEnd.substring(0, 10) +
        " " +
        selectedDate.substring(11, 19);
      date_limit = moment(date_limit_str, "YYYY-MM-DD HH:mm:ss");
    }

    if (selectedDateOccurenceEnd == "" || selectedDateOccurenceEnd == null)
      selectedDateOccurenceEnd = selectedDate;
    //---------------------------------------------------------

    //these logs are added to response just for debugging
    //after full testing, these may be removed
    /*
    logs.push("start_date_to_add");
    logs.push(start_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
    logs.push("end_date_to_add");
    logs.push(end_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
    logs.push("date_limit");
    logs.push(date_limit.format("YYYY-MM-DD HH:mm:ss"));
    logs.push("checkedRepeat");
    logs.push(checkedRepeat);
    logs.push("repeatOption");
    logs.push(repeatOption);
    logs.push("newCustomFreq");
    logs.push(newCustomFreq);
    logs.push("newEndRepeat");
    logs.push(newEndRepeat);
    logs.push("existingNumOccurences");
    logs.push(existingNumOccurences);
    */

    /*
    
      In the while loop  these two arrays start_dates and end_dates are filled
      and then used the dates in them to make insert queries whether its one appointment
       or multiple appointments that needs to be created
       The while loop runs until the required number of occourances are added or
       the last date comes as given by user to stop the repeat appointments
       The dates are created by adding up days to the first date (provided by user)
       The number of days to be added is decided based on the interval (provided by user)
       or just 1 day is added in each iteration and only the specific days get added
       */
    while (
      (!checkedRepeat && occurances_added < 1) ||
      (checkedRepeat &&
        newEndRepeat === "After" &&
        occurances_added < occurances_to_add) ||
      (checkedRepeat &&
        newEndRepeat === "On Date" &&
        start_date_to_add <= date_limit)
    ) {
      //logs.push("while");
      if (repeatOption === "Daily") interval = 1;
      else if (repeatOption === "Weekly") interval = 7;
      else if (repeatOption === "Monthly") {
        interval = 1;
        interval_unit = "months";
      } else if (repeatOption === "Custom") {
        if (newCustomFreq === "Every x days") interval = newRepeatEveryNumDays;
        else if (newCustomFreq === "Weekly")
          interval = newRepeatEveryNumWeeks * 7;
        else if (newCustomFreq === "Monthly") {
          interval = newRepeatEveryNumMonths;
          interval_unit = "months";
        }
      }

      if (repeatOption === "Custom" && newCustomFreq === "Specific Days") {
        //logs.push("specific days");
        if (
          occurances_added < 1 ||
          (occurances_added > 0 && selected_days[start_date_to_add.day()])
        ) {
          start_dates.push(start_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
          end_dates.push(end_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
          occurances_added++;
        }
        start_date_to_add.add(1, "days");
        end_date_to_add.add(1, "days");
      } else {
        occurances_added++;
        start_dates.push(start_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
        end_dates.push(end_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
        start_date_to_add = start_date_to_add.add(interval, interval_unit);
        end_date_to_add = end_date_to_add.add(interval, interval_unit);

        // for a special case e.g. a user creates an appointment on 31st and sets a monthly repetition
        //using moment library 31st + 1 month -> 30th and then 30th + 1 month -> 30th (even if month has 31 days)
        //so I have checked each repitition's date and adjusted it to set the real date wheneever available
        if (interval_unit === "months") {
          var month_end_diff =
            first_start_date.date() - start_date_to_add.date();
          if (month_end_diff > 0) {
            var new_start_date_to_add = moment(start_date_to_add).add(
              month_end_diff,
              "days"
            );
            var new_end_date_to_add = moment(end_date_to_add).add(
              month_end_diff,
              "days"
            );
            if (start_date_to_add.month() === new_start_date_to_add.month())
              start_date_to_add = new_start_date_to_add;
            end_date_to_add = new_end_date_to_add;
          }
        }
      }
    }

    try {
      let insertFirstSql =
        `INSERT INTO testevent (title, 
        bill_type, 
        client, therapist, 
        location, 
        category, 
        start, 
        end, 
        repeats, 
        custom_frequency, 
        repeat_option,
        end_repeat, 
        end_date_occurrence, 
        num_occurences, 
        repeat_num_days, 
        sun, 
        mon, 
        tues, 
        wed, 
        thu, 
        fri, 
        sat, 
        billing_email, 
        session_cost, 
        session_set_length, 
        clients, 
        therapists) VALUES` +
        " ('" +
        newClient +
        "','" +
        newBillType +
        "','" +
        newClient +
        "','" +
        newTherapist +
        "','" +
        newLocation +
        "','" +
        newCategory +
        "','" +
        start_dates[0] +
        "','" +
        end_dates[0] +
        "','" +
        checkedRepeat +
        "','" +
        newCustomFreq +
        "','" +
        repeatOption +
        "','" +
        newEndRepeat +
        "','" +
        selectedDateOccurenceEnd +
        "','" +
        newNumOccurences +
        "','" +
        newRepeatEveryNumDays +
        "','" +
        sun +
        "','" +
        mon +
        "','" +
        tues +
        "','" +
        wed +
        "','" +
        thu +
        "','" +
        fri +
        "','" +
        sat +
        "', '" +
        billingEmail +
        "', " +
        sessionCost +
        "," +
        sessionLength +
        ",'" +
        newClients +
        "','" +
        newTherapists +
        "'" +
        ")";
      const firstQueryResult = await query(insertFirstSql);
      let updateSQL = "UPDATE testevent SET series_start_id=? WHERE id=?";
      query(updateSQL, [firstQueryResult.insertId, firstQueryResult.insertId]);
      if (start_dates.length == 1)
        // if it has no series of events.
        return firstQueryResult;

      var sql = `INSERT INTO testevent (title, 
          bill_type, 
          client, 
          therapist, 
          location, 
          category, 
          start, 
          end, 
          repeats, 
          repeat_option, 
          end_repeat, 
          num_occurences,  
          series_start_id, 
          billing_email, 
          session_cost, 
          session_set_length, 
          clients, 
          therapists) VALUES`;

      for (let i = 1; i < start_dates.length; i++) {
        sql +=
          " ('" +
          newClient +
          "','" +
          newBillType +
          "','" +
          newClient +
          "','" +
          newTherapist +
          "','" +
          newLocation +
          "','" +
          newCategory +
          "','" +
          start_dates[i] +
          "','" +
          end_dates[i] +
          "','" +
          checkedRepeat +
          "','" +
          repeatOption +
          "','" +
          newEndRepeat +
          "','" +
          newNumOccurences +
          "'," +
          firstQueryResult.insertId +
          ", '" +
          billingEmail +
          "', " +
          sessionCost +
          ", " +
          sessionLength +
          ",'" +
          newClients +
          "','" +
          newTherapists +
          "')";
        if (i < start_dates.length - 1) sql += ",";
      }
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  // dete sole calendar event
  static async deleteOne(id) {
    const sql = `DELETE FROM testevent WHERE id = ${id}`;

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  // delete recurring series of calendar events
  static async deleteSeries(id) {
    const sql = `DELETE FROM testevent WHERE series_start_id = ${id}`;

    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  // update sole event
  static async updateSole(updatedOne) {
    const {
      eventId,
      existingBillType,
      existingLocation,
      existingCategory,
      existingStart,
      existingEnd,
      billingEmail,
      sessionCost,
      sessionLength,
      existingClients,
      existingTherapists,
      transType,
      transDate
    } = updatedOne;

    var clients = '';
    var therapists = '';

    for(let i = 0; i < updatedOne.existingClients.length; i++){
      if(i == 0) {
        clients += updatedOne.existingClients[0];
      } else {
        clients += "," + updatedOne.existingClients[i];
      }
    }

    for(let i = 0; i < updatedOne.existingTherapists.length; i++){
      if(i == 0) {
        therapists += updatedOne.existingTherapists[0];
      } else {
        therapists += "," + updatedOne.existingTherapists[i];
      }
    }

    const sql = `UPDATE testevent SET bill_type = ?, location = ?, category = ?, start = ?, end = ?, billing_email = ?, session_cost = ?, session_set_length = ?, clients = ?, therapists = ?, transType = ?, trans_date = ? WHERE id = ?`;
    try {
      return await query(sql, [existingBillType,existingLocation,existingCategory,existingStart,existingEnd,billingEmail,sessionCost,sessionLength,clients,therapists,transType,transDate, eventId]);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  // add documentation to event
  static async addDocNote(newOne) {
    const sql = `UPDATE testevent 
    SET attendance = ?,  
    notes = ?,
    note_date = ?  
    WHERE id = ?`;
    const { attendanceType, narrativeNote, noteDate, calID } = newOne;
    try {
      return await query(sql, [attendanceType, narrativeNote, noteDate, calID]);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  // KPI for sessions left in the week
  static async getSessionsLeftInWeek() {
    var sql = `SELECT COUNT(id) as now_and_rest_of_week FROM testevent WHERE (start BETWEEN current_timestamp() 
    AND (curdate() + INTERVAL 6 - weekday(curdate()) DAY)) 
    AND therapist = 'Harry Potter'`;
    try {
      return await query(sql);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  // KPI for total sessions in the week
  static async totalSessionsInWeek() {
    var sql = `SELECT count(id) AS total_sessions_in_week FROM testevent WHERE (start between (curdate()
     + INTERVAL 0 - weekday(curdate()) DAY) 
    AND (curdate() + INTERVAL 6 - weekday(curdate()) DAY))`;
    try {
      return await query(sql);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }

  // home calendar showing the events for the current day
  static async curDayCal() {
    var sql = `SELECT id, date_format(start, '%l:%i %p') AS start, date_format(end, '%l:%i %p') AS end, 
    clients  FROM testevent WHERE DATE(start) = curdate() `;
    try {
      return await query(sql);
    } catch (error) {
      console.log("exception: ", error);
      throw error;
    }
  }
}

//export default EventService;
module.exports = EventService;
