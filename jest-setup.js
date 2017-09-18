import fetch from 'node-fetch';
global.fetch = fetch;

// expect.addSnapshotSerializer({
//   test:(val) => (typeof value === 'string') && value.startsWith('<?xml'),
//   print:(val) => `ID: ${val.Id}
//     Title: ${val.Title}
//     Status: ${val.Status}
//     Expiration: ${val.expiration}`
// })
