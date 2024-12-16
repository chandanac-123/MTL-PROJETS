import React, { useEffect } from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import TextareaInput from '../../../Components/CustomInput/TextareaInput';
import SelectField from '../../../Components/CustomSelect/SelectField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import BackButton from '../../../Components/CustomButtons/BackButton';
import right_arrow from '../../../Static/Images/arrow-right.svg'
import left_arrow from '../../../Static/Images/arrow-left.svg'
import { usePropertyTypeDropdown, useStateDropdown } from '../../../ApiQuery/Dropdown/ListQuery';
import { useBuildingGetByIdtQuery } from '../../../ApiQuery/ListBuilding/BuildingQuery';

const LoctaionDetails = ({ setActive, formik, locationState }) => {
    const { data: stateDropdown, isPending } = useStateDropdown()
    const { data: buildingDetails, isFetching } = useBuildingGetByIdtQuery({ id: locationState })

    useEffect(() => {
        let stateVal = buildingDetails?.state_id ? {
            value: buildingDetails?.state_id?.id,
            label: buildingDetails?.state_id?.state_name
        } : ""
        formik.setFieldValue('state', stateVal)
        formik.setFieldValue('address', buildingDetails?.address)
        formik.setFieldValue('town', buildingDetails?.town)
        formik.setFieldValue('pincode', buildingDetails?.pincode)
    }, [buildingDetails])

    return (
        <form>
            <div className='max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11'>
                <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                    <label className='w-48 text-secondary'>Address</label>
                    <TextareaInput
                        placeholder="Address"
                        name="address"
                        className="bg-search-bg-color border-none"
                        errors={formik?.errors.address}
                        value={formik?.values.address}
                        touched={formik?.touched.address}
                        handleChange={formik?.handleChange}
                        disabled={formik?.values?.buildingType?.label === 'Flat' ? true : false}
                    />
                </div>

                <div className='flex gap-4 md:flex-row flex-col mobile:w-full' >
                    <div className='flex gap-4 flex-col sm:flex-row md:gap-14 w-full'>
                        <label className='w-48 text-secondary '>Town</label>
                        <InputField
                            placeholder="Town"
                            className="bg-search-bg-color border-none"
                            name='town'
                            errors={formik?.errors.town}
                            value={formik?.values.town}
                            touched={formik?.touched.town}
                            handleChange={formik?.handleChange}
                            disabled={formik?.values?.buildingType?.label === 'Flat' ? true : false}
                        />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row w-full'>
                        <label className='w-48 text-secondary mobile:pl-12'>State</label>

                        <SelectField
                            placeholder="Select"
                            name="state"
                            constant={false}
                            isMulti={false}
                            options={stateDropdown}
                            disabled={formik.values.buildingType.value === 'multiple'}
                            errors={formik?.errors.state}
                            value={formik?.values.state}
                            touched={formik?.touched.state}
                            onChange={(selectedOptions) => {
                                formik.setFieldValue('state', selectedOptions);
                            }}
                        />
                    </div>
                </div>

                <div className='flex gap-4 flex-col sm:flex-row md:gap-12 mt-8 sm:mb-1 w-full md:w-1/2'>
                    <label className='w-48 text-secondary'>Pin code</label>
                    <InputField
                        type='number'
                        placeholder="Pin code"
                        className="bg-search-bg-color border-none"
                        name='pin_code'
                        errors={formik?.errors.pin_code}
                        value={formik?.values?.buildingType?.label === 'Flat' ? formik?.values?.pincode : formik?.values?.pin_code}
                        touched={formik?.touched.pin_code}
                        handleChange={formik?.handleChange}
                        disabled={formik?.values?.buildingType?.label === 'Flat' ? true : false}
                    />
                </div>
                <div className='flex  p-4 justify-between'>
                    <BackButton label="Back" img={left_arrow} onClick={() => setActive('1')} />
                    {formik?.values?.buildingType?.value == 'multiple' ? <ContinueButton type='button' label="Continue" img={right_arrow} onClick={() => {
                        setActive('3')
                    }} /> :
                        <ContinueButton type='button' label="Continue" img={right_arrow} onClick={() => {
                            formik?.validateForm().then(res => {
                                formik?.setTouched(res)
                                if (Object.keys(res).length === 0 && formik.isValid) {
                                    setActive('3')
                                }
                            })
                        }} />

                    }

                </div>
            </div>
        </form>
    )
}

export default LoctaionDetails