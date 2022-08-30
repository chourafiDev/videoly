export interface IUserID {
  image: Image;
  userName: string;
  _id: null;
}

export interface Image {
  public_id: string;
  url: string;
}

export interface IPost {
  _id?: any;
  userId?: UserID;
  caption: string;
  category: string;
  video: string;
  publish: string;
  likes?: string[];
  createdAt?: Date;
}

export interface IUser {
  _id?: any;
  userName: string;
  email?: string;
  image?: { public_id: string; url: string };
  password?: string;
  name: string;
  bio?: any;
  posts?: IPost[];
}

export interface IComment {
  _id?: string;
  userId?: UserID;
  postId: string | undefined | string[];
  desc: string;
  createdAt?: Date;
}

export interface ISearchData {
  posts: IPost[];
  users: IUser[];
}

export interface IUserUpdate {
  userName: string;
  email?: string;
  image?: string;
  password?: string;
  name: string;
  bio?: string;
}

export interface IUserObj {
  user: {
    _id: string;
    userName: string;
    email: string;
    image?: string;
    password: string;
  };
}
