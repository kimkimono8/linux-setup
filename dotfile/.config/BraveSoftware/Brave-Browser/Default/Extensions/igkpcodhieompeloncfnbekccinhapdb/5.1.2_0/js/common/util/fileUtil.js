import { setGlobal } from "../global/global.js";
class FileUtil {
    async readFileContent(file) {
        return new Promise(function (res) {
            const fileReader = new FileReader();
            fileReader.onload = () => res(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    }
}
export const fileUtil = new FileUtil();
setGlobal("fileUtil", fileUtil);
