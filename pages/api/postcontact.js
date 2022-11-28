import * as fs from 'fs';

export default async function handler(req, res) {
  // console.log(res);
  if (req.method === "POST") {
      let data = await fs.promises.readdir('contactdata');
    //   console.log(req.body);
    fs.promises.writeFile(`contactdata/${(data.length+1)}.json`,JSON.stringify(req.body),()=>{})
    res.status(200).json(["yes post request"]);
  } else {
    res.status(200).json({ name: "dinesh main sai" });
  }
}
