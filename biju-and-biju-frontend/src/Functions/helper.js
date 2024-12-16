import {timeDate ,GetImageUrl,convert_date_format,get_time_from_date,calculateDuration,getDate_from_datetime,extract_date,date_conversion,GetDecryptedPaswd} from '../Functions/utils';

export const fetchExcelData=(_)=>{
    let finalData=[]
    _.map((data)=>{
      let rv =data.addresses.filter((p)=> p.fi_type === "RV")?data.addresses.filter((p)=> p.fi_type === "RV")[0]:"NA"
      let bv =data.addresses.filter((p)=> p.fi_type === "BV")?data.addresses.filter((p)=> p.fi_type === "BV")[0]:"NA"
      let pv =data.addresses.filter((p)=> p.fi_type === "PV")?data.addresses.filter((p)=> p.fi_type === "PV")[0]:"NA"
      let pd =data.addresses.filter((p)=> p.fi_type === "PD")?data.addresses.filter((p)=> p.fi_type === "PD")[0]:"NA"
    
      finalData.push({Application_Id:data.application_id,
        Vendor:data.vendor_name,
        Product:data.product_name,
        Customer_Name:data.customer_name,
        Applicant_Type:data.applicant_type,
        Residence_Address:rv?.adress,
        RV_Verification_Agent:rv?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
        Applicant_RV_Distance:rv?.verification_address[0]?.assign_verification[0]?.distance,
        Vendor_RV_TAT:rv?data.addresses.filter((p)=> p.fi_type === "RV")[0]?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
        Office_Address:bv?.adress,
        BV_Verification_Agent:bv?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
        Applicant_BV_Distance:bv?.verification_address[0]?.assign_verification[0]?.distance,
        Vendor_BV_TAT:bv?data.addresses.filter((p)=> p.fi_type === "BV")[0]?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
        PV_Address:pv?.adress,
        PV_Verification_Agent:pv?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
        Applicant_PV_Distance:pv?.verification_address[0]?.assign_verification[0]?.distance,
        Vendor_PV_TAT:pv?data.addresses.filter((p)=> p.fi_type === "PV")[0]?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
        PD_Address:bv?.adress,
        PD_Verification_Agent:pd?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
        Applicant_PD_Distance:pd?.verification_address[0]?.assign_verification[0]?.distance,
        Vendor_PD_TAT:pd?data.addresses.filter((p)=> p.fi_type === "PD")[0]?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
        FI_Date:pd?extract_date(pd?.fi_date_time):rv?extract_date(rv?.fi_date_time):pv?extract_date(pv?.fi_date_time):extract_date(bv?.fi_date_time),
        FI_Time:pd?get_time_from_date(pd?.fi_date_time):rv?get_time_from_date(rv?.fi_date_time):pv?get_time_from_date(pv?.fi_date_time):get_time_from_date(bv?.fi_date_time),
        RV_Coordinated_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
        RV_Allocated_By:rv?data?.allocated_by_name:"",
        RV_Written_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
        RV_Reported_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
        BV_Coordinated_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
        BV_Allocated_By:bv?data?.allocated_by_name:"",
        BV_Written_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
        BV_Reported_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
        PV_Coordinated_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
        PV_Allocated_By:pv?data?.allocated_by_name:"",
        PV_Written_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
        PV_Reported_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
        PD_Coordinated_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
        PD_Allocated_By:pd?data?.allocated_by_name:"",
        PD_Written_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
        PD_Reported_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
        RV_Billable:rv?data.addresses.filter((p)=> p.fi_type === "RV")[0]?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
        PV_Billable:pv?data.addresses.filter((p)=> p.fi_type === "PV")[0]?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
        BV_Billable:bv?data.addresses.filter((p)=> p.fi_type === "BV")[0]?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
        PD_Billable:pd?data.addresses.filter((p)=> p.fi_type === "PD")[0]?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
        RV_Non_Billable_Reason:rv?.verification_address[0]?.assign_verification[0]?.billable? "":rv?.verification_address[0]?.assign_verification[0]?.billable_reason,
        PV_Non_Billable_Reason:pv?.verification_address[0]?.assign_verification[0]?.billable? "":pv?.verification_address[0]?.assign_verification[0]?.billable_reason,
        BV_Non_Billable_Reason:bv?.verification_address[0]?.assign_verification[0]?.billable? "":bv?.verification_address[0]?.assign_verification[0]?.billable_reason,
        PD_Non_Billable_Reason:pd?.verification_address[0]?.assign_verification[0]?.billable? "":pd?.verification_address[0]?.assign_verification[0]?.billable_reason,
        RV_Payable:rv?data.addresses.filter((p)=> p.fi_type === "RV")[0]?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
        PV_Payable:pv?data.addresses.filter((p)=> p.fi_type === "PV")[0]?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
        BV_Payable:bv?data.addresses.filter((p)=> p.fi_type === "BV")[0]?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
        PD_Payable:pd?data.addresses.filter((p)=> p.fi_type === "PD")[0]?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
        RV_Non_Payable_Reason:rv?.verification_address[0]?.assign_verification[0]?.payable? "": rv?.verification_address[0]?.assign_verification[0]?.payable_reason,
        PV_Non_Payable_Reason:pv?.verification_address[0]?.assign_verification[0]?.payable? "": pv?.verification_address[0]?.assign_verification[0]?.payable_reason,
        BV_Non_Payable_Reason:bv?.verification_address[0]?.assign_verification[0]?.payable? "": bv?.verification_address[0]?.assign_verification[0]?.payable_reason,
        PD_Non_Payable_Reason:pd?.verification_address[0]?.assign_verification[0]?.payable? "": pd?.verification_address[0]?.assign_verification[0]?.payable_reason,
        Billing_Location_RV:rv?.verification_address[0]?.selected_billing_location?.name,
        Billing_Location_PV:pv?.verification_address[0]?.selected_billing_location?.name,
        Billing_Location_BV:bv?.verification_address[0]?.selected_billing_location?.name,
        Billing_Location_PD:pd?.verification_address[0]?.selected_billing_location?.name,
        RV_Tele_Verification:rv?data.addresses.filter((p)=> p.fi_type === "RV")[0]?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
        PV_Tele_Verification:pv?data.addresses.filter((p)=> p.fi_type === "PV")[0]?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
        BV_Tele_Verification:bv?data.addresses.filter((p)=> p.fi_type === "BV")[0]?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
        PD_Tele_Verification:pd?data.addresses.filter((p)=> p.fi_type === "PD")[0]?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
        RV_Tele_Done_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
        BV_Tele_Done_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
        PV_Tele_Done_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
        PD_Tele_Done_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
        RV_Report_Status:rv?.verification_address[0]?.status,
        PV_Report_Status:pv?.verification_address[0]?.status,
        BV_Report_Status:bv?.verification_address[0]?.status,
        PD_Report_Status:pd?.verification_address[0]?.status,
        RV_Negative_Reason:rv?.verification_address[0]?.negative_reason?.comment,
        PV_Negative_Reason:pv?.verification_address[0]?.negative_reason?.comment,
        BV_Negative_Reason:bv?.verification_address[0]?.negative_reason?.comment,
        PD_Negative_Reason:pd?.verification_address[0]?.negative_reason?.comment,
        RV_Remark:rv?.verification_address[0]?.assign_verification[0]?.remarks,
        PV_Remark:pv?.verification_address[0]?.assign_verification[0]?.remarks,
        BV_Remark:bv?.verification_address[0]?.assign_verification[0]?.remarks,
        PD_Remark:pd?.verification_address[0]?.assign_verification[0]?.remarks,
        RV_Submitted_By:rv?.verification_address[0]?.submitted_by_name,
        PV_Submitted_By:pv?.verification_address[0]?.submitted_by_name,
        BV_Submitted_By:bv?.verification_address[0]?.submitted_by_name,
        PD_Submitted_By:pd?.verification_address[0]?.submitted_by_name,
        RV_Img_Received:rv?.verification_address[0]?.img_recieved_through,
        PV_Img_Received:pv?.verification_address[0]?.img_recieved_through,
        BV_Img_Received:bv?.verification_address[0]?.img_recieved_through,
        PD_Img_Received:pd?.verification_address[0]?.img_recieved_through,
        RV_District:rv?.adress_district?.name,
        PV_District:pv?.adress_district?.name,
        BV_District:bv?.adress_district?.name,
        PD_District:pd?.adress_district?.name,
        RV_Allocation_Delay:rv?.allocation_delay,
        PV_Allocation_Delay:pv?.allocation_delay,
        BV_Allocation_Delay:bv?.allocation_delay,
        PD_Allocation_Delay:pd?.allocation_delay,
        Assigned_Verification_Delay_RV:rv?.verification_address[0]?.assigned_delay,
        Assigned_Verification_Delay_PV:pv?.verification_address[0]?.assigned_delay,
        Assigned_Verification_Delay_BV:bv?.verification_address[0]?.assigned_delay,
        Assigned_Verification_Delay_PD:pd?.verification_address[0]?.assigned_delay,
        RV_Report_Received:rv?.verification_address[0]?.ver_recieved?timeDate(rv?.verification_address[0]?.ver_recieved):"",
        PV_Report_Received:pv?.verification_address[0]?.ver_recieved?timeDate(pv?.verification_address[0]?.ver_recieved):"",
        BV_Report_Received:bv?.verification_address[0]?.ver_recieved?timeDate(bv?.verification_address[0]?.ver_recieved):"",
        PD_Report_Received:pd?.verification_address[0]?.ver_recieved?timeDate(pd?.verification_address[0]?.ver_recieved):"",
        RV_Report_Received_Delay:rv?.verification_address[0]?.recievedDelay,
        PV_Report_Received_Delay:pv?.verification_address[0]?.recievedDelay,
        BV_Report_Received_Delay:bv?.verification_address[0]?.recievedDelay,
        PD_Report_Received_Delay:pd?.verification_address[0]?.recievedDelay,
        RV_Report_Submitted_Date:rv?.verification_address[0]?.submitted_at?extract_date(rv?.verification_address[0]?.submitted_at):"",
        RV_Report_Submitted_Time:rv?.verification_address[0]?.submitted_at?get_time_from_date(rv?.verification_address[0]?.submitted_at):"",
        PV_Report_Submitted_Date:pv?.verification_address[0]?.submitted_at?extract_date(pv?.verification_address[0]?.submitted_at):"",
        PV_Report_Submitted_Time:pv?.verification_address[0]?.submitted_at?get_time_from_date(pv?.verification_address[0]?.submitted_at):"",
        BV_Report_Submitted_Date:bv?.verification_address[0]?.submitted_at?extract_date(bv?.verification_address[0]?.submitted_at):"",
        BV_Report_Submitted_Time:bv?.verification_address[0]?.submitted_at?get_time_from_date(bv?.verification_address[0]?.submitted_at):"",
        PD_Report_Submitted_Date:pd?.verification_address[0]?.submitted_at?extract_date(pd?.verification_address[0]?.submitted_at):"",
        PD_Report_Submitted_Time:pd?.verification_address[0]?.submitted_at?get_time_from_date(pd?.verification_address[0]?.submitted_at):"",
        RV_Submitted_Delay:rv?.verification_address[0]?.submitted_delay,
        PV_Submitted_Delay:pv?.verification_address[0]?.submitted_delay,
        BV_Submitted_Delay:bv?.verification_address[0]?.submitted_delay,
        PD_Submitted_Delay:pd?.verification_address[0]?.submitted_delay,
        RV_Remark_1:rv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value1,
        RV_Remark_2:rv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value2,
        RV_Remark_3:rv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value3,
        PV_Remark_1:pv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value1,
        PV_Remark_2:pv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value2,
        PV_Remark_3:pv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value3,
        BV_Remark_1:bv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value1,
        BV_Remark_2:bv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value2,
        BV_Remark_3:bv?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value3,
        PD_Remark_1:pd?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value1,
        PD_Remark_2:pd?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value2,
        PD_Remark_3:pd?.verification_address[0]?.assign_verification[0]?.additional_remarks?.value3,
      })
    })
    return finalData
  }

  export const fetchExcelImageData=(_)=>{
    let finalData=[]
    _.map((data)=>{
        finalData.push({Customer_ID:data.application_id,
            Vendor:data.vendor,
            Verification_Agent_Name:data.verification_agent,
            District:data.district,
            Image_1:GetImageUrl(data.assign_verification_id?.image_1),
            Image_2:GetImageUrl(data.assign_verification_id?.image_2),
            Image_3:GetImageUrl(data.assign_verification_id?.image_3),
        })
    })
    return finalData
}

