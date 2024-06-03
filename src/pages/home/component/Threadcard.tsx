import { Box, Typography } from "@mui/material";
import { IThread } from "../../../types/app";
import { useNavigate } from "react-router-dom";

interface IThreadCardProps {
   thread: IThread;
}

const ThreadCard: React.FC<IThreadCardProps> = ({ thread }) => {
   const navigate = useNavigate();

   return (
      <Box 
      //  borderBottom={"1px solid gray"}
      // padding={"1px"}
      mb={1}
      sx={{bgcolor: 'green'}}
      onClick={() => {
         navigate(`/detail/${thread.id}`);
      }}>
      <Box
        bgcolor={'red'}
      >
         <Typography variant="body1">{thread.content}</Typography>
         <Typography variant="body2" color="gray">
            {thread.author?.username}
         </Typography>
         <Typography>
            {thread.createdAt}
         </Typography>
         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {thread.image &&
               thread.image.map((image) => (
                  <img
                     src={"http://localhost:5000/uploads/" + image.image}
                     alt="image"
                     style={{
                      
                        flex: 1,
                        height: "200px",
                        borderRadius: "20px",
                        objectFit: "cover",
                     }}
                  />
               ))}
               <h1>hallow</h1>
         </Box>
      </Box>
      </Box>
   );
};

export default ThreadCard;