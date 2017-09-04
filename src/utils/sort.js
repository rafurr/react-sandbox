export const insertionSort = (arr) => {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    // Copy of the current element
    const tmp = arr[i]
    // Check through the sorted part
    // Compare with the number in tmp
    // If larger, shift the number
    let j = i - 1
    for (j; j >= 0 && (arr[j] > tmp); j--) {
      // Shift the number
      arr[j + 1] = arr[j]
    }
    // Insert the copied number
    // At the correct position in sorted part
    arr[j + 1] = tmp
  }
}

export const insertionSortWithCallback = (arr, callback) => {
  const len = arr.length
  let item, from, to
  for (let i = 1; i < len; i++) {
    // Copy of the current element
    const tmp = arr[i]
    // Check through the sorted part
    // Compare with the number in tmp
    // If larger, shift the number
    let j = i - 1
    callback({type: 'copy', arr: arr.slice(0), item: tmp, from: i})
    for (j; j >= 0 && (arr[j] > tmp); j--) {
      // Shift the number
      from = j
      to = j + 1
      item = arr[j]
      arr[j + 1] = arr[j]
      callback({type: 'shift', arr: arr.slice(0), item: item, from: from, to: to})
    }
    // Insert the copied number
    // At the correct position in sorted part
    arr[j + 1] = tmp
    callback({type: 'insert', arr: arr.slice(0), item: tmp, at: j + 1})
    callback({type: 'spacer'})
  }
}