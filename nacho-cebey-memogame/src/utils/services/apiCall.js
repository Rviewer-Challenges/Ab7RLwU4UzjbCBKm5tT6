const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error de red - ${response.status}`);
  }
  return response.json();
};

const fetchApiData = async (url) => {
  try {
    const response = await fetch(url);
    return handleApiResponse(response);
  } catch (error) {
    console.error(`Error durante la llamada a la API: ${error.message}`);
    throw error;
  }
};

export { fetchApiData };