export const reportEditConfirmExcelData=(_)=>{
  let finalData=[]
  _.map((data)=>{
    let rv =data.addresses.filter((p)=> p.fi_type === "RV")?data.addresses.filter((p)=> p.fi_type === "RV")[0]:"NA"
    let bv =data.addresses.filter((p)=> p.fi_type === "BV")?data.addresses.filter((p)=> p.fi_type === "BV")[0]:"NA"
    let pv =data.addresses.filter((p)=> p.fi_type === "PV")?data.addresses.filter((p)=> p.fi_type === "PV")[0]:"NA"
    let pd =data.addresses.filter((p)=> p.fi_type === "PD")?data.addresses.filter((p)=> p.fi_type === "PD")[0]:"NA"
  
    finalData.push({Application_Id:data.application_id,
      Vendor:data.vendor_name,
      Product:data.product_name,
      Customer_Name:data.customer_name,
      Residence_Address:rv?.adress,
      RV_Verification_Agent:rv?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
      Applicant_RV_Distance:rv?.verification_address[0]?.assign_verification[0]?.distance,
      Vendor_RV_TAT:rv?.verification_address[0]?.is_TATin?rv?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
      Office_Address:bv?.adress,
      BV_Verification_Agent:bv?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
      Applicant_BV_Distance:bv?.verification_address[0]?.assign_verification[0]?.distance,
      Vendor_BV_TAT:bv?.verification_address[0]?.is_TATin?bv?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
      PV_Address:pv?.adress,
      PV_Verification_Agent:pv?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
      Applicant_PV_Distance:pv?.verification_address[0]?.assign_verification[0]?.distance,
      Vendor_PV_TAT:pv?.verification_address[0]?.is_TATin?pv?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
      PD_Address:bv?.adress,
      PD_Verification_Agent:pd?.verification_address[0]?.assigned_verification_users.filter((i)=>i.status==true)[0]?.fieldagentname,
      Applicant_PD_Distance:pd?.verification_address[0]?.assign_verification[0]?.distance,
      Vendor_PD_TAT:pd?.verification_address[0]?.is_TATin?pd?.verification_address[0]?.is_TATin===true?"IN":"OUT":"",
      FI_Date:pd?extract_date(pd?.fi_date_time):rv?extract_date(rv?.fi_date_time):pv?extract_date(pv?.fi_date_time):extract_date(bv?.fi_date_time),
      FI_Time:pd?get_time_from_date(pd?.fi_date_time):rv?get_time_from_date(rv?.fi_date_time):pv?get_time_from_date(pv?.fi_date_time):get_time_from_date(bv?.fi_date_time),
      RV_Coordinated_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
      RV_Allocated_By:rv?data?.allocated_by_name:"",
      RV_Written_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
      RV_Reported_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
      BV_Coordinated_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
      BV_Allocated_By:bv?data?.allocated_by_name:"",
      BV_Written_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
      BV_Reported_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
      PV_Coordinated_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
      PV_Allocated_By:pv?data?.allocated_by_name:"",
      PV_Written_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
      PV_Reported_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
      PD_Coordinated_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.coordinated_by_name,
      PD_Allocated_By:pd?data?.allocated_by_name:"",
      PD_Written_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.written_by_name,
      PD_Reported_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.reported_by_name,
      RV_Billable:rv?rv?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
      PV_Billable:pv?pv?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
      BV_Billable:bv?bv?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
      PD_Billable:pd?pd?.verification_address[0]?.assign_verification[0]?.billable? "Yes": "No":"",
      RV_Non_Billable_Reason:rv?.verification_address[0]?.assign_verification[0]?.billable? "":rv?.verification_address[0]?.assign_verification[0]?.billable_reason,
      PV_Non_Billable_Reason:pv?.verification_address[0]?.assign_verification[0]?.billable? "":pv?.verification_address[0]?.assign_verification[0]?.billable_reason,
      BV_Non_Billable_Reason:bv?.verification_address[0]?.assign_verification[0]?.billable? "":bv?.verification_address[0]?.assign_verification[0]?.billable_reason,
      PD_Non_Billable_Reason:pd?.verification_address[0]?.assign_verification[0]?.billable? "":pd?.verification_address[0]?.assign_verification[0]?.billable_reason,
      RV_Payable:rv?rv?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
      PV_Payable:pv?pv?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
      BV_Payable:bv?bv?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
      PD_Payable:pd?pd?.verification_address[0]?.assign_verification[0]?.payable? "Yes": "No":"",
      RV_Non_Payable_Reason:rv?.verification_address[0]?.assign_verification[0]?.payable? "": rv?.verification_address[0]?.assign_verification[0]?.payable_reason,
      PV_Non_Payable_Reason:pv?.verification_address[0]?.assign_verification[0]?.payable? "": pv?.verification_address[0]?.assign_verification[0]?.payable_reason,
      BV_Non_Payable_Reason:bv?.verification_address[0]?.assign_verification[0]?.payable? "": bv?.verification_address[0]?.assign_verification[0]?.payable_reason,
      PD_Non_Payable_Reason:pd?.verification_address[0]?.assign_verification[0]?.payable? "": pd?.verification_address[0]?.assign_verification[0]?.payable_reason,
      Billing_Location_RV:rv?.verification_address[0]?.selected_billing_location?.name,
      Billing_Location_PV:pv?.verification_address[0]?.selected_billing_location?.name,
      Billing_Location_BV:bv?.verification_address[0]?.selected_billing_location?.name,
      Billing_Location_PD:pd?.verification_address[0]?.selected_billing_location?.name,
      RV_Tele_Verification:rv?rv?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
      PV_Tele_Verification:pv?pv?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
      BV_Tele_Verification:bv?bv?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
      PD_Tele_Verification:pd?pd?.verification_address[0]?.assign_verification[0]?.tele_verification? "Yes": "No":"",
      RV_Tele_Done_By:rv?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
      BV_Tele_Done_By:bv?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
      PV_Tele_Done_By:pv?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
      PD_Tele_Done_By:pd?.verification_address[0]?.assign_verification[0]?.employees_names?.tele_by_name,
      RV_Report_Status:rv?.verification_address[0]?.status,
      PV_Report_Status:pv?.verification_address[0]?.status,
      BV_Report_Status:bv?.verification_address[0]?.status,
      PD_Report_Status:pd?.verification_address[0]?.status,
      RV_Negative_Reason:rv?.verification_address[0]?.negative_reason?.comment,
      PV_Negative_Reason:pv?.verification_address[0]?.negative_reason?.comment,
      BV_Negative_Reason:bv?.verification_address[0]?.negative_reason?.comment,
      PD_Negative_Reason:pd?.verification_address[0]?.negative_reason?.comment,
      RV_Remark:rv?.verification_address[0]?.assign_verification[0]?.remarks,
      PV_Remark:pv?.verification_address[0]?.assign_verification[0]?.remarks,
      BV_Remark:bv?.verification_address[0]?.assign_verification[0]?.remarks,
      PD_Remark:pd?.verification_address[0]?.assign_verification[0]?.remarks,
      RV_Submitted_By:rv?.verification_address[0]?.submitted_by_name,
      PV_Submitted_By:pv?.verification_address[0]?.submitted_by_name,
      BV_Submitted_By:bv?.verification_address[0]?.submitted_by_name,
      PD_Submitted_By:pd?.verification_address[0]?.submitted_by_name,
      RV_Img_Received:rv?.verification_address[0]?.img_recieved_through,
      PV_Img_Received:pv?.verification_address[0]?.img_recieved_through,
      BV_Img_Received:bv?.verification_address[0]?.img_recieved_through,
      PD_Img_Received:pd?.verification_address[0]?.img_recieved_through,
      RV_District:rv?.adress_district?.name,
      PV_District:pv?.adress_district?.name,
      BV_District:bv?.adress_district?.name,
      PD_District:pd?.adress_district?.name,
      RV_Verification_Delay:rv?.allocation_delay,
      PV_Verification_Delay:pv?.allocation_delay,
      BV_Verification_Delay:bv?.allocation_delay,
      PD_Verification_Delay:pd?.allocation_delay,
      Assigned_Verification_Delay_RV:rv?.verification_address[0]?.assigned_delay,
      Assigned_Verification_Delay_PV:pv?.verification_address[0]?.assigned_delay,
      Assigned_Verification_Delay_BV:bv?.verification_address[0]?.assigned_delay,
      Assigned_Verification_Delay_PD:pd?.verification_address[0]?.assigned_delay,
      RV_Report_Received:rv?.verification_address[0]?.ver_recieved?timeDate(rv?.verification_address[0]?.ver_recieved):"",
      PV_Report_Received:pv?.verification_address[0]?.ver_recieved?timeDate(pv?.verification_address[0]?.ver_recieved):"",
      BV_Report_Received:bv?.verification_address[0]?.ver_recieved?timeDate(bv?.verification_address[0]?.ver_recieved):"",
      PD_Report_Received:pd?.verification_address[0]?.ver_recieved?timeDate(pd?.verification_address[0]?.ver_recieved):"",
      RV_Report_Submitted:rv?.verification_address[0]?.submitted_at?timeDate(rv?.verification_address[0]?.submitted_at):"",
      PV_Report_Submitted:pv?.verification_address[0]?.submitted_at?timeDate(pv?.verification_address[0]?.submitted_at):"",
      BV_Report_Submitted:bv?.verification_address[0]?.submitted_at?timeDate(bv?.verification_address[0]?.submitted_at):"",
      PD_Report_Submitted:pd?.verification_address[0]?.submitted_at?timeDate(pd?.verification_address[0]?.submitted_at):"",
    })
  })
  return finalData
}


