import { getMgrEmpMap, printHeirarchy } from "./heirarchy";

describe("Testing the Company Heirarchy", () => {
  describe("When data is perfect", () => {
    const data = {
      100: {
        name: "Alan",
        ManagerId: 150
      },
      220: {
        name: "Martin",
        ManagerId: 100
      },
      150: {
        name: "Jamie",
        ManagerId: null
      }
    };
    test("Test the return value of getMgrEmpMap function", () => {
      const { mapMgrEmpId, invalidMgrList } = getMgrEmpMap(data);
      expect(mapMgrEmpId).toEqual({
        "100": ["220"],
        "150": ["100"],
        CEO: ["150"]
      });
    });
    test("Test the return value of printHeirarchy function", () => {
      const arrHeirarchy = printHeirarchy(
        data,
        {
          "100": ["220"],
          "150": ["100"],
          CEO: ["150"]
        },
        []
      );
      expect(arrHeirarchy).toEqual([
        "Jamie",
        "        Alan",
        "                Martin"
      ]);
    });
  });
  describe("When more than 1 employee does not have mangerid", () => {
    const data = {
      100: {
        name: "Alan",
        ManagerId: 150
      },
      220: {
        name: "Martin",
        ManagerId: 100
      },
      150: {
        name: "Jamie",
        ManagerId: null
      },
      200: {
        name: "James",
        ManagerId: null
      }
    };
    test("Test the return value of getMgrEmpMap function", () => {
      const { mapMgrEmpId, invalidMgrList } = getMgrEmpMap(data);
      expect(mapMgrEmpId).toEqual({
        "100": ["220"],
        "150": ["100"],
        CEO: ["150", "200"]
      });
    });
    test("Test the return value of printHeirarchy function", () => {
      const arrHeirarchy = printHeirarchy(
        data,
        {
          "100": ["220"],
          "150": ["100"],
          CEO: ["150", "200"]
        },
        []
      );
      expect(arrHeirarchy).toEqual([
        "Jamie",
        "        Alan",
        "                Martin",
        "James"
      ]);
    });
  });
  describe("When manager is not a valid employee", () => {
    const data = {
      100: {
        name: "Alan",
        ManagerId: 150
      },
      220: {
        name: "Martin",
        ManagerId: 100
      },
      150: {
        name: "Jamie",
        ManagerId: null
      },
      200: {
        name: "James",
        ManagerId: 400
      }
    };
    test("Test the return value of getMgrEmpMap function", () => {
      const { mapMgrEmpId, invalidMgrList } = getMgrEmpMap(data);
      expect(invalidMgrList).toEqual(["James"]);
    });
    test("Test the return value of printHeirarchy function", () => {
      const arrHeirarchy = printHeirarchy(
        data,
        {
          "100": ["220"],
          "150": ["100"],
          CEO: ["150"]
        },
        ["James"]
      );
      expect(arrHeirarchy).toEqual([
        "Jamie",
        "        Alan",
        "                Martin",
        "James"
      ]);
    });
  });
});
