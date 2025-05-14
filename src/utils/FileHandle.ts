import * as fs from 'fs';
import * as path from 'path';

export class FileHandle{
    public static folderPath = path.join(__dirname,"../datas");
    public static readFromFile<T>(fileName:string): T[]{
        const fullPath = path.join(this.folderPath,fileName);
        if(!fs.existsSync(fullPath)){
            console.error("file not found");
            return [];
        }
        try {
            const raw = fs.readFileSync(fullPath,"utf-8");
            console.log("read file success");
            return JSON.parse(raw) as T[];
        } catch (error) {
            console.error("read file err",error);
            return [];
        }
    }
    public static writeToFile<T>(fileName:string,data:T[]) :void{
        const fullPath = path.join(this.folderPath,fileName);
        try {
            fs.writeFileSync(fullPath,JSON.stringify(data,null,2),"utf-8");
            console.log("write file success");
        } catch (error) {
            console.error("write file err",error);
        }
    }
    
}

