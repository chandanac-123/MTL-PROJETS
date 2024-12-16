import React from "react";
import DownloadButton from "../DownloadButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import DatabaseSelectModal from "./DatabaseSelectModal";

function DatabaseSelectDownload({
  permission,
  checkedIDs,
  sameVendorsCheck,
  state,
  handleDownload,
  setTaskID,
  progress,
  setProgress,
  task_id,
}) {
  return (
    <>
    {task_id ? (
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <ProgressBar
            setTaskID={setTaskID}
            progress={progress}
            setProgress={setProgress}
            task_id={task_id}
            is_list={false}
          />
        </div>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {permission && checkedIDs.length ? (
          <>
            {checkedIDs.length === 1 || sameVendorsCheck() ? (
              <DatabaseSelectModal
                checkedIDs={checkedIDs}
                data={state.data?.results}
              />
            ) : null}
            <DownloadButton
              handleClick={(e) => handleDownload(e)}
              title="Download"
              fmargin_left="0px"
            />
          </>
        ) : null}
      </div>

      
    </>
  );
}

export default DatabaseSelectDownload;
