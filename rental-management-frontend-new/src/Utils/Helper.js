import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// 10/11/2023  to 2023/11/10
export function convertDateFormat(inputDate) {
  if (inputDate) {
    const [day, month, year] = inputDate.split('/');
    const outputDate = `${year}-${month}-${day}`;
    return outputDate;
  } else return null
}

// putting the day constant conversion of expired date to non expired date
export function getFormattedDate(val) {
  let currentDate = new Date();
  currentDate.setDate(val);
  if (currentDate < new Date()) {
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  let day = val;
  let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  let year = currentDate.getFullYear();
  let formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

// excel download
export function exportToExcel(download, fileName) {
  console.log('fileName: ', fileName);
  const link = document.createElement('a');
  const url = URL.createObjectURL(download);
  link.href = url;
  link.download = `${fileName}.xlsx`;
  link.click();
}

// date time converter format(DD/MM/YY_HH:mm)
export function dateTimeConverter(value) {
  const currentDate = value;
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedDate = `${day}-${month}-${year}_${hours}:${minutes}`;
  return formattedDate
}

export function currentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

export function dateFormatConvert(value) {
  if (value) {
    const parts = value.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const dateObject = new Date(`${year}-${month}-${day}`);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    const formattedDate = `${day} ${monthNames[dateObject.getMonth()]} ${year}`;
    return formattedDate
  } else return null
}

export const handlePdf = async (name, pdfTitle) => {
  try {
    // const apiResponse = await receiptData;
    const input = document.getElementById(name);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'px', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();
    if (pdfTitle === "balance-sheet") {
      height = 300
    }
    pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    pdf.save(pdfTitle ? pdfTitle : 'investment-receipt.pdf');
    return pdf
  } catch (error) {
    console.error('Error fetching data or generating PDF:', error);
  }
};


export const handlePdf1 = async (name, pdfTitle) => {
  try {
    const input = document.getElementById(name);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    // Create a style element for custom CSS
    const style = document.createElement('style');
    document.head.appendChild(style);
    const styleSheet = style.sheet;

    // Define CSS rules with media queries for different screen sizes
    styleSheet.insertRule(`
      @media (min-width: 600px) {
        body {
          font-size: 12px;
          text-align: left;  /* Adjust text alignment as needed */
          padding: 10px;     /* Adjust padding as needed */
        }
      }
    `, 0);

    styleSheet.insertRule(`
      @media (max-width: 600px) {
        body {
          font-size: 10px;
          text-align: left;  /* Adjust text alignment as needed */
          padding: 5px;      /* Adjust padding as needed */
        }
      }
    `, 1);

    // Set the PDF size dynamically based on the device's screen width
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const pdfWidth = screenWidth > 600 ? 600 : screenWidth; // Adjust the threshold as needed

    // Calculate the aspect ratio of the content
    const contentAspectRatio = canvas.width / canvas.height;

    // Calculate the PDF height based on the aspect ratio and width
    const pdfHeight = pdfWidth / contentAspectRatio;

    // Define page padding
    const pagePadding = 10;

    // Create the PDF with the calculated size
    const pdf = new jsPDF('p', 'px', [pdfWidth + 2 * pagePadding, pdfHeight + 2 * pagePadding]);

    // Calculate the scale factor to fit the content within the PDF dimensions
    const scaleFactor = pdfWidth / canvas.width;

    // Add the image to the PDF with the calculated scale and padding
    pdf.addImage(imgData, 'JPEG', pagePadding, pagePadding, pdfWidth, pdfHeight, undefined, 'FAST', scaleFactor);

    // Save the PDF
    pdf.save(name ? name : 'receipt.pdf');

    // Remove the dynamically created style element
    document.head.removeChild(style);

    return pdf;
  } catch (error) {
    console.error('Error fetching data or generating PDF:', error);
  }
};

export const dateRangeConversion = (date) => {
  if (date?.length > 0) {
    const formattedDates = date?.map(dateObj => {
      const formattedDate = dateObj?.$d.toISOString().split('T')[0];
      return formattedDate;
    });
    return formattedDates;
  }
  else return null
};

export const dateRangeConversion2 = (date) => {
  if (date?.length > 0) {
    const formattedDates = date.map(dateObj => {
      // Extract day, month, and year from dateObj.$d if it exists, or from dateObj directly
      const actualDate = dateObj?.$d || dateObj;
      const day = actualDate.getDate().toString().padStart(2, '0');
      const month = (actualDate.getMonth() + 1).toString().padStart(2, '0');
      const year = actualDate.getFullYear();

      // Construct the date in "YYYY-MM-DD" format
      return `${year}-${month}-${day}`;
    });
    return formattedDates;
  } else {
    return null;
  }
};

export const capitalizeNames = (name) => {
  return name?.split(' ')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
}

// "03/09/2024 14:15" to  "03/09/2024"
export const getDate=(datetimeString) =>{
  const [date] = datetimeString?.split(" ");
  return date;
}
