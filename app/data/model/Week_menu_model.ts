/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Timestamp,
  DocumentData,
  FirestoreDataConverter,
} from "firebase/firestore";

type Menu = {
  date: Timestamp;
  recipe_ids: string[];
};

type MenuWeek = {
  day1: Menu;
  day2: Menu;
  day3: Menu;
  day4: Menu;
  day5: Menu;
  day6: Menu;
  day7: Menu;
};


export class WeekMenuModel {
  userId: string;
  createdAt: Timestamp;
  menu: MenuWeek;

  constructor(userId: string, createdAt: Timestamp, menu: MenuWeek) {
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