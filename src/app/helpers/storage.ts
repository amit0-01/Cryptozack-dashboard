
import { UserInfo } from "./app.interface";
import { LOCAL_STORAGE_KEYS } from "./constants";

class StorageHelperClass {
  constructor() { }

  get(key: string) {
    const storageVal = localStorage.getItem(key);
    if (storageVal) {
      return JSON.parse(storageVal);
    }
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get userInfo(): UserInfo | null {
    return this.get(LOCAL_STORAGE_KEYS.UserInfo);
  }
  set userInfo(userInfo: UserInfo | null) {
    this.set(LOCAL_STORAGE_KEYS.UserInfo, userInfo);
  }
  // set locationId(userInfo: LocationId | null) {
  //   this.set(LOCAL_STORAGE_KEYS.LocationId, userInfo);
  // }
  // set _id(_id:UserId | null){
  //   this.set(LOCAL_STORAGE_KEYS._id,_id)
  // }
  // get _id(): UserId | null{
  //   return this.get(LOCAL_STORAGE_KEYS._id);
  // }

  // get locationId(): LocationId | null {
  //   return this.get(LOCAL_STORAGE_KEYS.LocationId);
  // }

  // get companyList(): Company[] {
  //   return this.get(LOCAL_STORAGE_KEYS.Company);
  // }
 
  // set companyList(company: Company[]) {
  //   this.set(LOCAL_STORAGE_KEYS.Company, company);
  // }
  // get columns(): Columns {
  //   return this.get(LOCAL_STORAGE_KEYS.Column);
  // }
  // set columns(column: Columns) {
  //   this.set(LOCAL_STORAGE_KEYS.Column, column);
  // }

  //   get cart(): Course[] {
  //     return this.get(LOCAL_STORAGE_KEYS.Cart);
  //   }
  //   set cart(cart: Course[]) {
  //     this.set(LOCAL_STORAGE_KEYS.Cart, cart);
  //   }

  //   get redirect(): string {
  //     return this.get(LOCAL_STORAGE_KEYS.Redirect);
  //   }
  //   set redirect(name: string) {
  //     this.set(LOCAL_STORAGE_KEYS.Redirect, name);
  //   }

  //   get CurrentExams() {
  //     return this.get(LOCAL_STORAGE_KEYS.CurrentExam)
  //   }
  //   set CurrentExams(exams: any) {
  //     this.set(LOCAL_STORAGE_KEYS.CurrentExam, exams);
  //   }
}
export const StorageHelper = new StorageHelperClass();