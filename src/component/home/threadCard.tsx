import { Box, Typography,Avatar } from "@mui/material";
import { IThread } from "../../types/app";
import { useNavigate } from "react-router-dom";
import moment from 'moment'; 
import { FaHeart } from "react-icons/fa";
import { CgComment } from "react-icons/cg";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

interface IThreadCardProps {
   thread: IThread;
}

const ThreadCard: React.FC<IThreadCardProps> = ({ thread }) => {

   const navigate = useNavigate();

  
   const formatTime = (time: string) => {
      const hours = moment().diff(time, 'hours');
      return `${hours}h`;
   };


   return (
      <Box
         borderBottom={"1px solid gray"}
         padding={"10px"}
         mb={1}
         sx={{ cursor: "pointer" }}
         className="scroll-bar"
        
      >
         <Box display={'flex'} gap={1}>
         <Avatar src={`http://localhost:5000/uploads/${thread.author?.profile?.avatar}`}
            sx={{   height: '35px', width: '35px' }} />
         <Typography variant="body2" color="gray">
            {thread.author?.fullname}
         </Typography>
         <Typography fontSize={"14px"} variant="body1">@{thread.author?.username}</Typography>
         <Typography  fontSize={"14px"} display={'flex'} justifyContent={'end'}>
         
            {formatTime(thread.createdAt)}
         </Typography>
         </Box>
         <Typography mt={1} variant="body1">{thread.content}</Typography>
         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>

            {thread.image &&
               thread.image.map((image, index: number) => (
                  <img
                     key={index} 
                     src={"http://localhost:5000/uploads/" + image.image}
                     alt="image"
                     style={{
                        flex: 1,
                        width: "15rem",
                        height: "300px",
                        borderRadius: "10px",
                        objectFit: "cover",
                     }}
                  />
               ))}
         </Box>
         <Box display={"flex"} gap={1} margin={1}>
         <FaHeart  color="red" />
         <Typography fontSize={14} onClick={() => {
            navigate(`/detail/${thread.id}`);
         }}
         ><CgComment  color="grey"/> Replies</Typography>
         <AccessibilityNewIcon sx={{ color: "red" }}/>
         </Box>
      </Box>
   );
};

export default ThreadCard;
