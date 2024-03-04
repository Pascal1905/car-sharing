import database from '../database.js';

export async function search(query) {
    let result = database.db.data.fahrzeuge;

    if (query) {
        query = `${query}`.toLowerCase();
        result = result.filter(entry => {
            return entry.kennzeichen.toLowerCase().includes(query)
                || entry.marke.toLowerCase().includes(query)
                || entry.status.toLowerCase().includes(query);
        });
    }

    return result;
}

export async function create(fahrzeuge) {
    if (!fahrzeuge) return;

    await database.db.read();
    const entry = {
        id: database.getNextId(database.db.data.fahrzeuge),
        kennzeichen: fahrzeuge.kennzeichen,
        marke: fahrzeuge.marke,
        status: fahrzeuge.status
    };

    database.db.data.fahrzeuge.push(entry);
    await database.db.write();

    return entry;
}

export async function read(id) {
    await database.db.read();
    const index = database.findIndex(database.db.data.fahrzeuge, Number(id));
    if (index >= 0) return database.db.data.fahrzeuge[index];
}

export async function update(id, fahrzeuge) {
    await database.db.read();
    const index = database.findIndex(database.db.data.fahrzeuge, Number(id));
    if (index === -1) return;

    const existing = database.db.data.fahrzeuge[index];
    if (fahrzeuge.kennzeichen) existing.kennzeichen = fahrzeuge.kennzeichen.trim();
    if (fahrzeuge.marke) existing.marke = fahrzeuge.marke.trim();
    if (fahrzeuge.status) existing.status = fahrzeuge.status.trim();


    await database.db.write();
    return existing;
}

export async function remove(id) {
    await database.db.read();
    const initialLength = database.db.data.fahrzeuge.length;
    database.db.data.fahrzeuge = database.db.data.fahrzeuge.filter(fahrzeuge => fahrzeuge.id !== Number(id));

    if (initialLength === database.db.data.fahrzeuge.length) return 0;

    await database.db.write();
    return 1;
}

export default { search, create, read, update, remove };
