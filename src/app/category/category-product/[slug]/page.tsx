"use client"

import {
  get_product_by_category_id,
  get_product_by_category_name,
} from "@/Services/Admin/product"
import Loading from "@/app/loading"
import ProductCard from "@/app/components/ProductCard" // corrected import path
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import useSWR from "swr"

interface pageParam {
  slug: string
}

type ProductData = {
  productName: string
  productImage: string
  productSlug: string
  productPrice: number
  productFeatured: boolean
  productCategory: {
    categoryName: string
    categoryDescription: string
    _id: string
  }
  _id: string
}

export default function Page({ params }: { params: pageParam }) {
  const [thisProduct, setThisProdData] = useState<ProductData[]>([])

  // detect if slug looks like an ObjectId (24 hex chars) or a name
  const isId = /^[0-9a-fA-F]{24}$/.test(params.slug)

  const { data, isLoading } = useSWR(
    ["/getProducts", params.slug],
    () =>
      isId
        ? get_product_by_category_id(params.slug)
        : get_product_by_category_name(decodeURIComponent(params.slug))
  )

  useEffect(() => {
    if (data?.success) {
      setThisProdData(data?.data || [])
      // Optional: show success toast when products are successfully fetched
      // toast.success(`Loaded ${data?.data?.length || 0} products`)
    }
    // Removed all toast.error calls
  }, [data])

  return (
    <div className="w-full min-h-screen dark:text-black bg-gray-50 py-4 px-2">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs border-b-2 border-b-orange-600 mb-4">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/category/category-product">Categories</Link>
          </li>
          <li>
            <Link href={`/category/category-product/${params.slug}`}>
              {decodeURIComponent(params.slug)}
            </Link>
          </li>
        </ul>
      </div>

      <ToastContainer />

      {/* Products */}
      <div className="flex flex-wrap justify-center items-start gap-4">
        {isLoading ? (
          <Loading />
        ) : thisProduct?.length === 0 ? (
          <div className="w-full text-black text-xl text-center font-semibold">
            No Products Found in {decodeURIComponent(params.slug)}
          </div>
        ) : (
          thisProduct?.map((item: ProductData) => (
            <ProductCard key={item._id} {...item} />
          ))
        )}
      </div>
    </div>
  )
}