export const fetchExcelReportReceived=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({Customer_ID:data?.assign_verification_id?.verification_address?.verification?.application_id,
        Customer_Name:data?.assign_verification_id?.verification_address?.verification?.customer_name,
        Applicant_Type:data?.assign_verification_id.verification_address.verification.applicant_type,
        Vendor:data?.assign_verification_id.verification_address.verification.product.vendor_name,
        Product:data?.assign_verification_id.verification_address.verification.product.product_name,
        FI_Type:data?.assign_verification_id.verification_address.fi_type,
        FI_Date:extract_date(data?.assign_verification_id?.verification_address?.fi_date_time),
        FI_Time:get_time_from_date(data?.assign_verification_id?.verification_address?.fi_date_time),
        TAT_Date:extract_date(data?.assign_verification_id.verTat),
        TAT_Time:get_time_from_date(data?.assign_verification_id.verTat),
        District:data?.assign_verification_id.verification_address.adress_district_name,
        Verification_Agent:data?.field_agent_name,
        Field_Dely:data?.field_delay,
      })
  })
  return finalData
}


export const fetchExcelAssignVerification=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({Customer_ID:data?.verification_address?.verification.application_id,
        Customer_Name:data?.verification_address?.verification?.customer_name,
        Applicant_Type:data?.verification_address?.verification?.applicant_type,
        Vendor:data?.verification_address?.verification?.product?.vendor_name,
        Product:data?.verification_address?.verification?.product?.product_name,
        FI_Type:data?.verification_address?.fi_type,
        FI_Date:extract_date(data?.verification_address?.fi_date_time),
        FI_Time:get_time_from_date(data?.verification_address?.fi_date_time),
        TAT_Date:extract_date(data?.verTat),
        TAT_Time:get_time_from_date(data?.verTat),
        District:data?.verification_address?.adress_district_name,
        Verification_Agent:data?.assigned_verification_users.filter(item=>item.status)[0]?.fieldagent_name,
        Team_Member:data?.team_assigned_name?data?.team_assigned_name:"",
        Reassign_Dely:data?.reassigned_delay,
        Assign_Dely:data?.assigned_delay,
      })
  })
  return finalData
}

