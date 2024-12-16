import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { product_api } from "../../Api/UserApis";
import { vendor_dropdown } from "../../Api/VerificationApis";
import ButtonItem from "../ButtonItem";
import CustomCheckBox from "../Common/CustomCheckBox";
import RedStarItem from "../Common/RedStarItem";
import TextFieldItem from "../Common/TextFieldItem";
import TimePickItem from "../Common/TimePickItem";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import VendorListSelect from "../Common/VendorListSelect";
import { location_dropdown, district_dropdown } from "../../Api/DropDownApis";
import RadioGroups from "../RadioGroups";
import { get_time_from_date, timeFun } from "../../Functions/utils";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import SelectFieldAndDownloadModal from "../Admin/SelectFieldAndDownloadModal";
import { useDispatch } from "react-redux";
import { get_data, post_data, put_data } from "../../Store/common/commonSlice";

function AddProductModalForm(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const access = useSelector(selectAccess);
  var now = dayjs();
  const hourse = now?.$H;
  const minutes = now?.$m;
  const [state, setState] = useState({
    product: "",
    product_code: "",
    vendor: "",
    tat_hours: now,
    fi_service_start_time: now,
    fi_service_end_time: now,
    cut_off_time: now,
    local_distance: "",
    ocl_distance_1: "",
    ocl_distance_2: "",
    ocl_distance_3: "",
    local_rate: "",
    ocl_rate_1: "",
    ocl_rate_2: "",
    ocl_rate_3: "",
    ogl_rate: "",
    ogl_rate1: "",
    ogl_rate2: "",
    ogl_rate3: "",
    local_rate_per_visit: "",
    ocl_rate_per_visit: "",
    ogl_rate_per_visit: "",
    pd_rate: "",
    billing_location: [],
    credit_manager_name: "",
    credit_manager_contactno: "",
    credit_manager_emailid: "",
    reported_by_rate: "",
    coordinated_by_rate: "",
    allocated_by_rate: "",
    written_by_rate: "",
    formErrors: {},
    vendor_list: [],
    billing_locations: [],
    status: true,
    id: "",
    ogl_distance_1: "",
    ogl_distance_2: "",
    ogl_distance_3: "",
    additional_remarks: {},
    remark1: "",
    remark2: "",
    remark3: "",
    districts: [],
    district: [],
    selected_fields: {},
  });

  useEffect(() => {
    const time = `${hourse}:${minutes}`;
    setState((prevState) => {
      return {
        ...prevState,
        fi_initiated_time: time,
      };
    });
  }, []);

  useEffect(() => {
    if (props.is_edit) {
      setState((prevState) => {
        return {
          ...prevState,
          product: props.instance.product_name,
          product_code: props.instance.product_code,
          local_distance: props.instance.local_distance,
          ocl_distance_1: props.instance.ocl_distance_1,
          ocl_distance_2: props.instance.ocl_distance_2,
          ocl_distance_3: props.instance.ocl_distance_3,
          ogl_rate1: props.instance.ogl_rate_1,
          ogl_rate: props.instance.ogl_rate,
          ogl_rate2: props.instance.ogl_rate_2,
          ogl_rate3: props.instance.ogl_rate_3,
          pd_rate: props.instance.pd_rate,
          credit_manager_name: props.instance.credit_card_manager,
          credit_manager_emailid: props.instance.credit_card_manager_email,
          credit_manager_contactno: props.instance.credit_card_manager_phone,
          reported_by_rate: props.instance.reported_by_rate,
          coordinated_by_rate: props.instance.coordinated_by_rate,
          allocated_by_rate: props.instance.allocated_by_rate,
          written_by_rate: props.instance.written_by_rate,
          remark1: props.instance.additional_remarks.key1,
          remark2: props.instance.additional_remarks.key2,
          remark3: props.instance.additional_remarks.key3,
          vendor: props.instance.vendor,
          fi_service_end_time: get_time_from_date(
            props.instance.fi_service_end_time
          ),
          fi_service_start_time: get_time_from_date(
            props.instance.fi_service_start_time
          ),
          tat_hours: get_time_from_date(props.instance.tat_hours),
          cut_off_time: get_time_from_date(props.instance.cut_off_time),
          id: props.instance.id,
          ogl_distance_1: props.instance.ogl_distance_1,
          ogl_distance_2: props.instance.ogl_distance_2,
          ogl_distance_3: props.instance.ogl_distance_3,
          status: props.instance.status,
          billing_location: props.instance.billing_location,
          district: props.instance.districts,
          local_rate: props.instance.local_rate,
          ocl_rate_1: props.instance.ocl_rate_1,
          ocl_rate_2: props.instance.ocl_rate_2,
          ocl_rate_3: props.instance.ocl_rate_3,
          selected_fields: props.instance.selected_fields,
        };
      });
      setLoading(false);
    }
  }, [props.is_edit]);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(vendor_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                vendor_list: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //   const result = await axios.get(vendor_dropdown, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         vendor_list: result.data,
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

      dispatch(get_data(location_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const billing_result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                billing_locations: billing_result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //   const billing_result = await axios.get(location_dropdown, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (billing_result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         billing_locations: billing_result.data,
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

      dispatch(get_data(district_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                districts: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //   const result = await axios.get(district_dropdown, {
      //     headers: { Authorization: `Bearer ${access}` },
      //   });
      //   if (result.status === 200) {
      //     setState((prevState) => {
      //       return {
      //         ...prevState,
      //         districts: result.data,
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
      setLoading(false);
    }
    fetchMyAPI();
  }, []);

  const handleCheckBox = (value) => {
    let billing_locations = state.billing_location;
    if (value === "all") {
      if (
        state?.billing_locations?.length === state?.billing_location?.length
      ) {
        billing_locations = [];
      } else {
        billing_locations = state?.billing_locations?.map((item) => item.id);
      }
    } else {
      if (billing_locations.includes(value)) {
        billing_locations = billing_locations.filter((i) => i !== value);
      } else {
        billing_locations.push(value);
      }
    }
    let formErrors = state.formErrors;
    formErrors["billing_location"] = false;
    setState((prevState) => {
      return {
        ...prevState,
        billing_location: billing_locations,
        formErrors,
      };
    });
  };

  const handleDistrictCheckBox = (value) => {
    let districts = state.district;
    if (value === "all") {
      if (state?.districts?.length === state?.district?.length) {
        districts = [];
      } else {
        districts = state?.districts?.map((item) => item.id);
      }
    } else {
      if (districts.includes(value)) {
        districts = districts.filter((i) => i !== value);
      } else {
        districts.push(value);
      }
    }

    setState((prevState) => {
      return {
        ...prevState,
        district: districts,
      };
    });
  };

  const handleSelectChange = (value, name) => {
    let formErrors = state.formErrors;
    formErrors[name] = false;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = state.formErrors;
    formErrors[name] = false;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        formErrors,
      };
    });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.product) {
      formErrors["product"] = true;
      validation = false;
    }
    if (!state.product_code) {
      formErrors["product_code"] = true;
      validation = false;
    }
    if (!state.vendor) {
      formErrors["vendor"] = true;
      validation = false;
    }
    if (!state.tat_hours) {
      formErrors["tat_hours"] = true;
      validation = false;
    }
    if (!state.fi_service_start_time) {
      formErrors["fi_service_start_time"] = true;
      validation = false;
    }
    if (!state.fi_service_end_time) {
      formErrors["fi_service_end_time"] = true;
      validation = false;
    }
    if (!state.cut_off_time) {
      formErrors["cut_off_time"] = true;
      validation = false;
    }
    if (
      (!state.ogl_distance_1 && state.ogl_rate1 && state.ogl_rate1 != 0) ||
      (state.ogl_distance_1 == 0 && state.ogl_rate1 > 0)
    ) {
      formErrors["ogl_distance_1"] = true;
      validation = false;
    }
    if (
      (!state.ogl_distance_2 && state.ogl_rate2 && state.ogl_rate2 != 0) ||
      (state.ogl_distance_2 == 0 && state.ogl_rate2 > 0)
    ) {
      formErrors["ogl_distance_2"] = true;
      validation = false;
    }
    if (
      (!state.ogl_distance_3 && state.ogl_rate3 && state.ogl_rate3 != 0) ||
      (state.ogl_distance_3 == 0 && state.ogl_rate3 > 0)
    ) {
      formErrors["ogl_distance_3"] = true;
      validation = false;
    }
    if (!state.local_distance) {
      formErrors["local_distance"] = true;
      validation = false;
    }
    if (
      (!state.ocl_distance_1 && state.ocl_rate_1 && state.ocl_rate_1 != 0) ||
      (state.ocl_distance_1 == 0 && state.ocl_rate_1 > 0)
    ) {
      formErrors["ocl_distance_1"] = true;
      validation = false;
    }
    if (
      (!state.ocl_distance_2 && state.ocl_rate_2 && state.ocl_rate_2 != 0) ||
      (state.ocl_distance_2 == 0 && state.ocl_rate_2 > 0)
    ) {
      formErrors["ocl_distance_2"] = true;
      validation = false;
    }
    if (
      (!state.ocl_distance_3 && state.ocl_rate_3 && state.ocl_rate_3 != 0) ||
      (state.ocl_distance_3 == 0 && state.ocl_rate_3 > 0)
    ) {
      formErrors["ocl_distance_3"] = true;
      validation = false;
    }
    // if (!state.pd_rate) {
    //   formErrors["pd_rate"] = true;
    //   validation = false;
    // }
    if (!state.billing_location.length) {
      formErrors["billing_location"] = true;
      validation = false;
    }
    if (!state.local_rate) {
      formErrors["local_rate"] = true;
      validation = false;
    }
    if (
      (!state.ocl_rate_1 &&
        state.ocl_distance_1 &&
        state.ocl_distance_1 != 0) ||
      (state.ocl_rate_1 == 0 && state.ocl_distance_1 > 0)
    ) {
      formErrors["ocl_rate_1"] = true;
      validation = false;
    }
    console.log(state.ocl_rate_2);
    console.log(state.ocl_distance_2);
    if (
      (!state.ocl_rate_2 &&
        state.ocl_distance_2 &&
        state.ocl_distance_2 != 0) ||
      (state.ocl_rate_2 == 0 && state.ocl_distance_2 > 0)
    ) {
      formErrors["ocl_rate_2"] = true;
      validation = false;
      console.log("enterrrrr");
    }
    if (
      (!state.ocl_rate_3 &&
        state.ocl_distance_3 &&
        state.ocl_distance_3 != 0) ||
      (state.ocl_rate_3 == 0 && state.ocl_distance_3 > 0)
    ) {
      formErrors["ocl_rate_3"] = true;
      validation = false;
    }
    if (
      (!state.ogl_rate1 && state.ogl_distance_1 && state.ogl_distance_1 != 0) ||
      (state.ogl_rate1 == 0 && state.ogl_distance_1 > 0)
    ) {
      formErrors["ogl_rate1"] = true;
      validation = false;
    }
    if (
      (!state.ogl_rate2 && state.ogl_distance_2 && state.ogl_distance_2 != 0) ||
      (state.ogl_rate2 == 0 && state.ogl_distance_2 > 0)
    ) {
      formErrors["ogl_rate2"] = true;
      validation = false;
    }
    if (
      (!state.ogl_rate3 && state.ogl_distance_3 && state.ogl_distance_3 != 0) ||
      (state.ogl_rate3 == 0 && state.ogl_distance_3 > 0)
    ) {
      formErrors["ogl_rate3"] = true;
      validation = false;
    }
    // if (!state.written_by_rate) {
    //   formErrors["written_by_rate"] = true;
    //   validation = false;
    // }
    // if (!state.allocated_by_rate) {
    //   formErrors["allocated_by_rate"] = true;
    //   validation = false;
    // }
    // if (!state.coordinated_by_rate) {
    //   formErrors["coordinated_by_rate"] = true;
    //   validation = false;
    // }
    // if (!state.reported_by_rate) {
    //   formErrors["reported_by_rate"] = true;
    //   validation = false;
    // }
    setState((prevState) => {
      return {
        ...prevState,
        formErrors,
      };
    });
    return validation;
  };

  const handleRadioChange = (value, name) => {
    let formErrors = state.formErrors;
    formErrors[name] = false;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    let validation = ValidationForm();
    if (validation) {
      if (props.is_edit) {
        setSubmitLoading(true);
        let param = {
          values: {
            product_name: state.product,
            product_code: state.product_code,
            fi_service_start_time:
              state.fi_service_start_time == now
                ? timeFun(now)
                : timeFun(state.fi_service_start_time),
            fi_service_end_time:
              state.fi_service_end_time == now
                ? timeFun(now)
                : timeFun(state.fi_service_end_time),
            cut_off_time:
              state.cut_off_time == now
                ? timeFun(now)
                : timeFun(state.cut_off_time),
            tat_hours:
              state.tat_hours == now ? timeFun(now) : timeFun(state.tat_hours),
            local_distance: state.local_distance,
            ocl_distance_1: state.ocl_distance_1 ? state.ocl_distance_1 : 0,
            ocl_distance_2: state.ocl_distance_2 ? state.ocl_distance_2 : 0,
            ocl_distance_3: state.ocl_distance_3 ? state.ocl_distance_3 : 0,
            ogl_distance_1: state.ogl_distance_1 ? state.ogl_distance_1 : 0,
            ogl_distance_2: state.ogl_distance_2 ? state.ogl_distance_2 : 0,
            ogl_distance_3: state.ogl_distance_3 ? state.ogl_distance_3 : 0,
            local_rate: state.local_rate,
            ocl_rate_1: state.ocl_rate_1 ? state.ocl_rate_1 : 0,
            ocl_rate_2: state.ocl_rate_2 ? state.ocl_rate_2 : 0,
            ocl_rate_3: state.ocl_rate_3 ? state.ocl_rate_3 : 0,
            ogl_rate: state.ogl_rate ? state.ogl_rate : 0,
            ogl_rate_1: state.ogl_rate1 ? state.ogl_rate1 : 0,
            ogl_rate_2: state.ogl_rate2 ? state.ogl_rate2 : 0,
            ogl_rate_3: state.ogl_rate3 ? state.ogl_rate3 : 0,
            pd_rate: state.pd_rate ? state.pd_rate : 0,
            credit_card_manager: state.credit_manager_name,
            credit_card_manager_phone: state.credit_manager_contactno,
            credit_card_manager_email: state.credit_manager_emailid,
            written_by_rate: state.written_by_rate,
            reported_by_rate: state.reported_by_rate,
            allocated_by_rate: state.allocated_by_rate,
            coordinated_by_rate: state.coordinated_by_rate,
            status: state.status,
            billing_location: state.billing_location,
            vendor: state.vendor,
            additional_remarks: {
              key1: state.remark1,
              key2: state.remark2,
              key3: state.remark3,
            },
            districts: state.district,
            selected_fields: state.selected_fields,
          },
          url: product_api + state.id + "/",
        };

        dispatch(put_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 200) {
              handleClose();
              alertSuccessFun("Product Updated Successfully");
              setSubmitLoading(false);
            } else if (result?.status === 400 && result?.data?.error) {
              alertErrorFun(result?.data?.error);
              setSubmitLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setSubmitLoading(false);
            alertErrorFun(
              error?.response?.data?.error ||
                (error?.response?.data?.product_code &&
                  error?.response?.data?.product_code[0]) ||
                (error?.response?.data?.local_rate &&
                  error?.response?.data?.local_rate[0])
            );
          });

        // try {
        //   setSubmitLoading(true)
        //   const result = await axios.put(
        //     product_api + state.id + "/",
        //     {
        //       product_name: state.product,
        //       product_code: state.product_code,
        //       fi_service_start_time: state.fi_service_start_time==now?timeFun(now):timeFun(state.fi_service_start_time),
        //       fi_service_end_time:  state.fi_service_end_time==now?timeFun(now):timeFun(state.fi_service_end_time),
        //       cut_off_time: state.cut_off_time==now?timeFun(now):timeFun(state.cut_off_time),
        //       tat_hours: state.tat_hours==now?timeFun(now):timeFun(state.tat_hours),
        //       local_distance: state.local_distance,
        //       ocl_distance_1: state.ocl_distance_1 ? state.ocl_distance_1 : 0,
        //       ocl_distance_2: state.ocl_distance_2 ? state.ocl_distance_2 : 0,
        //       ocl_distance_3: state.ocl_distance_3 ? state.ocl_distance_3 : 0,
        //       ogl_distance_1: state.ogl_distance_1 ? state.ogl_distance_1 : 0,
        //       ogl_distance_2: state.ogl_distance_2 ? state.ogl_distance_2 : 0,
        //       ogl_distance_3: state.ogl_distance_3 ? state.ogl_distance_3 : 0,
        //       local_rate: state.local_rate,
        //       ocl_rate_1: state.ocl_rate_1 ? state.ocl_rate_1 : 0,
        //       ocl_rate_2: state.ocl_rate_2 ? state.ocl_rate_2 : 0,
        //       ocl_rate_3: state.ocl_rate_3 ? state.ocl_rate_3 : 0,
        //       ogl_rate: state.ogl_rate ? state.ogl_rate : 0,
        //       ogl_rate_1: state.ogl_rate1 ? state.ogl_rate1 : 0,
        //       ogl_rate_2: state.ogl_rate2 ? state.ogl_rate2 : 0,
        //       ogl_rate_3: state.ogl_rate3 ? state.ogl_rate3 : 0,
        //       pd_rate: state.pd_rate ? state.pd_rate : 0,
        //       credit_card_manager: state.credit_manager_name,
        //       credit_card_manager_phone: state.credit_manager_contactno,
        //       credit_card_manager_email: state.credit_manager_emailid,
        //       written_by_rate: state.written_by_rate,
        //       reported_by_rate: state.reported_by_rate,
        //       allocated_by_rate: state.allocated_by_rate,
        //       coordinated_by_rate: state.coordinated_by_rate,
        //       status: state.status,
        //       billing_location: state.billing_location,
        //       vendor: state.vendor,
        //       additional_remarks: {
        //         key1: state.remark1,
        //         key2: state.remark2,
        //         key3: state.remark3,
        //       },
        //       districts: state.district,
        //       selected_fields: state.selected_fields,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );
        //   if (result.status === 200) {
        //     handleClose();
        //     alertSuccessFun("Product Updated Successfully");
        //     setSubmitLoading(false)
        //   }
        // } catch (error) {
        //   console.log(error);
        //   setSubmitLoading(false)
        //   alertErrorFun(
        //     error?.response?.data?.error || (error?.response?.data?.product_code && error?.response?.data?.product_code[0]) || (error?.response?.data?.local_rate && error?.response?.data?.local_rate[0])
        //   );
        // }
      } else {
        setSubmitLoading(true);
        let param = {
          values: {
            product_name: state.product,
            product_code: state.product_code,
            fi_service_start_time:
              state.fi_service_start_time == now
                ? timeFun(now)
                : timeFun(state.fi_service_start_time),
            fi_service_end_time:
              state.fi_service_end_time == now
                ? timeFun(now)
                : timeFun(state.fi_service_end_time),
            cut_off_time:
              state.cut_off_time == now
                ? timeFun(now)
                : timeFun(state.cut_off_time),
            tat_hours:
              state.tat_hours == now ? timeFun(now) : timeFun(state.tat_hours),
            local_distance: state.local_distance,
            ocl_distance_1: state.ocl_distance_1 ? state.ocl_distance_1 : 0,
            ocl_distance_2: state.ocl_distance_2 ? state.ocl_distance_2 : 0,
            ocl_distance_3: state.ocl_distance_3 ? state.ocl_distance_3 : 0,
            ogl_distance_1: state.ogl_distance_1 ? state.ogl_distance_1 : 0,
            ogl_distance_2: state.ogl_distance_2 ? state.ogl_distance_2 : 0,
            ogl_distance_3: state.ogl_distance_3 ? state.ogl_distance_3 : 0,
            local_rate: state.local_rate,
            ocl_rate_1: state.ocl_rate_1 ? state.ocl_rate_1 : 0,
            ocl_rate_2: state.ocl_rate_2 ? state.ocl_rate_2 : 0,
            ocl_rate_3: state.ocl_rate_3 ? state.ocl_rate_3 : 0,
            ogl_rate: state.ogl_rate ? state.ogl_rate : 0,
            ogl_rate_1: state.ogl_rate1 ? state.ogl_rate1 : 0,
            ogl_rate_2: state.ogl_rate2 ? state.ogl_rate2 : 0,
            ogl_rate_3: state.ogl_rate3 ? state.ogl_rate3 : 0,
            pd_rate: state.pd_rate ? state.pd_rate : 0,
            credit_card_manager: state.credit_manager_name,
            credit_card_manager_phone: state.credit_manager_contactno,
            credit_card_manager_email: state.credit_manager_emailid,
            written_by_rate: state.written_by_rate,
            reported_by_rate: state.reported_by_rate,
            allocated_by_rate: state.allocated_by_rate,
            coordinated_by_rate: state.coordinated_by_rate,
            status: state.status,
            billing_location: state.billing_location,
            vendor: state.vendor,
            additional_remarks: {
              key1: state.remark1,
              key2: state.remark2,
              key3: state.remark3,
            },
            districts: state.district,
            selected_fields: state.selected_fields,
          },
          url: product_api,
        };

        dispatch(post_data(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 201) {
              handleClose();
              alertSuccessFun("Product Added Successfully");
              setSubmitLoading(false);
            } else if (result?.status === 400 && result?.data?.error) {
              alertErrorFun(result?.data?.error);
              setSubmitLoading(false);
            }
          })
          .catch((error) => {
            console.log(error, "error");
            let rateError = "";
            if (error?.response?.data?.local_rate) {
              rateError = "Local Rate Should not exceed 4 digits";
            } else if (error?.response?.data?.ocl_rate_1) {
              rateError = "OCL Rate 1 Should not exceed 4 digits";
            } else if (error?.response?.data?.ocl_rate_2) {
              rateError = "OCL Rate 2 Should not exceed 4 digits";
            } else if (error?.response?.data?.ocl_rate_3) {
              rateError = "OCL Rate 3 Should not exceed 4 digits";
            } else if (error?.response?.data?.ogl_rate_1) {
              rateError = "OGL Rate 1 Should not exceed 4 digits";
            } else if (error?.response?.data?.ogl_rate_2) {
              rateError = "OGL Rate 2 Should not exceed 4 digits";
            } else if (error?.response?.data?.ogl_rate_3) {
              rateError = "OGL Rate 3 Should not exceed 4 digits";
            } else if (error?.response?.data?.pd_rate) {
              rateError = "PD Rate Should not exceed 4 digits";
            }
            alertErrorFun(
              error?.response?.data?.error ||
                (error?.response?.data?.product_code &&
                  error?.response?.data?.product_code[0]) ||
                rateError
            );
            setSubmitLoading(false);
          });

        // try {
        //   setSubmitLoading(true)
        //   const result = await axios.post(
        //     product_api,
        //     {
        //       product_name: state.product,
        //       product_code: state.product_code,
        //       fi_service_start_time: state.fi_service_start_time==now?timeFun(now):timeFun(state.fi_service_start_time),
        //       fi_service_end_time:  state.fi_service_end_time==now?timeFun(now):timeFun(state.fi_service_end_time),
        //       cut_off_time: state.cut_off_time==now?timeFun(now):timeFun(state.cut_off_time),
        //       tat_hours: state.tat_hours==now?timeFun(now):timeFun(state.tat_hours),
        //       local_distance: state.local_distance,
        //       ocl_distance_1: state.ocl_distance_1 ? state.ocl_distance_1 : 0,
        //       ocl_distance_2: state.ocl_distance_2 ? state.ocl_distance_2 : 0,
        //       ocl_distance_3: state.ocl_distance_3 ? state.ocl_distance_3 : 0,
        //       ogl_distance_1: state.ogl_distance_1 ? state.ogl_distance_1 : 0,
        //       ogl_distance_2: state.ogl_distance_2 ? state.ogl_distance_2 : 0,
        //       ogl_distance_3: state.ogl_distance_3 ? state.ogl_distance_3 : 0,
        //       local_rate: state.local_rate,
        //       ocl_rate_1: state.ocl_rate_1 ? state.ocl_rate_1 : 0,
        //       ocl_rate_2: state.ocl_rate_2 ? state.ocl_rate_2 : 0,
        //       ocl_rate_3: state.ocl_rate_3 ? state.ocl_rate_3 : 0,
        //       ogl_rate: state.ogl_rate ? state.ogl_rate : 0,
        //       ogl_rate_1: state.ogl_rate1 ? state.ogl_rate1 : 0,
        //       ogl_rate_2: state.ogl_rate2 ? state.ogl_rate2 : 0,
        //       ogl_rate_3: state.ogl_rate3 ? state.ogl_rate3 : 0,
        //       pd_rate: state.pd_rate ? state.pd_rate : 0,
        //       credit_card_manager: state.credit_manager_name,
        //       credit_card_manager_phone: state.credit_manager_contactno,
        //       credit_card_manager_email: state.credit_manager_emailid,
        //       written_by_rate: state.written_by_rate,
        //       reported_by_rate: state.reported_by_rate,
        //       allocated_by_rate: state.allocated_by_rate,
        //       coordinated_by_rate: state.coordinated_by_rate,
        //       status: state.status,
        //       billing_location: state.billing_location,
        //       vendor: state.vendor,
        //       additional_remarks: {
        //         key1: state.remark1,
        //         key2: state.remark2,
        //         key3: state.remark3,
        //       },
        //       districts: state.district,
        //       selected_fields: state.selected_fields,
        //     },
        //     { headers: { Authorization: `Bearer ${access}` } }
        //   );
        //   if (result.status === 201) {
        //     handleClose();
        //     alertSuccessFun("Product Added Successfully");
        //     setSubmitLoading(false)
        //   }
        // } catch (error) {
        //   console.log(error);
        //   let rateError = ""
        //   if(error?.response?.data?.local_rate){
        //     rateError = "Local Rate Should not exceed 4 digits"
        //   }else if(error?.response?.data?.ocl_rate_1){
        //     rateError = "OCL Rate 1 Should not exceed 4 digits"
        //   }else if(error?.response?.data?.ocl_rate_2){
        //     rateError = "OCL Rate 2 Should not exceed 4 digits"
        //   }else if(error?.response?.data?.ocl_rate_3){
        //     rateError = "OCL Rate 3 Should not exceed 4 digits"
        //   }else if(error?.response?.data?.ogl_rate_1){
        //     rateError = "OGL Rate 1 Should not exceed 4 digits"
        //   }else if(error?.response?.data?.ogl_rate_2){
        //     rateError = "OGL Rate 2 Should not exceed 4 digits"
        //   }else if(error?.response?.data?.ogl_rate_3){
        //     rateError = "OGL Rate 3 Should not exceed 4 digits"
        //   }else if(error?.response?.data?.pd_rate){
        //     rateError = "PD Rate Should not exceed 4 digits"
        //   }
        //   alertErrorFun(
        //     error?.response?.data?.error || (error?.response?.data?.product_code && error?.response?.data?.product_code[0]) || rateError
        //   );
        //   setSubmitLoading(false)
        // }
      }
      props.setState((prevState) => {
        return {
          ...prevState,
          refresh: true,
        };
      });
    }
  };

  const alertSuccessFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "success",
      message: msg,
    });
  };

  const alertErrorFun = (msg) => {
    props.setSnackbarStatus({ isOpen: true, severity: "error", message: msg });
  };

  let status_datas = [
    {
      name: true,
      label: "Active",
    },
    {
      name: false,
      label: "Inactive",
    },
  ];

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <FormContainer>
        <HeadSection>
          {props.is_edit ? (
            <Title>Edit Product</Title>
          ) : (
            <Title>Add New Product</Title>
          )}
        </HeadSection>
        <FormSection>
          <ItemRow>
            <LabelSection>
              <Label>
                Product
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                width="377px"
                required={state.formErrors.product}
                textField="Text"
                handleChange={handleChange}
                name="product"
                value={state.product}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Product Code
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                width="377px"
                required={state.formErrors.product_code}
                textField="Text"
                handleChange={handleChange}
                name="product_code"
                value={state.product_code}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Select Vendor
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <VendorListSelect
                datas={state.vendor_list}
                required={state.formErrors.vendor}
                handleChange={handleSelectChange}
                name="vendor"
                value={state.vendor}
                default="Select"
                fpadding="9.5px 14px"
                fsize="12px"
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                TAT Time
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TimePickItem
                key={1}
                required={state.formErrors.tat_hours}
                handleChange={handleSelectChange}
                name="tat_hours"
                value={state.tat_hours}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                FI Service Time
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection className="service-time">
              <TimePickItem
                key={2}
                mr="25px"
                required={state.formErrors.fi_service_start_time}
                handleChange={handleSelectChange}
                name="fi_service_start_time"
                value={state.fi_service_start_time}
                placeholder="Start Time"
              />
              <TimePickItem
                key={3}
                required={state.formErrors.fi_service_end_time}
                handleChange={handleSelectChange}
                name="fi_service_end_time"
                value={
                  state.fi_service_end_time ? state.fi_service_end_time : ""
                }
                placeholder="End Time"
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                FI Cut Off Time
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TimePickItem
                key={4}
                required={state.formErrors.cut_off_time}
                handleChange={handleSelectChange}
                name="cut_off_time"
                value={state.cut_off_time ? state.cut_off_time : ""}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Status <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <RadioGroups
                fsize="12px"
                fweight="400"
                mr="20px"
                ssize="20px"
                datas={status_datas}
                handleChange={handleRadioChange}
                value={state.status}
                name="status"
                ml="0px"
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Local <br /> (Distance) <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.local_distance}
                width="377px"
                textField="DistanceVal"
                handleChange={handleChange}
                name="local_distance"
                value={state.local_distance}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OCL <br /> (Distance 1){" "}
                {state.formErrors.ocl_distance_1 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ocl_distance_1}
                width="377px"
                textField="DistanceVal"
                handleChange={handleChange}
                name="ocl_distance_1"
                value={state.ocl_distance_1}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OCL <br /> (Distance 2){" "}
                {state.formErrors.ocl_distance_2 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ocl_distance_2}
                width="377px"
                textField="DistanceVal"
                handleChange={handleChange}
                name="ocl_distance_2"
                value={state.ocl_distance_2}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OCL <br /> (Distance 3){" "}
                {state.formErrors.ocl_distance_3 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ocl_distance_3}
                width="377px"
                textField="DistanceVal"
                handleChange={handleChange}
                name="ocl_distance_3"
                value={state.ocl_distance_3}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OGL <br /> (Distance 1){" "}
                {state.formErrors.ogl_distance_1 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ogl_distance_1}
                width="377px"
                textField="DistanceVal"
                handleChange={handleChange}
                name="ogl_distance_1"
                value={state.ogl_distance_1}
              />
            </ItemSection>
          </ItemRow>

          <ItemRow>
            <LabelSection>
              <Label>
                OGL <br /> (Distance 2){" "}
                {state.formErrors.ogl_distance_2 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ogl_distance_2}
                width="377px"
                textField="DistanceVal"
                handleChange={handleChange}
                name="ogl_distance_2"
                value={state.ogl_distance_2}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OGL <br /> (Distance 3){" "}
                {state.formErrors.ogl_distance_3 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ogl_distance_3}
                width="377px"
                textField="DistanceVal"
                handleChange={handleChange}
                name="ogl_distance_3"
                value={state.ogl_distance_3}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                Local Rate
                <RedStarItem />
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.local_rate}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="local_rate"
                value={state.local_rate}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OCL Rate 1{" "}
                {state.formErrors.ocl_rate_1 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ocl_rate_1}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="ocl_rate_1"
                value={state.ocl_rate_1}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OCL Rate 2{" "}
                {state.formErrors.ocl_rate_2 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ocl_rate_2}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="ocl_rate_2"
                value={state.ocl_rate_2}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OCL Rate 3{" "}
                {state.formErrors.ocl_rate_3 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ocl_rate_3}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="ocl_rate_3"
                value={state.ocl_rate_3}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OGL Rate 1 {state.formErrors.ogl_rate1 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ogl_rate1}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="ogl_rate1"
                value={state.ogl_rate1}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OGL Rate 2 {state.formErrors.ogl_rate2 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ogl_rate2}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="ogl_rate2"
                value={state.ogl_rate2}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                OGL Rate 3 {state.formErrors.ogl_rate3 ? <RedStarItem /> : null}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.ogl_rate3}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="ogl_rate3"
                value={state.ogl_rate3}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>
                PD Rate
                {/* <RedStarItem /> */}
              </Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.pd_rate}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="pd_rate"
                value={state.pd_rate}
              />
            </ItemSection>
          </ItemRow>

          <ItemRow className="flex-start errorMsg">
            <LabelSection>
              <Label>
                Billing Location
                <RedStarItem />
              </Label>
              <Label className="spaces">District</Label>
            </LabelSection>
          </ItemRow>
          {state.formErrors.billing_location ? (
            <ItemRow className="flex-start errorMsg">
              <LabelSection>
                <Label className="errorMsg">*Billing location required</Label>
                {/* <Label className="spaces"></Label> */}
              </LabelSection>
            </ItemRow>
          ) : null}
          <ItemRow>
            <ItemSection className="billing-location">
              <>
                <LocationItems onClick={() => handleCheckBox("all")}>
                  <CustomCheckBox
                    ticked={
                      state?.billing_locations?.length ===
                      state?.billing_location?.length
                    }
                  />
                  <Label className="billing-location">All</Label>
                </LocationItems>
                {state.billing_locations.map((i, index) => (
                  <LocationItems
                    onClick={() => handleCheckBox(i.id)}
                    key={index}
                  >
                    <CustomCheckBox
                      ticked={state.billing_location.includes(i.id)}
                    />
                    <Label className="billing-location">{i.name}</Label>
                  </LocationItems>
                ))}
              </>
            </ItemSection>
            <ItemSection className="billing-location">
              <>
                <LocationItems onClick={() => handleDistrictCheckBox("all")}>
                  <CustomCheckBox
                    ticked={
                      state?.districts?.length === state?.district?.length
                    }
                  />
                  <Label className="billing-location">All</Label>
                </LocationItems>
                {state.districts.map((i, index) => (
                  <LocationItems
                    onClick={() => handleDistrictCheckBox(i.id)}
                    key={index}
                  >
                    <CustomCheckBox ticked={state.district.includes(i.id)} />
                    <Label className="billing-location">{i.name}</Label>
                  </LocationItems>
                ))}
              </>
            </ItemSection>
          </ItemRow>

          <ItemRow>
            <LabelSection>
              <Label>Credit manager name</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                width="377px"
                handleChange={handleChange}
                textField="Text"
                name="credit_manager_name"
                value={state.credit_manager_name}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Credit manager contact no.</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                numberVal="true"
                width="377px"
                textField="Numeric"
                handleChange={handleChange}
                name="credit_manager_contactno"
                value={state.credit_manager_contactno}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Credit manager Email-id</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                width="377px"
                textField="Text"
                handleChange={handleChange}
                name="credit_manager_emailid"
                value={state.credit_manager_emailid}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Reported by rate</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.reported_by_rate}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="reported_by_rate"
                value={state.reported_by_rate}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Coordinated by rate</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.coordinated_by_rate}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="coordinated_by_rate"
                value={state.coordinated_by_rate}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Allocated by rate</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.allocated_by_rate}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="allocated_by_rate"
                value={state.allocated_by_rate}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Written by rate</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                required={state.formErrors.written_by_rate}
                width="377px"
                textField="DecimalVal"
                handleChange={handleChange}
                name="written_by_rate"
                value={state.written_by_rate}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Additional Remark 1</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                width="377px"
                textField="Text"
                handleChange={handleChange}
                name="remark1"
                value={state.remark1}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Additional Remark 2</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                width="377px"
                textField="Text"
                handleChange={handleChange}
                value={state.remark2}
                name="remark2"
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Additional Remark 3</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                width="377px"
                textField="Text"
                handleChange={handleChange}
                value={state.remark3}
                name="remark3"
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label>Select Fields</Label>
            </LabelSection>
            <ItemSection>
              <SelectFieldAndDownloadModal state={state} setState={setState} />
            </ItemSection>
          </ItemRow>
        </FormSection>
        <ButtonSection>
          <ButtonItem
            name="Cancel"
            type="outlined"
            handleClick={handleClose}
            color="#252F40"
            bgColor=""
            fsize="16px"
            fweight="500"
            fpadding="6px 105px"
            bradius="8px"
          />
          <ButtonItem
            name="Submit"
            type="contained"
            handleClick={handleSubmit}
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding="6px 105px"
            bradius="8px"
            pending={submitLoading}
            loader={submitLoading}
          />
        </ButtonSection>
      </FormContainer>
    );
  }
}

export default AddProductModalForm;

const LocationItems = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 13px;
  cursor: pointer;
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &.flex-start {
    align-items: flex-start;
  }
  &.errorMsg {
    margin-bottom: 4px;
  }
`;
const LabelSection = styled.div``;
export const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  &.billing-location {
    color: #656666;
    font-size: 13px;
    font-weight: 400;
  }
  &.spaces {
    padding-left: 220px;
  }
  &.errorMsg {
    color: #d32f2f;
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
const ItemSection = styled.div`
  width: 60%;
  margin-right: 52px;
  &.service-time {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &.billing-location {
    height: 100px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    overflow-y: scroll;
    padding: 19px;
    width: 53%;
  }
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  overflow-y: scroll;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
`;
const HeadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #132756;
  padding: 25px;
  border-radius: 12px 12px 0px 0px;
`;
const UploadSection = styled.div`
  padding: 25px 25px 0px 25px;
`;
const ButtonSection = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  /* margin-top: 50px; */
`;
