'use client'
import { useBannerGetByIdQuery, useBannerPublishQuery, useBannerUnpublishQuery, useBannerUpdateQuery } from '@/api-queries/banners/queries'
import { Bold, Italic, Underline } from "lucide-react"
import AddEditHeader from '@/common/add-edit-header'
import ColorPallete from '@/components/ui/colorpalete'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import SingleUpload from '@/components/ui/upload/single-upload'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button } from '@/components/ui/button'
import BannerEditCard from '@/components/banner-card/edit-card'
import { Switch } from '@/components/ui/switch'
import OptionOutsideSelect from '@/components/ui/multi-select/option-outside-select'
import { useListProductQuery } from '@/api-queries/dropdown/queries'
import { FontStyle } from '@/constants/font-family'
import SelectField from '@/components/ui/multi-select'
import { bannerUpdateSchema } from '@/utils/validations'

type Values = {
  background_color: string,
  slider_color: string,
  button_color: string,
  content1_title: string,
  content1_color: string,
  content1_fontstyle: string,
  content1_bold: boolean,
  content1_italic: boolean,
  content1_underline: boolean,
  content2_title: string,
  content2_color: string,
  content2_fontstyle: string,
  content2_bold: boolean,
  content2_italic: boolean,
  content2_underline: boolean,
  content3_title: string,
  content3_color: string,
  content3_fontstyle: string,
  content3_bold: boolean,
  content3_italic: boolean,
  content3_underline: boolean,
  content4_title: string,
  content4_color: string,
  content4_fontstyle: string,
  content4_bold: boolean,
  content4_italic: boolean,
  content4_underline: boolean,
  primaryImg: string,
  bannerProducts: string[]
  [key: string]: any;
}

