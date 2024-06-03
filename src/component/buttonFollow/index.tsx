import { useEffect, useState } from "react";
// import { useAppSelector } from "../../store";
import API from "../../lib/api";
import { Button } from "@mui/material";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { getFollowingAsync } from "../../store/async/follow";

interface IButtonFollowProps {
  followingId: number;
  // onCreateFollow: () => void
}

const ButtonFollow: React.FC<IButtonFollowProps> = ({ followingId }) => {
  // const auth = useAppSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(false);
  // const { following } = useAppSelector((state) => state)
  const dispatch = useDispatch()
  const getFollow = async () => {
    try {
      const res = await API.get(`check-follow/${followingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res, `ini res get follow`);

      setIsFollow(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (e: React.MouseEvent) => {
    try {
      e.preventDefault()
      await API.post(
        `follow`,
        {
          followingId: followingId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      await getFollow();
      dispatch(getFollowingAsync())

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <Button
      aria-label="delete"
      variant="contained"
      sx={{

        height: "1.8rem",
        fontWeight: "800",
        borderRadius: "20px",
        fontSize: "12px"
      }}

      color={isFollow ? "secondary" : "primary"}
      onClick={handleFollow}
    >
      {isFollow ? "Following" : "Follow"}
    </Button>
  );
};




export default ButtonFollow;
