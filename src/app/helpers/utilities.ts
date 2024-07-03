import { FilesType } from './app.interface';
import { StorageHelper } from './storage';
export namespace Utils {
  export function handleFileChange(event: any, acceptFileType: FilesType): Promise<any> {
    const file: File = event.target.files[0];
    let fileType: any = file.type.split('/');
    fileType = fileType[0];
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        if (fileType === acceptFileType) {
          reader.onload = ((_) => {
            return (e: ProgressEvent) => {
              resolve(reader.result);
            };
          })(file);
        } else {
          resolve(null);
        }
        reader.readAsDataURL(file);

      } catch (_) {
        resolve(null);
      }
    });
  }

  export function isAuthenticated() {
    return StorageHelper.userInfo && StorageHelper.userInfo.token &&  (StorageHelper.userInfo.token.length > 0);
  }

  export function logout() {
    StorageHelper.userInfo = null;
  }
}
