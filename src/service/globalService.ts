 // does not differentiate between null and undefined values
export function financeDataAreEqual(obj1: any, obj2: any): boolean {
    const objA = JSON.stringify(obj1);
    const objB = JSON.stringify(obj2);
    return objA === objB;
  }
  
  
  
  
  
  