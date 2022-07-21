import { TypeRootState } from "@/store/store";

export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
}

export type UserLoginData = Omit<UserRegisterData, "username">;

export interface IUser {
  id: number;
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
}
export interface ToolkitState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface AuthState extends ToolkitState {
  user: IUser | null;
}

export type ThunkConfig = {
  state: TypeRootState;
  rejectValue: any;
};

export interface DogsState extends ToolkitState {
  dogs: Dog[] | null;
}

export interface DogState extends ToolkitState {
  dog: Dog | null;
}

export interface ArticlesState extends ToolkitState {
  articles: { articles: Article[] };
  singleArticle: { article: Article } | null;
}

export interface IComment {
  id: number;
  body: string;
}

export interface Author {
  id: number;
  email: string;
  username: string;
  bio: string;
  image: string;
}

export interface Article {
  title: string;
  body: string;
  description: string;
  tagList: string[];
  slug: string;
  author: Author;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
  comments: IComment[];
  favorited: boolean;
}

export interface IProfile {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}

export interface ProfileState extends ToolkitState {
  userInfo: IUser | null;
  profile: IProfile | null;
}

export type IFeed = {
  articles: Article[];
  articlesCount: number;
};

export type Dog = {
  id: number;
  name: string;
  age: number;
  breed: string;
};

export interface HomeState extends ToolkitState {
  feed: IFeed;
  tags: string[] | null;
}
