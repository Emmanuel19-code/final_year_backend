const moment = require("moment"); // for date manipulation
import { AppointmentNotification } from "../utils/MailNotification";



function notifyAppointments() {


  // Get current date
  const currentDate = moment().format("YYYY-MM-DD");

  // Filter appointments that are due today
  const appointmentsDueToday = appointments.filter(
    (appointment) => appointment.date === currentDate
  );

  // Send notifications for appointments due today
  appointmentsDueToday.forEach((appointment) => {
    AppointmentNotification(appointment.user, appointment.details);
  });
}

// Call the function to notify appointments
notifyAppointments();
