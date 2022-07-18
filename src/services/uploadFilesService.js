import http from "../http-common";
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/upload", formData, {
      onUploadProgress,
    });
  }
  getFiles() {
    return http.get("/files");
  }
}
export default new UploadFilesService();