export const fetchExcelVerification=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({Customer_ID:data?.verification.application_id,
        Customer_Name:data?.verification?.customer_name,
        Applicant_Type:data?.verification?.applicant_type,
        Vendor:data?.verification?.product?.vendor_name,
        Product:data?.verification?.product?.product_name,
        FI_Type:data?.fi_type,
        Address:data?.adress,
        FI_Date:extract_date(data?.fi_date_time),
        FI_Time:get_time_from_date(data?.fi_date_time),
        Allocation_dely:data?.allocation_delay,
        District:data?.adress_district_name,
      })
  })
  return finalData
}

export const fetchExcelReportSubmited=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({Customer_ID:data.assign_verification_id.verification_address.verification.application_id,
        Customer_Name:data?.assign_verification_id.verification_address.verification.customer_name,
        Applicant_Type:data?.assign_verification_id.verification_address.verification.applicant_type,
        Vendor:data?.assign_verification_id.verification_address.verification.product.vendor_name,
        Product:data?.assign_verification_id.verification_address.verification.product.product_name,
        FI_Type:data?.assign_verification_id.verification_address.fi_type,
        FI_Date:extract_date(data?.assign_verification_id.verification_address.fi_date_time),
        FI_Time:get_time_from_date(data?.assign_verification_id.verification_address.fi_date_time),
        TAT_Date:extract_date(data?.assign_verification_id.verTat),
        TAT_Time:get_time_from_date(data?.assign_verification_id.verTat),
        Submitted_dely:data?.assign_verification_id?.verTatDelay? data.assign_verification_id?.verTatDelay : "NA",
        District:data?.assign_verification_id.verification_address.address_district_name,
        Verification_Agent:data?.field_agent_name,
      })
  }) 
  return finalData
}

