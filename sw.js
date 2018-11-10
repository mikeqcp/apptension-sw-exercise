import db from './src/firebase';

self.addEventListener('sync', function(event) {
  if (event.tag === 'SYNC_DATA') {
    event.waitUntil(syncData());
  }
});

const syncData = () => {
  // todo: replace with indexDB value
  return db.ref('/counter').set(99);
};
