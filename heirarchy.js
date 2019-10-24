export const getMgrEmpMap = dataObj => {
  let mapMgrEmpId = {};
  let invalidMgrList = [];
  const dataObjKeys = Object.keys(dataObj);
  const mapidtomgrid = dataObjKeys.map(element => {
    const mgrId = dataObj[element].ManagerId;

    if (mgrId === null) {
      if (!mapMgrEmpId["CEO"]) {
        mapMgrEmpId["CEO"] = [];
      }
      mapMgrEmpId["CEO"].push(element); // To get all employees with no manager
      return;
    } else if (dataObjKeys.indexOf(mgrId.toString()) === -1) {
      invalidMgrList.push(dataObj[element].name); // To get employee with invalid manager
      return;
    } else if (!mapMgrEmpId[mgrId]) {
      mapMgrEmpId[mgrId] = [];
    }

    mapMgrEmpId[mgrId].push(element);
    return element;
  });

  return { mapMgrEmpId, invalidMgrList };
};

export const printHeirarchy = (dataObj, mapMgrEmpId, invalidMgrList) => {
  const mapObjKeys = Object.keys(mapMgrEmpId);
  let arrayEmpNoMgr = [];
  let arrayHeirarchy = [];
  let heirarchyString = "";

  mapMgrEmpId["CEO"].forEach(element => {
    if (mapObjKeys.indexOf(element) === -1) {
      arrayEmpNoMgr.push(dataObj[element].name);
    } else {
      arrayHeirarchy = getHeirarchyString(
        heirarchyString,
        dataObj,
        element,
        mapMgrEmpId,
        arrayHeirarchy
      );
    }
  });
  return [...arrayHeirarchy, ...arrayEmpNoMgr, ...invalidMgrList];
};

export const getHeirarchyString = (
  heirarchyString,
  dataObj,
  elementval,
  mapMgrEmpId,
  arrayHeirarchy
) => {
  arrayHeirarchy.push(heirarchyString + dataObj[elementval].name);

  heirarchyString = heirarchyString + "        ";

  if (!mapMgrEmpId[elementval]) {
    heirarchyString = heirarchyString.slice(0, -8);
    return arrayHeirarchy;
  }
  mapMgrEmpId[elementval].forEach(element => {
    arrayHeirarchy = getHeirarchyString(
      heirarchyString,
      dataObj,
      element,
      mapMgrEmpId,
      arrayHeirarchy
    );
  });
  heirarchyString = heirarchyString.slice(0, -8);
  return arrayHeirarchy;
};
