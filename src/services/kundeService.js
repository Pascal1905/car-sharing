import database from '../database.js';
export async function search(query) {
    let result = database.db.data.kunden;

    if (query) {
        query = `${query}`.toLowerCase();
        result = result.filter(entry => {
            return entry.name.toLowerCase().includes(query)
                || entry.adresse.toLowerCase().includes(query);
        });
    }

    return result;
}

export async function create(kunden) {
    if (!kunden) return;

    await database.db.read();
    const entry = {
        id: database.getNextId(database.db.data.kunden),
        name: kunden.name.trim(),
        adresse: kunden.adresse.trim()
    };

    database.db.data.kunden.push(entry);
    await database.db.write();

    return entry;
}

export async function read(id) {
    await database.db.read();
    const index = database.findIndex(database.db.data.kunden, Number(id));
    if (index >= 0) return database.db.data.kunden[index];
}

export async function update(id, kunden) {
    await database.db.read();
    const index = database.findIndex(database.db.data.kunden, Number(id));
    if (index === -1) return;

    const existing = database.db.data.kunden[index];

    if (kunden.name) existing.name = kunden.name.trim();
    if (kunden.adresse) existing.adresse = kunden.adresse.trim();

    await database.db.write();
    return existing;
}

export async function remove(id) {
    await database.db.read();
    const initialLength = database.db.data.kunden.length;
    database.db.data.kunden = database.db.data.kunden.filter(kunden => kunden.id !== Number(id));

    if (initialLength === database.db.data.kunden.length) return 0;

    await database.db.write();
    return 1;
}

export default { search, create, read, update, remove };
