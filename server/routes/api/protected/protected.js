import { Router } from 'express';
import { returnListOfFiles, addFile, exportFile } from '../../../helpers/fileManager.cjs'
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

router.put('/file', async (req, res) => {
  try {
    const trace = req.body.route;
    const file = req.body.file;
    addFile(trace, file);
    res.json([{status:200, message: "Ok"}]);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete('/file', async (req, res) => {
  try {
    const trace = req.body.route;
    delFile(trace);
    res.json([{status:200, message: "Ok"}]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/export', async (req, res) => {
  try {
    const filename = req.user.filename;
    const file = exportFile(filename);
    res.json([{status:200, message: "Ok", file: file}]);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

