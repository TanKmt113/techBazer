'use client'
import BannerForm from '@/components/dashboard/forms/BannerForm'
import BreadcrumbComponent from '@/components/others/Breadcrumb'
import React from 'react'

const AddBannerPage = () => {

  const handleFormSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent links={['/dashboard','/banners']} pageText='Thêm mới banner'/>
      <BannerForm  initialData={undefined} onSubmitForm={handleFormSubmit} />
    </div>
  )
}

export default AddBannerPage