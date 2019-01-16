import fireDB from './firebase';
import indexDB from './dexie';
import uid from 'uuid/v1';
import { initBackgroundSync, requestSync } from './backgroundSync';
import {complement, forEachObjIndexed, propEq} from "ramda";

const _nonRemoved = complement(propEq('removed', true));

const _rerender = () => {
    indexDB.notes.toArray().then(notes => {
        const notesEl = document.querySelector('#notes');
        notesEl.innerHTML = notes.filter(_nonRemoved).map(n => {
            return `
        <div class="note card blue-grey darken-1 col s12 m5">
            <div class="card-content white-text">
                <h2 class="card-title">${n.title}</h2>
                <p>${n.text}</p>
                
                <i 
                    class="delete-icon material-icons" 
                    data-delete-id="${n.id}"
                >
                    delete
                </i>
            </div>
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
        forEachObjIndexed(n => indexDB.notes.put(n), notes);
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

    document.body.addEventListener('click', e => {
        const isDeleteAction = e.srcElement.className.includes('delete-icon');

        if(isDeleteAction) {
            const noteId = e.srcElement.getAttribute('data-delete-id');
            indexDB.notes.update(noteId, { removed: true });
            requestSync();
            _rerender();
        }
    })
};
