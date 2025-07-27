
export const getAllBugs = async () => {
  try {
    const response = await fetch('/api/bugs/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bugs:', error);
    throw error;
  }
}