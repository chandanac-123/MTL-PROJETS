import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ButtonItem from "../ButtonItem";
import CheckBoxItem from "../Common/CheckBoxItem";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { online_report } from "../../Api/VerificationApis";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import TextFieldItem from "../Common/TextFieldItem";
import RV_VerificationForm from "./RV_VerificationForm";
import BV_VerificationForm from "./BV_VerificationForm";
import PV_VerificationForm from "./PV_VerificationForm";
import PD_VerificationForm from "./PD_VerificationForm";
import { GetImageUrl } from "../../Functions/utils";
import LinearProgress from "@mui/material/LinearProgress";
import { patch_data } from "../../Store/common/commonSlice";
import { useDispatch } from "react-redux";

function VerificationReportModalForm(props) {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const access = useSelector(selectAccess);
  const [loading, setLoading] = useState(false);
  const [shouldOpen, setShouldOpen] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [state, setState] = useState({
    reports: [],
    remark: props?.datas?.assign_verification_id?.online_report_remarks
      ? props?.datas?.assign_verification_id?.online_report_remarks
      : "",
  });

  const handleDownload = async () => {
    setLoading(true);
    const sections = componentRef.current.getElementsByClassName("section");
    const pdf = new jsPDF("p", "mm", [223, 297]);

    const MAX_SECTION_HEIGHT = 800;
    const SECTION_MARGIN_TOP = 10;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionHeight = section.offsetHeight;

      if (sectionHeight > MAX_SECTION_HEIGHT) {
        const numPages = Math.ceil(sectionHeight / MAX_SECTION_HEIGHT);
        for (let j = 0; j < numPages; j++) {
          const pageHeight = (j + 1) * MAX_SECTION_HEIGHT;
          const canvas = await html2canvas(section, {
            scale: 3,
            height: pageHeight,
            y: j * MAX_SECTION_HEIGHT + SECTION_MARGIN_TOP,
          });
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          if (i > 0 || j > 0) {
            pdf.addPage();
          }
          pdf.addImage(
            imgData,
            "JPEG",
            6,
            2,
            211,
            (pageHeight - SECTION_MARGIN_TOP) / 3
          );
        }
      } else {
        const canvas = await html2canvas(section, {
          scale: 3,
          height: sectionHeight,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(
          imgData,
          "JPEG",
          6,
          2 + SECTION_MARGIN_TOP / 3,
          211,
          (sectionHeight - SECTION_MARGIN_TOP) / 3
        );
      }
    }

    pdf.save("form.pdf");
    setLoading(false);
    if (shouldOpen) {
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    }
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

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    let param = {
      values: {
        online_report_remarks: state.remark,
        id: props.datas.assign_verification_id.id,
      },
      url: online_report + props.datas.assign_verification_id.id + "/",
    };

    dispatch(patch_data(param))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
        if (result?.status === 200) {
          handleClose();
        }
      })
      .catch((err) => {
        console.error(err);
      });

    //   try{
    //       const result = await axios.patch(online_report+props.datas.assign_verification_id.id + "/",
    //           {
    //             online_report_remarks: state.remark,
    //             id:props.datas.assign_verification_id.id
    //           },
    //           { headers: {"Authorization" : `Bearer ${access}`} }
    //           )

    //       if(result.status === 200){
    //          handleClose()
    //       }
    //   } catch (error) {
    //       console.log(error);
    //   }
    props.setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  };

  return (
    <FormContainer>
      <HeadSection>
        <SubHead className="icons">
          {/* <img src={require('../../Assets/images/arrow-circle-leftarrow.png')} /> */}
        </SubHead>
        <SubHead>
          <Title>Verification Report</Title>
        </SubHead>
        <SubHead className="icons" onClick={() => props.setOpen(false)}>
          <img src={require("../../Assets/images/close-square.png")} />
        </SubHead>
      </HeadSection>
      <div ref={componentRef} id="scrollableForm">
        <FormSection>
          {props?.datas?.assign_verification_id?.verification_address
            ?.fi_type == "RV" && <RV_VerificationForm datas={props?.datas} />}
          {props?.datas?.assign_verification_id?.verification_address
            ?.fi_type == "BV" && <BV_VerificationForm datas={props?.datas} />}
          {props?.datas?.assign_verification_id?.verification_address
            ?.fi_type == "PV" && <PV_VerificationForm datas={props?.datas} />}
          {props?.datas?.assign_verification_id?.verification_address
            ?.fi_type == "PD" && <PD_VerificationForm datas={props?.datas} />}
          <div className="section">
            <CenterSection>
              <ImgContainer>
                <ColumnDiv className="unset-wd">
                  {props?.datas?.assign_verification_id?.image_1 ? (
                    <img
                      style={{ width: "100%", height: "125px" }}
                      src={GetImageUrl(
                        props?.datas?.assign_verification_id?.image_1
                      )}
                    />
                  ) : null}
                </ColumnDiv>
                {props?.datas?.assign_verification_id?.image_1_latlong ? (
                  <>
                    <ImgDescription>
                      {
                        props?.datas?.assign_verification_id?.image_1_latlong[0]
                          ?.latitude
                      }
                    </ImgDescription>
                    <ImgDescription>
                      {
                        props?.datas?.assign_verification_id?.image_1_latlong[0]
                          ?.longitude
                      }
                    </ImgDescription>
                  </>
                ) : null}
              </ImgContainer>
              <ImgContainer>
                <ColumnDiv className="unset-wd">
                  {props?.datas?.assign_verification_id?.image_2 ? (
                    <img
                      style={{ width: "100%", height: "125px" }}
                      src={GetImageUrl(
                        props?.datas?.assign_verification_id?.image_2
                      )}
                    />
                  ) : null}
                </ColumnDiv>
                {props?.datas?.assign_verification_id?.image_2_latlong ? (
                  <>
                    <ImgDescription>
                      {
                        props?.datas?.assign_verification_id?.image_2_latlong[0]
                          ?.latitude
                      }
                    </ImgDescription>
                    <ImgDescription>
                      {
                        props?.datas?.assign_verification_id?.image_2_latlong[0]
                          ?.longitude
                      }
                    </ImgDescription>
                  </>
                ) : null}
              </ImgContainer>
              <ImgContainer>
                <ColumnDiv className="unset-wd">
                  {props?.datas?.assign_verification_id?.image_3 ? (
                    <img
                      style={{ width: "100%", height: "125px" }}
                      src={GetImageUrl(
                        props?.datas?.assign_verification_id?.image_3
                      )}
                    />
                  ) : null}
                </ColumnDiv>
                {props?.datas?.assign_verification_id?.image_3_latlong ? (
                  <>
                    <ImgDescription>
                      {
                        props?.datas?.assign_verification_id?.image_3_latlong[0]
                          ?.latitude
                      }
                    </ImgDescription>
                    <ImgDescription>
                      {
                        props?.datas?.assign_verification_id?.image_3_latlong[0]
                          ?.longitude
                      }
                    </ImgDescription>
                  </>
                ) : null}
              </ImgContainer>
            </CenterSection>
            <TopSection>
              <ItemRow className="bottom-section">
                <LabelSection>
                  <Label className="secondary">Remarks</Label>
                </LabelSection>
                <TextFieldItem
                  textField="Text"
                  multiLine={true}
                  row={4}
                  width="380px"
                  handleChange={handleChange}
                  name="remark"
                  value={state.remark}
                ></TextFieldItem>
              </ItemRow>
            </TopSection>
          </div>
          <div className="section">
            <TopSection>
              <ItemRow className="bottom-section">
                <LabelSection>
                  <Label className="secondary">Report</Label>
                </LabelSection>
                <ItemSection className="bottom-section">
                  <SpanValue className="">
                    {props?.datas?.assign_verification_id?.formdata[0]?.online_report
                      ?.split("\n")
                      ?.map((item) => (
                        <>
                          {item}
                          <br />
                          <br />
                        </>
                      ))}
                  </SpanValue>
                </ItemSection>
              </ItemRow>
            </TopSection>
            <SignatureSection>
              <Label className="signature">Authorised signatory</Label>
              <ColumnDiv></ColumnDiv>
            </SignatureSection>
          </div>
          <CheckBoxSection>
            {/* <CheckBoxItem label="Open PDF in Browser" ticked={shouldOpen} handleChange={()=>setShouldOpen(!shouldOpen) } /> */}
            {/* <Label className='signature'>Authorised signatory</Label> */}
          </CheckBoxSection>
          <CheckBoxSection className="column-dir">
            <ButtonItem
              handleClick={loading ? null : handleDownload}
              name={loading ? "Downloading.." : "Download PDF"}
              type="contained"
              color="#fff"
              bgColor="#64A7DC"
              fsize="12px"
              fweight="700"
              fpadding="6px 12px"
              bradius="8px"
            />
            {loading ? (
              <LinearProgress style={{ width: "70%", marginTop: "10px" }} />
            ) : null}
          </CheckBoxSection>
        </FormSection>
      </div>
      <ButtonSection>
        <ButtonItem
          name="Done"
          handleClick={handleSubmit}
          type="contained"
          color="#fff"
          bgColor="#132756"
          fsize="16px"
          fweight="500"
          fpadding="6px 100px"
          bradius="8px"
        />
      </ButtonSection>
    </FormContainer>
  );
}

