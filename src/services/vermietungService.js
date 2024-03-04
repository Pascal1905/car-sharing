import database from '../database.js';

export async function search(query) {
    let result = database.db.data.vermietungen;

    if (query) {
        query = `${query}`.toLowerCase();
        result = result.filter(entry => {
            return entry.kundenid === parseInt(query)
                || entry.fahrzeugid === parseInt(query)
                || entry.startdatum.toLowerCase().includes(query)
                || entry.enddatum.toLowerCase().includes(query);
        });
    }

    return result;
}

export async function create(vermietungen) {
    if (!vermietungen) return;

    await database.db.read();
    const entry = {
        id: database.getNextId(database.db.data.vermietungen),
        kundenid: vermietungen.kundenid,
        fahrzeugid: vermietungen.fahrzeugid,
        startdatum: vermietungen.startdatum.trim(),
        enddatum: vermietungen.enddatum.trim()
    };

    database.db.data.vermietungen.push(entry);
    await database.db.write();

    return entry;
}

export async function read(id) {
    await database.db.read();
    const index = database.findIndex(database.db.data.vermietungen, Number(id));
    if (index >= 0) return database.db.data.vermietungen[index];
}

export async function update(id, vermietungen) {
    await database.db.read();
    const index = database.findIndex(database.db.data.vermietungen, Number(id));
    if (index === -1) return;

    const existing = database.db.data.vermietungen[index];
    if (vermietungen.kundenid) existing.kundenid = vermietungen.kundenid;
    if (vermietungen.fahrzeugid) existing.fahrzeugid = vermietungen.fahrzeugid;
    if (vermietungen.startdatum) existing.startdatum = vermietungen.startdatum.trim();
    if (vermietungen.enddatum) existing.enddatum = vermietungen.enddatum.trim();


    await database.db.write();
    return existing;
}

export async function remove(id) {
    await database.db.read();
    const initialLength = database.db.data.vermietungen.length;
    database.db.data.vermietungen = database.db.data.vermietungen.filter(vermietungen => vermietungen.id !== Number(id));

    if (initialLength === database.db.data.vermietungen.length) return 0;

    await database.db.write();
    return 1;
}

export default { search, create, read, update, remove };
