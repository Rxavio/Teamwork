// eslint-disable-next-line import/prefer-default-export
export const tables = `
CREATE TABLE
            users(
                id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                gender TEXT NOT NULL,
                job_role TEXT NOT NULL,
                department TEXT NOT NULL,
                address TEXT NOT NULL,
                is_admin BOOLEAN);
`;
