export interface User {
  id: string;
  screenName: string;
  statusesCount: number;
  tweets: Tweet[];
}

export interface Tweet {
  id: string;
  text: string;
  userId: string;
  user: User;
  likes: number;
}

export interface Article {
  title: string;
  url: string;
  tags?: string[];
  starred?: boolean;
}
