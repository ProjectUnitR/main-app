/* eslint-disable eqeqeq */
import axios from "../config/axios";

export const getAllClasses = async () => {
  try {
    const response = await axios.get(`/class`);
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

export const getClassesByBranchAndYear = async (branch, year) => {
  try {
    const response = await axios.get(`/class?branch=${branch}&year=${year}`);
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

export const addClass = async (newClass) => {
  try {
    const response = await axios.post(`/class`, JSON.stringify(newClass), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteClass = async (classId) => {
  try {
    const response = await axios.delete(`/subject/${classId}`);
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
