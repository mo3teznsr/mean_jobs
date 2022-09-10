export interface User {
  _id: string;
  name: string;
  createdAt: string;
  mobile:String;
  education:Array<any>;
  experaince:Array<any>;
  role: string;
  isAdmin: boolean;
  skills:Array<any>;
}
