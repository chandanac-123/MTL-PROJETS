import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import doller from '@public/icons/doller.svg'
import ModalLayout from '@/components/ui/modal'
import SelectField from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/text-area'


interface creditmodaltype {
    addcreditsModal: boolean;
    handleclosecredit: () => void;
    IssueTypes: string[]
    formik: any
    ticketId: string;
}

export const AddCreditsModal: React.FC<creditmodaltype> = ({ addcreditsModal, handleclosecredit, IssueTypes, formik, ticketId }) => {
    return (
        <ModalLayout isOpen={addcreditsModal} onClose={handleclosecredit} title={"Add Credits"}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className='flex'>
                    <p className='text-sm text-badge_grey font-light'>Order ID :{`${' '}`}<span className='text-[13.5px] text-primary font-semibold'>{ticketId}</span></p>
                </div>

                <div className='mt-6'>
                    <Input
                        label='Credits'
                        placeholder="Enter credit"
                        name="amount"
                        icon={doller}
                        type="number"
                        handleChange={(e: any) => {
                            if (e.target.value >= 0) {
                                formik.handleChange(e);
                            }
                        }}
                        value={formik?.values?.amount}
                        errors={formik?.errors?.amount}
                        touched={formik?.touched?.amount}
                        onKeyDown={(e) => {
                            // Block "-" key and any other non-numeric characters
                            if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className='mt-6'>
                    <SelectField
                        label="Issue Type"
                        name="type"
                        placeholder="Issue Type"
                        isMulti={false}
                        constant={false}
                        options={IssueTypes}
                        value={formik?.values?.type}
                        errors={formik?.errors?.type}
                        touched={formik?.touched?.type}
                        onChange={(selectedOptions: any) => {
                            formik.setFieldValue('type', selectedOptions);
                        }}
                    />
                </div>
                <div className='mt-6'>
                    <Textarea
                        title="Remarks"
                        placeholder="Enter Remarks"
                        name="remarks"
                        maxWords={150}
                        handleChange={formik.handleChange}
                        value={formik.values.remarks}
                        errors={formik.errors.remarks}
                        touched={formik.touched.remarks} />
                </div>
                
                <div className="flex gap-4 mt-8">
                    <Button
                        variant="cancel"
                        label="Cancel"
                        size='modal'
                        type='button'
                        onClick={handleclosecredit}
                    />
                    <Button
                        variant="add_button"
                        size='add'
                        type='submit'
                        label="Add Credits"
                    />
                </div>
            </form>
        </ModalLayout>
    )
}
