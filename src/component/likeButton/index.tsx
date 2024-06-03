import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useAppSelector } from "../../store";
import API from "../../lib/api";
import { useAppDispatch } from "../../store";
import { getThreadsAsync } from "../../store/async/thread";

interface ILikeButtonProps {
   threadId: number;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ threadId }) => {
   const [isLiked, setIsLiked] = useState(false);
   const dispatch = useAppDispatch()
   const getLike = async () => {
      try {
         const res = await API.get(`like/${threadId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         setIsLiked(res.data.data.like === null ? false : true);
      } catch (error) {
         console.log(error);
      }
   };
   const handleLike = async () => {

      try {
         const res = await API.post(
            `likes`,
            {
               threadId: threadId,
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }


         );

         console.log(res);
         dispatch(getThreadsAsync())
         setIsLiked(!isLiked);
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getLike();
   }, []);

   return (
      <IconButton aria-label="delete" onClick={() => handleLike()}>
         <FavoriteIcon sx={{ width: "15px", color: isLiked ? "red" : "gray" }} />
      </IconButton>
   )
}
export default LikeButton;

