import dayjs from 'dayjs';
import { routes } from '../Routes/Routes';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getInitialPath() {
  let path = routes.filter((i) => i.menubar == true)[0]?.path;
  return path;
}

export const SuccessToast = ({ message }) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
};

export const ErrorToast = ({ message }) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
};

// 2024-03-01T05:25:05.069Z to 01 Mar 2024
export const dateConversion = (date) => {
  let dateString = date;
  let dateObject = new Date(dateString);
  let day = dateObject.getUTCDate();
  let monthIndex = dateObject.getUTCMonth();
  let year = dateObject.getUTCFullYear();
  let formattedDate = day + ' ' + monthsOfYear[monthIndex] + ' ' + year;
  return formattedDate;
};

//2024-03-06T04:26:07.109Z to Sat,03.06.2024 | 4:30PM
export function formatDate(dateString) {
  const date = new Date(dateString);
  const dateOptions = {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date).replace(/\//g, '.');
  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
  const formattedDateTime = `${formattedDate} | ${formattedTime}`;
  return formattedDateTime
}

//debounce function for delay api call
export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), 500);
  };
};

//2024-03-01T05:25:05.069Z to Tuesday 2 Apr 2024
export const descriptiveDateConversion = (data) => {
  const inputDate = new Date(data);
  const dayOfWeek = daysOfWeek[inputDate.getUTCDay()];
  const dayOfMonth = inputDate.getUTCDate();
  const month = monthsOfYear[inputDate.getUTCMonth()];
  const year = inputDate.getUTCFullYear();
  const formattedDate = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
  return formattedDate;
};

export function splitWordFun(val, format_no = 13) {
  let numberString = String(val);
  const [integerPart, decimalPart] = numberString.split('.');
  const formattedIntegerPart = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
  const formattedNumber = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  if (formattedNumber.length > format_no) {
    return formattedNumber.slice(0, format_no) + '...';
  } else if (val.length > format_no) {
    return val.slice(0, format_no) + '...';
  } else
    return val
}

//2024-03-01T05:25:05.069Z to FRI 09 Feb
export const daysOfWeekConversion = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = ('0' + date.getDate()).slice(-2);
  const monthAbbreviation = monthsOfYear[date.getMonth()];
  const formattedDate = `${dayOfWeek} ${dayOfMonth} ${monthAbbreviation}`;
  return formattedDate;
};

//07:58:00 to  07:58 PM (24 Hr to 12 Hr)
export const timeIn12Hrformat = (time24) => {
  if (!time24) {
    return 'Invalid time';
  }
  let [hours, minutes] = time24.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    return 'Invalid time format';
  }
  let period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  // Padding single-digit hours and minutes with leading zeros
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let time12 = `${hours}:${minutes} ${period}`;
  return time12;
};

//10:28 AM - 5:28 AM (IST) ----> event detail view
export const combineFun = (start, end, type) => {
  if (type) {
    const startTime = timeIn12Hrformat(start);
    const endTime = timeIn12Hrformat(end);
    const combinedTime = `${startTime} - ${endTime} (IST)`;
    return combinedTime;
  } else {
    const combinedSting = `${start} , ${end}`;
    return combinedSting;
  }
};

//2024-03-01T05:25:05.069Z to November 23, 2023
export const fullMonthNameConvert = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const indianNumFormat = (num) => {
  const strNumber = num?.toString();
  if (strNumber?.length < 5) return strNumber;
  else return num?.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
};

//2024-03-01T05:25:05.069Z to 2024-06-21
export const eventEditDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  date.setDate(day + 14);
  const newYear = date.getFullYear();
  const newMonth = date.getMonth() + 1;
  const newDay = date.getDate();
  const formattedMonth = newMonth < 10 ? `0${newMonth}` : newMonth;
  const formattedDay = newDay < 10 ? `0${newDay}` : newDay;
  const formattedDate = `${newYear}-${formattedMonth}-${formattedDay}`;
  return formattedDate
}

export const expiryDate = (datestring) => {
  const dayjsObject = dayjs(new Date(datestring));
  const formattedDate = dayjsObject.format('ddd MMM DD YYYY HH:mm:ss [GMT]Z');
  return formattedDate
}

export const formatNumberToShort = (num) => {
  if (num >= 1000000000) {
    return parseFloat((num / 1000000000).toFixed(1)) + 'B'; // Billion
  } else if (num >= 1000000) {
    return parseFloat((num / 1000000).toFixed(1)) + 'M'; // Million
  } else if (num >= 1000) {
    return parseFloat((num / 1000).toFixed(1)) + 'k'; // Thousand
  } else {
    return num.toString(); // Less than thousand
  }
}

// excel download
export const exportToExcel = (download, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(download);
  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // Convert the workbook to a binary string
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  // Create a Blob from the binary string
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}