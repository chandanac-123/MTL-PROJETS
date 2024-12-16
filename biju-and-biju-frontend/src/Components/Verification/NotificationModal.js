import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import NotificationModalForm from "./NotificationModalForm";
import Badge from "@mui/material/Badge";
import { remark_read } from "../../Api/VerificationApis";
import axios from "axios";
import { selectAccess } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { patch_data } from "../../Store/common/commonSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 665,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
  width: "100%",
};

export default function NotificationModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const access = useSelector(selectAccess);

  const remarks_id = props.reportReceived
    ? props?.data?.assign_verification_id?.verification_address?.address_remarks.map(
        (item) => item.id
      )
    : props?.data?.verification_address?.address_remarks.map((item) => item.id);

  const handleOpen = async () => {
    setOpen(true);
    let param = {
      values: {
        remark_ids: remarks_id,
      },
      url:
        remark_read +
        (props.reportReceived
          ? props?.data?.assign_verification_id?.id
          : props?.data?.id) +
        "/",
    };

    dispatch(patch_data(param))
      .then((res) => {
        // console.log('login res => ',res);
        const result = res?.payload;
      })
      .catch((err) => {
        console.error(err);
      });

    // try {
    // await axios.patch(remark_read+(props.reportReceived?props?.data?.assign_verification_id?.id:props?.data?.id)+'/',
    //   {
    //     "remark_ids":remarks_id,
    //   },
    //     { headers: { Authorization: `Bearer ${access}` } }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    props.setState((prevState) => {
      return {
        ...prevState,
        refresh: true,
      };
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <BadgeItem badgeContent={props.count} color="primary">
        <TableButton
          type="button"
          bcolor={props.bcolor}
          fcolor="#fff"
          value="Remarks"
          onClick={handleOpen}
        />
      </BadgeItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          {props.reportReceived ? (
            <NotificationModalForm
              setOpen={setOpen}
              setState={props.setState}
              datas={props}
              reportReceived={props.reportReceived}
            />
          ) : (
            <NotificationModalForm
              setOpen={setOpen}
              setState={props.setState}
              reportReceived={props.reportReceived}
              datas={props.data}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
`;

const BadgeItem = styled(Badge)`
  span {
    background-color: #fff !important;
    border: 1px solid red;
    color: red;
  }
`;
