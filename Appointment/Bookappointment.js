const nodemailer = require("nodemailer");
const moment = require("moment"); // for date manipulation

// Function to send email notification
async function sendEmailNotification(userEmail, appointmentDetails) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "your_email@example.com", // generated ethereal user
      pass: "your_password_here", // generated ethereal password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Appointment Reminder" <your_email@example.com>', // sender address
    to: userEmail, // list of receivers
    subject: "Appointment Reminder", // Subject line
    text: `Your appointment is due today. Details: ${appointmentDetails}`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

// Function to notify users of upcoming appointments
function notifyAppointments() {
  // Query appointments from the database
  const appointments = [
    {
      user: "user1@example.com",
      date: "2024-04-30",
      details: "Appointment details 1",
    },
    {
      user: "user2@example.com",
      date: "2024-05-01",
      details: "Appointment details 2",
    },
    // More appointments...
  ];

  // Get current date
  const currentDate = moment().format("YYYY-MM-DD");

  // Filter appointments that are due today
  const appointmentsDueToday = appointments.filter(
    (appointment) => appointment.date === currentDate
  );

  // Send notifications for appointments due today
  appointmentsDueToday.forEach((appointment) => {
    sendEmailNotification(appointment.user, appointment.details);
  });
}

// Call the function to notify appointments
notifyAppointments();
