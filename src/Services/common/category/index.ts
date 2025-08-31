export const get_all_categories = async () => {
  try {
    const res = await fetch('/api/common/category/getCategory', {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting categories (service) =>', error);
    return { success: false, message: 'Error in getting categories' };
  }
};
