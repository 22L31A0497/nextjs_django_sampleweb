"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

type Inputs = {
    name: string,
    description: string,
    slug: string,
    feature: boolean,
    price: number,
    quantity: number,
    categoryID: string,
    image: File[],
}

type CategoryData = {
    _id: string;
    categoryName: string;
    categoryDescription: string;
}

const staticCategories: CategoryData[] = [
    { _id: "1", categoryName: "Strength Training", categoryDescription: "Weights and dumbbells" },
    { _id: "2", categoryName: "Cardio Equipment", categoryDescription: "Machines for cardio" },
    { _id: "3", categoryName: "Yoga & Flexibility", categoryDescription: "Yoga mats and accessories" }
];

export default function AddProduct() {
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ criteriaMode: "all" });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoader(true);
        // Mock image upload
        const imageUrl = URL.createObjectURL(data.image[0]);

        const newProduct = {
            _id: Date.now().toString(),
            productName: data.name,
            productDescription: data.description,
            productSlug: data.slug,
            productFeatured: data.feature,
            productPrice: data.price,
            productQuantity: data.quantity,
            productCategory: staticCategories.find(cat => cat._id === data.categoryID),
            productImage: imageUrl
        };

        // Save product in localStorage
        const existing = JSON.parse(localStorage.getItem('products') || '[]');
        localStorage.setItem('products', JSON.stringify([...existing, newProduct]));

        toast.success('Product added successfully!');
        setLoader(false);
    };

    return (
        <div className='w-full p-4 min-h-screen bg-gray-50 flex flex-col'>
            <div className="text-sm breadcrumbs border-b-2 border-b-orange-600">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li>Add Product</li>
                </ul>
            </div>

            <h1 className='text-2xl py-2'>Add Product</h1>

            {loader ? (
                <div className='flex flex-col items-center justify-center h-96'>
                    <TailSpin height="50" width="50" color="orange" ariaLabel="loading" />
                    <p className='mt-2 text-orange-500 font-semibold'>Adding Product...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg flex flex-col">
                    <select {...register("categoryID", { required: true })} className="select select-bordered mb-2">
                        <option value="">Pick one category</option>
                        {staticCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.categoryName}</option>)}
                    </select>
                    {errors.categoryID && <span className='text-red-500 text-xs'>Category is required</span>}

                    <input {...register("name", { required: true })} placeholder="Product Name" className="input input-bordered mb-2" />
                    {errors.name && <span className='text-red-500 text-xs'>Name is required</span>}

                    <input {...register("slug", { required: true })} placeholder="Product Slug" className="input input-bordered mb-2" />
                    {errors.slug && <span className='text-red-500 text-xs'>Slug is required</span>}

                    <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered mb-2" />
                    <input {...register("quantity", { required: true })} type="number" placeholder="Quantity" className="input input-bordered mb-2" />
                    <textarea {...register("description", { required: true })} placeholder="Description" className="textarea textarea-bordered mb-2" />

                    <label className="flex items-center space-x-2 mb-2">
                        <span>Featured</span>
                        <input {...register("feature")} type="checkbox" className="checkbox" />
                    </label>

                    <input {...register("image", { required: true })} type="file" accept="image/*" className="file-input file-input-bordered mb-2" />
                    {errors.image && <span className='text-red-500 text-xs'>Image is required</span>}

                    <button className='btn btn-block mt-3'>Add Product</button>
                </form>
            )}
            <ToastContainer />
        </div>
    );
}
