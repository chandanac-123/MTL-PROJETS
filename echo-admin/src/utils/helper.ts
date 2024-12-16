import { routes } from "@/constants/routes";
import moment from "moment";

export function getInitialPath() {
  let path = routes.filter((i) => i)[0]?.path;
  return path;
}

// debounce.ts
export function debounce(func: Function) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, 300);
  };
}

//2024-09-03T12:24:11.531Z to 03 Sep 2024, 12:24 PM
export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date
    .toLocaleDateString("en-GB", options)
    .replace("am", "AM")
    .replace("pm", "PM");
};

//decimal point convertion
export const customRound = (value: number): number => {
  const rounded = Math.floor(value * 100) / 100; // Round down to 2 decimals first
  const secondDecimal = Math.floor((value * 1000) % 10); // Get the third decimal to check
  // If the third decimal is greater than 5, add 0.01
  if (secondDecimal > 5) {
    return rounded + 0.01;
  }
  return rounded;
};

//Capitalization
export const capitalizeWords = (str: string) => {
  return str?.replace(/\b\w/g, (char) => char?.toUpperCase());
};

//Moment date comversion with format
export const dateConversion = (val: string | Date, format: string) => {
  return moment(val).format(format);
};

//2024-09-24T18:30:00.000Z to MM/DD/YYYY
export const dateFormat = (date: Date): string => {
  const newDate = new Date(date);
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-indexed
  const day = String(newDate.getDate()).padStart(2, "0");
  const year = newDate.getFullYear();
  return `${month}/${day}/${year}`;
};

//2024-09-03T12:24:11.531Z to 03 Sep 2024
export const formatDateWithoutTime = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

export const currencyFormat = (num: number) => {
  const strNumber = num?.toString();
  if (strNumber?.length < 5) return strNumber;
  else return num?.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
};

export const checkIfTodayTime = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // Difference in milliseconds
  const diffMins = Math.floor(diffMs / (1000 * 60)); // Difference in minutes
  const diffHours = Math.floor(diffMins / 60); // Difference in hours
  // Check if the date is today by comparing year, month, and day
  const isToday = now.toDateString() === date.toDateString();
  if (isToday) {
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ago`;
    }
  }
  // Options for formatting if it's not today
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date?.toLocaleDateString("en-GB", options);
};

export const checkTodayReturnDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const isToday = now.toDateString() === date.toDateString();
  if (isToday) {
    return "Today";
  } else return date.toLocaleDateString("en-GB", options).replace(",", "");
};

export const formatId = (id: string, letter: string): string => {
  const firstFourLetters = id?.slice(-4);
  const formattedId = `${letter}-${firstFourLetters?.toUpperCase()}`;
  return formattedId;
};

export const downloadFile = async (fileUrl: any) => {
  console.log("fileUrl: ", fileUrl);
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob(); // Convert the response to a Blob
    const url = window.URL.createObjectURL(blob); // Create a Blob URL
    const link = document.createElement("a"); // Create a temporary anchor element

    link.href = url;
    link.setAttribute("download", "invoice.pdf"); // Set the desired file name
    document.body.appendChild(link); // Append the anchor to the body
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the anchor element

    // Clean up the Blob URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

//check url or not
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const textBreak = (text: string, length: number): string => {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }
  return text;
};
