import fireDB from './firebase';
import dexieDb from './dexie';

self.addEventListener('sync', function (event) {
    console.log('Im syncing');
    if (event.tag === 'SYNC_DATA') {
        event.waitUntil(syncData());
    }
});

const syncData = () => {
    return dexieDb.notes.toArray().then(allNotes => {
        return Object.values(allNotes).forEach(n => {
            return fireDB.ref(`/notes/${n.id}`).set(n);
        })
    });
};