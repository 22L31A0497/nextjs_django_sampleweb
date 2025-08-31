"use client"

import React from 'react';
import StaticProductCard from './StaticProductCard';

type ProductData = {
    productName: string;
    productImage: string;
    productSlug: string;
    productPrice: string;
    productFeatured: boolean;
    productCategory: {
        categoryName: string;
        _id: string;
        categoryDescription: string;
    };
    _id: string;
};

export default function FeaturedProduct() {
    const staticProducts: ProductData[] = [
        {
            productName: "Dumbbell Set",
            productImage: "/dumbells.jpeg",
            productSlug: "dumbbell-set",
            productPrice: 2999,
            productFeatured: true,
            productCategory: { categoryName: "Strength Training", _id: "1", categoryDescription: "Weights and dumbbells for muscle building" },
            _id: "101"
        },
        {
            productName: "Treadmill Pro",
            productImage: "/treadmill.jpeg",
            productSlug: "treadmill-pro",
            productPrice: 49999,
            productFeatured: true,
            productCategory: { categoryName: "Cardio Equipment", _id: "2", categoryDescription: "Machines for endurance and cardio workouts" },
            _id: "102"
        },
        {
            productName: "Yoga Mat Deluxe",
            productImage: "/yoga.jpeg",
            productSlug: "yoga-mat-deluxe",
            productPrice: 1499,
            productFeatured: true,
            productCategory: { categoryName: "Yoga & Flexibility", _id: "3", categoryDescription: "Mats and accessories for yoga and stretching" },
            _id: "103"
        },
        {
            productName: "Kettlebell Set",
            productImage: "/kettlebell.jpeg",
            productSlug: "kettlebell-set",
            productPrice: 2599,
            productFeatured: true,
            productCategory: { categoryName: "Strength Training", _id: "1", categoryDescription: "Weights and kettlebells for strength workouts" },
            _id: "104"
        },
        {
            productName: "Pull-Up Bar",
            productImage: "/pullupbar.jpeg",
            productSlug: "pull-up-bar",
            productPrice: 1999,
            productFeatured: true,
            productCategory: { categoryName: "Bodyweight Training", _id: "4", categoryDescription: "Bars and equipment for calisthenics" },
            _id: "105"
        },
        {
            productName: "Resistance Bands Set",
            productImage: "/resistance.jpeg",
            productSlug: "resistance-bands-set",
            productPrice: 799,
            productFeatured: true,
            productCategory: { categoryName: "Rehabilitation & Flexibility", _id: "5", categoryDescription: "Bands for stretching and recovery exercises" },
            _id: "106"
        }
    ];

    return (
        <div className="w-full bg-gray-50 text-black flex items-center flex-col justify-start">
            <div className="flex items-center justify-center px-2 py-2 mb-2">
                <h1 className="py-2 px-4 border-x-2 border-x-orange-500 font-semibold text-2xl">
                    Top Products
                </h1>
            </div>
            <div className="md:w-4/5 w-full px-1 h-full min-h-96 py-2 md:px-4 flex items-center justify-center flex-wrap">
                {staticProducts.map((item) => (
                    <StaticProductCard
                        key={item._id}
                        productName={item.productName}
                        productPrice={item.productPrice}
                        productFeatured={item.productFeatured}
                        productImage={item.productImage}
                        productCategory={item.productCategory}
                        productSlug={item.productSlug}
                        _id={item._id}
                    />
                ))}
            </div>
        </div>
    );
}
