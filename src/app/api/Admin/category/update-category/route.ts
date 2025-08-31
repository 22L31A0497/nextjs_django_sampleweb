import connectDB from "@/app/components/DB/connectDB";
import AuthCheck from "../../../../../middleware/AuthCheck";
import { NextResponse } from "next/server";
import Category from "../../../../../model/Category";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === 'admin') {
      const data = await req.json();
      const { name, _id, description, slug } = data;

      if (!_id) {
        return NextResponse.json({ success: false, message: "Category ID is required!" });
      }

      const saveData = await Category.findByIdAndUpdate(
        _id,
        {
          categoryName: name,
          categoryDescription: description,
          categorySlug: slug,
        },
        { new: true }
      );

      if (saveData) {
        return NextResponse.json({ success: true, message: "Category updated successfully!", data: saveData });
      } else {
        return NextResponse.json({ success: false, message: "Failed to update the category. Please try again!" });
      }

    } else {
      return NextResponse.json({ success: false, message: "You are not authorized." });
    }

  } catch (error) {
    console.log('Error in updating category:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });
  }
}
