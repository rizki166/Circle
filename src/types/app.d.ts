export interface IThread {
  id?: number;
  content?: string;
  image?: IThread[];
  userId: number;
  threadId?: number;
  author?: IUser;
  createdAt?: date;
  _count?: {
    like?: number;
    reply?: number;
  };
}

interface IThreadImage {
  image?: string;
}

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  _count?: {
    follower?: number;
    following?: number;
  };
  profile?: IProfile;
  follower: IFollow[];
  following: IFollow[];
}

interface ILike {
  like: number;
  reply: number;
}

interface IFollow {
  follower: IUser;
  following: IUser;
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
