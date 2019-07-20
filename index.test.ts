import { makeIter } from "./index";

// 前提: https://ja.wikipedia.org/wiki/%E6%9C%A8%E6%A7%8B%E9%80%A0_(%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0)#/media/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Sorted_binary_tree_preorder.svg
describe("#makeIter", () => {
  it("最初はFのvalueを返すこと", () => {
    const tree = {
      value: 1
    };

    expect(makeIter(tree).next()).toStrictEqual({
      done: false,
      value: 1
    });
  });
  describe("左のノードが存在する場合", () => {
    it("F→Bの順で走破すること", () => {
      const tree = {
        value: 1,
        left: { value: 2, left: { value: 1 } }
      };
      const iter = makeIter(tree);
      expect([iter.next(), iter.next()]).toStrictEqual([
        {
          done: false,
          value: 1
        },
        {
          done: false,
          value: 2
        }
      ]);
    });

    it("F->B->Aの順で走破すること", () => {
      const tree = {
        value: 1,
        left: { value: 2, left: { value: 3 } }
      };
      const iter = makeIter(tree);
      expect([iter.next(), iter.next(), iter.next()]).toStrictEqual([
        {
          done: false,
          value: 1
        },
        {
          done: false,
          value: 2
        },
        {
          done: false,
          value: 3
        }
      ]);
    });

    it("F->B->A->Dの順で走破すること", () => {
      const tree = {
        value: 1,
        left: { value: 2, left: { value: 3 }, right: { value: 4 } }
      };
      const iter = makeIter(tree);
      expect([
        iter.next(),
        iter.next(),
        iter.next(),
        iter.next()
      ]).toStrictEqual([
        {
          done: false,
          value: 1
        },
        {
          done: false,
          value: 2
        },
        {
          done: false,
          value: 3
        },
        {
          done: false,
          value: 4
        }
      ]);
    });
  });
  describe("左のノードが存在しないで右だけある場合", () => {
    it("F→Gのノードの順で走破すること", () => {
      const tree = {
        value: 1,
        right: { value: 3 }
      };
      const iter = makeIter(tree);
      expect([iter.next(), iter.next()]).toStrictEqual([
        {
          done: false,
          value: 1
        },
        {
          done: false,
          value: 3
        }
      ]);
    });
  });
  it("図の順番で走破できること", () => {
    const tree = {
      value: "F",
      left: {
        value: "B",
        left: { value: "A" },
        right: { value: "D", left: { value: "C" }, right: { value: "E" } }
      },
      right: {
        value: "G",
        right: { value: "I", left: { value: "H" } }
      }
    };
    const iter = makeIter(tree);
    let actual = [
      iter.next().value,
      iter.next().value,
      iter.next().value,
      iter.next().value,
      iter.next().value,
      iter.next().value,
      iter.next().value,
      iter.next().value,
      iter.next().value
    ];
    expect(actual).toStrictEqual(["F", "B", "A", "D", "C", "E", "G", "I", "H"]);
  });
});
