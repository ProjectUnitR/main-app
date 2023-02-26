import axios from "../config/axios";

export const getBranches = async () => {
  try {
    const response = await axios.get(`/branch`);
    if (response.data.length > 0) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
