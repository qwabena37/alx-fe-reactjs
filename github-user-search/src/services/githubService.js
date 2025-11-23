import axios from "axios";

// Base GitHub API URL
const BASE_URL = "https://api.github.com";

// This is the function your tests are looking for
export async function fetchUserData(username) {
  try {
    // MUST use axios.get → test requirement
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
