import { Router } from 'express';
import  path      from 'path';
import { returnListOfFiles, addFile, getFile } from '../../../helpers/fileManager.cjs'
const router = Router();

router.get('/ping', (req, res) => {
  res.json({ message: "zabezpieczony git" });
});

router.get('/list', async (req, res) => {
  try {
    const folderName = req.user.username;
    const tmp = await returnListOfFiles(folderName);
    res.json([{name:folderName, files: tmp}]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route('/file')
  .post(async (req, res) => {
    try {
      const route = await path.join(req.user.username,req.body.route);
      const file = req.body.file;
      const tmp = await addFile(route, file);
      if (tmp.status == 200) 
        res.json({status:200, message: "Ok"});
      else
      res.json({status:tmp.status, message: tmp.message});
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete( async (req, res) => {
    try {
      const route = req.body.route;
      delFile(route);
      res.json([{status:200, message: "Ok"}]);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get(async (req, res) => {
    try {
      const filename = req.user.filename;
      const file = getFile(filename);
      res.json([{status:200, message: "Ok", file: file}]);
    } catch (error) {
      res.status(500).json(error);
    }
  });

export default router;

