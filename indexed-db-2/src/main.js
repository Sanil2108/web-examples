import { openDB, deleteDB, wrap, unwrap } from 'idb';

function app() {
    if (!('indexedDB' in window)) {
        document.write('IndexedDB not supported');
        return;
    }
}




window.onload = app;
