/* eslint-disable import/prefer-default-export */
export const data = `
INSERT INTO 
            users(first_name, last_name, email, password, gender, job_role, department, address, is_admin) 
            VALUES
            ('Brown','chris', 'brown@gmail.com','$2a$10$ePOKm8T1UUABCVjMiUNBO.xc8v7AeZ.JNbn7eRgYkN.bZ.EwXuAs6','MALE','CEO','SE',' Kigali', true), 
            ('Martin','chris', 'martin@gmail.com','$2a$10$ePOKm8T1UUABCVjMiUNBO.xc8v7AeZ.JNbn7eRgYkN.bZ.EwXuAs6','MALE','Developer','SE',' Kigali', false),
            ('Rock','chris', 'rock@gmail.com','$2a$10$ePOKm8T1UUABCVjMiUNBO.xc8v7AeZ.JNbn7eRgYkN.bZ.EwXuAs6','MALE','IT','SE',' Kigali', false);

`;
