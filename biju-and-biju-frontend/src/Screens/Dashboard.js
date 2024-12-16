import React from "react";
import Heading from "../Components/Heading";
import styled from "styled-components";
import RadioGroups from "../Components/RadioGroups";
import DatePickerItem from "../Components/DatePickerItem";
import TimePickerItem from "../Components/TimePickerItem";
import DashboardBox from "../Components/DashboardBox";
import HorrizontalChart from "../Components/HorrizontalChart";
import VerticalChart from "../Components/VerticalChart";
import { ButtonBase, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { dashboard_api } from "../Api/DashboardApis";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccess } from "../Slices/authSlice";
import { convert_date_format } from "../Functions/utils";
import { useDispatch } from "react-redux";
import { get_dashboard_data } from "../Store/dashboard/DashboardSlice";
import { useMediaQuery } from "react-responsive";
import DashboardMobileBox from "../Components/DashboardMobileBox";

function Dashboard() {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [loading, setLoading] = React.useState(true);
  const [verification_counts, setVerificationCount] = React.useState({});
  const [tat_graph_data, setTatGraphData] = React.useState([]);
  const [pending_graph_data, setPendingGraphData] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      let date = convert_date_format(value);
      let url = dashboard_api;
      if (value) {
        url = dashboard_api + `?filter_date=${date}`;
      }
      dispatch(get_dashboard_data(url))
        .then((res) => {
          // console.log('login res => ',res);
          if (res?.payload?.status === 200) {
            const result = res?.payload;
            setVerificationCount(result.data?.verification_counts);
            const tatInArray = result.data?.tat_graph?.data?.map(
              (item) => item.tat_in
            );
            const tatOutArray = result.data?.tat_graph?.data?.map(
              (item) => item.tat_out
            );
            let tat_data = {
              tat_in_data: tatInArray,
              tat_out_data: tatOutArray,
            };
            setTatGraphData(tat_data);

            const labels = result.data?.pending_graph?.map((obj) => {
              const dateStr = Object.keys(obj)[0];
              const [year, month, day] = dateStr.split("-");
              return `${day}/${month}`;
            });
            const counts = result.data?.pending_graph?.map(
              (obj) => Object.values(obj)[0]
            );
            let pending_datas = {
              labels: labels,
              pending_data: counts,
            };
            setPendingGraphData(pending_datas);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

      // ----------------------------------------
      // try {
      //     let date = convert_date_format(value)
      //     let url = dashboard_api
      //     if(value){
      //         url = dashboard_api + `?filter_date=${date}`
      //     }
      //     const result = await axios.get(url,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             console.log(result);
      //             setVerificationCount(result.data?.verification_counts)
      //             const tatInArray = result.data?.tat_graph?.data?.map(item => item.tat_in);
      //             const tatOutArray = result.data?.tat_graph?.data?.map(item => item.tat_out);
      //             let tat_data = {
      //                 tat_in_data: tatInArray,
      //                 tat_out_data: tatOutArray,
      //             }
      //             setTatGraphData(tat_data)

      //             const labels = result.data?.pending_graph?.map((obj) => {
      //                 const dateStr = Object.keys(obj)[0];
      //                 const [year, month, day] = dateStr.split('-');
      //                 return `${day}/${month}`;
      //             });
      //             const counts = result.data?.pending_graph?.map((obj) => Object.values(obj)[0]);
      //             let pending_datas = {
      //                 labels: labels,
      //                 pending_data: counts,
      //             }
      //             setPendingGraphData(pending_datas)
      //         }
      // } catch (error) {
      //     console.log(error);
      // }
    }
    fetchMyAPI();
  }, [value]);

  const datas = [
    ["For", "Today", "Yesterday", "Monthly"],
    [
      "Verification",
      verification_counts.today_verification_count,
      verification_counts.yesterday_verification_count,
      verification_counts.monthly_verification_count,
    ],
    [
      "Unassigned Verification",
      verification_counts.today_unassign_verification_count,
      verification_counts.yesterday_unassign_verification_count,
      verification_counts.monthly_unassign_verification_count,
    ],
    [
      "Assigned Verification",
      verification_counts.today_assign_verification_count,
      verification_counts.yesterday_assign_verification_count,
      verification_counts.monthly_assign_verification_count,
    ],
    [
      "Report Recieved",
      verification_counts.today_rep_recieved_verification_count,
      verification_counts.yesterday_rep_recieved_verification_count,
      verification_counts.monthly_rep_recieved_verification_count,
    ],
    [
      "Report Submitted",
      verification_counts.today_rep_submitted_verification_count,
      verification_counts.yesterday_rep_submitted_verification_count,
      verification_counts.monthly_rep_submited_verification_count,
    ],
  ];
  const colors = [
    "#37518F",
    "#74B9FF",
    "#0984E3",
    "#00D2D3",
    "#74B9FF",
    "#0984E3",
  ];
  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Container>
        <Heading name="Dashboard" />
        <HeadPart>
          <HeadContentDiv>
            <Title>All Verifications</Title>
          </HeadContentDiv>
          <HeadContentDiv className="flex">
            <div>
              <DatePickerItem value={value} setValue={setValue} />
            </div>
            <div>
              <TimePickerItem />
            </div>
          </HeadContentDiv>
        </HeadPart>
        <FilterContainer isMobileScreen={isMobileScreen}>
          {datas.map((i, index) =>
            isMobileScreen ? (
              <DashboardMobileBox
                key={index}
                data={i}
                index={index}
                color={colors[index]}
              />
            ) : (
              <DashboardBox
                key={index}
                data={i}
                index={index}
                color={colors[index]}
              />
            )
          )}
        </FilterContainer>
        <ChartMainContainer>
          <HorrizontalContainer>
            <ChartHeading>
              <ChartTitle>TAT IN/OUT Verifications</ChartTitle>
              <ChartIcon>
                {/* <img src={require('../Assets/images/chart_icon.png')} /> */}
              </ChartIcon>
            </ChartHeading>
            <HorrizontalChart tat_graph_data={tat_graph_data} />
          </HorrizontalContainer>
          <VerticalContainer>
            <ChartHeading>
              <ChartTitle>Pending more than a day</ChartTitle>
              <ChartIcon>
                {/* <img src={require('../Assets/images/chart_icon.png')} /> */}
              </ChartIcon>
            </ChartHeading>
            <VerticalChart pending_graph_data={pending_graph_data} />
          </VerticalContainer>
        </ChartMainContainer>
      </Container>
    );
  }
}

