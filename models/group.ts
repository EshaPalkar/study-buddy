import { ProfileModel } from "./profile";

export interface GroupModel {
    accessCode: string;
    users: ProfileModel[]
    zoom: string;
  }