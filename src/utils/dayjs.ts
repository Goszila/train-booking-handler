import dayjs from "dayjs";

// get all friday and saturday dates in the next 3 months function
export function getDates() {
  const dates = [];
  const today = dayjs();
  for (let i = 0; i < 3; i++) {
    const date = today.add(i, "month");
    const friday = date.day(5).format("YYYY-MM-DD");
    const saturday = date.day(6).format("YYYY-MM-DD");
    dates.push(friday, saturday);
  }
  return dates;
}

// convert date to string to DD/MM/YYYY function
export function dateToString(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}