export default VerificationReportModalForm;

const CheckBoxSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.bottom {
    align-items: flex-start;
    margin-top: 20px;
  }
  &.justi-start {
    justify-content: flex-start;
    gap: 10px;
  }
  &.column-dir {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const ColumnDiv = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 25px;
  width: 22%;
  height: 100px;
  &.unset-wd {
    width: unset;
    height: 120px;
  }
`;
const CenterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const SpanValue = styled.span`
  color: #000000;
  font-size: 12px;
  font-weight: 400;
  &.important {
    font-size: 14px;
    font-weight: 700;
  }
  &.secondary {
    color: #444445;
  }
`;
const TopSection = styled.div`
  padding: 25px;
`;
const BorderItem = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  &.heading {
    margin-bottom: 35px;
  }
  &.bottom-section {
    align-items: flex-start;
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
  &.heading {
    font-size: 14px;
  }
  &.signature {
    margin-right: 60px;
  }
`;
const ItemSection = styled.div`
  width: 60%;
  margin-right: 22px;
  &.bottom-section {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    margin-right: 15px;
    margin-right: 0px;
    height: auto;
    padding: 15px;
  }
`;
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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
  justify-content: flex-end;
  align-items: center;
  /* margin-top: 50px; */
`;
const SignatureSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  justify-content: center;
`;

const ImgDescription = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 30%;
`;
