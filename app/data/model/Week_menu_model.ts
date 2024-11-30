/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Timestamp,
  DocumentData,
  FirestoreDataConverter,
} from "firebase/firestore";

export class WeekMenuModel {
  userId: string;
  createdAt: Timestamp;
  menu: Map<string, any>;

  constructor(userId: string, createdAt: Timestamp, menu: Map<string, any>) {
    this.userId = userId;
    this.createdAt = createdAt;
    this.menu = menu;
  }

  toFirestore(): Record<string, any> {
    return {
      user_id: this.userId,
      created_at: this.createdAt,
      menu: this.menu,
    };
  }

  static fromFirestore(snapshot: DocumentData): WeekMenuModel {
    const data = snapshot.data() as Record<string, any>;
    return new WeekMenuModel(
      data.user_id,
      data.created_at || Timestamp.now(),
      data.menu
    );
  }
}

// Example Firestore data converter for the WeekMenu class
export const weekMenuConverter: FirestoreDataConverter<WeekMenuModel> = {
  toFirestore(weekMenu: WeekMenuModel): DocumentData {
    return weekMenu.toFirestore();
  },
  fromFirestore(snapshot: DocumentData): WeekMenuModel {
    return WeekMenuModel.fromFirestore(snapshot);
  },
};