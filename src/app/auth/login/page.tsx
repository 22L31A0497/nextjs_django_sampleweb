"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { MdFavorite } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/store'
import Cookies from 'js-cookie'
import { add_to_cart } from '@/Services/common/cart'
import { bookmark_product } from '@/Services/common/bookmark'

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

type UserData = {
  email: string
  name: string
  _id: string
  role?: string
}

export default function StaticProductCard({
  productName,
  productFeatured,
  productImage,
  productCategory,
  productPrice,
  _id,
  productSlug
}: ProductData) {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.User.userData) as UserData | null
  const isAuthenticated = !!Cookies.get('token') && !!user

  const redirectToLogin = () => {
    Cookies.remove('token')
    router.push('/auth/login')
  }

  const AddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isAuthenticated || !user?._id) {
      redirectToLogin()
      return
    }

    try {
      const res = await add_to_cart({ productID: _id, userID: user._id })
      if (res?.success) {
        toast.success(`${productName} added to cart successfully!`)
      }
      // Removed toast for failure
    } catch {
      // removed toast
    }
  }

  const AddToBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isAuthenticated || !user?._id) {
      redirectToLogin()
      return
    }

    try {
      const res = await bookmark_product({ productID: _id, userID: user._id })
      if (res?.success) {
        toast.success(`${productName} bookmarked successfully!`)
      }
      // Removed toast for failure
    } catch {
      // removed toast
    }
  }

  const handleProductClick = () => {
    router.push(`/product/product-detail/${_id}`)
  }

  return (
    <>
      <div
        onClick={handleProductClick}
        className="card text-black cursor-pointer card-compact m-3 w-80 bg-white shadow-xl relative"
      >
        <div className="w-full rounded relative h-60">
          <Image
            src={productImage || '/images98.jpg'}
            alt={productName}
            fill
            className="rounded object-cover"
          />
          <button
            onClick={AddToBookmark}
            aria-label="Bookmark Product"
            className="btn btn-circle btn-ghost absolute top-2 right-2 hover:bg-orange-100"
            title={isAuthenticated ? "Bookmark Product" : "Login to Bookmark"}
          >
            <MdFavorite className="text-2xl text-orange-600 font-semibold" />
          </button>
        </div>
        <div className="card-body">
          <h2 className="card-title">{productName}</h2>
          <p className="font-semibold">{`Rs ${productPrice}`}</p>
          <div className="card-actions justify-end z-20">
            <button
              onClick={AddToCart}
              aria-label="Add to Cart"
              className="btn btn-circle btn-ghost hover:bg-orange-100"
              title={isAuthenticated ? "Add to Cart" : "Login to Add to Cart"}
            >
              <BsCartPlus className="text-2xl text-orange-600 font-semibold" />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
