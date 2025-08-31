"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { get_all_categories } from "@/Services/common/category" // correct import
import Loading from "@/app/loading"

type Category = {
  _id: string
  categoryName: string
  categoryDescription: string
}

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await get_all_categories()
        if (res?.success) {
          setCategories(res.data || [])
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-600">No categories available.</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat._id} className="border-b pb-2">
              <Link
                href={`/category/category-product/${cat._id}`}
                className="text-blue-600 hover:underline text-lg"
              >
                {cat.categoryName}
              </Link>
              <p className="text-sm text-gray-500">{cat.categoryDescription}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
