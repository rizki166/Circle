import { Avatar, Box, Typography } from "@mui/material";
import { IUser } from "../../types/app";
import { suggestUsers } from "../../lib/api/call/user";
import { useEffect, useState } from "react";
import ButtonFollow from "../buttonFollow";
// interface ISuggestedProps {
//   following : IUser[]
// }
const Suggested: React.FC = () => {
  const [suggested, setSuggested] = useState<IUser[]>([]);
  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await suggestUsers(9, token);
        setSuggested(res.data.data );
        console.log(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
    
  }, []);
  

  return (
    <Box width={'90%'}>
      <Box
        mt={1}
        height={"14rem"}
        padding={"10px"}
        bgcolor={"#2d2d2d"}
        borderRadius={"10px"}
       

      >
        <Typography  overflow={"auto"} fontSize={17} fontWeight={600} bgcolor={"#2d2d2d"}>
          Suggested For You
        </Typography>
        {suggested.map((user) => (

          <Box  key={user.id}
           bgcolor={"#2d2d2d"} 
           display={"flex"} 
           justifyContent={"space-between"} 
           gap={1} 
           mt={1}
            >
            <Avatar
              src={'http://localhost:5000/uploads/' + user.profile?.avatar}
              alt="defaul"
              sx={{ height: "32px", width: "32px" }}
            />
            <Box mr={'auto'}>
              <Typography bgcolor={"#2d2d2d"} fontSize={12} >{user.fullname}</Typography>
              <Typography bgcolor={"#2d2d2d"} fontSize={12} fontWeight={600}> @{user.username}</Typography>
            </Box>
            
              <Box display={"flex"} justifyContent={"end"}  bgcolor={"#2d2d2d"} >
                <ButtonFollow followingId={user.id as number} />
              </Box>
            </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Suggested;
