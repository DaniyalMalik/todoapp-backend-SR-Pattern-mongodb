export class DataCopier {
  static copy(target: any, source: any): any {
    let response: any = {};

    response = { ...response, ...target };

    let keys = Object.keys(target);

    for (let key of keys) {
      if (target[key]) {
        if (target[key].constructor === Array) {
          if (source[key] != undefined) {
            response[key] = [];

            for (let item of source[key]) {
              let data: any = { ...{}, ...item };

              response[key].push(data);
            }
          } else {
            response[key] = target[key];
          }
        } else if (typeof target[key] === 'object') {
          if (source[key] != undefined) {
            response[key] = source[key];
          }
        } else {
          if (source[key] != undefined) {
            response[key] = source[key];
          }
        }
      } else {
        if (source[key] != undefined) {
          response[key] = source[key];
        }
      }
    }
    return response;
  }
}