export const fetchExcelVerificationStatusLog=(_)=>{
  let finalData=[]

  _.map((data)=>{
    let status=data.verification_address?.verification_addr.map((item)=>item.status)
    let duractionCalc =calculateDuration(data?.verification_address?.verification_addr.map((item)=>get_time_from_date(item.done_at)))
    const combinedDuractionCalc = ['00:00:00',...duractionCalc];
    let done=data?.verification_address?.verification_addr.map((item)=>item.done_by.employee_name)
    let reassigned_agent=data?.assigned_verification_users.length>1?data?.assigned_verification_users.filter((item)=>item.status==true)[0]?.field_agent?.employee_name:"NA"
    let reassigned_phone=data?.assigned_verification_users.length>1?data?.assigned_verification_users.filter((item)=>item.status==true)[0]?.field_agent?.user?.phonenumber:"NA"
      finalData.push({Application_ID:data.verification_address.verification.application_id,
        Customer_Name:data?.verification_address.verification.customer_name,
        Applicant_Type:data?.verification_address.verification.applicant_type,
        Vendor:data?.verification_address.verification.vendor?.employee_name,
        Product:data?.verification_address.verification.product.product_name,
        FI_Type:data?.verification_address.fi_type,
        FI_Date:extract_date(data?.verification_address.fi_date_time),
        FI_Time:get_time_from_date(data?.verification_address.fi_date_time),
        TAT_Date_Time:extract_date(data?.verTat),
        TAT_Time:get_time_from_date(data?.verTat),
        District:data?.verification_address?.adress_district?.name ,
        Verification_Agent_and_phone:data?.assigned_verification_users[0]?.field_agent?.employee_name+','+data?.assigned_verification_users[0]?.field_agent?.user?.phonenumber ,
        Reassigned:reassigned_agent+','+reassigned_phone,
        Staus:status.join(','),
        Duration:combinedDuractionCalc.join(','),
        Done_By:done.join(',')
      })
  }) 
  return finalData
}

export const fetchExcelTATReportVisit=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Vendor:data?.verification_address?.verification?.vendor?.employee_name,
        Product:data?.verification_address.verification.product.product_name,
        District:data?.verification_address?.adress_district?.name ,
        Application_ID:data.verification_address.verification.application_id,
        Customer_Name:data?.verification_address.verification.customer_name,
        Visit_Type:data?.verification_address.verification.applicant_type,
        Address:data?.verification_address?.adress,
        FI_Date:extract_date(data?.verification_address.fi_date_time),
        FI_Time:get_time_from_date(data?.verification_address.fi_date_time),
        Submitted_Date:extract_date(data?.submitted_at),
        Submitted_Time:get_time_from_date(data?.submitted_at),
        Agent_Name:data?.assigned_verification_users[0]?.field_agent?.employee_name,
        Allocated_By:data?.assign_verification[0]?.completed_by?.employee_name,
        Assigned_By:data?.assigned_verification_users[0]?.assigned_by?.employee_name,
        Written_By:data?.assign_verification[0]?.written_by?.employee_name,
        Reported_By:data?.assign_verification[0]?.reported_by?.employee_name,
        Coordinated_By:data?.assign_verification[0]?.coordinated_by?.employee_name,
      })
  }) 
  return finalData
}

export const fetchExcelBillable=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Product:data?.product.product_name,
        Vendor:data?.product?.vendor_name,
        Billing_Code:data?.vendor_code,
        Total_Count:data.total_count,
        cpv_local_count:data?.cpv_count_local,
        local_rate:data?.product?.local_rate,
        cpv_amt_local:data?.cpv_amt_local,
        cpv_count_ocl1:data?.cpv_count_ocl1,
        ocl_rate_1:data?.product?.ocl_rate_1,
        cpv_amt_ocl1:data?.cpv_amt_ocl1,
        cpv_count_ocl2:data?.cpv_count_ocl2,
        ocl_rate_2:data?.product?.ocl_rate_2,
        cpv_amt_ocl2:data?.cpv_amt_ocl2,
        cpv_count_ocl3:data?.cpv_count_ocl3,
        ocl_rate_3:data?.product?.ocl_rate_3,
        cpv_amt_ocl3:data?.cpv_amt_ocl3,
        cpv_count_ogl1:data?.cpv_count_ogl1,
        ogl_rate_1:data?.product?.ogl_rate_1,
        cpv_amt_ogl1:data?.cpv_amt_ogl1,
        cpv_count_ogl2:data?.cpv_count_ogl2,
        ogl_rate_2:data?.product?.ogl_rate_2,
        cpv_amt_ogl2:data?.cpv_amt_ogl2,
        cpv_count_ogl3:data?.cpv_count_ogl3,
        ogl_rate_3:data?.product?.ogl_rate_3,
        cpv_amt_ogl3:data?.cpv_amt_ogl3,
        pd_count:data?.pd_count,
        pd_rate:data?.product?.pd_rate,
        pd_amt:data?.pd_amt,
        bill_amount:data?.bill_amount,
      })
  }) 
  return finalData
}

