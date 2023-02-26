import axios from "../config/axios";

export const getAllBatches = async () => {
  try {
    const response = await axios.get(`/batch`);
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

export const getBatchesByClass = async (classId) => {
  try {
    const response = await axios.get(`/batch?class=${classId}`);
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
