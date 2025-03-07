import { sendEmail } from "./sendEmail.js";

export const sendOneTimePassword = async ({
  name,
  email,
  verificationToken,
}) => {
  return  await sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACCOUNT VERIFICATION</title>
    <style type="text/css">
         /*base*/
         body{
            margin:0;
            padding:0;
            min-width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 15px;
            line-height: 1.5;
            background-color: #fafafa;
            color:#222222;
        }
        a{
            color:#000;
            text-decoration:none;
        }
        h1{
            font-size: 24px;
            font-weight: 700;
            line-height: 1.25;
            margin-top:0;
            margin-bottom:15px;
            text-align:center;
        }
        p{
            margin-top:0;
            margin-bottom:24px;
        }
        table td{
            vertical-align: top;
        }
        .email-wrapper{
            max-width: 600px;
            margin:0 auto;
        }
        .email-header{
            background-color: #0070f3;
            padding: 24px;
            color:#ffffff;
        }
        .email-footer{
            background-color: #f6f6f6;
            padding: 24px;
        }
        .button{
            display: inline-block;
            background-color: #0070f3;
            color:#ffffff;
            font-size: 16px;
            font-weight: 700;
            text-align:center;
            text-decoration: none;
            padding:12px 24px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-header">
            <h1>Welcome TELEHUB</h1>
        </div>
        <div class="email-body">
            <p>${name},</p>
            <p>
                Thank you for registering on platform.To activate your account,
                Please use the code below
            </p>
            <h2>${verificationToken}</h2>
            <p>Please enter this code in the activation page within the next 10 minutes</p>
            <p>If you did not register with our platform please ignore this mail</p>
        </div>
        <div class="email-footer">
            <p>If you have any question please don't hesistate to contact us at <a href="mailto:emmanueladane52@gmail.com">platform support</a></p>
        </div>
    </div>
</body>
</html>`,
  });
};

export const ResetPasswordToken = ({ name, email, verificationToken }) => {
  return sendEmail({
    to: email,
    subject: "Password Reset",
    html: `<h4>Hello, ${name} </h4>
      This is your password reset token ${verificationToken}
     `,
  });
};

export const AppointmentNotification = ({
  name,
  email,
  doctorname,
  appointmentdate,
  appointmenttime,
  hospitalname,
}) => {
  return sendEmail({
    to: email,
    subject: "Appointment Reminder",
    html: `<h4>Hello, ${name}
         This is a friendly reminder that you have an upcoming appointment 
         scheduled with ${doctorname} at ${hospitalname} on ${appointmentdate} at ${appointmenttime}
         Please arrive 10-15 minutes early to complete any necessary paperwork. If you need to reschedule or have any questions, 
         please don't hesitate to contact us at [Hospital/Clinic Contact Information].
We look forward to seeing you soon!
        `,
  });
};
