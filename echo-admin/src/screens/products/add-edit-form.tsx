"use client";
import AddEditHeader from "@/common/add-edit-header";
import { Input } from "@/components/ui/input";
import TextEditor from "@/components/ui/text-editor";
import SingleUpload from "@/components/ui/upload/single-upload";
import MultipleSingleUpload from "@/components/ui/upload/single-multi-upload";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/ui/multi-select";
import doller from '@public/icons/doller.svg'
import { useFormik } from "formik";
import { productGeneralSchema, productMedicinalSchema } from "@/utils/validations";
import { useProductAddQuery, useProductEditQuery, useProductGetByIdQuery } from "@/api-queries/products/queries";
import { useListBrandQuery, useListCategoryQuery, useListMenuQuery } from "@/api-queries/dropdown/queries";

type FormValues = {
  productName: string;
  productType: string;
  brandName: any;
  categoryName: any;
  menu: any;
  maxOrderLimit: string;
  productPrice: string;
  description: string;
  primaryImg: string;
  mediaImgs: string[];
  dosage: string;
  usage: string
}

export default function AddEditProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productCategory = searchParams.get('id');
  const { data: productData, isFetching } = useProductGetByIdQuery({ id: productCategory })
  const [primaryImage, setPrimaryImage] = useState('')
  const [mediaImage, setMediaImage] = useState([])
  const { mutateAsync: addProduct, isPending } = useProductAddQuery()
  const { mutateAsync: editProduct, isPending: editPending } = useProductEditQuery()
  const { data: category } = useListCategoryQuery()
  const { data: menu } = useListMenuQuery()
  const { data: brand } = useListBrandQuery()

  useEffect(() => {
    if (productData) {
      setPrimaryImage(productData.data?.ProductImages?.find((img: any) => img.isPrimary)?.imageUrl || null);
      setMediaImage(productData.data?.ProductImages?.filter((img: any) => !img.isPrimary).map((img: any) => img.imageUrl) || []);
    }
  }, [productData]);

  const initialValue = {
    productName: productData?.data?.name || '',
    productType: productCategory || '',
    brandName: productData?.data?.brand?.id || '',
    categoryName: productData?.data?.category?.id || '',
    menu: productData?.data?.productGroups.map((item: any) => item.id) || [],
    // menu: productData?.data?.productGroups.map((item: any) => {
    //   return (
    //     { id: item?.id, label: item?.name }
    //   )
    // }) || [],
    maxOrderLimit: productData?.data?.maxOrderLimit || '',
    productPrice: productData?.data?.price || '',
    description: productData?.data?.description || '',
    primaryImg: primaryImage || '',
    mediaImgs: mediaImage || [],
    dosage: productData?.data?.dosage || '',
    usage: productData?.data?.usage || ''
  }

  const validationSchema = useCallback(() => {
    if (productCategory === "medicinal" || productData?.data?.productType === "medicinal") {
      return productMedicinalSchema;
    }
    return productGeneralSchema;
  }, [productCategory, productData]);


  const formik = useFormik<FormValues>({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: validationSchema(),
    onSubmit: async (values: FormValues) => {
      const imagesArray = [...values.mediaImgs];
      if (values.primaryImg) {
        imagesArray.unshift(values.primaryImg);
      }


      const details: {
        name: string;
        productType?: string;
        description: string;
        categoryId: any;
        brandId: any;
        price: number;
        maxOrderLimit: number;
        productGroups: any;
        primaryImageUrl: string;
        images: string[];
        dosage?: string;
        usage?: string;
      } = {
        name: values.productName.trim(),
        description: values.description,
        categoryId: values.categoryName,
        brandId: values.brandName,
        price: parseFloat(values.productPrice),
        maxOrderLimit: parseInt(values.maxOrderLimit),
        productGroups: values.menu,
        primaryImageUrl: values.primaryImg,
        images: imagesArray,
      };

      // Conditionally add dosage and usage
      if (productCategory === 'medicinal' || productData?.data?.productType === 'medicinal') {
        details.dosage = values.dosage;
        details.usage = values.usage; {

        }
      }
      if (productData?.data == null) { details.productType = values.productType }

      try {
        if (productCategory != 'general' && productCategory != 'medicinal') {
          await editProduct({ data: details, id: productCategory })
          router.push('/product-management/products');
        } else {
          await addProduct(details);
          router.push('/product-management/products');
        }
      } catch (error) {
        // Handle error here
      }
    }
  });


  function handleOnClick(e: any) {
    e.preventDefault();
    router.push("/product-management/products");
  }

  const handleEditorChange = (value: any) => {
    console.log('value: ', value);
    formik.setFieldValue('description', value);
  };

  const handleDiscard = () => {
    formik.resetForm()
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="flex flex-col gap-6 h-full w-full">
        <AddEditHeader
          head={productData?.data ? 'Edit Product' : "Add New Product"}
          subhead={productData?.data ? "" : "Create New Product"}
          onClick={handleOnClick}
          backwardIcon={true}
        />
        <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md h-full">
          <label className="text-md text-primary font-semibold">
            {productCategory == "general"
              ? "General Product"
              : productData?.data?.productType == "general" ? "General Product" : "Medicinal Product"}
          </label>
          <div className="flex w-full gap-4 h-full">
            <div className="w-1/2">
              <Input
                placeholder="Enter product name"
                label="Product Name"
                name="productName"
                handleChange={formik.handleChange}
                value={formik?.values?.productName}
                errors={formik?.errors?.productName}
                touched={formik?.touched?.productName} />
            </div>
            <div className="w-1/2">
              <SelectField
                label="Brand Name"
                name="brand"
                placeholder="Enter brand name"
                constant={false}
                isMulti={false}
                options={brand?.data}
                key={formik.values.brandName}
                value={formik?.values?.brandName}
                errors={formik?.errors?.brandName}
                touched={formik?.touched?.brandName}
                onChange={(selectedOptions: any) => {
                  formik.setFieldValue('brandName', selectedOptions);
                }}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/3">
              <SelectField
                label="Category"
                name="categoryName"
                placeholder="Select category"
                isMulti={false}
                constant={false}
                options={category?.data}
                key={formik.values.categoryName}
                value={formik?.values?.categoryName}
                errors={formik?.errors?.categoryName}
                touched={formik?.touched?.categoryName}
                onChange={(selectedOptions: any) => {
                  formik.setFieldValue('categoryName', selectedOptions);
                }}
              />
            </div>
            <div className="w-full">
              <SelectField
                label="Menu"
                placeholder="Select menu"
                name="menu"
                options={menu?.data}
                constant={false}
                isMulti={true}
                key={formik.values.menu}
                value={formik?.values?.menu}
                errors={formik?.errors?.menu}
                touched={formik?.touched?.menu}
                onChange={(selectedOptions: any) => {
                  formik.setFieldValue('menu', selectedOptions);
                }}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <Input
                placeholder="Enter maximum order limit"
                label="Maximum Order Limit"
                name="maxOrderLimit"
                type="text"
                handleChange={formik.handleChange}
                value={formik?.values?.maxOrderLimit}
                errors={formik?.errors?.maxOrderLimit}
                touched={formik?.touched?.maxOrderLimit}
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Enter price"
                label="Product Price"
                icon={doller}
                type="text"
                name="productPrice"
                handleChange={formik.handleChange}
                value={formik?.values?.productPrice}
                errors={formik?.errors?.productPrice}
                touched={formik?.touched?.productPrice}
              />
            </div>
          </div>


          {productCategory == "medicinal" || productData?.data?.productType == "medicinal" ?
            <div className="flex w-full gap-4">
              <div className="w-1/2">
                <Input
                  placeholder="Dosage"
                  label="Dosage"
                  name="dosage"
                  handleChange={formik.handleChange}
                  value={formik?.values?.dosage}
                  errors={formik?.errors?.dosage}
                  touched={formik?.touched?.dosage}

                />
              </div>
              <div className="w-1/2">
                <Input
                  placeholder="Usage"
                  label="Usage"
                  name="usage"
                  handleChange={formik.handleChange}
                  value={formik?.values?.usage}
                  errors={formik?.errors?.usage}
                  touched={formik?.touched?.usage}
                />
              </div>
            </div>
            : ""}

          <div className="h-60">
            <TextEditor
              label="Product Description"
              name="description"
              value={formik?.values?.description}
              errors={formik?.errors?.description}
              handleChange={handleEditorChange}
              touched={formik?.touched?.description}
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="p-6 bg-bg_secondary rounded-md w-1/4 ">
            <p className="text-md text-primary font-semibold">
              Primary Image
            </p>
            <div className="py-4">
              <SingleUpload
                multiselect={false}
                formik={formik}
                fileChange={(e: any) => formik.setFieldValue('primaryImg', e)}
                image={primaryImage}
                value={formik?.values?.primaryImg}
                errors={formik?.errors?.primaryImg}
                touched={formik?.touched?.primaryImg}
              />
            </div>
          </div>
          <div className="p-6 bg-bg_secondary rounded-md w-full">
            <p className="text-md text-primary font-semibold">Media</p>
            <div className="py-4">
              <MultipleSingleUpload
                multiselect={true}
                formik={formik}
                images={mediaImage}
                fileChange={(e: any) => formik.setFieldValue('mediaImg', e)}
                value={formik?.values?.mediaImgs}
                errors={formik?.errors?.mediaImgs}
                touched={formik?.touched?.mediaImgs}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="flex justify-center items-center bg-primary rounded-sm w-80 py-0 px-3">
            <Button variant="add_button" label="Discard Changes" type="button" onClick={handleDiscard} />
            <Button variant="cancel" label="Save Product" size="save" type="submit" disabled={isPending || editPending} />
          </div>
        </div>
      </div>
    </form>
  );
}