export default Dashboard;

const Box = styled.div`
  width: 100%;
  height: 80vh;
  /* width: 96%; */
  display: grid;
  place-items: center;
`;

const ChartTitle = styled.span`
  color: #6c6c6c;
  font-size: 18px;
  font-weight: 400;
`;

const ChartIcon = styled.div``;

const ChartHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const HorrizontalContainer = styled.div`
  width: 44.5%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  margin: 15px 0px;
  @media only screen and (max-width: 480px) {
    width: 88% !important;
  }
`;

const VerticalContainer = styled.div`
  width: 44.5%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  margin: 15px 0px;
  @media only screen and (max-width: 480px) {
    width: 88% !important;
  }
`;

const ChartMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
const Container = styled.div`
  padding: 15px;
`;
const HeadPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
const HeadContentDiv = styled.div`
  &.flex {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    width: 32%;
    @media only screen and (max-width: 480px) {
      margin-top: 10px;
      width: 100%;
    }
  }
`;
const Title = styled.span`
  font-size: 18px;
  color: #6c6c6c;
  font-weight: 400;
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobileScreen }) =>
    isMobileScreen ? "column" : "row"};
  gap: ${({ isMobileScreen }) => (isMobileScreen ? "3px" : "")};
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  margin: 15px 0px;
`;
