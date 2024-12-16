import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import SelectBoxLabel from "../../Components/SelectBoxLabel";
import CustomCheckBox from "../../Components/Common/CustomCheckBox";
import { mandatory, vendor_specific } from "../../Api/MandatoryApis";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import AlertMessage from "../../Components/Common/AlertMessage";
import { GetPermission } from "../../Functions/utils";
import { vendor_dropdown } from "../../Api/VerificationApis";
import { get_data, post_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";

function VendorSpecificField() {
  const dispatch = useDispatch();
  const permission = GetPermission("vendormandatoryfield", "change");
  const access = useSelector(selectAccess);
  const [data, setData] = useState([]);
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });
  const [state, setState] = useState({
    product: "",
    mandatories: [],
    mandatory_list: [],
    formErrors: {},
    vendor_list: [],
    call_api: true,
  });

  useEffect(() => {
    async function fetchVendorListAPI() {
      dispatch(get_data(vendor_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                vendor_list: result.data,
                call_api: false,
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
      //         call_api: false
      //       };
      //     });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    async function fetchMandatoryListAPI() {
      dispatch(get_data(mandatory))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                mandatory_list: result.data.results,
                call_api: false,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const result = await axios.get(mandatory,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     mandatory_list: result.data.results,
      //                     call_api: false
      //                 }
      //             })
      //         }
      // } catch (error) {
      //     console.log(error);
      // }
    }
    if (state.call_api === true) {
      fetchMandatoryListAPI();
      fetchVendorListAPI();
    }
  }, [state.call_api]);

  const handleCheckBox = (name, value) => {
    if (data.some((item) => item.id === name)) {
      let removedItems = data.filter((item) => item.id !== name);
      setData(removedItems);
    } else {
      let newData = { id: name, name: value };
      setData([...data, newData]);
    }
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
    let mandatory = state.vendor_list.filter((i) => i.id === value)[0]
      ?.vendormandatory[0]?.mandatory;
    if (!mandatory) {
      mandatory = [];
    }
    setData(mandatory);
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.product) {
      formErrors["product"] = true;
      validation = false;
    }
    setState((prevState) => {
      return {
        ...prevState,
        formErrors,
      };
    });
    return validation;
  };

  const mandatories = data.map((item) => item.id);
  const handleSubmit = async () => {
    let validation = ValidationForm();
    if (validation) {
      let param = {
        values: {
          mandatory_ids: mandatories,
          vendor: state.product,
        },
        url: vendor_specific,
      };
      dispatch(post_data(param))
        .then((res) => {
          // console.log('login res => ',res);
          const result = res?.payload;
          if (result?.status === 201) {
            alertSuccessFun("Successfully added");
            setState((prevState) => {
              return {
                ...prevState,
                call_api: true,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      //   try {
      //       const result = await axios.post(vendor_specific,
      //           {
      //             mandatory_ids: mandatories,
      //               vendor:state.product
      //           },
      //           { headers: {"Authorization" : `Bearer ${access}`} }
      //           )

      //       if(result.status === 201){
      //           alertSuccessFun("Successfully added")
      //           setState((prevState)=> {
      //             return {
      //                 ...prevState,
      //                 call_api: true
      //             }
      //           })
      //       }
      //   } catch (error) {
      //       console.log(error);
      //   }
      //   props.setState((prevState)=> {
      //       return {
      //           ...prevState,
      //           refresh: true
      //       }
      //   })
    }
  };

  const alertSuccessFun = (msg) => {
    setSnackbarStatus({ isOpen: true, severity: "success", message: msg });
  };

  return (
    <Container>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      <Heading name="Vendor Specific Fields" />
      <FilterContainer>
        <Label className="sub-head">Select Vendor</Label>
        <HeadDiv className="first">
          <AgentDiv>
            <SelectBoxLabel
              selectType="EmployeeName"
              required={state.formErrors.product}
              datas={state.vendor_list}
              handleChange={handleSelectChange}
              name="product"
              value={state.product}
              default="Select Vendor"
              fpadding="9.5px 14px"
              fsize="12px"
              min_width={390}
            />
          </AgentDiv>
        </HeadDiv>
        <HeadDiv className="secondary">
          {state?.mandatory_list?.map((mandatory, index) => {
            return (
              <>
                <CheckContainer
                  onClick={() =>
                    handleCheckBox(mandatory.id, mandatory.mandatory_field)
                  }
                  key={index}
                >
                  {mandatory.mandatory_field ? (
                    <CustomCheckBox
                      ticked={data.some((item) => item.id === mandatory.id)}
                    />
                  ) : (
                    ""
                  )}
                  <Label className="check-label">
                    {mandatory.mandatory_field}
                  </Label>
                </CheckContainer>
              </>
            );
          })}
        </HeadDiv>
        <HeadDiv className="secondary modal-button">
          {permission && (
            <TableButton
              type="button"
              bcolor="#64A7DC"
              fcolor="#fff"
              value="Add"
              onClick={handleSubmit}
            />
          )}
        </HeadDiv>
      </FilterContainer>
    </Container>
  );
}

export default VendorSpecificField;

const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 12px;
  padding: 8px 25px;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.5;
`;

const CheckContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  padding: 15px;
`;
const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.first {
    margin-bottom: 15px;
  }
  &.secondary {
    display: flex;
    justify-content: flex-start;
    list-style: none;
    align-items: stretch;
    gap: 20px;
    margin: 2%;
    flex-wrap: wrap;
    width: 100%;
  }
  &.modal-button {
    margin-top: 15px;
  }
`;
const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 22px 95px 22px 40px;
  margin: 15px 0px;
  width: 87%;
`;
const AgentDiv = styled.div`
  font-size: 16px;
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  &.agent {
    width: 35%;
  }
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #444445;
  &.date-label {
    margin-right: 66px;
  }
  &.sub-head {
    font-size: 14px;
    font-weight: 700;
    color: #727b84;
  }
  &.check-label {
    font-size: 12px;
    font-weight: 400;
    color: #000000;
  }
`;
