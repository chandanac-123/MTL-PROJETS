import { routes } from '../Routes/Routes';

export function getMonthName(monthNumber) {
  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return "Invalid month number";
  }
}

export const getBalance = (recievedAmt, rentAmt) => {
  let balance = Number(rentAmt) - Number(recievedAmt)
  return balance
}

export function getFormattedDate(inputDate) {
  const [day1, month1, year1] = inputDate.split('/').map(Number);
  const parsedDate = new Date(year1, month1 - 1, day1);
  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];
  const day = parsedDate.getDate();
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}

export function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search)
  const result = urlParams.get(param);
  return result
}

export function getPermission(type = "Property") {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const data = userData?.data;
  const permissionsArray = data?.permissions;
  let permission = false
  if (permissionsArray?.length) {
    permission = permissionsArray?.includes(type)
  }
  return permission
}

export function getUser() {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  let user = ""
  if (userData?.data) {
    user = userData?.data?.full_name
  }
  return user
}

export function getUserType() {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  let user = ""
  if (userData?.data) {
    user = userData?.data?.user_type
  }
  return user
}

export function getInitialPath() {
  let path = routes.filter((i) => i.menubar == true)[0]?.path
  return path
}

export function getDomainBaseUrl() {
  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);
  const baseDomain = urlObject.port ? `${urlObject.hostname}:${urlObject.port}` : urlObject.hostname;
  return baseDomain
}

export function formatCurrencyIndianStyle(inputNumber, format_no = 13) {
  let numberString = String(inputNumber);
  const [integerPart, decimalPart] = numberString.split('.');
  const formattedIntegerPart = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  if (formattedNumber.length > format_no) {
    return formattedNumber.slice(0, format_no) + '...';
  } else {
    return formattedNumber;
  }
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
