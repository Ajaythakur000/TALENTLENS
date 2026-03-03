import DataUriParser from "datauri/parser.js"
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
}

export default getDataUri;

//create fun ..file lii..parserobj bnaayaa 
// extension nikaalaa ..jo voh last me hota hai
//convert kr diya
/*User uploads file
        ↓
Multer receives file
        ↓
file.buffer (binary)
        ↓
getDataUri(file)
        ↓
Convert to base64 string
        ↓
Ready for Cloud upload
*/