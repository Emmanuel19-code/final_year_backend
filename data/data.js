{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "appointment_confirmation",
  "message": "Your appointment with Dr. Smith is confirmed for July 31, 2024, at 10:00 AM.",
  "read": false,
  "data": {
    "appointmentId": "60d5f484f1e1d72d3c8d5e7a",
    "doctorName": "Dr. Smith",
    "appointmentDate": "2024-07-31T10:00:00Z"
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}

{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "appointment_reminder",
  "message": "Reminder: Your appointment with Dr. Smith is tomorrow at 10:00 AM.",
  "read": false,
  "data": {
    "appointmentId": "60d5f484f1e1d72d3c8d5e7a",
    "doctorName": "Dr. Smith",
    "appointmentDate": "2024-07-31T10:00:00Z"
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}
{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "new_prescription",
  "message": "You have a new prescription from Dr. Smith.",
  "read": false,
  "data": {
    "prescriptionId": "60d5f484f1e1d72d3c8d5e7d",
    "doctorName": "Dr. Smith",
    "medications": [
      {
        "name": "Ibuprofen",
        "dosage": "200mg",
        "instructions": "Take one tablet every 4-6 hours as needed for pain."
      }
    ]
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}
{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "test_results_available",
  "message": "Your lab test results are now available.",
  "read": false,
  "data": {
    "testId": "60d5f484f1e1d72d3c8d5e7e",
    "testName": "Blood Test",
    "resultSummary": "Normal"
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}
{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "message_from_doctor",
  "message": "Dr. Smith has sent you a new message: 'Please remember to monitor your blood pressure daily.'",
  "read": false,
  "data": {
    "doctorId": "60d5f484f1e1d72d3c8d5e8c",
    "doctorName": "Dr. Smith",
    "message": "Please remember to monitor your blood pressure daily."
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}
{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "invoice_available",
  "message": "Your invoice for the recent appointment is now available.",
  "read": false,
  "data": {
    "invoiceId": "60d5f484f1e1d72d3c8d5e8d",
    "amount": "$150.00",
    "dueDate": "2024-08-15T00:00:00Z"
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}
{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "profile_update",
  "message": "Your profile information has been updated.",
  "read": false,
  "data": {
    "updatedFields": ["email", "phone number"]
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}
{
  "userId": "60d5f484f1e1d72d3c8d5e7b",
  "type": "system_maintenance",
  "message": "Scheduled system maintenance will occur on August 1, 2024, from 2:00 AM to 4:00 AM.",
  "read": false,
  "data": {
    "startTime": "2024-08-01T02:00:00Z",
    "endTime": "2024-08-01T04:00:00Z"
  },
  "createdAt": "2024-07-30T09:00:00Z",
  "updatedAt": "2024-07-30T09:00:00Z"
}
