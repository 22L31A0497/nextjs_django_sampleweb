

import Cookies from "js-cookie";

export const add_to_cart = async (formData: any) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`/api/common/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || "Failed to add to cart" };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in Add product to cart (service) =>', error);
    return { success: false, message: "Something went wrong while adding to cart" };
  }
}

export const get_all_cart_Items = async (id: any) => {
  try {
    const res = await fetch(`/api/common/cart/get-cart-items?id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting all cart Item for specific User (service) =>', error)
  }
}


export const delete_a_cart_item = async (id: string) => {
  try {
    const res = await fetch(`/api/common/cart/remove-from-cart?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting cart items (service) =>', error)
  }
}



