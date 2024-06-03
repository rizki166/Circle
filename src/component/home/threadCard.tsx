import { Box, Typography, Avatar } from "@mui/material";
import { IThread } from "../../types/app";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { CgComment } from "react-icons/cg";
import LikeButton from "../likeButton";
import { useAppSelector } from "../../store";

interface IThreadCardProps {
   thread: IThread;
   count?: number;
}

const ThreadCard: React.FC<IThreadCardProps> = ({ thread }) => {
   const navigate = useNavigate();
   const { user } = useAppSelector((state) => state.auth);

   function formatTime(createdAt: number): string {
      const durationMilliseconds = moment().diff(moment(createdAt));
      const days = moment.duration(durationMilliseconds).asDays();
      const roundedDays = Math.round(days);
      return `${roundedDays}d`;
   }

   return (
      <Box
         borderBottom={"1px solid gray"}
         padding={"5px"}
         mb={1}
         m={0}
      >
         <Box display={'flex'} gap={1}>
            <Avatar
               src={`http://localhost:5000/uploads/${thread.author?.profile?.avatar}`}
               sx={{ height: '35px', width: '35px' }}
            />

            <Typography fontSize={"13px"} fontWeight={"bold"} variant="body1">
               @{thread.author?.username}
            </Typography>
            <Typography sx={{ color: 'gray' }} fontSize={"13px"}>{thread.author?.fullname}</Typography>
            <Typography fontSize={"14px"} display={'flex'} justifyContent={'end'}>
               {formatTime(thread.createdAt)}
            </Typography>
         </Box>
         <Typography mt={1} variant="body1">{thread.content}</Typography>
         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {thread.image &&
               thread.image.map((image, index: number) => (
                  <img
                     key={index}
                     src={`http://localhost:5000/uploads/${image.image}`}
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
         <Box display={"flex"} alignItems={'center'}>
            <Box display={"flex"} alignItems={"center"}>
               <LikeButton threadId={thread.id as number} />
               <Typography fontSize={13}>{thread._count?.like}</Typography>
            </Box>
            <Box display={"flex"} alignContent={"center"} ml={2}>
               <Typography fontSize={13} onClick={() => {
                  navigate(`/detail/${thread.id}`);
               }}>
                  <CgComment size={15} color="grey" /> {thread._count?.reply} Replies
               </Typography>
            </Box>
         </Box>
      </Box>
   );
};

export default ThreadCard;
