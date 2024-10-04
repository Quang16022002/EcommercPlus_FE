import * as XLSX from 'xlsx/xlsx.mjs'
import { PREFIX_CURRENCY } from '../utils/constant'

class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    static exportExcel(data, nameSheet, nameFile) {
        return new Promise((resolve, reject) => {
            var wb = XLSX.utils.book_new();
            var ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, nameSheet);
            XLSX.writeFile(wb, `${nameFile}.xlsx`);
            resolve('oke');
        });
    }

    // Hàm định dạng số tiền theo dấu chấm và thêm ₫ ở cuối
    static formatter = {
        format: (value) => {
            if (typeof value !== 'number') return value;
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
        }
    };
}

export default CommonUtils;
