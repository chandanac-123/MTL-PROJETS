import React from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import TextareaInput from '../../../Components/CustomInput/TextareaInput';
import SelectField from '../../../Components/CustomSelect/SelectField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import right_arrow from '../../../Static/Images/arrow-right.svg'
import UploadImage from '../../../Components/CustomUpload/ImageUpload';
import { useBuildingDropdown, usePropertyTypeDropdown } from '../../../ApiQuery/Dropdown/ListQuery';
import ModalLayout from '../../../Common/ModalLayout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { usePropertyUpdateQuery } from '../../../ApiQuery/Property/PropertyQuery';
import { building_type, user_permission } from '../../../Utils/Constants';

const EditBasicDetails = ({ id, isBasicModalOpen, setIsBasicModalOpen, formType, data }) => {
    const { mutateAsync: update, isPending: updatePending } = usePropertyUpdateQuery()
    const { data: propertyList, isPending: rolePending } = usePropertyTypeDropdown()
    const { data: buildingList, isPending: isBuilding } = useBuildingDropdown()

    const initialValues = {
        name: data?.property_name || '',
        property_type: data?.property_type_id ? { value: data?.property_type_id?.id, label: data?.property_type_id?.name } : "",
        buildingType: data?.house_number ? { value: "single", label: "House" } : { value: "multiple", label: "Flat" },
        linkBuilding: data?.parent_id ? { value: data?.parent_id?.id, label: data?.parent_id?.property_name } : "",
        flat_no: data?.flat_number || "",
        house_no: data?.house_number || "",
        description: data?.description || "",
        propImg: data?.property_image || ""
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
            .max(70, 'Should not exceed 70 characters.')
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
            .max(70, 'Should not exceed 70 characters.')
            .required('This field is required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: () => {
            if (formik.values.buildingType.value === 'single') {
                return basicFormValidatHouseSchema;
            } else if (formik.values.buildingType.value === 'multiple') {
                return basicFormValidatFlatSchema;
            }
        },
        enableReinitialize: true,
        validateOnMount: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const formData = new FormData();
            formData.append('flat_number', values.flat_no)
            formData.append('house_number', values.house_no)
            formData.append('property_name', values?.name)
            formData.append('description', values.description)
            formData.append('property_type_id', values.property_type?.value)
            formData.append('type', values.buildingType?.value)
            formData.append('parent_id', values.linkBuilding?.value || "")
            if (typeof values?.propImg === "object") {
                formData.append('property_image', values.propImg)
            }
            setSubmitting(true)
            try {
                const data = await update({ formData, id })
                setIsBasicModalOpen(false)
            } catch (error) {
                console.error(error)
                setStatus("Somthing went wrong !")
            }
        },
    })

    return (
        <ModalLayout isModalOpen={isBasicModalOpen} setIsModalOpen={setIsBasicModalOpen} title="Edit Basic Details">

            <form onSubmit={formik.handleSubmit} noValidate>
                <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-4 sm:mb-8 '>
                        <label className='w-[9.4rem] text-text-color-secondary'>Avatar</label>
                        <div className=' w-[110px]'>
                            <UploadImage fileChange={(e) => formik?.setFieldValue('propImg', e)} typeAdd={true} formik={formik} profilePic={formik?.values?.propImg} />
                        </div>
                    </div>
                    <div className='flex gap-4 md:flex-row flex-col mobile:w-full mb-5'>
                        <div className='flex gap-4 flex-col sm:flex-row md:gap-16 w-full' >
                            <label className='w-48 text-secondary'>Property Type</label>
                            <SelectField
                                placeholder="Select"
                                name="property_type"
                                constant={false}
                                isMulti={false}
                                options={propertyList}
                                errors={formik?.errors.property_type}
                                value={formik?.values.property_type}
                                touched={formik?.touched.property_type}
                                onChange={(selectedOptions) => {
                                    formik.setFieldValue('property_type', selectedOptions);
                                }}
                            />
                        </div>
                        <div className='flex gap-4 flex-col sm:flex-row w-full'>
                            <label className='w-48  text-secondary mobile:pl-4'>Building Type</label>
                            <SelectField
                                placeholder="Select"
                                name="buildingType"
                                constant={true}
                                isMulti={false}
                                options={building_type}
                                errors={formik?.errors.buildingType}
                                value={formik?.values.buildingType}
                                touched={formik?.touched.buildingType}
                                onChange={(selectedOptions) => {
                                    formik.setFieldValue('buildingType', selectedOptions);
                                }}
                            />
                        </div>
                    </div>

                    {formik?.values?.buildingType?.label == 'Flat' ?
                        <>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                                <label className='w-48 text-secondary'>Flat No</label>
                                <InputField
                                    placeholder="Flat Number"
                                    className="bg-search-bg-color border-none"
                                    name='flat_no'
                                    errors={formik?.errors.flat_no}
                                    value={formik?.values.flat_no}
                                    touched={formik?.touched.flat_no}
                                    handleChange={formik?.handleChange}
                                />
                            </div>

                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-6'>
                                <label className='w-48 text-secondary'>Link Building</label>
                                <SelectField
                                    placeholder="Select"
                                    name="linkBuilding"
                                    constant={false}
                                    isMulti={false}
                                    options={buildingList}
                                    errors={formik?.errors.linkBuilding}
                                    value={formik?.values.linkBuilding}
                                    touched={formik?.touched.linkBuilding}
                                    onChange={(selectedOptions) => {
                                        formik.setFieldValue('linkBuilding', selectedOptions);
                                    }}
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                                <label className='w-48 text-secondary'>House Name</label>
                                <InputField
                                    placeholder="House Name"
                                    className="bg-search-bg-color border-none"
                                    name='name'
                                    errors={formik?.errors.name}
                                    value={formik?.values.name}
                                    touched={formik?.touched.name}
                                    handleChange={formik?.handleChange}
                                />
                            </div>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                                <label className='w-48 text-secondary'>House/Bldg No</label>
                                <InputField
                                    placeholder="House/Bldg No"
                                    className="bg-search-bg-color border-none"
                                    name='house_no'
                                    errors={formik?.errors.house_no}
                                    value={formik?.values.house_no}
                                    touched={formik?.touched.house_no}
                                    handleChange={formik?.handleChange}
                                />
                            </div>
                        </>
                    }

                    <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
                        <label className='w-48 text-secondary'>Property Description</label>
                        <TextareaInput
                            placeholder="Description"
                            name="description"
                            className="bg-search-bg-color border-none"
                            errors={formik?.errors.description}
                            value={formik?.values.description}
                            touched={formik?.touched.description}
                            handleChange={formik?.handleChange}
                        />
                    </div>
                    <div className='flex  w-full sm:w-auto justify-end pt-6'>
                        <ContinueButton type='submit' loading={updatePending} label="Save Changes" img={right_arrow} />
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}

export default EditBasicDetails