import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import TextFieldItem from "../Common/TextFieldItem";
import TextInputOkEnd from "../Common/TextInputOkEnd";
import RadioGroups from "../RadioGroups";
import SelectBoxLabel from "../SelectBoxLabel";
import { report_edit, v2_employees } from "../../Api/ReportSubmittedApis";
import { negative_remark_dropdown } from "../../Api/VerificationApis";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { get_data, patch_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 680,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  height: 200,
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
};

function ReportEditModalForm(props) {
  console.log('props: ', props);
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    application_no: "",
    product_name: "",
    rv_payable: false,
    rv_nonpayable_reason: "",
    rv_distance: "",
    rv_distance_type: "",
    rv_billable: true,
    rv_nonbillable_reason: "",
    rv_coordinated_by: "",
    rv_written_by: "",
    rv_reported_by: "",
    rv_billing_location: "",
    rv_assign_verification: "",
    rv_remarks: "",
    pv_remarks: "",
    bv_remarks: "",
    pd_remarks: "",
    rv_report_status: "",
    pv_report_status: "",
    bv_report_status: "",
    pd_report_status: "",
    rv_negative_reason: "",
    pv_negative_reason: "",
    bv_negative_reason: "",
    pd_negative_reason: "",
    rv_tele_audit: true,
    pv_tele_audit: true,
    bv_tele_audit: true,
    pd_tele_audit: true,
    rv_tele_done_by: "",
    pv_tele_done_by: "",
    bv_tele_done_by: "",
    pd_tele_done_by: "",
    additional_remark1_key: "",
    additional_remark1: "",
    additional_remark2_key: "",
    additional_remark2: "",
    additional_remark3_key: "",
    additional_remark3: "",
    local_distance: props.data?.product?.local_distance,
    ocl_distance_1: props.data?.product?.ocl_distance_1,
    ocl_distance_2: props.data?.product?.ocl_distance_2,
    ocl_distance_3: props.data?.product?.ocl_distance_3,
    ogl_distance_1: props.data?.product?.ogl_distance_1,
    ogl_distance_2: props.data?.product?.ogl_distance_2,
    ogl_distance_3: props.data?.product?.ogl_distance_3,
    bv_payable: true,
    bv_nonpayable_reason: "",
    bv_distance: "",
    bv_distance_type: "",
    bv_billable: true,
    bv_nonbillable_reason: "",
    bv_coordinated_by: "",
    bv_written_by: "",
    bv_reported_by: "",
    bv_billing_location: "",
    bv_assign_verification: "",
    is_rv: false,
    is_bv: false,
    is_pv: false,
    is_pd: false,
    pv_payable: true,
    pv_nonpayable_reason: "",
    pv_distance: "",
    pv_distance_type: "",
    pv_billable: true,
    pv_nonbillable_reason: "",
    pv_coordinated_by: "",
    pv_written_by: "",
    pv_reported_by: "",
    pv_billing_location: "",
    pv_assign_verification: "",
    pd_payable: true,
    pd_nonpayable_reason: "",
    pd_distance: "",
    pd_distance_type: "",
    pd_billable: true,
    pd_nonbillable_reason: "",
    pd_coordinated_by: "",
    pd_written_by: "",
    pd_reported_by: "",
    pd_billing_location: "",
    pd_assign_verification: "",
    allocated_by: "",
    rv_employee_filter_data: [],
    bv_employee_filter_data: [],
    pv_employee_filter_data: [],
    pd_employee_filter_data: [],
    billing_location_data: [],
    rv_employee_coordinated_data: [],
    pv_employee_coordinated_data: [],
    bv_employee_coordinated_data: [],
    pd_employee_coordinated_data: [],
    negative_reasons: [],
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(get_data(negative_remark_dropdown))
        .then((res) => {
          console.log("login res => ", res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                negative_reasons: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchMyAPI();
    fetchEmployeesData()
  }, []);

  const GetRadioDistanceValue = (distance) => {
    let rv_distance_type = "NA";
    if (distance) {
      if (Number(distance) <= state.local_distance) {
        rv_distance_type = "local";
      } else if (Number(distance) <= state.ocl_distance_1) {
        rv_distance_type = "ocl1";
      } else if (Number(distance) <= state.ocl_distance_2) {
        rv_distance_type = "ocl2";
      } else if (Number(distance) <= state.ocl_distance_3) {
        rv_distance_type = "ocl3";
      } else if (Number(distance) <= state.ogl_distance_1) {
        rv_distance_type = "ogl1";
      } else if (Number(distance) <= state.ogl_distance_2) {
        rv_distance_type = "ogl2";
      } else if (Number(distance) <= state.ogl_distance_3) {
        rv_distance_type = "ogl3";
      }
    }
    return rv_distance_type;
  };

  const isMount = useRef(false);

  const pdDistanceEffectRendered = useRef(false);

  useEffect(() => {
    if (pdDistanceEffectRendered.current) {
      setState((prevState) => ({
        ...prevState,
        pd_billable: Number(state.pd_distance) !== 0,
        pd_payable: Number(state.pd_distance) !== 0,
      }));
    }
    if (isMount.current) {
      pdDistanceEffectRendered.current = true;
    }
  }, [state.pd_distance]);

  const pvDistanceEffectRendered = useRef(false);

  useEffect(() => {
    if (pvDistanceEffectRendered.current) {
      setState((prevState) => ({
        ...prevState,
        pv_billable: Number(state.pv_distance) !== 0,
        pv_payable: Number(state.pv_distance) !== 0,
      }));
    }
    if (isMount.current) {
      pvDistanceEffectRendered.current = true;
    }
  }, [state.pv_distance]);

  const bvDistanceEffectRendered = useRef(false);

  useEffect(() => {
    if (bvDistanceEffectRendered.current) {
      setState((prevState) => ({
        ...prevState,
        bv_billable: Number(state.bv_distance) !== 0,
        bv_payable: Number(state.bv_distance) !== 0,
      }));
    }
    if (isMount.current) {
      bvDistanceEffectRendered.current = true;
    }
  }, [state.bv_distance]);

  const rvDistanceEffectRendered = useRef(false);

  useEffect(() => {
    if (rvDistanceEffectRendered.current) {
      setState((prevState) => ({
        ...prevState,
        rv_billable: Number(state.rv_distance) !== 0,
        rv_payable: Number(state.rv_distance) !== 0,
      }));
    }
    if (isMount.current) {
      rvDistanceEffectRendered.current = true;
    }
  }, [state.rv_distance]);

  const fetchEmployeesData = async () => {
    let data = props.data;
    let rv_data = data.addresses.filter((p) => p.fi_type === "RV")[0];
    let bv_data = data.addresses.filter((p) => p.fi_type === "BV")[0];
    let pv_data = data.addresses.filter((p) => p.fi_type === "PV")[0];
    let pd_data = data.addresses.filter((p) => p.fi_type === "PD")[0];

    try {
      const response = await dispatch(get_data(v2_employees + `?verification_id=${props?.data?.id}`));
      const result = response?.payload;
      if (result?.status === 200) {
        setState((prevState)=>{
          return {
            ...prevState,
            rv_employee_filter_data:result?.data?.[rv_data?.fi_type],
            bv_employee_filter_data: result?.data?.[bv_data?.fi_type],
            pv_employee_filter_data:result?.data?.[pv_data?.fi_type],
            pd_employee_filter_data:result?.data?.[pd_data?.fi_type],
            rv_employee_coordinated_data:result?.data?.[rv_data?.fi_type],
            bv_employee_coordinated_data: result?.data?.[bv_data?.fi_type],
            pv_employee_coordinated_data:result?.data?.[pv_data?.fi_type],
            pd_employee_coordinated_data:result?.data?.[pd_data?.fi_type],
          }
        })
      } else {
        console.error('Failed to fetch employees:', result?.status);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };
 

  useEffect(() => {
    let data = props.data;
    let rv_data = data.addresses.filter((p) => p.fi_type === "RV")[0];
    let bv_data = data.addresses.filter((p) => p.fi_type === "BV")[0];
    let pv_data = data.addresses.filter((p) => p.fi_type === "PV")[0];
    let pd_data = data.addresses.filter((p) => p.fi_type === "PD")[0];
    let rv_distance_type = GetRadioDistanceValue(
      rv_data?.verification_address[0]?.assign_verification[0]?.distance
    );
    let bv_distance_type = GetRadioDistanceValue(
      bv_data?.verification_address[0]?.assign_verification[0]?.distance
    );
    let pv_distance_type = GetRadioDistanceValue(
      pv_data?.verification_address[0]?.assign_verification[0]?.distance
    );
    let pd_distance_type = GetRadioDistanceValue(
      pd_data?.verification_address[0]?.assign_verification[0]?.distance
    );

    let rv_employee_coordinated_datas = [];
    let rv_cordinat = rv_data?.employees_filtered;
    if (rv_cordinat?.length) {
      rv_employee_coordinated_datas = rv_cordinat;
    }
    let pv_employee_coordinated_datas = [];
    let pv_cordinat = pv_data?.employees_filtered;
    if (pv_cordinat?.length) {
      pv_employee_coordinated_datas = pv_cordinat;
    }
    let bv_employee_coordinated_datas = [];
    let bv_cordinat = bv_data?.employees_filtered;
    if (bv_cordinat?.length) {
      bv_employee_coordinated_datas = bv_cordinat;
    }
    let pd_employee_coordinated_datas = [];
    let pd_cordinat = pd_data?.employees_filtered;
    if (pd_cordinat?.length) {
      pd_employee_coordinated_datas = pd_cordinat;
    }
    if (props.data) {
      setState((prevState) => {
        return {
          ...prevState,
          id: props.data.id,
          application_no: props.data.application_id,
          product_name: props.data.product_name,
          rv_payable:
            rv_data?.verification_address[0]?.assign_verification[0]?.payable,
          rv_nonpayable_reason:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.payable === false
              ? rv_data?.verification_address[0]?.assign_verification[0]
                  ?.payable_reason
              : "",
          rv_distance:
            rv_data?.verification_address[0]?.assign_verification[0]?.distance,
          rv_distance_type:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.distance_type,
          rv_billable:
            rv_data?.verification_address[0]?.assign_verification[0]?.billable,
          rv_nonbillable_reason:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.billable === false
              ? rv_data?.verification_address[0]?.assign_verification[0]
                  ?.billable_reason
              : "",
          rv_coordinated_by:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.coordinated_by,
          allocated_by: data.allocated_by_name,
          rv_written_by:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.written_by,
          rv_reported_by:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.reported_by,
          rv_billing_location:
            rv_data?.verification_address[0]?.selected_billing_location?.id,
          rv_assign_verification:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.assign_verification,
          rv_remarks:
            rv_data?.verification_address[0]?.assign_verification[0]?.remarks,
          pv_remarks:
            pv_data?.verification_address[0]?.assign_verification[0]?.remarks,
          bv_remarks:
            bv_data?.verification_address[0]?.assign_verification[0]?.remarks,
          pd_remarks:
            pd_data?.verification_address[0]?.assign_verification[0]?.remarks,
          rv_report_status: rv_data?.verification_address[0]?.status,
          pv_report_status: pv_data?.verification_address[0]?.status,
          bv_report_status: bv_data?.verification_address[0]?.status,
          pd_report_status: pd_data?.verification_address[0]?.status,
          rv_negative_reason:
            rv_data?.verification_address[0]?.negative_reason?.id,
          pv_negative_reason:
            pv_data?.verification_address[0]?.negative_reason?.id,
          bv_negative_reason:
            bv_data?.verification_address[0]?.negative_reason?.id,
          pd_negative_reason:
            pd_data?.verification_address[0]?.negative_reason?.id,
          rv_tele_audit:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.tele_verification,
          pv_tele_audit:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.tele_verification,
          bv_tele_audit:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.tele_verification,
          pd_tele_audit:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.tele_verification,
          rv_tele_done_by:
            rv_data?.verification_address[0]?.assign_verification[0]?.tele_by,
          pv_tele_done_by:
            pv_data?.verification_address[0]?.assign_verification[0]?.tele_by,
          bv_tele_done_by:
            bv_data?.verification_address[0]?.assign_verification[0]?.tele_by,
          pd_tele_done_by:
            pd_data?.verification_address[0]?.assign_verification[0]?.tele_by,
          additional_remark1_key:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.additional_remarks?.key1,
          additional_remark1:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.additional_remarks?.value1,
          additional_remark2_key:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.additional_remarks?.key2,
          additional_remark2:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.additional_remarks?.value2,
          additional_remark3_key:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.additional_remarks?.key3,
          additional_remark3:
            rv_data?.verification_address[0]?.assign_verification[0]
              ?.additional_remarks?.value3,
          bv_payable:
            bv_data?.verification_address[0]?.assign_verification[0]?.payable,
          bv_nonpayable_reason:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.payable === false
              ? bv_data?.verification_address[0]?.assign_verification[0]
                  ?.payable_reason
              : "",
          bv_distance:
            bv_data?.verification_address[0]?.assign_verification[0]?.distance,
          bv_distance_type:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.distance_type,
          bv_billable:
            bv_data?.verification_address[0]?.assign_verification[0]?.billable,
          bv_nonbillable_reason:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.billable === false
              ? bv_data?.verification_address[0]?.assign_verification[0]
                  ?.billable_reason
              : "",
          bv_coordinated_by:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.coordinated_by,
          bv_written_by:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.written_by,
          bv_reported_by:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.reported_by,
          bv_billing_location:
            bv_data?.verification_address[0]?.selected_billing_location?.id,
          bv_assign_verification:
            bv_data?.verification_address[0]?.assign_verification[0]
              ?.assign_verification,
          is_rv: rv_data ? true : false,
          is_bv: bv_data ? true : false,
          is_pv: pv_data ? true : false,
          is_pd: pd_data ? true : false,
          pv_payable:
            pv_data?.verification_address[0]?.assign_verification[0]?.payable,
          pv_nonpayable_reason:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.payable === false
              ? pv_data?.verification_address[0]?.assign_verification[0]
                  ?.payable_reason
              : "",
          pv_distance:
            pv_data?.verification_address[0]?.assign_verification[0]?.distance,
          pv_distance_type:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.distance_type,
          pv_billable:
            pv_data?.verification_address[0]?.assign_verification[0]?.billable,
          pv_nonbillable_reason:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.billable === false
              ? pv_data?.verification_address[0]?.assign_verification[0]
                  ?.billable_reason
              : "",
          pv_coordinated_by:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.coordinated_by,
          pv_written_by:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.written_by,
          pv_reported_by:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.reported_by,
          pv_billing_location:
            pv_data?.verification_address[0]?.selected_billing_location?.id,
          pv_assign_verification:
            pv_data?.verification_address[0]?.assign_verification[0]
              ?.assign_verification,
          pd_payable:
            pd_data?.verification_address[0]?.assign_verification[0]?.payable,
          pd_nonpayable_reason:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.payable === false
              ? pd_data?.verification_address[0]?.assign_verification[0]
                  ?.payable_reason
              : "",
          pd_distance:
            pd_data?.verification_address[0]?.assign_verification[0]?.distance,
          pd_distance_type:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.distance_type,
          pd_billable:
            pd_data?.verification_address[0]?.assign_verification[0]?.billable,
          pd_nonbillable_reason:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.billable === false
              ? pd_data?.verification_address[0]?.assign_verification[0]
                  ?.billable_reason
              : "",
          pd_coordinated_by:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.coordinated_by,
          pd_written_by:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.written_by,
          pd_reported_by:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.reported_by,
          pd_billing_location:
            pd_data?.verification_address[0]?.selected_billing_location?.id,
          pd_assign_verification:
            pd_data?.verification_address[0]?.assign_verification[0]
              ?.assign_verification,
          // rv_employee_filter_data: rv_data?.employees_filtered,
          // bv_employee_filter_data: bv_data?.employees_filtered,
          // pv_employee_filter_data: pv_data?.employees_filtered,
          // pd_employee_filter_data: pd_data?.employees_filtered,
          billing_location_data: props.data?.product?.billing_location,
          // rv_employee_coordinated_data: rv_employee_coordinated_datas,
          // pv_employee_coordinated_data: pv_employee_coordinated_datas,
          // bv_employee_coordinated_data: bv_employee_coordinated_datas,
          // pd_employee_coordinated_data: pd_employee_coordinated_datas,
        };
      });
    }
    isMount.current = true;
  }, [props.data]);

  // const handleOk = (name) => {
  //     console.log('name: ', name);
  //     let distance = 0
  //     if(name === 'rv_distance_type'){
  //         distance = state.rv_distance
  //     }else if(name === 'bv_distance_type'){
  //         distance = state.bv_distance
  //     }else if(name === 'pv_distance_type'){
  //         distance = state.pv_distance
  //     }else if(name === 'pd_distance_type'){
  //         distance = state.pd_distance
  //     }
  //     let distance_type = GetRadioDistanceValue(distance)
  //     console.log(distance_type,"kkkkk");
  //     setState((prevState)=> {
  //         return {
  //             ...prevState,
  //             [name]: distance_type
  //         }
  //     })
  // }

  const radioValue = (distanceVal) => {
    let states = "";
    switch (true) {
      case distanceVal <= props?.data?.product?.local_distance:
        states = "local";
        break;
      case distanceVal <= props?.data?.product?.ocl_distance_1:
        states = "ocl1";
        break;
      case distanceVal <= props?.data?.product?.ocl_distance_2:
        states = "ocl2";
        break;
      case distanceVal <= props?.data?.product?.ocl_distance_3:
        states = "ocl3";
        break;
      case distanceVal <= props?.data?.product?.ogl_distance_1:
        states = "ogl1";
        break;
      case distanceVal <= props?.data?.product?.ogl_distance_2:
        states = "ogl2";
        break;
      case distanceVal <= props?.data?.product?.ogl_distance_3:
        states = "ogl3";
        break;
      default:
        states = "NA";
        break;
    }

    return states;
  };

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRadioChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let data = {
      // allocated_by: state.allocated_by
    };
    let sub_ver = [];
    let additional_remarks = {};
    if (state.additional_remark1_key) {
      additional_remarks.key1 = state.additional_remark1_key;
      additional_remarks.value1 = state.additional_remark1;
    }
    if (state.additional_remark2_key) {
      additional_remarks.key2 = state.additional_remark2_key;
      additional_remarks.value2 = state.additional_remark2;
    }
    if (state.additional_remark3_key) {
      additional_remarks.key3 = state.additional_remark3_key;
      additional_remarks.value3 = state.additional_remark3;
    }
    if (state.is_rv) {
      let sub_data = {
        assign_verification: state.rv_assign_verification,
        coordinated_by: state.rv_coordinated_by,
        written_by: state.rv_written_by,
        reported_by: state.rv_reported_by,
        distance: state.rv_distance,
        distance_type: radioValue(Number(state.rv_distance)),
        rv_distance_type: state.rv_billable,
        billable: state.rv_billable,
        billable_reason: state.rv_nonbillable_reason,
        rv_nonbillable_reason: state.rv_payable,
        payable: state.rv_payable,
        payable_reason: state.rv_nonpayable_reason,
        tele_verification: state.rv_tele_audit,
        tele_by: state.rv_tele_done_by,
        status: state.rv_report_status,
        reason:
          state.rv_report_status == "negative"
            ? state.rv_negative_reason
            : null,
        remarks: state.rv_remarks,
        additional_remarks: additional_remarks,
        billinglocation: state.rv_billing_location,
      };
      sub_ver.push(sub_data);
    }
    if (state.is_bv) {
      let sub_data = {
        assign_verification: state.bv_assign_verification,
        coordinated_by: state.bv_coordinated_by,
        written_by: state.bv_written_by,
        reported_by: state.bv_reported_by,
        distance: state.bv_distance,
        distance_type: radioValue(Number(state.bv_distance)),
        bv_distance_type: state.bv_billable,
        billable: state.bv_billable,
        billable_reason: state.bv_nonbillable_reason,
        payable: state.bv_payable,
        bv_nonbillable_reason: state.bv_payable,
        payable_reason: state.bv_nonpayable_reason,
        tele_verification: state.bv_tele_audit,
        tele_by: state.bv_tele_done_by,
        status: state.bv_report_status,
        reason:
          state.bv_report_status == "negative"
            ? state.bv_negative_reason
            : null,
        remarks: state.bv_remarks,
        additional_remarks: additional_remarks,
        billinglocation: state.bv_billing_location,
      };
      sub_ver.push(sub_data);
    }
    if (state.is_pv) {
      let sub_data = {
        assign_verification: state.pv_assign_verification,
        coordinated_by: state.pv_coordinated_by,
        written_by: state.pv_written_by,
        reported_by: state.pv_reported_by,
        distance: state.pv_distance,
        distance_type: radioValue(Number(state.pv_distance)),
        pv_distance_type: state.pv_billable,
        billable: state.pv_billable,
        billable_reason: state.pv_nonbillable_reason,
        payable: state.pv_payable,
        pv_nonbillable_reason: state.pv_payable,
        payable_reason: state.pv_nonpayable_reason,
        tele_verification: state.pv_tele_audit,
        tele_by: state.pv_tele_done_by,
        status: state.pv_report_status,
        reason:
          state.pv_report_status == "negative" ? state.pv_negative_reason : "",
        remarks: state.pv_remarks,
        additional_remarks: additional_remarks,
        billinglocation: state.pv_billing_location,
      };
      sub_ver.push(sub_data);
    }
    if (state.is_pd) {
      let sub_data = {
        assign_verification: state.pd_assign_verification,
        coordinated_by: state.pd_coordinated_by,
        written_by: state.pd_written_by,
        reported_by: state.pd_reported_by,
        distance: state.pd_distance,
        distance_type: radioValue(Number(state.pd_distance)),
        pd_distance_type: state.pd_billable,
        billable: state.pd_billable,
        payable: state.pd_payable,
        billable_reason: state.pd_nonbillable_reason,
        pd_nonbillable_reason: state.pd_payable,
        payable_reason: state.pd_nonpayable_reason,
        tele_verification: state.pd_tele_audit,
        tele_by: state.pd_tele_done_by,
        status: state.pd_report_status,
        reason:
          state.pd_report_status == "negative"
            ? state.pd_negative_reason
            : null,
        remarks: state.pd_remarks,
        additional_remarks: additional_remarks,
        billinglocation: state.pd_billing_location,
      };
      sub_ver.push(sub_data);
    }
    data.application_id = state.application_no;
    data.sub_ver = sub_ver;

    let param = {
      values: data,
      url: report_edit + props.data.id + "/",
    };
    dispatch(patch_data(param))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (result?.status === 200) {
          handleClose();
          setLoading(false);
          alertSuccessFun("Report Edit successfully");
        }
      })
      .catch((error) => {
        alertErrorFun(error.response.data.error);
        console.log(error);
        setLoading(false);
      });

    // try {
    //   setLoading(true);
    //   const result = await axios.patch(
    //     report_edit + props.data.id + "/",
    //     data,
    //     { headers: { Authorization: `Bearer ${access}` } }
    //   );
    //   if (result.status === 200) {
    //     handleClose();
    //     setLoading(false);
    //     alertSuccessFun("Report Edit successfully");
    //   }
    // } catch (error) {
    //   alertErrorFun(error.response.data.error);
    //   console.log(error);
    //   setLoading(false);
    // }
    props.setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  };

  const alertSuccessFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "success",
      message: msg,
    });
  };

  const alertErrorFun = (msg) => {
    props.setSnackbarStatus({
      isOpen: true,
      severity: "error",
      message: msg,
    });
  };

  let distance_radio = [
    {
      name: "local",
      label: "Local",
      checked: false,
    },
    {
      name: "ocl1",
      label: "OCL 1",
      checked: false,
    },
    {
      name: "ocl2",
      label: "OCL 2",
      checked: false,
    },
    {
      name: "ocl3",
      label: "OCL 3",
      checked: false,
    },
    {
      name: "ogl1",
      label: "OGL 1",
      checked: true,
    },
    {
      name: "ogl2",
      label: "OGL 2",
      checked: false,
    },
    {
      name: "ogl3",
      label: "OGL 3",
      checked: false,
    },
    {
      name: "NA",
      label: "NA",
      checked: false,
    },
  ];
  let pv_billable_radio = [
    {
      name: true,
      label: "Yes",
      checked: true,
      disabled: Number(state.pv_distance) === 0,
    },
    {
      name: false,
      label: "No",
      checked: false,
    },
  ];

  let yes_no_radio = [
    {
      name: true,
      label: "Yes",
      checked: true,
    },
    {
      name: false,
      label: "No",
      checked: false,
    },
  ];

  let rv_billable_radio = [
    {
      name: true,
      label: "Yes",
      checked: true,
      disabled: Number(state.rv_distance) === 0,
    },
    {
      name: false,
      label: "No",
      checked: false,
    },
  ];

  let bv_billable_radio = [
    {
      name: true,
      label: "Yes",
      checked: true,
      disabled: Number(state.bv_distance) === 0,
    },
    {
      name: false,
      label: "No",
      checked: false,
    },
  ];

  let pd_billable_radio = [
    {
      name: true,
      label: "Yes",
      checked: true,
      disabled: Number(state.pd_distance) === 0,
    },
    {
      name: false,
      label: "No",
      checked: false,
    },
  ];

  let status_radio = [
    {
      name: "positive",
      label: "Positive",
    },
    {
      name: "negative",
      label: "Negative",
    },
    {
      name: "neutral",
      label: "Neutral",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirmClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormContainer>
        <HeadSection>
          <SubHead className="icons">
            {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
          </SubHead>
          <SubHead>
            <Title>Edit Report({state.application_no})</Title>
          </SubHead>
          <SubHead className="icons" onClick={() => props.setOpen(false)}>
            <img src={require("../../Assets/images/close-square.png")} alt="" />
          </SubHead>
        </HeadSection>
        <FormSection>
          <ItemRow>
            <LabelSection>
              <Label className="secondary">Application Number</Label>
            </LabelSection>
            <ItemSection>
              <TextFieldItem
                row={2}
                textField="Text"
                handleChange={handleChange}
                name="application_no"
                value={state.application_no}
              />
            </ItemSection>
          </ItemRow>
          <ItemRow>
            <LabelSection>
              <Label className="secondary">Product Name</Label>
            </LabelSection>
            <ItemSection>
              <SpanValue>{state.product_name}</SpanValue>
            </ItemSection>
          </ItemRow>
          {state.is_rv ? (
            <>
              <ItemRow className="flex-start">
                <LabelSection>
                  <Label>RV Distance</Label>
                </LabelSection>
                <ItemSection>
                  <TextInputOkEnd
                    handleChange={handleChange}
                    name="rv_distance"
                    value={state.rv_distance}
                  />
                  <RadioGroups
                    fsize="12px"
                    datas={distance_radio}
                    value={radioValue(Number(state.rv_distance))}
                    name="rv_distance_type"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>RV Payable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={rv_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.rv_payable}
                    name="rv_payable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.rv_payable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">RV Non Payable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="rv_nonpayable_reason"
                      value={state.rv_nonpayable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.rv_nonpayable_reason = "")
              )}
              <ItemRow>
                <LabelSection>
                  <Label>RV Billable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={rv_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.rv_billable}
                    name="rv_billable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.rv_billable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">RV Non Billable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="rv_nonbillable_reason"
                      value={state.rv_nonbillable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.rv_nonbillable_reason = "")
              )}

              <ItemRow>
                <LabelSection>
                  <Label>RV Allocated By</Label>
                </LabelSection>
                <ItemSection>
                  <SpanValue>{state.allocated_by}</SpanValue>
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>RV Coordinated By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="rv_coordinated_by"
                    datas={state.rv_employee_coordinated_data}
                    selectType="EmployeeName"
                    value={state.rv_coordinated_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>RV Written By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="rv_written_by"
                    datas={state.rv_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.rv_written_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>RV Reported By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="rv_reported_by"
                    datas={state.rv_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.rv_reported_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>RV Billing Location</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="rv_billing_location"
                    datas={state.billing_location_data}
                    selectType="EmployeeName"
                    value={state.rv_billing_location}
                    default="Calicut"
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>Tele Audit</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={yes_no_radio}
                    handleChange={handleRadioChange}
                    value={state.rv_tele_audit}
                    name="rv_tele_audit"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.rv_tele_audit ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Tele Done By</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      handleChange={handleSelectChange}
                      name="rv_tele_done_by"
                      datas={state.rv_employee_filter_data}
                      selectType="EmployeeName"
                      value={state.rv_tele_done_by}
                      default="Select"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.rv_tele_done_by = null)
              )}

              <ItemRow className="flex-start">
                <LabelSection>
                  <Label className="secondary">Remarks</Label>
                </LabelSection>
                <ItemSection>
                  <TextFieldItem
                    textField="Text"
                    multiLine={true}
                    row={2}
                    handleChange={handleChange}
                    name="rv_remarks"
                    value={state.rv_remarks}
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>Report Status</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={status_radio}
                    handleChange={handleRadioChange}
                    value={state.rv_report_status}
                    name="rv_report_status"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.rv_report_status === "negative" ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Negative Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      selectType="Comment"
                      datas={state.negative_reasons}
                      handleChange={handleSelectChange}
                      name="rv_negative_reason"
                      value={state.rv_negative_reason}
                      default="Select Reason"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : null}
            </>
          ) : null}

          {state.is_bv ? (
            <>
              <ItemRow className="flex-start">
                <LabelSection>
                  <Label>BV Distance</Label>
                </LabelSection>
                <ItemSection>
                  <TextInputOkEnd
                    handleChange={handleChange}
                    name="bv_distance"
                    value={state.bv_distance}
                  />
                  <RadioGroups
                    fsize="12px"
                    datas={distance_radio}
                    value={radioValue(Number(state.bv_distance))}
                    name="bv_distance_type"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>BV Payable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={bv_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.bv_payable}
                    name="bv_payable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.bv_payable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">BV Non Payable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="bv_nonpayable_reason"
                      value={state.bv_nonpayable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.bv_nonpayable_reason = "")
              )}
              <ItemRow>
                <LabelSection>
                  <Label>BV Billable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={bv_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.bv_billable}
                    name="bv_billable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.bv_billable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">BV Non Billable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="bv_nonbillable_reason"
                      value={state.bv_nonbillable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.bv_nonbillable_reason = "")
              )}

              <ItemRow>
                <LabelSection>
                  <Label>BV Allocated By</Label>
                </LabelSection>
                <ItemSection>
                  <SpanValue>{state.allocated_by}</SpanValue>
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>BV Coordinated By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="bv_coordinated_by"
                    datas={state.bv_employee_coordinated_data}
                    selectType="EmployeeName"
                    value={state.bv_coordinated_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>BV Written By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="bv_written_by"
                    datas={state.bv_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.bv_written_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>BV Reported By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="bv_reported_by"
                    datas={state.bv_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.bv_reported_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>BV Billing Location</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="bv_billing_location"
                    datas={state.billing_location_data}
                    selectType="EmployeeName"
                    value={state.bv_billing_location}
                    default="Calicut"
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>Tele Audit</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={yes_no_radio}
                    handleChange={handleRadioChange}
                    value={state.bv_tele_audit}
                    name="bv_tele_audit"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.bv_tele_audit ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Tele Done By</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      handleChange={handleSelectChange}
                      name="bv_tele_done_by"
                      datas={state.bv_employee_filter_data}
                      selectType="EmployeeName"
                      value={state.bv_tele_done_by}
                      default="Select"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.bv_tele_done_by = null)
              )}

              <ItemRow className="flex-start">
                <LabelSection>
                  <Label className="secondary">Remarks</Label>
                </LabelSection>
                <ItemSection>
                  <TextFieldItem
                    textField="Text"
                    multiLine={true}
                    row={2}
                    handleChange={handleChange}
                    name="bv_remarks"
                    value={state.bv_remarks}
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>Report Status</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={status_radio}
                    handleChange={handleRadioChange}
                    value={state.bv_report_status}
                    name="bv_report_status"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.bv_report_status === "negative" ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Negative Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      selectType="Comment"
                      datas={state.negative_reasons}
                      handleChange={handleSelectChange}
                      name="bv_negative_reason"
                      value={state.bv_negative_reason}
                      default="Select Reason"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : null}
            </>
          ) : null}

          {state.is_pv ? (
            <>
              <ItemRow className="flex-start">
                <LabelSection>
                  <Label>PV Distance</Label>
                </LabelSection>
                <ItemSection>
                  <TextInputOkEnd
                    handleChange={handleChange}
                    name="pv_distance"
                    value={state.pv_distance}
                  />
                  <RadioGroups
                    fsize="12px"
                    datas={distance_radio}
                    value={radioValue(Number(state.pv_distance))}
                    name="pv_distance_type"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>PV Payable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={pv_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.pv_payable}
                    name="pv_payable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.pv_payable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">PV Non Payable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="pv_nonpayable_reason"
                      value={state.pv_nonpayable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.pv_nonpayable_reason = "")
              )}
              <ItemRow>
                <LabelSection>
                  <Label>PV Billable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={pv_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.pv_billable}
                    name="pv_billable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.pv_billable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">PV Non Billable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="pv_nonbillable_reason"
                      value={state.pv_nonbillable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.pv_nonbillable_reason = "")
              )}

              <ItemRow>
                <LabelSection>
                  <Label>PV Allocated By</Label>
                </LabelSection>
                <ItemSection>
                  <SpanValue>{state.allocated_by}</SpanValue>
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>PV Coordinated By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pv_coordinated_by"
                    datas={state.pv_employee_coordinated_data}
                    selectType="EmployeeName"
                    value={state.pv_coordinated_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>PV Written By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pv_written_by"
                    datas={state.pv_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.pv_written_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>PV Reported By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pv_reported_by"
                    datas={state.pv_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.pv_reported_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>PV Billing Location</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pv_billing_location"
                    datas={state.billing_location_data}
                    selectType="EmployeeName"
                    value={state.pv_billing_location}
                    default="Calicut"
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>Tele Audit</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={yes_no_radio}
                    handleChange={handleRadioChange}
                    value={state.pv_tele_audit}
                    name="pv_tele_audit"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.pv_tele_audit ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Tele Done By</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      handleChange={handleSelectChange}
                      name="pv_tele_done_by"
                      datas={state.pv_employee_filter_data}
                      selectType="EmployeeName"
                      value={state.pv_tele_done_by}
                      default="Select"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.pv_tele_done_by = null)
              )}

              <ItemRow className="flex-start">
                <LabelSection>
                  <Label className="secondary">Remarks</Label>
                </LabelSection>
                <ItemSection>
                  <TextFieldItem
                    textField="Text"
                    multiLine={true}
                    row={2}
                    handleChange={handleChange}
                    name="pv_remarks"
                    value={state.pv_remarks}
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>Report Status</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={status_radio}
                    handleChange={handleRadioChange}
                    value={state.pv_report_status}
                    name="pv_report_status"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.pv_report_status === "negative" ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Negative Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      selectType="Comment"
                      datas={state.negative_reasons}
                      handleChange={handleSelectChange}
                      name="pv_negative_reason"
                      value={state.pv_negative_reason}
                      default="Select Reason"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : null}
            </>
          ) : null}

          {state.is_pd ? (
            <>
              <ItemRow className="flex-start">
                <LabelSection>
                  <Label>PD Distance</Label>
                </LabelSection>
                <ItemSection>
                  <TextInputOkEnd
                    handleChange={handleChange}
                    name="pd_distance"
                    value={state.pd_distance}
                  />
                  <RadioGroups
                    fsize="12px"
                    datas={distance_radio}
                    value={radioValue(Number(state.pd_distance))}
                    name="pd_distance_type"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>PD Payable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={pd_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.pd_payable}
                    name="pd_payable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.pd_payable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">PD Non Payable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="pd_nonpayable_reason"
                      value={state.pd_nonpayable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.pd_nonpayable_reason = "")
              )}
              <ItemRow>
                <LabelSection>
                  <Label>PD Billable</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={pd_billable_radio}
                    handleChange={handleRadioChange}
                    value={state.pd_billable}
                    name="pd_billable"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {!state.pd_billable ? (
                <ItemRow className="flex-start">
                  <LabelSection>
                    <Label className="secondary">PD Non Billable Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <TextFieldItem
                      textField="Text"
                      multiLine={true}
                      row={2}
                      handleChange={handleChange}
                      name="pd_nonbillable_reason"
                      value={state.pd_nonbillable_reason}
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.pd_nonbillable_reason = "")
              )}

              <ItemRow>
                <LabelSection>
                  <Label>PD Allocated By</Label>
                </LabelSection>
                <ItemSection>
                  <SpanValue>{state.allocated_by}</SpanValue>
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>PD Coordinated By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pd_coordinated_by"
                    datas={state.pd_employee_coordinated_data}
                    selectType="EmployeeName"
                    value={state.pd_coordinated_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>PD Written By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pd_written_by"
                    datas={state.pd_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.pd_written_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>PD Reported By</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pd_reported_by"
                    datas={state.pd_employee_filter_data}
                    selectType="EmployeeName"
                    value={state.pd_reported_by}
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>PD Billing Location</Label>
                </LabelSection>
                <ItemSection>
                  <SelectBoxLabel
                    handleChange={handleSelectChange}
                    name="pd_billing_location"
                    datas={state.billing_location_data}
                    selectType="EmployeeName"
                    value={state.pd_billing_location}
                    default="Calicut"
                    fpadding="9.5px 14px"
                    fsize="12px"
                  />
                </ItemSection>
              </ItemRow>
              <ItemRow>
                <LabelSection>
                  <Label>Tele Audit</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={yes_no_radio}
                    handleChange={handleRadioChange}
                    value={state.pd_tele_audit}
                    name="pd_tele_audit"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.pd_tele_audit ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Tele Done By</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      handleChange={handleSelectChange}
                      name="pd_tele_done_by"
                      datas={state.pd_employee_filter_data}
                      selectType="EmployeeName"
                      value={state.pd_tele_done_by}
                      default="Select"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : (
                (state.pd_tele_done_by = null)
              )}

              <ItemRow className="flex-start">
                <LabelSection>
                  <Label className="secondary">Remarks</Label>
                </LabelSection>
                <ItemSection>
                  <TextFieldItem
                    textField="Text"
                    multiLine={true}
                    row={2}
                    handleChange={handleChange}
                    name="pd_remarks"
                    value={state.pd_remarks}
                  />
                </ItemSection>
              </ItemRow>

              <ItemRow>
                <LabelSection>
                  <Label>Report Status</Label>
                </LabelSection>
                <ItemSection>
                  <RadioGroups
                    fsize="12px"
                    datas={status_radio}
                    handleChange={handleRadioChange}
                    value={state.pd_report_status}
                    name="pd_report_status"
                    ml="0px"
                  />
                </ItemSection>
              </ItemRow>
              {state.pd_report_status === "negative" ? (
                <ItemRow>
                  <LabelSection>
                    <Label>Negative Reason</Label>
                  </LabelSection>
                  <ItemSection>
                    <SelectBoxLabel
                      selectType="Comment"
                      datas={state.negative_reasons}
                      handleChange={handleSelectChange}
                      name="pd_negative_reason"
                      value={state.pd_negative_reason}
                      default="Select Reason"
                      fpadding="9.5px 14px"
                      fsize="12px"
                    />
                  </ItemSection>
                </ItemRow>
              ) : null}
            </>
          ) : null}

          {state.additional_remark1_key ? (
            <ItemRow className="flex-start">
              <LabelSection>
                <Label className="secondary">
                  Additional
                  <br />
                  Remark 1: {state.additional_remark1_key}
                </Label>
              </LabelSection>
              <ItemSection>
                <TextFieldItem
                  textField="Text"
                  multiLine={true}
                  row={2}
                  handleChange={handleChange}
                  name="additional_remark1"
                  value={state.additional_remark1}
                />
              </ItemSection>
            </ItemRow>
          ) : null}
          {state.additional_remark2_key ? (
            <ItemRow className="flex-start">
              <LabelSection>
                <Label className="secondary">
                  Additional
                  <br />
                  Remark 2: {state.additional_remark2_key}
                </Label>
              </LabelSection>
              <ItemSection>
                <TextFieldItem
                  textField="Text"
                  multiLine={true}
                  row={2}
                  handleChange={handleChange}
                  name="additional_remark2"
                  value={state.additional_remark2}
                />
              </ItemSection>
            </ItemRow>
          ) : null}
          {state.additional_remark3_key ? (
            <ItemRow className="flex-start">
              <LabelSection>
                <Label className="secondary">
                  Additional
                  <br />
                  Remark 3: {state.additional_remark3_key}
                </Label>
              </LabelSection>
              <ItemSection>
                <TextFieldItem
                  textField="Text"
                  multiLine={true}
                  row={2}
                  handleChange={handleChange}
                  name="additional_remark3"
                  value={state.additional_remark3}
                />
              </ItemSection>
            </ItemRow>
          ) : null}
        </FormSection>
        <ButtonSection>
          <ButtonItem
            name="Save"
            type="contained"
            handleClick={handleClickOpen}
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding={isMobileScreen ? "5px 40px" : "6px 120px"}
            bradius="8px"
          />
        </ButtonSection>
      </FormContainer>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          hideBackdrop={true}
        >
          <Box sx={styles}>
            <ConfirmMsg>Are you sure , you want to confirm changes?</ConfirmMsg>
            <ConfirmButton>
              <LastSection>
                <ButtonItem
                  name="Cancel"
                  handleClick={handleConfirmClose}
                  type="outlined"
                  color="#252F40"
                  bgColor=""
                  fsize="16px"
                  fweight="500"
                  fpadding="6px 40px"
                  bradius="8px"
                />
                <ButtonItem
                  name="Confirm"
                  handleClick={handleSubmit}
                  type="contained"
                  color="#fff"
                  bgColor="#132756"
                  fsize="16px"
                  fweight="500"
                  fpadding="6px 40px"
                  bradius="8px"
                  pending={loading}
                  loader={loading}
                />
              </LastSection>
            </ConfirmButton>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ReportEditModalForm;

const SpanValue = styled.span`
  color: #444445;
  font-size: 12px;
  font-weight: 400;
  &.important {
    font-size: 14px;
    font-weight: 700;
  }
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &.flex-start {
    align-items: flex-start;
  }
`;
const LabelSection = styled.div`
  width: 30%;
`;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  display: block;
  width: 100%;
  &.secondary {
    color: #444445;
    font-size: 13px;
  }
`;
const ItemSection = styled.div`
  width: 70%;
  /* margin-right: 52px; */
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  overflow-y: scroll;
`;
const SubHead = styled.div`
  &.icons {
    cursor: pointer;
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
  justify-content: space-between;
  align-items: center;
  background-color: #132756;
  padding: 25px;
  border-radius: 12px 12px 0px 0px;
`;

const ButtonSection = styled.div`
  padding: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* margin-top: 50px; */
`;
const ConfirmButton = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LastSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67%;
  gap: 50px;
`;
const ConfirmMsg = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #444445;
  align-items: center;
  margin-top: 40px;
`;
