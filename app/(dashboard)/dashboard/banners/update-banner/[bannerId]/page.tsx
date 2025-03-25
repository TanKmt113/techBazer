'use client'
import BannerForm from '@/components/dashboard/forms/BannerForm'
import BreadcrumbComponent from '@/components/others/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { Banner } from '@/types'
import { api } from '@/utils/api'
import { useParams } from 'next/navigation'

const AddBannerPage = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const { bannerId } = useParams();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await api.get< {metadata?: Banner}>(`/branner/${bannerId}`);
        if (!response || !response.metadata) throw new Error("Failed to fetch banner");
        setBanner(response.metadata);
      } catch (error) {
        console.error("Error fetching banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [bannerId]);

  const handleFormSubmit =async (data: Banner) => {
    try {
      const response = await api.pat<any>(`branner/${bannerId}`,data);
      if (response.status !=200) throw new Error("Failed to fetch banner");
      alert('Cập nhật thành công');
    } catch (error) {
      
    }
  };

  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent links={['/dashboard','/banners']} pageText='Cập nhật banner'/>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BannerForm initialData={banner || undefined} onSubmitForm={handleFormSubmit} />
      )}
    </div>
  )
}

export default AddBannerPage
