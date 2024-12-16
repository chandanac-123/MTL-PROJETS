import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { edit_user } from "../../Api/UserApis";
import {
  vendor_dropdown,
  district_dropdown,
  product_dropdown,
} from "../../Api/DropDownApis";
import ButtonItem from "../ButtonItem";
import NormalList from "../Common/NormalList";
import RedStarItem from "../Common/RedStarItem";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { get_data, patch_data_file } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";

function UserSettingsEditModalForm(props) {
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);
  const [state, setState] = useState({
    districts: [],
    assigned_districts: [],
    vendors: [],
    assigned_vendors: [],
    products: [],
    assigned_products: [],
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
          getProducts: props.instance?.vendors_assigned?.length ? true : false,
        };
      });
    }
  }, [props?.is_edit]);

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
      //                     vendors:result.data,
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
      //                     districts:district_result.data,
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

      // try {
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

      // } catch (error) {
      //     console.log(error);
      // }
    }
    if (state.getProducts) {
      fetchMyAPI();
    }
  }, [state.getProducts]);

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
        };
      });
    }
  }, [props?.is_edit]);

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
              props.setState((prevState) => {
                return {
                  ...prevState,
                  refresh: true,
                };
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // try {
        //     data.append('userdistricts',JSON.stringify (selectedDistricts))
        //     data.append('vendorsassigned',JSON.stringify (selectedVendors))
        //     data.append('productsassigned',JSON.stringify (selectedProducts))
        //     const result = await axios.patch(edit_user + state.id,data,{ headers: { Authorization: `Bearer ${access}`,"Content-Type": "multipart/form-data"} })
        //     if(result.status === 200){
        //         alertSuccessFun("Updated Successfully")
        //         handleModelClose()
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
      }
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

  // let assigned_districts = state.districts.filter((i)=> state.assigned_districts.includes(i.id))
  // let assigned_vendors = state.vendors.filter((i)=> state.assigned_vendors.includes(i.id))
  // let assigned_products = state.products.filter((i)=> state.assigned_products.includes(i.id))

  let selectedDistricts = state?.assigned_districts?.map((item) => item.id);
  let selectedVendors = state?.assigned_vendors?.map((item) => item.id);
  let selectedProducts = state?.assigned_products?.map((item) => item.id);
  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>Edit Vendor Product and District</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          {/* <img src={require('../../Assets/images/close-square.png')} /> */}
        </SubHead>
      </HeadSection>
      <FormSection>
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
                selectedItems={state.assigned_vendors}
                name="vendor"
                showAll={true}
              />
            </ItemSection>
          </div>
        </ItemRow>
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
        <LastSection>
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
            name="Save"
            handleClick={handleSubmit}
            type="contained"
            color="#fff"
            bgColor="#132756"
            fsize="16px"
            fweight="500"
            fpadding="5px 105px"
            bradius="8px"
          />
        </LastSection>
      </ButtonSection>
    </FormContainer>
  );
}

export default UserSettingsEditModalForm;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`;

const LastSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88%;
  gap: 50px;
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
  height: 500px;
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
const UploadSection = styled.div`
  padding: 25px 25px 0px 25px;
`;
const ButtonSection = styled.div`
  /* padding: 40px; */
  width: 100%;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  /* margin-top: 50px; */
`;
