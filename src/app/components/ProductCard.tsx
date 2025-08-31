"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { BsCartPlus } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";

type ProductCardProps = {
  productName: string;
  productImage: string;
  productSlug: string;
  productPrice: string | number;
  productFeatured: boolean;
  productCategory: {
    categoryName: string;
    _id: string;
    categoryDescription: string;
  };
  _id: string;
};

export default function ProductCard({
  productName,
  productImage,
  productSlug,
  productPrice,
  productFeatured,
  productCategory,
  _id,
}: ProductCardProps) {
  const AddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyInCart = existingCart.find((item: any) => item._id === _id);

    const updatedCart = alreadyInCart
      ? existingCart.map((item: any) =>
          item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...existingCart, { _id, productName, productPrice, productImage, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${productName} added to cart!`);
  };

  const AddToBookmark = () => {
    const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const alreadyBookmarked = existingBookmarks.find((item: any) => item._id === _id);

    if (alreadyBookmarked) {
      toast.info(`${productName} is already bookmarked`);
      return;
    }

    const updatedBookmarks = [...existingBookmarks, { _id, productName, productPrice, productImage }];
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    toast.success(`${productName} bookmarked!`);
  };

  return (
    <div className="card text-black cursor-pointer card-compact m-3 w-80 bg-white shadow-xl relative">
      {/* Main clickable image using dynamic route */}
      <Link
        href={{
          pathname: "/product/[slug]",
          query: { slug: productSlug },
        }}
        className="w-full rounded relative h-60 block"
      >
        <Image
          src={productImage || "/images98.jpg"}
          alt={productName}
          fill
          className="rounded object-cover"
        />
      </Link>

      <div className="card-body">
        <Link href={{ pathname: "/product/[slug]", query: { slug: productSlug } }}>
          <h2 className="card-title">{productName}</h2>
        </Link>

        <Link href={{ pathname: "/product/[slug]", query: { slug: productSlug } }}>
          <p className="font-semibold">Rs {productPrice}</p>
        </Link>
      </div>

      <div className="card-actions justify-end z-20">
        <button onClick={AddToCart} className="btn btn-circle btn-ghost">
          <BsCartPlus className="text-2xl text-orange-600 font-semibold" />
        </button>
        <button
          onClick={AddToBookmark}
          className="btn btn-circle btn-ghost absolute top-0 right-0"
        >
          <MdFavorite className="text-2xl text-orange-600 font-semibold" />
        </button>
      </div>
    </div>
  );
}
