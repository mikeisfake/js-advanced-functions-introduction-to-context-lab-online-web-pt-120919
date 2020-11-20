function createEmployeeRecord(record) {
    return {firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}


function createEmployeeRecords(employeeData) {
  return employeeData.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(record, time) {
  let [date, hour] = time.split(" ")

  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  })

  return record
}

function createTimeOutEvent(record, time) {
  let [date, hour] = time.split(" ")

  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  })

  return record
}

function hoursWorkedOnDate(record, soughtDate) {
  let inEvent = record.timeInEvents.find( e => e.date === soughtDate)
  let outEvent = record.timeOutEvents.find( e => e.date === soughtDate)

  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(record, soughtDate) {
  let hoursWorked = hoursWorkedOnDate(record, soughtDate)
  return (record.payPerHour * hoursWorked)
}

function allWagesFor(record) {
  let dates = record.timeInEvents.map( e => e.date)
  let payable = dates.reduce( (acc, d) => acc + wagesEarnedOnDate(record, d), 0 )
  return payable
}

function findEmployeeByFirstName(allRecords, firstName) {
  return allRecords.find( r => r.firstName === firstName)
}

function calculatePayroll(allRecords) {
  return allRecords.reduce( (acc, record) => acc + allWagesFor(record), 0 )
}
