import fs from 'fs';

export const getFilesWithKeyword = (keyword: string, folderName: string, files_?: Array<string>) => {
  files_ = (typeof files_ === 'undefined') ? [] : files_;
  const files = fs.readdirSync(folderName);
  for (let i in files) {
    let name = folderName + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFilesWithKeyword(keyword, name, files_);
    } else {
      name.includes(keyword) && files_.push(name);
    }
  }
  return files_;
}