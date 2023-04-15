import { IParam } from "../core/database.interface";

const sqliteReservedWords = [
    'ABORT',
    'ACTION',
    'ADD',
    'AFTER',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'AS',
    'ASC',
    'ATTACH',
    'AUTOINCREMENT',
    'BEFORE',
    'BEGIN',
    'BETWEEN',
    'BY',
    'CASCADE',
    'CASE',
    'CAST',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'COMMIT',
    'CONFLICT',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'DATABASE',
    'DEFAULT',
    'DEFERRABLE',
    'DEFERRED',
    'DELETE',
    'DESC',
    'DETACH',
    'DISTINCT',
    'DROP',
    'EACH',
    'ELSE',
    'END',
    'ESCAPE',
    'EXCEPT',
    'EXCLUSIVE',
    'EXISTS',
    'EXPLAIN',
    'FAIL',
    'FOR',
    'FOREIGN',
    'FROM',
    'FULL',
    'GLOB',
    'GROUP',
    'HAVING',
    'IF',
    'IGNORE',
    'IMMEDIATE',
    'IN',
    'INDEX',
    'INDEXED',
    'INITIALLY',
    'INNER',
    'INSERT',
    'INSTEAD',
    'INTERSECT',
    'INTO',
    'IS',
    'ISNULL',
    'JOIN',
    'KEY',
    'LEFT',
    'LIKE',
    'LIMIT',
    'MATCH',
    'NATURAL',
    'NO',
    'NOT',
    'NOTNULL',
    'NULL',
    'OF',
    'OFFSET',
    'ON',
    'OR',
    'ORDER',
    'OUTER',
    'PLAN',
    'PRAGMA',
    'PRIMARY',
    'QUERY',
    'RAISE',
    'RECURSIVE',
    'REFERENCES',
    'REGEXP',
    'REINDEX',
    'RELEASE',
    'RENAME',
    'REPLACE',
    'RESTRICT',
    'RIGHT',
    'ROLLBACK',
    'ROW',
    'SAVEPOINT',
    'SELECT',
    'SET',
    'TABLE',
    'TEMP',
    'TEMPORARY',
    'THEN',
    'TO',
    'TRANSACTION',
    'TRIGGER',
    'UNION',
    'UNIQUE',
    'UPDATE',
    'USING',
    'VACUUM',
    'VALUES',
    'VIEW',
    'VIRTUAL',
    'WHEN',
    'WHERE',
    'WITH',
    'WITHOUT'
];

export function generateInsertStatement(params: IParam[], tableName: string): string {
    let fields = [];
    let values = [];

    // Loop through each param object and extract field, datatype, and value
    for (let param of params) {
        fields.push(handleReservedWord(param.field));
        // Assuming the datatype and value are already properly formatted for SQL
        values.push(`${param.datatype === 'string' ? "'" + param.value + "'" : param.value}`);
    }

    // Create the SQL statement
    let sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${values.join(', ')})`;

    return sql;
}

export function generateUpdateStatement(params: IParam[], id: number, tableName: string): string {
    let updates = [];

    // Loop through each param object and extract field, datatype, and value
    for (let param of params) {
        // Assuming the datatype and value are already properly formatted for SQL
        updates.push(`${handleReservedWord(param.field)} = ${param.datatype === 'string' ? "'" + param.value + "'" : param.value}`);
    }

    // Create the SQL statement
    let sql = `UPDATE ${tableName} SET ${updates.join(', ')} WHERE ID=${id}`;

    return sql;
}

function handleReservedWord(field: string): string {
    if (sqliteReservedWords.includes(field.toUpperCase())) {
        return `[${field}]`
    }
    return field;
}