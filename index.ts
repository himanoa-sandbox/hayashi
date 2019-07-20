export type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};

export const makeIter = function* traverse<T>(
  tree: Tree<T>
): IterableIterator<T> {
  yield tree.value;
  if (tree.left) {
    const result = yield* traverse(tree.left);
    if (tree.right) {
      const r = yield* traverse(tree.right);
      if (r !== undefined) {
        yield r;
      }
    }
  } else if (tree.right) {
    yield yield* traverse(tree.right);
  }
};
