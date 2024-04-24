import { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import { getThreads } from "../../lib/api/call/thread";
import ThreadCard from "../../component/home/threadCard"
import CreateThread from "../../component/home/createThread";

const Home = () => {
   const [threads, setThreads] = useState<IThread[] | []>([]);

   async function getThread() {
      try {
         const res = await getThreads();
         setThreads(res.data.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getThread();
   }, []);

   return (
      <div>
         <h1 style={{paddingLeft:20}}>Home</h1>
         <CreateThread />
         {threads.map((thread) => (
            <ThreadCard   key={thread.id} thread={thread} />
         ))}
      </div>
   );
};

export default Home;