export const fetchExcelPayable=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Product:data?.product.product_name,
        Vendor:data?.product?.vendor_name,
        Agent_Name:data?.userprofile?.employee_name,
        Billing_Code:data?.userprofile?.employee_code,
        Total_Count:data.total_count,
        cpv_local_count:data?.cpv_count_local,
        local_rate:data?.userprofile?.cpv_local,
        cpv_amt_local:data?.cpv_amt_local,
        cpv_count_ocl1:data?.cpv_count_ocl1,
        ocl_rate_1:data?.userprofile?.cpv_ocl_rate1,
        cpv_amt_ocl1:data?.cpv_amt_ocl1,
        cpv_count_ocl2:data?.cpv_count_ocl2,
        ocl_rate_2:data?.userprofile?.cpv_ocl_rate2,
        cpv_amt_ocl2:data?.cpv_amt_ocl2,
        cpv_count_ocl3:data?.cpv_count_ocl3,
        ocl_rate_3:data?.userprofile?.cpv_ocl_rate3,
        cpv_amt_ocl3:data?.cpv_amt_ocl3,
        cpv_count_ogl1:data?.cpv_count_ogl1,
        ogl_rate_1:data?.userprofile?.cpv_ogl_rate1,
        cpv_amt_ogl1:data?.cpv_amt_ogl1,
        cpv_count_ogl2:data?.cpv_count_ogl2,
        ogl_rate_2:data?.userprofile?.cpv_ogl_rate2,
        cpv_amt_ogl2:data?.cpv_amt_ogl2,
        cpv_count_ogl3:data?.cpv_count_ogl3,
        ogl_rate_3:data?.userprofile?.cpv_ogl_rate3,
        cpv_amt_ogl3:data?.cpv_amt_ogl3,
        pd_count:data?.pd_count,
        pd_rate:data?.userprofile?.pd_rate,
        pd_amt:data?.pd_amt,
        bill_amount:data?.payable_amount,
      })
  }) 
  return finalData
}

export const fetchExcelNotBillablePayable=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Date:data?.created_at,
        Application_ID:data?.submit_ver?.assign_verification?.verification_address?.verification?.application_id,
        Customer_Name:data?.submit_ver?.assign_verification?.verification_address?.verification?.customer_name,
        FI_Type:data?.submit_ver?.assign_verification?.verification_address?.fi_type,
        Reason:data.submit_ver?.payable_reason||data?.submit_ver?.billable_reason,
      })
  }) 
  return finalData
}

export const fetchExcelDifferenceReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Product:data?.product__product_name,
        Vendor:data?.product__vendor__employee_name,
        Payable_Count:data?.payable_count,
        Billable_Count:data?.billable_count,
        Differnece:Math.abs(data?.payable_count-data?.billable_count)
      })
  }) 
  return finalData
}

export const fetchExcelVendorTrackReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
    let rv =data.addresses.filter((p)=> p.fi_type === "RV")[0]
    let bv =data.addresses.filter((p)=> p.fi_type === "BV")[0]
    let pv =data.addresses.filter((p)=> p.fi_type === "PV")[0]
    let pd =data.addresses.filter((p)=> p.fi_type === "PD")[0]

      finalData.push({
        Application_ID:data?.application_id,
        Vendor:data?.vendor?.employee_name,
        Product:data?.product?.product_name,
        FI_Date:convert_date_format(data?.addresses[0]?.fi_date_time),
        FI_Time:getDate_from_datetime(data?.addresses[0]?.fi_date_time),
        Customer_Name:data?.customer_name,
        Submitted_Date_RV:rv?.verification_address[0]?.submitted_at? convert_date_format(data?.addresses?.filter((i)=> i.fi_type === "RV")[0]?.verification_address[0]?.submitted_at) : "NA",
        Submitted_Time_RV:rv?.verification_address[0]?.submitted_at? getDate_from_datetime(data?.addresses?.filter((i)=> i.fi_type === "RV")[0]?.verification_address[0]?.submitted_at) : "NA",
        Submitted_Date_BV:bv?.verification_address[0]?.submitted_at? convert_date_format(data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.verification_address[0]?.submitted_at) : "NA",
        Submitted_Time_BV:bv?.verification_address[0]?.submitted_at? getDate_from_datetime(data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.verification_address[0]?.submitted_at) : "NA",
        Submitted_Date_PV:pv?.verification_address[0]?.submitted_at? convert_date_format(data?.addresses?.filter((i)=> i.fi_type === "PV")[0]?.verification_address[0]?.submitted_at) : "NA",
        Submitted_Time_PV:pv?.verification_address[0]?.submitted_at? getDate_from_datetime(data?.addresses?.filter((i)=> i.fi_type === "PV")[0]?.verification_address[0]?.submitted_at) : "NA",
        Submitted_Date_PD:pd?.verification_address[0]?.submitted_at? convert_date_format(data?.addresses?.filter((i)=> i.fi_type === "PD")[0]?.verification_address[0]?.submitted_at) : "NA",
        Submitted_Time_PD:pd?.verification_address[0]?.submitted_at? getDate_from_datetime(data?.addresses?.filter((i)=> i.fi_type === "PD")[0]?.verification_address[0]?.submitted_at) : "NA",
        Applicant_RV_Address:rv?.adress? data?.addresses?.filter((i)=> i.fi_type === "RV")[0]?.adress : "NA",
        Applicant_BV_Address:bv?.adress? data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.adress : "NA",
        Applicant_PV_Address:pv?.adress? data?.addresses?.filter((i)=> i.fi_type === "PV")[0]?.adress : "NA",
        Applicant_PD_Address:pd?.adress? data?.addresses?.filter((i)=> i.fi_type === "PD")[0]?.adress : "NA",
        Report_Status_RV:rv?.verification_address[0]?.status?data?.addresses?.filter((i)=> i.fi_type === "RV")[0]?.verification_address[0]?.status : "NA",
        Report_Status_BV:bv?.verification_address[0]?.status?data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.verification_address[0]?.status : "NA",
        Report_Status_PV:pv?.verification_address[0]?.status?data?.addresses?.filter((i)=> i.fi_type === "PV")[0]?.verification_address[0]?.status : "NA",
        Report_Status_PD:pd?.verification_address[0]?.status?data?.addresses?.filter((i)=> i.fi_type === "PD")[0]?.verification_address[0]?.status : "NA",     
        Applicant_RV_Distance:rv?.verification_address[0]?.assign_verification[0]?.distance? data?.addresses?.filter((i)=> i.fi_type === "RV")[0]?.verification_address[0]?.assign_verification[0]?.distance : "NA" ,
        RV_District:rv?.adress_district?.name? data?.addresses?.filter((i)=> i.fi_type === "RV")[0]?.adress_district?.name : "NA",
        Applicant_BV_Distance:bv?.verification_address[0]?.assign_verification[0]?.distance? data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.verification_address[0]?.assign_verification[0]?.distance : "NA" ,
        BV_District:bv?.adress_district?.name? data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.adress_district?.name : "NA",
        Applicant_PV_Distance:pv?.verification_address[0]?.assign_verification[0]?.distance? data?.addresses?.filter((i)=> i.fi_type === "PV")[0]?.verification_address[0]?.assign_verification[0]?.distance : "NA" ,
        PV_District:pv?.adress_district?.name? data?.addresses?.filter((i)=> i.fi_type === "PV")[0]?.adress_district?.name : "NA",
        Applicant_PD_Distance:pd?.verification_address[0]?.assign_verification[0]?.distance? data?.addresses?.filter((i)=> i.fi_type === "PD")[0]?.verification_address[0]?.assign_verification[0]?.distance : "NA" ,
        PD_District:pd?.adress_district?.name? data?.addresses?.filter((i)=> i.fi_type === "PD")[0]?.adress_district?.name : "NA",
        Product_TAT:data?.product?.tat_hours,
        Image_Upload_Status_RV:rv?.verification_address[0]?.img_recieved_through ? data?.addresses?.filter((i)=> i.fi_type === "RV")[0]?.verification_address[0]?.img_recieved_through : "NA",
        Image_Upload_Status_BV:bv?.verification_address[0]?.img_recieved_through ? data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.verification_address[0]?.img_recieved_through : "NA",
        Image_Upload_Status_PV:pv?.verification_address[0]?.img_recieved_through ? data?.addresses?.filter((i)=> i.fi_type === "PV")[0]?.verification_address[0]?.img_recieved_through : "NA",
        Image_Upload_Status_PD:pd?.verification_address[0]?.img_recieved_through ? data?.addresses?.filter((i)=> i.fi_type === "PD")[0]?.verification_address[0]?.img_recieved_through : "NA",
        Applicant_Employment_Status:data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.verification_address[0]?.formdata[0]?.other_details?.employed ? data?.addresses?.filter((i)=> i.fi_type === "BV")[0]?.verification_address[0]?.formdata[0]?.other_details?.employed : 'NA' 
      })
  }) 
  return finalData
}


