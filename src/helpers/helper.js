function getLastDay(dateString) {
  const year = parseInt(dateString.split("-")[0]); // year
  const month = parseInt(dateString.split("-")[1]); // month
  const lastDay = new Date(year, month, 0).getDate();
  return lastDay;
}

function isValid(dateString) {
  const pattern = /^(?:\d{4})-(?:0[1-9]|1[0-2]|[1-9])$/;

  // Check if the input string matches the pattern
  if (!pattern.test(dateString)) {
    return false;
  }

  // Split the string into year and month
  const [year, month] = dateString.split("-").map(Number);
  if (year < 1000 || year > 9999 || month < 1 || month > 12) {
    return false;
  }

  // If all checks pass, the date string is valid
  return true;
}

module.exports = {
  getLastDay,
  isValid,
};
