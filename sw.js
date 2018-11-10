import db from './src/firebase';
import Dexie from 'dexie';

const indexedDB = new Dexie('CounterDB');
indexedDB.version(1).stores({
  counter: 'value'
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'SYNC_DATA') {
    event.waitUntil(syncData());
  }
});

const syncData = () => {
  return indexedDB.counter.toArray().then(v => {
    return db.ref('/counter').set(v[0].value).then(() => {
      return indexedDB.counter.clear();
    });
  });
};