export default function BannerEdit() {
  const params = useParams()
  const router = useRouter()
  const { data: editData, isLoading } = useBannerGetByIdQuery({ id: params?.id })
  const { data: productList, isFetching } = useListProductQuery()
  const { mutateAsync: bannerUpdate, isPending } = useBannerUpdateQuery()
  const { mutateAsync: publish, isPending: publishPending } = useBannerPublishQuery()
  const { mutateAsync: unpublish, isPending: unpublishPending } = useBannerUnpublishQuery()
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [isPublished, setIsPublished] = useState<boolean>(editData?.data?.isPublished);
  const [colorField, setColorField] = useState<string>('')

  useEffect(() => {
    if (editData?.data) {
      setIsPublished(editData.data.isPublished);
    }
  }, [editData]);

  const initialValue: Values = {
    background_color: editData?.data?.backgroundColor || '#EDE7DB',
    slider_color: editData?.data?.sliderColor || '#9D5A47',
    button_color: editData?.data?.buttonColor || '#222222',
    content1_title: editData?.data?.contents?.content1?.title || 'Content 1',
    content1_color: editData?.data?.contents?.content1?.color || '#222222',
    content1_fontstyle: editData?.data?.contents?.content1?.fontfamily || 'Trirong',
    content1_bold: editData?.data?.contents?.content1?.isBold || false,
    content1_italic: editData?.data?.contents?.content1?.isItalisized || false,
    content1_underline: editData?.data?.contents?.content2?.isUnderlined || false,
    content2_title: editData?.data?.contents?.content2?.title || 'Content 2',
    content2_color: editData?.data?.contents?.content2?.color || '#222222',
    content2_fontstyle: editData?.data?.contents?.content2?.fontfamily || 'Trirong',
    content2_bold: editData?.data?.contents?.content2?.isBold || false,
    content2_italic: editData?.data?.contents?.content2?.isItalisized || false,
    content2_underline: editData?.data?.contents?.content2?.isUnderlined || false,
    content3_title: editData?.data?.contents?.content3?.title || 'Content 3',
    content3_color: editData?.data?.contents?.content3?.color || '#9D5A47',
    content3_fontstyle: editData?.data?.contents?.content3?.fontfamily || 'Trirong',
    content3_bold: editData?.data?.contents?.content3?.isBold || false,
    content3_italic: editData?.data?.contents?.content3?.isItalisized || false,
    content3_underline: editData?.data?.contents?.content3?.isUnderlined || false,
    content4_title: editData?.data?.contents?.content4?.title || 'Content 4',
    content4_color: editData?.data?.contents?.content4?.color || '#222222',
    content4_fontstyle: editData?.data?.contents?.content4?.fontfamily || 'Trirong',
    content4_bold: editData?.data?.contents?.content4?.isBold || false,
    content4_italic: editData?.data?.contents?.content4?.isItalisized || false,
    content4_underline: editData?.data?.contents?.content4?.isUnderlined || false,
    primaryImg: editData?.data?.imageUrl || '',
    bannerProducts: editData?.data?.ProductBanner.map((item: any) => item.product) || []
  };

  const handleOpenColorPicker = (field: string) => {
    setColorField(field) // Set the field name when opening the color picker
    setIsColorPickerOpen(true)
  }

  const handleColorChange = (color: string) => {
    formik.setFieldValue(colorField, color)
  }

  const handleUpdate = () => {
    router.push('/banners')
  }

  const handleConfirm = async () => {
    try {
      if (isPublished) {
        await unpublish({ id: params?.id });
      } else {
        await publish({ id: params?.id });
      }
      setIsPublished(!isPublished); // Toggle state only after success
    } catch (error) {
      // Error handling is already managed within the query
    }
  };


  const formik = useFormik<Values>({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: bannerUpdateSchema,
    onSubmit: async (values: Values) => {
      if (isColorPickerOpen) {
        console.log('Color picker is open. API call will be skipped.');
        return;
      }
      const productsValues = values?.bannerProducts.map((item: any) => item.id)
      const details = {
        'products': productsValues,
        'imageUrl': values?.primaryImg,
        'backgroundColor': values?.background_color,
        'sliderColor': values?.slider_color,
        'buttonColor': values?.button_color,
        'contents': {
          'content1': {
            'color': values?.content1_color,
            'title': values?.content1_title.trim(),
            'isBold': values?.content1_bold,
            'fontfamily': values?.content1_fontstyle,
            'isItalisized': values?.content1_italic,
            'isUnderlined': values?.content1_underline,
          },
          'content2': {
            'color': values?.content2_color,
            'title': values?.content2_title.trim(),
            'isBold': values?.content2_bold,
            'fontfamily': values?.content2_fontstyle,
            'isItalisized': values?.content2_italic,
            'isUnderlined': values?.content2_underline,
          },
          'content3': {
            'color': values?.content3_color,
            'title': values?.content3_title.trim(),
            'isBold': values?.content3_bold,
            'fontfamily': values?.content3_fontstyle,
            'isItalisized': values?.content3_italic,
            'isUnderlined': values?.content3_underline,
          },
          'content4': {
            'color': values?.content4_color,
            'title': values?.content4_title.trim(),
            'isBold': values?.content4_bold,
            'fontfamily': values?.content4_fontstyle,
            'isItalisized': values?.content4_italic,
            'isUnderlined': values?.content4_underline,
          }
        },
      }
      try {
        await bannerUpdate({ data: details, id: params?.id })
        handleUpdate()
      } catch (error: any) {
        console.log('error: ', error);
      }
    }
  })

  const handleToggleChange = (field: string, value: boolean) => {
    formik.setFieldValue(field, value)
  }

  const handleDiscard = () => {
    formik.resetForm()
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="flex flex-col gap-6 h-full w-full">
        <AddEditHeader
          head="Edit Template"
          onClick={handleUpdate}
          backwardIcon={true}
        />
        <p className='font-medium text-md'>{editData?.data?.name}</p>
        <div className='w-full flex gap-4'>
          <div className='w-2/3 flex flex-col h-full gap-4'>

            <div className="flex-1 justify-between gap-4 p-6 bg-bg_secondary rounded-md h-full">
              <p className='text-primary font-semibold text-md pb-4'>Product Details</p>
              <OptionOutsideSelect
                options={productList?.data}
                label="Products"
                placeholder="Select products"
                name="bannerProducts"
                constant={false}
                isMulti={true}
                formik={formik}
                value={formik?.values?.bannerProducts}
                errors={formik?.errors?.bannerProducts}
                touched={formik?.touched?.bannerProducts}
                onChange={(selectedOptions: any) => {
                  const last = selectedOptions[selectedOptions?.length - 1]
                  formik.setFieldValue('bannerProducts', [...formik.values.bannerProducts, last]);
                }} />
            </div>

            <div className="flex-1 justify-between gap-4 p-6 bg-bg_secondary rounded-md h-full">
              <p className='text-primary font-semibold text-md'>Banner Image</p>
              <p className=' font-light text-base py-2'>Add banner image</p>
              <SingleUpload
                multiselect={false}
                formik={formik}
                fileChange={(e: any) => formik.setFieldValue('primaryImg', e)}
                image={formik?.values?.primaryImg}
                value={formik?.values?.primaryImg}
                errors={formik?.errors?.primaryImg}
                touched={formik?.touched?.primaryImg}
              />
            </div>

            <div className='flex gap-4'>
              <div className="flex-1 p-6 bg-bg_secondary rounded-md h-full">
                <p className='text-primary font-semibold text-md'>Background</p>
                <p className=' font-thin text-base py-2'>Background Color</p>
                <div className='flex items-center gap-2'>
                  <button style={{ background: formik?.values?.background_color }} className=' w-12 h-12 rounded-xxxl' onClick={() => handleOpenColorPicker('background_color')}></button>
                  <p className='text-primary font-thin'>Change Color</p>
                </div>
              </div>
              <div className="flex-1 p-6 bg-bg_secondary rounded-md h-full">
                <p className='text-primary font-semibold text-md'>Slider</p>
                <p className=' font-thin text-base py-2'>Slider Color</p>
                <div className='flex items-center gap-2'>
                  <button style={{ background: formik?.values?.slider_color }} className=' w-12 h-12 rounded-xxxl' onClick={() => handleOpenColorPicker('slider_color')}></button>
                  <p className='text-primary font-thin'>Change Color</p>
                </div>
              </div>
              <div className="flex-1 p-6 bg-bg_secondary rounded-md h-full">
                <p className='text-primary font-semibold text-md'>Button</p>
                <p className=' font-thin text-base py-2'>Button Color</p>
                <div className='flex items-center gap-2'>
                  <button style={{ background: formik?.values?.button_color }} className=' w-12 h-12 rounded-xxxl' onClick={() => handleOpenColorPicker('button_color')}></button>
                  <p className='text-primary font-thin'>Change Color</p>
                </div>
              </div>

            </div>

            <div className="flex-1 justify-between gap-4 p-6 bg-bg_secondary rounded-md h-full w-full">
              <p className="text-primary font-semibold text-md py-2 mb-4">Content 1</p>
              <div className="mb-4">
                <Input
                  placeholder="Enter title"
                  label="Title"
                  name="content1_title"
                  handleChange={formik.handleChange}
                  value={formik?.values?.content1_title}
                  errors={formik?.errors?.content1_title}
                  touched={formik?.touched?.content1_title}
                />
              </div>
              <div className="flex items-center gap-2 py-2 mb-4">
                <button
                  style={{ background: formik?.values?.content1_color }}
                  className="w-12 h-12 rounded-xxxl"
                  onClick={() => handleOpenColorPicker('content1_color')}
                ></button>
                <p className="text-primary font-thin">Change Color</p>
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-full mb-4">
                  <SelectField
                    placeholder="Select Font Family"
                    label="Font Family"
                    name="content1_fontstyle"
                    constant={true}
                    isMulti={false}
                    options={FontStyle}
                    value={formik?.values?.content1_fontstyle}
                    onChange={(selectedOptions: any) => {
                      formik.setFieldValue('content1_fontstyle', selectedOptions);
                    }}
                  />
                </div>
                <div className="flex justify-end items-end mb-4">
                  <ToggleGroup
                    type="multiple"
                    value={['content1_bold', 'content1_italic', 'content1_underline'].filter(
                      (field) => formik.values[field as keyof Values]
                    )}
                    onValueChange={(value) => {
                      handleToggleChange('content1_bold', value.includes('content1_bold'));
                      handleToggleChange('content1_italic', value.includes('content1_italic'));
                      handleToggleChange('content1_underline', value.includes('content1_underline'));
                    }}
                  >
                    <ToggleGroupItem value="content1_bold" aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content1_italic" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content1_underline" aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>


            <div className="flex-1 justify-between gap-4 p-6 bg-bg_secondary rounded-md h-full w-full">
              <p className='text-primary font-semibold text-md py-2 mb-4'>Content 2</p>
              <div className="mb-4">
                <Input
                  placeholder="Enter title"
                  label="Title"
                  name="content2_title"
                  handleChange={formik.handleChange}
                  value={formik?.values?.content2_title}
                  errors={formik?.errors?.content2_title}
                  touched={formik?.touched?.content2_title}
                />
              </div>
              <div className='flex items-center gap-2 py-2 mb-4'>
                <button style={{ background: formik?.values?.content2_color }} className=' w-12 h-12 rounded-xxxl' onClick={() => handleOpenColorPicker('content2_color')}></button>
                <p className='text-primary font-thin'>Change Color</p>
              </div>
              <div className='flex gap-4 w-full'>
                <div className='w-full mb-4'>
                  <SelectField
                    placeholder="Enter title"
                    label="Font Family"
                    name="Title"
                    constant={true}
                    isMulti={false}
                    options={FontStyle}
                    value={formik?.values?.content2_fontstyle}
                    onChange={(selectedOptions: any) => {
                      formik.setFieldValue('content2_fontstyle', selectedOptions);
                    }}
                  />
                </div>
                <div className='flex justify-end items-end mb-4'>
                  <ToggleGroup
                    type="multiple"
                    value={['content2_bold', 'content2_italic', 'content2_underline'].filter(
                      (field) => formik.values[field as keyof Values]
                    )}
                    onValueChange={(value) => {
                      handleToggleChange('content2_bold', value.includes('content2_bold'))
                      handleToggleChange('content2_italic', value.includes('content2_italic'))
                      handleToggleChange('content2_underline', value.includes('content2_underline'))
                    }}>
                    <ToggleGroupItem value="content2_bold" aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content2_italic" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content2_underline" aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>

            <div className="flex-1 justify-between gap-4 p-6 bg-bg_secondary rounded-md h-full w-full">
              <p className='text-primary font-semibold text-md py-2 mb-4'>Content 3</p>
              <div className="w-full mb-4">
              <Input
                placeholder="Enter title"
                label="Title"
                name="content3_title"
                handleChange={formik.handleChange}
                value={formik?.values?.content3_title}
                errors={formik?.errors?.content3_title}
                touched={formik?.touched?.content3_title}
              />
              </div>
              <div className='flex items-center gap-2 py-2 mb-4'>
                <button style={{ background: formik?.values?.content3_color }} className=' w-12 h-12 rounded-xxxl' onClick={() => handleOpenColorPicker('content3_color')}></button>
                <p className='text-primary font-thin'>Change Color</p>
              </div>
              <div className='flex gap-2 w-full'>
              <div className="w-full mb-4">
                  <SelectField
                    placeholder="Enter title"
                    label="Font Family"
                    name="Title"
                    constant={true}
                    isMulti={false}
                    options={FontStyle}
                    value={formik?.values?.content3_fontstyle}
                    onChange={(selectedOptions: any) => {
                      formik.setFieldValue('content3_fontstyle', selectedOptions);
                    }}
                  />
                </div>
                <div className='flex justify-end items-end mb-4'>
                  <ToggleGroup
                    type="multiple"
                    value={['content3_bold', 'content3_italic', 'content3_underline'].filter(
                      (field) => formik.values[field as keyof Values]
                    )}
                    onValueChange={(value) => {
                      handleToggleChange('content3_bold', value.includes('content3_bold'))
                      handleToggleChange('content3_italic', value.includes('content3_italic'))
                      handleToggleChange('content3_underline', value.includes('content3_underline'))
                    }}>
                    <ToggleGroupItem value="content3_bold" aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content3_italic" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content3_underline" aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>

            <div className="flex-1 justify-between gap-4 p-6 bg-bg_secondary rounded-md h-full w-full">
              <p className='text-primary font-semibold text-md py-2 mb-4'>Content 4</p>
              <div className='w-full mb-4'>
              <Input
                placeholder="Enter title"
                label="Title"
                name="content4_title"
                handleChange={formik.handleChange}
                value={formik?.values?.content4_title}
                errors={formik?.errors?.content4_title}
                touched={formik?.touched?.content4_title}
              />
              </div>
              <div className='flex items-center gap-2 py-2 mb-4'>
                <button style={{ background: formik?.values?.content4_color }} className=' w-12 h-12 rounded-xxxl' onClick={() => handleOpenColorPicker('content4_color')}></button>
                <p className='text-primary font-thin'>Change Color</p>
              </div>
              <div className='flex gap-2 w-full'>
                <div className="w-full mb-4">
                  <SelectField
                    placeholder="Enter title"
                    label="Font Family"
                    name="Title"
                    constant={true}
                    isMulti={false}
                    options={FontStyle}
                    value={formik?.values?.content4_fontstyle}
                    onChange={(selectedOptions: any) => {
                      formik.setFieldValue('content4_fontstyle', selectedOptions);
                    }}
                  />
                </div>
                <div className='flex justify-end items-end mb-4'>
                  <ToggleGroup
                    type="multiple"
                    value={['content4_bold', 'content4_italic', 'content4_underline'].filter(
                      (field) => formik.values[field as keyof Values]
                    )}
                    onValueChange={(value) => {
                      handleToggleChange('content4_bold', value.includes('content4_bold'))
                      handleToggleChange('content4_italic', value.includes('content4_italic'))
                      handleToggleChange('content4_underline', value.includes('content4_underline'))
                    }}>
                    <ToggleGroupItem value="content4_bold" aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content4_italic" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="content4_underline" aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
          </div>

          <ColorPallete
            isColorPickerOpen={isColorPickerOpen}
            handleCloseColorPicker={() => setIsColorPickerOpen(false)}
            onColorChange={(color) => handleColorChange(color)}
            selectedColor={formik.values[colorField]}
          />

          <div className='w-1/3'>
            <div className='flex justify-end items-end gap-2 py-3'>
              <p className='text-md font-light'>Publish</p>
              <Switch
                checked={isPublished}
                onCheckedChange={handleConfirm}
                disabled={publishPending || unpublishPending}
              />
            </div>
            <BannerEditCard data={formik.values} />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center items-center py-4">
        <div className="flex justify-center items-center bg-primary rounded-sm w-80 py-0 px-3">
          <Button variant="add_button" label="Discard Changes" type='button' onClick={handleDiscard} />
          <Button variant="cancel" label="Save Changes" size="save" type="submit" disabled={isPending} />
        </div>
      </div>
    </form>
  )
}