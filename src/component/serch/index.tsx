import React, { useState, useEffect } from "react";
import { getUsers } from "../../lib/api/call/user";
import { IUser } from "../../types/app";
import { Avatar, Box, Button, Typography } from "@mui/material";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  console.log(searchResults, "result");

  const handleSearch = async () => {
    try {
      const response = await getUsers();

      const filteredResults = response.data.data.filter((user: IUser) =>
        user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim() !== "") {
        await handleSearch();
      } else {
        setSearchResults([]);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        style={{
          width: "98%",
          height: "30px",
          border: "1px solid gray",
          backgroundColor: "#1d1d1d",
          borderRadius: "20px",
          marginTop: "10px",
          marginLeft: "5px",
          color: "white",
        }}
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map((user) => (
          <Box
            mt={2}
            ml={2}
            display={"flex"}
            gap={0.5}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} gap={1}>
              <Avatar
                src={`http://localhost:5000/uploads/${user.profile?.avatar}`}
                sx={{ height: "35px", width: "35px" }}
              />

              <Box display={"flex"} flexDirection={"column"}>
                <Typography fontSize={12}>{user.fullname}</Typography>
                <Typography fontSize={12}>{user.username}</Typography>
                <Typography fontSize={12}>{user.profile?.bio}</Typography>
              </Box>
            </Box>
            <Button
              sx={{
                color: "white",
                border: "1px solid gray",
                borderRadius: "20px",
                height: "30px",
                width: "70px",
                fontSize: "12px",
                fontWeight: "600",
                mr: 2,
              }}
            >
              Follow
            </Button>
          </Box>
        ))}
      </ul>
    </div>
  );
};

export default Search;
