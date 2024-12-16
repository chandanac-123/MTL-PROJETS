export const downloadFile = (data, fileName) => {
  const blob = new Blob([data], {
    type: "application/octet-stream",
  });
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
};

export const getTatDetailModalStyle = (isMobile) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
});

export const getPageSize = (rowPerPage) =>
  rowPerPage === 30 ? rowPerPage : rowPerPage < 61 ? 60 : 100;
