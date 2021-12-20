function toggle(arr: string[], item: string): string[] {
  if (!arr.includes(item)) {
    arr.push(item);
  } else {
    arr.splice(arr.indexOf(item), 1);
  }
  return arr;
}

export default toggle;