export const fetchExcelPayoutReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Agent_ID:data?.userprofile?.employee_code?data?.userprofile?.employee_code:data?.userprofile__employee_code,
        Name:data?.userprofile?.employee_name?data?.userprofile?.employee_name:data?.userprofile__employee_name,
        District:data?.userprofile?.district_name?data?.userprofile?.district_name:data?.userprofile__address_district__name,
        Bank:data?.userprofile?.bank?data?.userprofile?.bank:data?.userprofile__bank,
        Account_Number:data?.userprofile?.account_number?data?.userprofile?.account_number:data?.userprofile__account_number,
        IFSC_Code:data?.userprofile?.ifsc_code?data?.userprofile?.ifsc_code:data?.userprofile__ifsc_code,
        Account_Holder:data?.userprofile?.account_holder?data?.userprofile?.account_holder:data?.userprofile__account_holder,
        CPV_Count_Local:data?.cpv_count_local,
        CPV_Rate_Local:data?.userprofile?.cpv_local?data?.userprofile?.cpv_local:data?.userprofile__cpv_local,
        CPV_Amount_Local:data?.cpv_amt_local,
        CPV_Count_OCL_1:data?.cpv_count_ocl1,
        CPV_Rate_OCL_1:data?.userprofile?.cpv_ocl_rate1?data?.userprofile?.cpv_ocl_rate1:data?.userprofile__cpv_ocl_rate1,
        CPV_Amount_OCL_1:data?.cpv_amt_ocl1,
        CPV_Count_OCL_2:data?.cpv_count_ocl2,
        CPV_Rate_OCL_2:data?.userprofile?.cpv_ocl_rate2?data?.userprofile?.cpv_ocl_rate2:data?.userprofile__cpv_ocl_rate2,
        CPV_Amount_OCL_2:data?.cpv_amt_ocl2,
        CPV_Count_OCL_3:data?.cpv_count_ocl3,
        CPV_Rate_OCL_3:data?.userprofile?.cpv_ocl_rate3?data?.userprofile?.cpv_ocl_rate3:data?.userprofile__cpv_ocl_rate3,
        CPV_Amount_OCL_3:data?.cpv_amt_ocl3,
        CPV_Count_OGL_1:data?.cpv_count_ogl1,
        CPV_Rate_OGL_1:data?.userprofile?.cpv_ogl_rate1?data?.userprofile?.cpv_ogl_rate1:data?.userprofile__cpv_ogl_rate1,
        CPV_Amount_OGL_1:data?.cpv_amt_ogl1,
        CPV_Count_OGL_2:data?.cpv_count_ogl2,
        CPV_Rate_OGL_2:data?.userprofile?.cpv_ogl_rate2?data?.userprofile?.cpv_ogl_rate2:data?.userprofile__cpv_ogl_rate2,
        CPV_Amount_OGL_2:data?.cpv_amt_ogl2,
        CPV_Count_OGL_3:data?.cpv_count_ogl3,
        CPV_Rate_OGL_3:data?.userprofile?.cpv_ogl_rate3?data?.userprofile?.cpv_ogl_rate3:data?.userprofile__cpv_ogl_rate3,
        CPV_Amount_OGL_3:data?.cpv_amt_ogl3,
        PD_Count:data?.pd_count,
        PD_Rate:data?.userprofile?.pd_rate?data?.userprofile?.pd_rate:data?.userprofile__pd_rate,
        PD_Amount:data?.pd_amt,
        Other_Count:data?.other_count,
        Other_Rate:data?.userprofile?.other_rate,
        Other_Amount:data?.other_amt,
        Basic_Pay:data?.userprofile?.salary?data?.userprofile?.salary:data?.userprofile__salary,
        Travelling_Allowances:data?.travelling_expense,
        Special_Allowances:data?.special_allowance,
        Incentive:data?.incentive,
        Reported_by_count:data?.reported_by_count,
        Total_reported_by:data?.reported_by_amt,
        Coordinated_by_count:data?.coordinated_by_count,
        Total_coordinated_by:data?.coordinated_by_amt,
        Allocated_by_count:data?.allocated_by_count,
        Total_allocated_by:data?.allocated_by_amt,
        Written_by_count:data?.written_by_count,
        Total_written_by:data?.written_by_amt,
        Others:data?.others,
        Total_payout:data?.total_payout,
        Deduction_Leave:data?.leave_deduction,
        Deduction_Advance:data?.advance_deduction,
        Deduction_Contributions:data?.contributions_deduction,
        Deduction_TDS:data?.tds_deduction,
        Other_deductions:data?.other_deduction,
        Total_deduction:data?.total_deduction,
        Net_payout:(parseInt(data?.net_payout))+(parseInt(data?.userprofile?.salary?data?.userprofile?.salary:data?.userprofile__salary)),
      })
  }) 
  return finalData
}

