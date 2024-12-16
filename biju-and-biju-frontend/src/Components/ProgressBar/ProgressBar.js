import React, { useState, useEffect } from "react";
import {
  database_dwonload_file,
  ws_progress_url,
} from "../../Api/ReportSubmittedApis";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccess } from "../../Slices/authSlice";
import styled from "styled-components";
import { downloadFile } from "../../common/utils";

function ProgressBar(props) {
  const access = JSON.parse(localStorage.getItem("auth")).access;
  // const access = useSelector(selectAccess);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ws_url = ws_progress_url;
    let url = ws_url.replace("https", "wss") + props.task_id;
    // let url = "wss://dev.biju.srv1.mtlstaging.com:8113/ws/progress/" + props.task_id
    const socket = new WebSocket(url);

    socket.addEventListener("message", (event) => {
      async function fetchDownloadAPI() {
        try {
          let url_download = database_dwonload_file + props.task_id;
          const result = await axios.get(url_download, {
            responseType: "blob",
            headers: { Authorization: `Bearer ${access}` },
          });
          if (result.status === 200) {
            // const bytes = new Uint8Array(result.data.length);
            // for (let i = 0; i < result.data.length; i++) {
            //     bytes[i] = result.data.charCodeAt(i);
            // }

            downloadFile(result.data, "database.xlsx");

            props.setProgress(0);
            props.setTaskID("");
          }
        } catch (error) {
          console.log(error);
        }
      }
      const data = JSON.parse(event.data);
      if (data.percentage_complete) {
        props.setProgress(data.percentage_complete.status);
        if (data.percentage_complete.status === "END") {
          fetchDownloadAPI();
          props.setProgress(100);
        }
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <ProgressContainer className="progress-bar" is_list={props.is_list}>
      {/* <div className="progress" style={{ width: `${props.progress}%` }}>{props.progress}</div> */}
      <LinearProgress
        variant="buffer"
        valueBuffer={props.progress}
        value={props.progress}
      />
      {props.progress === 100 ? (
        <p style={{ color: "green" }}>file downloaded successfully</p>
      ) : (
        <p style={{ color: "blue" }}>downloading...</p>
      )}
    </ProgressContainer>
  );
}

export default ProgressBar;

const ProgressContainer = styled.div`
  width: ${({ is_list }) => (is_list ? "34%" : "100%")};
`;
