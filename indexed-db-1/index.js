const DB_NAME = 'MyDatabase';
const DB_VERSION = 15;

const OBJECT_STORE_NAME = 'MyObjectStore';

window.addEventListener('load', app);

window.myStore = {};

function getDefaultData() {
    return [
        { name: 'Sanil', age: 21, hobby: 'Studying', email: 'sanilkhurana7@gmail.com' },
        { name: 'Pi', age: 28, hobby: 'Playing', email: 'pi@gmail.com' },
        { name: 'Ayon', age: 21, hobby: 'Paladins', email: 'bandaKahanHai@gmail.com' },
    ]
}

async function addUserData(name, age, hobby, email) {
    if (!window.myStore.db) {
        throw new Error('Database couldn\'t be created');
        return null;
    }

    const transaction = window.myStore.db.transaction(OBJECT_STORE_NAME, 'readwrite');
    transaction.oncomplete = () => { console.log("Transaction complete!"); };
    transaction.onerror = (error) => { console.error(error); };

    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
    const request = objectStore.add({name, age, hobby, email});

    await new Promise((r) => { request.onsuccess = r });

    clearTable();
    updateTableRecords();
}

async function getAllUserObjects() {
    if (!window.myStore.db) {
        throw new Error('Database couldn\'t be created');
        return null;
    }

    const transaction = window.myStore.db.transaction(OBJECT_STORE_NAME, 'readonly')
    transaction.oncomplete = () => { console.log("Transaction complete!"); };
    transaction.onerror = (error) => { console.error(error); };

    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
    const request = objectStore.getAll();

    await new Promise((r) => { request.onsuccess = r; })

    return request.result;
}

function clearTable() {
    const contentRows = document.querySelectorAll('.content-row');
    for (contentRow of contentRows) {
        contentRow.parentElement.removeChild(contentRow);
    }
}

async function updateTableRecords() {
    function createRow(userObject) {
        const template = `<tr class='content-row'>
            <td>/USER_NAME/</td>
            <td>/USER_AGE/</td>
            <td>/USER_HOBBY/</td>
            <td>/USER_EMAIL/</td>
        </tr>`

        return template
            .replace('/USER_NAME/', userObject.name)
            .replace('/USER_AGE/', userObject.age)
            .replace('/USER_HOBBY/', userObject.hobby)
            .replace('/USER_EMAIL/', userObject.email);
    }

    const contentTable = document.getElementById('content-table');

    const userObjects = await getAllUserObjects();
    for (let userObject of userObjects) {
        contentTable.innerHTML += createRow(userObject);
    }
}

function app() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (error) => {
        console.log(error);
        return;
    }

    request.onsuccess = (event) => {
        console.log("Success!");
        const db = event.target.result;

        console.log(db);

        window.myStore.db = db;

        updateTableRecords();
    }

    request.onupgradeneeded = async (event) => {
        console.log("Upgrade is needed");

        const db = event.target.result;

        // Reset the object store
        try {
            db.deleteObjectStore(OBJECT_STORE_NAME);
        }
        catch (e) {
            console.warn(e);
        }
        const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { autoIncrement: true });

        // Create indexes
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });

        await new Promise((r) => { objectStore.transaction.oncomplete = r });

        // Add default data
        const dataObjectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);
        console.log(dataObjectStore);
        for (dataItem of getDefaultData()) {
            const request = dataObjectStore.add(dataItem);
            await new Promise((r) => { request.onsuccess = r });
        }
    };

    document.getElementById('add-button').onclick = () => {
        addUserData(
            document.getElementById('nameInput').value,
            document.getElementById('ageInput').value,
            document.getElementById('hobbyInput').value,
            document.getElementById('emailInput').value,
        )
    }
}