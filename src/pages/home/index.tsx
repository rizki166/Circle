import { useEffect} from "react";
// import { IThread } from "../../types/app";
// import { getThreads } from "../../lib/api/call/thread";
import ThreadCard from "../../component/home/threadCard"
import CreateThread from "../../component/home/createThread";
import { useAppSelector, useAppDispatch } from "../../store";
import { getThreadsAsync } from "../../store/async/thread";

const Home = () => {
  const {thread} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getThreadsAsync());
  }, []);
   return (
      <div>
         <h1 style={{paddingLeft:20}}>Home</h1>
         <CreateThread onCreateThread={() => {}} />
         {thread.threads.map((thread) => (
            <ThreadCard   key={thread.id} thread={thread} />
         ))}
      </div>
   );
};

export default Home;