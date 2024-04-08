export const toInt = <T extends null | number = number>(
  value: any,
  defaultValue?: T
): T | number => {
  const def = defaultValue === undefined ? 0 : defaultValue;
  if (value === null || value === undefined) {
    return def;
  }
  const result = parseInt(value);
  return isNaN(result) ? def : result;
};

export const set = <T extends object, K>(
  initial: T,
  path: string,
  value: K
): T => {
  if (!initial) return {} as T;
  if (!path || value === undefined) return initial;
  const segments = path.split(/[\.\[\]]/g).filter((x) => !!x.trim());
  const _set = (node: any) => {
    if (segments.length > 1) {
      const key = segments.shift() as string;
      const nextIsNum = toInt(segments[0], null) === null ? false : true;
      node[key] = node[key] === undefined ? (nextIsNum ? [] : {}) : node[key];
      _set(node[key]);
    } else {
      node[segments[0]] = value;
    }
  };
  const cloned = structuredClone(initial);
  _set(cloned);
  return cloned;
};
