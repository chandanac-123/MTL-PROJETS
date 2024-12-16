import React, { useState } from 'react'
import { Tabs } from 'antd';
import LoctaionDetails from './LoctaionDetails';
import UploadDoc from './UploadDoc';
import Summary from './Summary';
import BasicDetails from './BasicDetails';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './propertiesStyle.css'
import { usePropertyCreateQuery } from '../../../ApiQuery/Property/PropertyQuery';
import { useBuildingGetByIdtQuery } from '../../../ApiQuery/ListBuilding/BuildingQuery';
const pinCodeRegex = /^[1-9][0-9]{5}$/;

const PropertyAdd = () => {
    const [activeKey, setActive] = useState('1')
    const [locationState, setLocationState] = useState()
    const { mutateAsync: create, isPending } = usePropertyCreateQuery()
    // const { data: buildingDetails, isFetching } = useBuildingGetByIdtQuery({ id: locationState })


    const initialValues = {
        files: '',
        name: '',
        property_type: "",
        buildingType: { value: 'multiple', label: 'Flat' },
        linkBuilding: '',
        flat_no: "",
        house_no: "",
        description: "",
        address: "",
        town: "",
        state: "",
        pin_code: "",
        propImg: "",
    };

    const basicFormValidatFlatSchema = Yup.object().shape({
        property_type: Yup.object()
            .required('This field is required'),
        buildingType: Yup.object()
            .required('This field is required'),
        linkBuilding: Yup.object()
            .required('This field is required'),
        description: Yup.string()
            .max(70, 'Should not exceed 70 characters.')
            .required('This field is required'),
        flat_no: Yup.string()
            .matches(/^[^\s].*$/, 'Field should not start with a blank space')
            .required('This field is required'),
    })

    const basicFormValidatHouseSchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required'),
        property_type: Yup.object()
            .required('This field is required'),
        buildingType: Yup.object()
            .required('This field is required'),
        description: Yup.string()
            .max(70, 'Should not exceed 70 characters.')
            .required('This field is required'),
        house_no: Yup.string()
            .matches(/^[^\s].*$/, 'Field should not start with a blank space')
            .required('This field is required'),
    })

    const loactionFormValidatSchema = Yup.object().shape({
        address: Yup.string()
            .max(70, 'Should not exceed 70 characters.')
            .required('This field is required'),
        town: Yup.string()
            .matches(/^[^\s].*$/, 'Field should not start with a blank space')
            .required('This field is required'),
        pin_code: Yup.string()
            .matches(pinCodeRegex, 'Invalid PIN code')
            .required('This field is required'),
        state: Yup.object()
            .required('This field is required')
    })

    // const docFormValidatSchema = Yup.object().shape({
    //     files: Yup.mixed()
    //         .test(
    //             'fileSize',
    //             'File size is too large. Maximum size is 2 MB',
    //             (value) => {
    //                 if (!value || !value[0]) return true; // Allow empty values (no file selected)
    //                 return value[0].size <= 2 * 1024 * 1024; // 2 MB in bytes
    //             }
    //         )
    //         .required('File is required'),
    // });

    const docFormValidatSchema = Yup.object().shape({
        files: Yup.mixed(),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: () => {
            if (activeKey == '1' && formik.values.buildingType.value === 'single') {
                return basicFormValidatHouseSchema;
            } else if (activeKey == '1' && formik.values.buildingType.value === 'multiple') {
                return basicFormValidatFlatSchema;
            } else if (activeKey == '2' && formik.values.buildingType.value === 'single') {
                return loactionFormValidatSchema;
            }
            else {
                return docFormValidatSchema;
            }
        },
        enableReinitialize: true,
        validateOnMount: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const formData = new FormData();
            Object.keys(values.files).map((i, value) => {
                formData.append('property_files', values.files[value])
            })
            formData.append('property_image', values.propImg)
            formData.append('flat_number', values.flat_no)
            formData.append('house_number', values.house_no)
            formData.append('property_name', values?.name)
            formData.append('description', values.description)
            formData.append('address', values.buildingType?.value == 'multiple' ? "" : values.address)
            formData.append('town', values.buildingType?.value == 'multiple' ? "" : values.town)
            formData.append('pincode', values.buildingType?.value == 'multiple' ? "" : values.pin_code)
            formData.append('property_type_id', values.property_type?.value)
            formData.append('type', values.buildingType?.value)
            formData.append('state_id', values.buildingType?.value == 'multiple' ? "" : values.state?.value)
            formData.append('parent_id', values.linkBuilding?.value || "")
            setSubmitting(true)
            try {
                const data = await create(formData)
            } catch (error) {
                console.error(error)
                setStatus("Somthing went wrong !")
            }
        },
    })

    const state = [<BasicDetails setActive={setActive} formik={formik} label="Basic Details" setLocationState={setLocationState} />, <LoctaionDetails setActive={setActive} formik={formik} label="Location Details" setLocationState={setLocationState} locationState={locationState} />, <UploadDoc setActive={setActive} formik={formik} label="Upload Documents" />, <Summary setActive={setActive} formik={formik} label="Summary" isPending={isPending} />]

    return (
        <div className='h-screen bg-color-light-gray flex flex-col  mt-8'>
            <div className="sm:p-5  bg-color-white rounded-2xl overflow-x-auto">
                <div className='max-w-[800px] mx-auto ' >
                    <Tabs
                        size='large'
                        defaultActiveKey="1"
                        className='custom-tab-style'
                        // onChange={(e) => setActive(e)}
                        activeKey={activeKey}
                        centered
                        disabled
                        items={state?.map((_, i) => {
                            const id = String(i + 1);
                            return {
                                label: _?.props?.label,
                                key: id,
                                children: _,
                                disabled: true
                            };
                        })}
                    />
                </div>
            </div>
        </div>
    )
}

export default PropertyAdd