export const fetchExcelOfficeWiseVendorWiseReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Vendor:data?.employee_name,
        Pending:data?.verification_count,
      })
  }) 
  return finalData
}

export const fetchExcelOfficeWisePendingReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Name_of_Office_Staff:data?.employee_name,
        Pending:data?.verification_count,
      })
  }) 
  return finalData
}

export const fetchExcelAgentWisePendingVendorWiseReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        District:data?.name,
        Pending:data?.verification_count,
      })
  }) 
  return finalData
}

export const fetchExcelAgentWisePendingDistrictReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        District:data?.employee_name,
        Pending:data?.verification_count,
      })
  }) 
  return finalData
}

export const fetchVendorExcelreport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Vendor_Name:data?.employee_name,
        Email_ID:data?.user.email,
        User_Name:data?.user.username,
        Vendor_Short_Code:data?.employee_code,
        Status:data?.user.is_active?"Active":"Inactive",
      })
  }) 
  return finalData
}

export const fetchUserExcelreport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Name:data?.employee_name,
        User_Name:data?.user.username,
        Phone:data?.user.phonenumber,
        Designation:data?.user.user_type,
        District:data?.addr_dt_name,
        Status:data?.user.is_active?"Active":"Inactive",
      })
  }) 
  return finalData
}

export const fetchHolidayExcelreport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Date:date_conversion(data.holiday_date),
        Description:data?.description,
      })
  }) 
  return finalData
}

export const fetchAdminMangementReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Name:data.first_name,
        User_Name:data?.username,
        Password:"******",
        Status:data?.is_active ? "Active" : "Inactive",
      })
  }) 
  return finalData
}

export const fetchWorkTrackerReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Name:data.employee_name,
        Designation:data?.usertype,
        Work_Assigned:data?.usertype=='FieldAgent'?data?.fagentcount:data?.count,
      })
  }) 
  return finalData
}

export const fetchTimeTrackerReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Name:data.employee_name,
        Designation:data?.user?.user_type,
      })
  }) 
  return finalData
}

export const fetchVendorBillingReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Vendor:data.product.vendor_name,
        Vendor_Code:data?.vendor_code,
        Product:data.product.product_name,
        Billing_Location:data.billing_location_name,
        Local_Distance:data?.product?.local_distance,
        Local_Rate:data?.product?.local_rate,
        OCL_Distance_1:data?.product?.ocl_distance_1,
        OCL_Distance_2:data?.product?.ocl_distance_2,
        OCL_Distance_3:data?.product?.ocl_distance_3,
        OCL_Rate_1:data.product.ocl_rate_1,
        OCL_Rate_2:data.product.ocl_rate_2,
        OCL_Rate_3:data.product.ocl_rate_3,
        OGL_Distance_1:data.product.ogl_distance_1,
        OGL_Distance_2:data.product.ogl_distance_2,
        OGL_Distance_3:data.product.ogl_distance_3,
        OGL_Rate_1:data.product.ogl_rate_1,
        OGL_Rate_2:data.product.ogl_rate_2,
        OGL_Rate_3:data.product.ogl_rate_3,
        PD_Rate:data.product.pd_rate,

      })
  }) 
  return finalData
}

export const fetchMISReport=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Vendor_Name:data.verification__vendor__employee_name,
        CPV_PD:data?.newfitype,
        Previous_day_Pending:(data?.pre_pending) + (data?.unassigned_prev_day)+(data?.pre_pending_submitted),
        No_of_Cases_Initiated_for_the_Day:data?.newfitype == 'cpv' ? data?.total_cpv : data?.total_pd,
        Total_Number_of_cases:data?.newfitype == 'cpv' ? (data?.total_cpv + (data.pre_pending) + (data.unassigned_prev_day)+(data?.pre_pending_submitted)) : (data?.total_pd + (data.pre_pending) + (data.unassigned_prev_day)+(data?.pre_pending_submitted)),
        No_of_cases_submitted_from_today_FI:data.recieved_today_FI,
        Total_No_of_Cases_submitted_for_the_Day:data.submitted_today,
        TAT_IN:data.tatIn,
        TAT_OUT:data.tatOut,
        TAT_Percent:(data.tatIn + data.tatOut) != 0 && ((data.tatIn / (data.tatIn + data.tatOut)) * 100).toFixed(2),
        Unassigned:data.unassigned,
        Assigned_Verification:data.assignedField,
        Report_Received:data.assignedOffice,
        Total_Pending:(data.unassigned) + (data.assignedOffice)+(data.assignedField),

      })
  }) 
  return finalData
}

export const fetchExcelProduct=(_)=>{
  let finalData=[]
  _.map((data)=>{
      finalData.push({
        Product_Name:data?.product_name,
        Short_Code:data?.product_code,
        Vendor:data?.vendor_name,
        TAT_Time:get_time_from_date(data.tat_hours),
        FI_Service_Start_Time: get_time_from_date(data.fi_service_start_time),
        FI_Service_End_Time: get_time_from_date(data.fi_service_end_time),
        Cut_Off_Time: get_time_from_date(data.cut_off_time),
        Status: data.status ? "Active" : "Inactive",
        Local_Distance: data?.local_distance,
        OCL_Distance_1: data?.ocl_distance_1,
        OCL_Distance_2: data?.ocl_distance_2,
        OCL_Distance_3: data?.ocl_distance_3,
        OGL_Distance_1: data?.ogl_distance_1,
        OGL_Distance_2: data?.ogl_distance_2,
        OGL_Distance_3: data?.ogl_distance_3,
        Local_Rate: data?.local_rate,
        OCL_Rate_1: data?.ocl_rate_1,
        OCL_Rate_2: data?.ocl_rate_2,
        OCL_Rate_3: data?.ocl_rate_3,
        OGL_Rate_1: data?.ogl_rate_1,
        OGL_Rate_2: data?.ogl_rate_2,
        OGL_Rate_3: data?.ogl_rate_3,
        PD_Rate: data?.pd_rate,
        Credit_Manager_Name: data?.credit_card_manager,
        Credit_Manager_ContactNo: data?.credit_card_manager_phone,
        Credit_Manager_Email: data?.credit_card_manager_email,
        Reported_By_Rate: data?.reported_by_rate,
        Coordinated_By_Rate: data?.coordinated_by_rate,
        Allocated_By_Rate: data?.allocated_by_rate,
        Written_By_Rate: data?.written_by_rate,
      })
  }) 
  return finalData
}