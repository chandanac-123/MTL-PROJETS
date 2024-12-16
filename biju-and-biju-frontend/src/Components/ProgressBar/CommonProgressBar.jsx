import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  position: relative;
  padding-top: 1rem;
  padding: 10px;
`;

const ProgressBarLabel = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  color: #059669; /* Adjust color as needed */
  background-color: #86efac; /* Adjust color as needed */
`;

const ProgressBarPercentage = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  /* color: #059669; */
  color: ${(props) => props.color};
`;

const ProgressBarWrapper = styled.div`
  overflow: hidden;
  height: 0.125rem; /* Adjust height as needed */
  margin-bottom: 0.5rem;
  display: flex;
  border-radius: 0.25rem; /* Adjust border radius as needed */
  background-color: #3b82f6; /* Default color */
`;

const ProgressBarFill = styled.div`
  flex: ${(props) => props.percentage};
  background-color: ${(props) => props.color};
  width: ${(props) => (props.percentage ? props.percentage + "%" : "2%")};
`;

const CommonProgressBar = ({ percentage, msg }) => {
  const getColor = (percentage) => {
    if (percentage >= 75) {
      return "#22C55E";
    } else if (percentage >= 50) {
      return "#3B82F6";
    } else if (percentage >= 25) {
      return "#EAB308";
    }
    return "#EF4444";
  };

  return (
    <ProgressBarContainer>
      <div className="flex mb-2 items-center justify-between">
        {/* <ProgressBarLabel>Progress</ProgressBarLabel> */}
        <ProgressBarPercentage color={getColor(percentage)}>
          {percentage}%
        </ProgressBarPercentage>
      </div>
      <ProgressBarWrapper>
        <ProgressBarFill
          percentage={`${percentage}%`}
          color={getColor(percentage)}
        />
      </ProgressBarWrapper>
      {msg ? <ErrorMsg msg={msg}>{msg}</ErrorMsg> : null}
    </ProgressBarContainer>
  );
};

export default CommonProgressBar;

const ErrorMsg = styled.span`
  color: ${({ msg }) =>
    msg === "You have Uploaded Successfully" ? "green" : "red"};
  font-size: 14px;
`;
