import API from "../index";

export const getThreads = async () => {
    return await API.get("threads")
}
export const createThread = async (body: {
    content: string;
    image: FileList | null;
    threadId?: number;
 }) => {
    const formData = new FormData();
 
    if (body.image !== null) {
       for (let i = 0; i < body.image.length; i++) {
          formData.append("image", body.image[i]);
       }
 
    }
 
    if (body.threadId) {
       formData.append("threadId", body.threadId.toString());
    }
 
    formData.append("content", body.content);
 
    return await API.post("thread", formData, {
       headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
    });
 };
 export const getThreadsById = async (id:number) => {
   return await API.get(`threads/${id}`)
 }

 export const getReplies = async (id: number) => {
   return await API.get(`replies/${id}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
   });
};
