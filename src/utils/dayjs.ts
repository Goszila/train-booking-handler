import dayjs from "dayjs";

// get all friday and saturday dates in the next 3 months function
export function getDates(numDays: number[]) {
  const dates = [];
  let currentMonth = dayjs().month() + 1;
  for (let i = currentMonth; currentMonth < i + 3; currentMonth++) {
    dates.push(...getFridaysInMonth(2025, currentMonth));
  }
  return dates;
}

function getFridaysInMonth(year: number, month: number) {
  const fridays = [];
  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = dayjs(`${year}-${month}-${day}`);
    const currentDate = dayjs();
    if ([5, 6].includes(date.day()) && date.isAfter(currentDate)) { // 5 represents Friday
      fridays.push(date.format('YYYY-MM-DD'));
    }
  }

  return fridays;
}

// convert date to string to DD/MM/YYYY function
export function dateToString(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}