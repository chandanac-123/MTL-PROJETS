import React, { useEffect } from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import TextareaInput from '../../../Components/CustomInput/TextareaInput';
import SelectField from '../../../Components/CustomSelect/SelectField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import right_arrow from '../../../Static/Images/arrow-right.svg'
import { building_type, user_permission } from '../../../Utils/Constants';
import UploadImage from '../../../Components/CustomUpload/ImageUpload';
import { useBuildingDropdown, usePropertyTypeDropdown } from '../../../ApiQuery/Dropdown/ListQuery';

const BasicDetails = ({ setActive, formik, id, setLocationState }) => {

    const { data: buildingList, isPending: isBuilding, refetch } = useBuildingDropdown()
    const { data: propertyList, isPending: rolePending } = usePropertyTypeDropdown()

    useEffect(() => {
        refetch()
    }, [])

    return (
        <form >
            <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>
                <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-4 sm:mb-8 '>
                    <label className='w-[9.4rem] text-text-color-secondary'>Property Image</label>
                    <div className=' w-[110px]'>
                        <UploadImage fileChange={(e) => formik?.setFieldValue('propImg', e)} typeAdd={true} formik={formik} profilePic={formik?.values?.propImg} />
                        <span></span>
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
                            isClearable={false}
                            constant={true}
                            isMulti={false}
                            options={building_type}
                            errors={formik?.errors.buildingType}
                            value={formik?.values.buildingType}
                            touched={formik?.touched.buildingType}
                            onChange={(selectedOptions) => {
                                if (selectedOptions?.label === 'House') {
                                    formik.setFieldValue('state', "")
                                    formik.setFieldValue('address', "")
                                    formik.setFieldValue('town', "")
                                    formik.setFieldValue('pincode', "")
                                }
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
                <div className='flex  w-full sm:w-auto justify-end p-4'>
                    <ContinueButton onClick={() => {
                        formik?.validateForm().then(res => {
                            formik.setTouched(res)
                            if (formik.isValid) {
                                setActive('2')
                                setLocationState(formik?.values.linkBuilding?.value)
                            }
                        })
                    }} type='button' label={id ? "Save Changes" : "Continue"} img={right_arrow} />
                </div>
            </div>
        </form>
    )
}

export default BasicDetails