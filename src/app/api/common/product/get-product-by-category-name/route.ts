import connectDB from "@/app/components/DB/connectDB"; // default import
import { NextResponse } from "next/server";
import Product from "../../../../../model/Product";
import Category from "../../../../../model/Category"; // use your Category model

export async function GET(req: Request) {
  try {
    await connectDB(); // wait for DB connection

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({
        success: false,
        message: "Category name is required!",
      });
    }

    // Find category by name
    const categoryData = await Category.findOne({ categoryName: name });
    if (!categoryData) {
      return NextResponse.json({ success: false, message: "Category not found!" });
    }

    // Find products with that category ID
    const allProductsOfCategory = await Product.find({ productCategory: categoryData._id }).populate(
      "productCategory"
    );

    return NextResponse.json({
      success: allProductsOfCategory.length > 0,
      message:
        allProductsOfCategory.length > 0
          ? "All Products of specific category!"
          : "No Products found for this category!",
      data: allProductsOfCategory,
    });
  } catch (error) {
    console.log("Error in getting products by category name:", error);
    return NextResponse.json({
      success: false,
      message: "Error in getting products by category name!",
    });
  }
}
