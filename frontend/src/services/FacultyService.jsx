/* eslint-disable eqeqeq */
import axios from "../config/axios";

export const getFacultyByBranch = async (branch, year) => {
  try {
    const response = await axios.get(`/faculty?branch=${branch}`);
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

export const getAllFaculties = async () => {
  try {
    const response = await axios.get(`/faculty`);
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

export const deleteFaculty = async (facultyId) => {
  //   console.log(subjectId);
  try {
    const response = await axios.delete(`/faculty/${facultyId}`);
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

export const addFaculty = async (faculty) => {
  try {
    const response = await axios.post(`/faculty`, JSON.stringify(faculty), {
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
