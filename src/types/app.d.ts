export interface IThread {
   id?: number;
   content?: string;
   image?: IThread[];
   userId: number;
   threadId?: number;
   author?: IUser;
   createdAt?: date ;
   
  
   
   
}

interface IThreadImage {
   image?: string;
}

export interface IUser {
   id: number;
   username: string;
   fullname: string;
   email: string;
   profile?: IProfile;

}

export interface IProfile {
   id: number;
   bio?: string;
   avatar?: string;
   cover?: string;
   user: IUser;
}
export interface IRegister {
   username: string;
   email: string;
   fullname: string;
   password: string;
  
}