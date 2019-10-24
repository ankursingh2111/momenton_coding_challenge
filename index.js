import { dataObj } from "./inputdata";
import { getMgrEmpMap, printHeirarchy } from "./heirarchy";

const { mapMgrEmpId, invalidMgrList } = getMgrEmpMap(dataObj);

const arrHeirarchy = printHeirarchy(dataObj, mapMgrEmpId, invalidMgrList);

arrHeirarchy.map(ele => {
  console.log(ele);
});
