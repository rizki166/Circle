import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReplies, getThreadsById } from "../../lib/api/call/thread";
import { IThread } from "../../types/app";
import { Box, Typography } from "@mui/material";
import ThreadCard from "./threadCard";
import ThreadPost from "../home/createThread";
import { FaArrowLeftLong } from "react-icons/fa6";

const DetailThread = () => {
   const { threadId } = useParams();

   const [threadDetail, setThreadDetail] = useState<IThread>({
      userId: 0,
      content: "",
      image: [],
      id: 0,
   });

   const [replies, setReplies] = useState<IThread[]>([]);

   const fetchThreadDetail = async () => {
      try {
         const res = await getThreadsById(Number(threadId));
         const resReplies = await getReplies(Number(threadId)); 
         console.log(resReplies);

         setThreadDetail(res.data.data);
         setReplies(resReplies.data.data); 
      } catch (error) {
         console.log(error);
      }
   };

   const handleCreateThread = async () => {
      fetchThreadDetail(); 
   };
   useEffect(() => {
      fetchThreadDetail();
   }, [threadId]);

   return (
      <Box>
         <Typography fontSize={20} fontWeight={600}><FaArrowLeftLong /> Status</Typography>
         <Box>
            <Typography>{threadDetail.author?.fullname}</Typography>
            <Typography color={"white"}>{threadDetail.content}</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {threadDetail.image &&
               threadDetail.image.map((image) => (
                  <img
                     src={"http://localhost:5000/uploads/" + image.image}
                     alt="image"
                     style={{  flex: 1,
                        width: "15rem",
                        height: "300px",
                        borderRadius: "10px",
                        objectFit: "cover",}}
                  />
               ))}
               </Box>
         </Box>

         <Box>
            <ThreadPost
               threadId={Number(threadId)}  onCreateThread={handleCreateThread}
            />
         </Box>

         <Box>
            {replies.map((reply) => (
               <ThreadCard thread={reply} key={reply.id} />
            ))}
         </Box>
      </Box>
   );
};

export default DetailThread;
