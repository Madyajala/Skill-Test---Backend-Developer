import axios, { AxiosResponse } from 'axios';


interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}


async function fetchDataFromApi(): Promise<ApiResponse[]> {
  try {
    const response: AxiosResponse<ApiResponse[]> = await axios.get<ApiResponse[]>('https://jsonplaceholder.typicode.com/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}


async function main() {
  try {
    const data = await fetchDataFromApi();
    console.log('Data from API:', data);
  } catch (error) {
    console.error('Error in main:', error);
  }
}


main();
