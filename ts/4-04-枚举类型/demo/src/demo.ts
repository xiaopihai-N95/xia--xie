/* const Status = {
  OFFLINE: 0,
  ONLINE: 1,
  DELETED: 2
} */

/* enum Status {
  OFFLINE,
  ONLINE,
  DELETED
}

console.log(Status.OFFLINE) // 0
console.log(Status.ONLINE) // 1
console.log(Status.DELETED) // 2
 */

enum Status {
  OFFLINE,
  ONLINE = 4,
  DELETED
}

console.log(Status.OFFLINE) // 0
console.log(Status.ONLINE) // 4
console.log(Status.DELETED) // 5

function getResult(status) {
  if (status === Status.OFFLINE) {
    return 'offline'
  } else if (status === Status.ONLINE) {
    return 'online'
  } else if (status === Status.DELETED) {
    return 'deleted'
  } else {
    return 'error'
  }
}

const res = getResult(Status.ONLINE)
console.log(res)

console.log(Status.DELETED) // 5
console.log(Status[5]) // DELETED