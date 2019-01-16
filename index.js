import fireDB from './firebase';
import indexDB from './dexie';
import uid from 'uuid/v1';
import { initBackgroundSync, requestSync } from './backgroundSync';

const _rerender = () => {
    indexDB.notes.toArray().then(notes => {
        const notesEl = document.querySelector('#notes');
        notesEl.innerHTML = notes.map(n => {
            return `
        <div class="note">
            <h2>${n.title}</h2>
            <p>${n.text}</p>
        </div>
      `
        }).join('');
    });
};


window.onload = () => {
    initBackgroundSync();
    _rerender();

    fireDB.ref('/notes').on('value', snapshot => {
        const notes = snapshot.val();
        notes.forEach(n => indexDB.notes.put(n));
    });

    document.querySelector('#form button').addEventListener('click', e => {
        e.preventDefault();

        const form = document.querySelector('#form');
        const data = {
            id: uid(),
            title: form.title.value,
            text: form.text.value,
        };

        indexDB.notes.put(data);
        requestSync();

        _rerender();
        return false;
    });
};
