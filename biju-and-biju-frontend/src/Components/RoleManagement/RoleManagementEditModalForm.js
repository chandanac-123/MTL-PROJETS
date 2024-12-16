import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import NormalList from "../Common/NormalList";
import RedStarItem from "../Common/RedStarItem";
import RadioGroups from "../RadioGroups";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { product_api, vendor_api, edit_user } from "../../Api/UserApis";
import {
  vendor_dropdown,
  district_dropdown,
  product_dropdown,
} from "../../Api/DropDownApis";
import { useDispatch } from "react-redux";
import { get_data, patch_data_file } from "../../Store/common/commonSlice";

function RoleManagementEditModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [initialState, setInitialState] = useState();
  const [state, setState] = useState({
    isactive: "",
    assigned_district: "",
    assigned_vendor: "",
    assigned_product: "",
    districts: [],
    assigned_districts: [],
    vendors: [],
    assigned_vendors: [],
    products: [],
    assigned_products: [],
    usertype: "",
    designation: "",
    getProducts: false,
    formErrors: {},
  });

  useEffect(() => {
    if (props.is_edit) {
      setState((prevState) => {
        return {
          ...prevState,
          id: props.instance.id,
          user_districts: props.instance.user_districts,
          vendors_assigned: props.instance.vendors_assigned,
          products_assigned: props.instance.products_assigned,
          assigned_vendors: props.instance.vendors_assigned,
          assigned_products: props.instance.products_assigned,
          assigned_districts: props.instance.user_districts,
          isactive: props.instance.isactive,
          designation: props.instance.usertype,
          getProducts: props.instance.vendors_assigned?.length ? true : false,
        };
      });
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
                vendors: result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const result = await axios.get(vendor_dropdown,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     vendors: result.data,
      //                 }
      //             })
      //         }
      // } catch (error) {
      //     console.log(error);
      // }

      dispatch(get_data(district_dropdown))
        .then((res) => {
          // console.log('login res => ',res);
          const district_result = res?.payload;
          if (res?.payload?.status === 200) {
            setState((prevState) => {
              return {
                ...prevState,
                districts: district_result.data,
              };
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      // try {
      //     const district_result = await axios.get(district_dropdown,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(district_result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     districts: district_result.data,
      //                 }
      //             })
      //         }
      // } catch (error) {
      //     console.log(error);
      // }
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    let selectedVendors = state?.assigned_vendors?.map((item) => item.id);
    async function fetchMyAPI() {
      if (selectedVendors?.length) {
        dispatch(get_data(product_dropdown + `?vendor__in=${selectedVendors}`))
          .then((res) => {
            // console.log('login res => ',res);
            const product_result = res?.payload;
            if (res?.payload?.status === 200) {
              setState((prevState) => {
                return {
                  ...prevState,
                  products: product_result.data,
                  getProducts: false,
                };
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setState((prevState) => {
          return {
            ...prevState,
            products: [],
            getProducts: false,
          };
        });
      }

      //   try {
      //     if(selectedVendors?.length){
      //         const product_result = await axios.get(product_dropdown+`?vendor__in=${selectedVendors}`,
      //         { headers: {"Authorization" : `Bearer ${access}`} })
      //         if(product_result.status === 200){
      //             setState((prevState)=> {
      //                 return {
      //                     ...prevState,
      //                     products: product_result.data,
      //                     getProducts:false
      //                 }
      //             })
      //         }
      //     }else {
      //         setState((prevState)=> {
      //             return {
      //                 ...prevState,
      //                 products: [],
      //                 getProducts:false
      //             }
      //         })
      //     }

      //   } catch (error) {
      //       console.log(error);
      //   }
    }
    if (state.getProducts) {
      fetchMyAPI();
    }
  }, [state.getProducts]);

  const handleRadioChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleClick = (value, name) => {
    let formErrors = state.formErrors;
    if (name === "district") {
      let assigned_districts = state.assigned_districts;
      if (value === "all") {
        if (state.districts?.length === state.assigned_districts?.length) {
          assigned_districts = [];
        } else {
          assigned_districts = state.districts?.map((item) => item);
        }
      } else {
        if (assigned_districts.includes(value) === false) {
          assigned_districts.push(value);
        }
      }
      formErrors["assigned_districts"] = false;
      setState((prevState) => {
        return {
          ...prevState,
          assigned_districts,
        };
      });
    } else if (name === "vendor") {
      let assigned_vendors = state.assigned_vendors;
      if (value === "all") {
        if (state.vendors?.length === state.assigned_vendors?.length) {
          assigned_vendors = [];
        } else {
          assigned_vendors = state.vendors?.map((item) => item);
        }
      } else {
        if (assigned_vendors.includes(value) === false) {
          assigned_vendors.push(value);
        }
      }
      formErrors["assigned_vendors"] = false;
      setState((prevState) => {
        return {
          ...prevState,
          assigned_vendors,
          getProducts: true,
        };
      });
    } else if (name === "product") {
      let assigned_products = state.assigned_products;
      if (value === "all") {
        if (state.products?.length === state.assigned_products?.length) {
          assigned_products = [];
        } else {
          assigned_products = state.products?.map((item) => item);
        }
      } else {
        if (assigned_products.includes(value) === false) {
          assigned_products.push(value);
        }
      }
      formErrors["assigned_products"] = false;
      setState((prevState) => {
        return {
          ...prevState,
          assigned_products,
        };
      });
    }
  };

  const handleClose = (value, name) => {
    if (name === "district") {
      let assigned_districts = state.assigned_districts;
      if (assigned_districts.includes(value)) {
        assigned_districts = assigned_districts.filter((i) => i != value);
      }
      setState((prevState) => {
        return {
          ...prevState,
          assigned_districts,
        };
      });
    } else if (name === "vendor") {
      let assigned_vendors = state.assigned_vendors;
      let assigned_products = state.assigned_products;
      if (assigned_vendors.includes(value)) {
        assigned_vendors = assigned_vendors.filter((i) => i != value);
        assigned_products = state.assigned_products.filter(
          (p) => p.vendor != value?.id
        );
      }
      setState((prevState) => {
        return {
          ...prevState,
          assigned_vendors,
          assigned_products,
          getProducts: true,
        };
      });
    } else if (name === "product") {
      let assigned_products = state.assigned_products;
      if (assigned_products.includes(value)) {
        assigned_products = assigned_products.filter((i) => i != value);
      }
      setState((prevState) => {
        return {
          ...prevState,
          assigned_products,
        };
      });
    }
  };

  const ValidationForm = () => {
    let validation = true;
    let formErrors = state.formErrors;
    if (!state.assigned_districts?.length) {
      formErrors["assigned_districts"] = true;
      validation = false;
    }
    if (!state.assigned_vendors?.length) {
      formErrors["assigned_vendors"] = true;
      validation = false;
    }
    if (!state.assigned_products?.length) {
      formErrors["assigned_products"] = true;
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

  const handleSubmit = async () => {
    let validation = ValidationForm();
    if (validation) {
      const data = new FormData();
      if (props.is_edit) {
        let user = {
          usertype: state.designation,
          is_active: state.isactive,
        };
        for (const key in user) {
          data.append(`user.${key}`, user[key]);
        }
        data.append("userdistricts", JSON.stringify(selectedDistricts));
        data.append("vendorsassigned", JSON.stringify(selectedVendors));
        data.append("productsassigned", JSON.stringify(selectedProducts));

        let param = {
          values: data,
          url: edit_user + state.id,
        };

        dispatch(patch_data_file(param))
          .then((res) => {
            // console.log('login res => ',res);
            const result = res?.payload;
            if (result?.status === 200) {
              alertSuccessFun("Updated Successfully");
              handleModelClose();
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // try {
        //     let user = {
        //         usertype: state.designation,
        //         is_active:state.isactive
        //     }
        //     for (const key in user) {
        //         data.append(`user.${key}`, user[key]);
        //       }
        //     data.append('userdistricts',JSON.stringify (selectedDistricts))
        //     data.append('vendorsassigned',JSON.stringify (selectedVendors))
        //     data.append('productsassigned',JSON.stringify (selectedProducts))
        //     const result = await axios.patch(edit_user + state.id,
        //     data,{ headers: {"Authorization" : `Bearer ${access}`} })
        //     if(result.status === 200){
        //         alertSuccessFun("Updated Successfully")
        //         handleModelClose()
        //     }
        // } catch (error) {
        //     console.log(error);
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

  const handleModelClose = () => {
    props.setOpen(false);
  };

  const handleSelectChange = (value, name) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let selectedDistricts = state.assigned_districts.map((item) => item.id);
  let selectedVendors = state.assigned_vendors.map((item) => item.id);
  let selectedProducts = state.assigned_products.map((item) => item.id);

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

  const designations = [
    {
      name: "GroupLeader",
      id: "GroupLeader",
    },
    {
      name: "ProductCoordinator",
      id: "ProductCoordinator",
    },
    {
      name: "TeamMember",
      id: "TeamMember",
    },
    {
      name: "DistrictCoordinator",
      id: "DistrictCoordinator",
    },
    {
      name: "ExecutiveOfficeAdmin",
      id: "ExecutiveOfficeAdmin",
    },
  ];

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          <img
            src={require("../../Assets/images/arrow-circle-leftarrow.png")}
          />
        </SubHead>
        <SubHead>
          <Title>Edit Vendor Product and District</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <FormSection>
        <ItemRow className="first">
          <LabelSection>
            <Label>
              Status
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <RadioGroups
              datas={status_datas}
              handleChange={handleRadioChange}
              value={state.isactive}
              name="isactive"
              fsize="12px"
              fweight="400"
              mr="20px"
              ssize="20px"
            />
          </ItemSection>
        </ItemRow>
        <ItemRow>
          <LabelSection>
            <Label>
              Designation
              <RedStarItem />
            </Label>
          </LabelSection>
          <ItemSection>
            <span>{props?.instance?.usertype}</span>
          </ItemSection>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Vendor
              <br />
              (Unassigned Vendor)
              <RedStarItem />
            </Label>
          </LabelSection>
          <div style={{ width: "62%" }}>
            <ItemSection className="list-item">
              <NormalList
                handleClick={handleClick}
                items={state.vendors}
                name="vendor"
                selectedItems={state.assigned_vendors}
                showAll={true}
              />
            </ItemSection>
          </div>
        </ItemRow>
        {console.log(state.assigned_districts, "state.assigned_districts")}
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Vendor
              <br />
              (Assigned Vendor)
              <RedStarItem />
            </Label>
          </LabelSection>
          <div style={{ width: "62%" }}>
            <ItemSection className="list-item">
              <NormalList
                handleClick={handleClose}
                items={state.assigned_vendors}
                name="vendor"
                is_close={true}
              />
            </ItemSection>
            {state?.formErrors?.assigned_vendors ? (
              <ErrorMsg>required</ErrorMsg>
            ) : null}
          </div>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Product
              <br />
              (Unassigned Product)
              <RedStarItem />
            </Label>
          </LabelSection>
          <div style={{ width: "62%" }}>
            <ItemSection className="list-item">
              <NormalList
                handleClick={handleClick}
                items={state.products}
                name="product"
                selectedItems={state.assigned_products}
                showAll={true}
              />
            </ItemSection>
          </div>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select Product
              <br />
              (Assigned Product)
              <RedStarItem />
            </Label>
          </LabelSection>
          <div style={{ width: "62%" }}>
            <ItemSection className="list-item">
              <NormalList
                handleClick={handleClose}
                items={state.assigned_products}
                name="product"
                is_close={true}
              />
            </ItemSection>
            {state?.formErrors?.assigned_products ? (
              <ErrorMsg>required</ErrorMsg>
            ) : null}
          </div>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select District
              <br />
              (Unassigned district)
              <RedStarItem />
            </Label>
          </LabelSection>
          <div style={{ width: "62%" }}>
            <ItemSection className="list-item">
              <NormalList
                handleClick={handleClick}
                items={state.districts}
                name="district"
                selectedItems={state.assigned_districts}
                showAll={true}
              />
            </ItemSection>
          </div>
        </ItemRow>
        <ItemRow className="flex-start">
          <LabelSection>
            <Label>
              Select District
              <br />
              (Assigned district)
              <RedStarItem />
            </Label>
          </LabelSection>
          <div style={{ width: "62%" }}>
            <ItemSection className="list-item">
              <NormalList
                handleClick={handleClose}
                items={state.assigned_districts}
                name="district"
                is_close={true}
              />
            </ItemSection>
            {state?.formErrors?.assigned_districts ? (
              <ErrorMsg>required</ErrorMsg>
            ) : null}
          </div>
        </ItemRow>
      </FormSection>
      <ButtonSection>
        {/* <LastSection> */}
        <ButtonItem
          name="Cancel"
          handleClick={handleModelClose}
          type="outlined"
          color="#252F40"
          bgColor=""
          fsize="16px"
          fweight="500"
          fpadding="6px 105px"
          bradius="8px"
        />
        <ButtonItem
          handleClick={handleSubmit}
          name="Save"
          type="contained"
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding="6px 105px"
          bradius="8px"
        />
        {/* </LastSection> */}
      </ButtonSection>
    </FormContainer>
  );
}

export default RoleManagementEditModalForm;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  &.label-top {
    align-items: flex-start;
  }
  &.flex-start {
    align-items: flex-start;
  }
  &.first {
    margin-top: 0px;
  }
`;
const LabelSection = styled.div``;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  &.secondary {
    color: #444445;
    font-size: 13px;
  }
  &.designation {
    color: #444445;
    font-weight: 400;
  }
`;
const ItemSection = styled.div`
  /* width: 62%; */
  margin-right: 15px;
  &.list-item {
    height: 108px;
    overflow-y: scroll;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  overflow-y: scroll;
  /* ::-webkit-scrollbar {
        display: none;
        } */
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
const UploadSection = styled.div`
  padding: 25px 25px 0px 25px;
`;
const ButtonSection = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
