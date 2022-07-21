/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
import { pathToRegexp } from "path-to-regexp";

export function queryLayout(layouts: any, pathname: string) {
  let result = "public";

  const isMatch = (regepx: any) => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathToRegexp(regepx).exec(pathname);
  };

  for (const item of layouts) {
    let include = false;
    let exlude = false;
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true;
          break;
        }
      }
    }

    if (include && item.exlude) {
      for (const regepx of item.exlude) {
        if (isMatch(regepx)) {
          exlude = true;
          break;
        }
      }
    }

    if (include && !exlude) {
      result = item.name;
      break;
    }
  }

  return result;
}
