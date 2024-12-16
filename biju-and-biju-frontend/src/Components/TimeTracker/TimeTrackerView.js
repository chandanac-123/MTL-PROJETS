import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  convert_date_format,
  GetPermission,
  get_formatted_date,
  get_time_from_date,
  get_values_from_url,
} from "../../Functions/utils";
import DatePickItem from "../Common/DatePickItem";
import CustomDatePicker from "../Common/CustomDatePicker";
import TimeTrackerViewTable from "./TimeTrackerViewTable";
import HidedDatePicker from "../Common/HidedDatePicker";
import dayjs from "dayjs";
import { time_trackers } from "../../Api/TimeTrackerAPIs";
import { useSelector } from "react-redux";
import { selectAccess } from "../../Slices/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { get_data } from "../../Store/common/commonSlice";
import { DEFAULT_PAGE_SIZE } from "../../common/constants";

// time_trackers +
// `?user_id__id=${params.user_id}` +
// `&created_at__date=${date}` +
// `&page=${page}` +
// `&search=${state.searchValue}`;

const getSearchParams = (state, userId, dateValue) => ({
  search: state.searchValue || undefined,
  created_at__date: convert_date_format(new Date(dateValue)),
  user_id__id: userId,
});

function TimeTrackerView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current_date = new Date();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(dayjs(current_date));
  const handleOpen = () => setOpen(true);
  const params = get_values_from_url(window.location.search);
  // const permission = GetPermission("time_tracker","change")
  const user_id = 16;
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [state, setState] = useState({
    data: [],
    refresh: true,
    searchValue: "",
  });

  useEffect(() => {
    // const date = ""
    const date = convert_date_format(new Date(value));
    async function fetchMyAPI() {
      let url =
        time_trackers +
        `?user_id__id=${params.user_id}` +
        `&created_at__date=${date}` +
        `&page=${page}` +
        `&search=${state.searchValue}`;
      dispatch(get_data(url))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                data: result.data,
                refresh: false,
              };
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setState((prevState) => {
            return {
              ...prevState,
              refresh: false,
            };
          });
        });

      // try {
      //     let url = time_trackers + `?user_id__id=${params.user_id}` + `&created_at__date=${date}` + `&page=${page}` + `&search=${state.searchValue}`
      //     const result = await axios.get(url,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     data: result.data,
      //                     refresh: false
      //                 }
      //             })
      //             setLoading(false)
      //         }
      // } catch (error) {
      //     setState((prevState)=> {
      //       return {
      //           ...prevState,
      //           refresh: false
      //       }
      //     })
      // }
    }
    if (params.user_id) {
      fetchMyAPI();
    }
  }, [value, page]);
  const handleArrows = (e) => {
    if (e.target.id === "add") {
      setValue((date) => date.add(1, "day"));
    } else if (e.target.id === "sub") {
      setValue((date) => date.add(-1, "day"));
    }
  };
  return (
    <Container>
      <HeaderContainer>
        <HeaderTop>
          <BackIcon onClick={() => navigate(-1)}>
            <IconImg src={require("../../Assets/images/back_arrow.png")} />
          </BackIcon>
          <Heading name={params.name} />
        </HeaderTop>
        <HeaderBottom>
          <IconDiv id="sub" onClick={(e) => handleArrows(e)}>
            <IconImg
              src={require("../../Assets/images/left_arrow.png")}
              id="sub"
            />
          </IconDiv>
          <IconDiv className="date" onClick={() => setOpen(!open)}>
            <IconImg src={require("../../Assets/images/date_icon.png")} />
          </IconDiv>
          {/* <IconDiv className='bottom'>
                    <IconImg src={require('../../Assets/images/bottom_arrow.png')} />
                </IconDiv> */}
          <IconDiv id="add" onClick={(e) => handleArrows(e)}>
            <IconImg
              src={require("../../Assets/images/right_arrow.png")}
              id="add"
            />
          </IconDiv>
          <HidedDatePicker
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
          />
          <FormattedDate>{get_formatted_date(value)}</FormattedDate>
        </HeaderBottom>
      </HeaderContainer>

      <TimeTrackerViewTable
        data={state.data}
        setState={setState}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsperpage={rowsperpage}
        value={value}
        searchParams={getSearchParams(state, params.user_id, value)}
      />
    </Container>
  );
}

export default TimeTrackerView;

const FormattedDate = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #132756;
`;

const HeaderContainer = styled.div`
  margin-bottom: 30px;
`;

const Container = styled.div`
  padding: 15px;
`;
const BackIcon = styled.div`
  margin-right: 40px;
  height: 18px;
  width: 13px;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;
const HeaderTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
`;
const HeaderBottom = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 25px;
`;

const IconDiv = styled.div`
  border: 0.5px solid #444445;
  border-radius: 4px;
  padding: 10px;
  margin-right: 12px;
  width: 20px;
  height: 15px;
  cursor: pointer;
  &.bottom {
    padding: 8px 12px;
    width: 15px;
    height: 20px;
  }
  &.date {
    background-color: #001b54;
  }
`;
