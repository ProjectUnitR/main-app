/* eslint-disable eqeqeq */
import axios from "../config/axios";

export const getSubjectsByBranchAndYear = async (branch, year) => {
  try {
    const response = await axios.get(`/subject?branch=${branch}&year=${year}`);
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

export const getAllSubjects = async (branch, year) => {
  try {
    const response = await axios.get(`/subject`);
    if (response.data.length > 0) {
      console.log(response.data);
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const deleteSubject = async (subjectId) => {
  //   console.log(subjectId);
  try {
    const response = await axios.delete(`/subject/${subjectId}`);
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

export const addSubject = async (subject) => {
  try {
    const response = await axios.post(`/subject`, JSON.stringify(subject), {
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
