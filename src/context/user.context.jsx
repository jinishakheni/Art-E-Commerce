import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProviderWrapper = (props) => {
  const [userDetails, setUserDetails] = useState({});

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUserDetails(userData);
        console.log("User data fetch sucessfully");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log("Error while fetching user data: ", error);
    }
  };

  const updateUserDetails = async (payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userDetails.id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setUserDetails(responseData);
        console.log("User data updated sucessfully");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log("Error while updating user data: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        fetchUserDetails,
        updateUserDetails,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProviderWrapper;
