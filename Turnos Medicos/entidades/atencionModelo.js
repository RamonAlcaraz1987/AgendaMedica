const createConnection = require("../config/bd");

class Atencion {
    constructor(id_turno,activo,fecha_inicio,fecha_fin){

        this.id_turno=id_turno;
        this.activo=activo;
        this.fecha_inicio=fecha_inicio;
        this.fecha_fin=fecha_fin;
    }


    static async get(id_entrada,id_agendamedicos)
    { 
        try{    
            const conn = await createConnection();
            const id_agendamedico = id_agendamedicos;
            console.log(id_agendamedico);
            const [id_atencion]=await conn.query('SELECT a.id_entrada FROM atenciones a JOIN turnos t ON a.id_turno = t.id_turno WHERE t.id_paciente = ? AND t.id_agendamedico = ? ORDER BY a.id_entrada DESC LIMIT 1;',[id_entrada,id_agendamedico]);
            return id_atencion [0].id_entrada;
        }
        catch(error){
            console.log(error);
        }
    }

    static async getById(id_turno)
    { 
        try{    
            const conn = await createConnection();
            const [atenciones]=await conn.query('select * from atenciones where id_turno=?',[id_turno]);
            return atenciones;
        }
        catch(error){
            console.log(error); 
        }


    };

  static async gethistorialCompleto(id_agendamedico, id_paciente) {
    try {
        const conn = await createConnection();


        

        const [atenciones] = await conn.query(`   SELECT 
                CONCAT(DATE_FORMAT(a.fecha_inicio, '%d-%m-%Y %H:%i:%s'), ' , ', DATE_FORMAT(a.fecha_fin, '%d-%m-%Y %H:%i:%s')) AS fecha,
                CONCAT(per.nombre, ' ', per.apellido, ' , ', agendamedicos.especialidad) AS medico,
                t.motivo_consulta as motivo_consulta, 
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        'Descripcion: ', COALESCE(diag.descripcion, 'No disponible'), '\n',
                        'Calidad: ', COALESCE(cal.calidad, 'No disponible')
                    ) SEPARATOR '\n\n'
                ) AS diagnostico,
                NULL AS alergias,  
                NULL AS antecedentes,  
                NULL AS medicamentos,  
                NULL AS habitos, 
                NULL AS evolucion  
            FROM
                atenciones a
            JOIN
                turnos t ON a.id_turno = t.id_turno
            JOIN
                agendamedicos ON t.id_agendamedico = agendamedicos.id_agendamedico
            JOIN
                medicos med ON agendamedicos.id_medico = med.id_medico
            JOIN
                pacientes p ON t.id_paciente = p.id_paciente
            JOIN
                personas per ON med.dni_medico = per.dni_persona
            LEFT JOIN
                antecedentes ant ON a.id_entrada = ant.id_entrada
            LEFT JOIN
                medicamentos medic ON a.id_entrada = medic.id_entrada
            LEFT JOIN
                habitos hab ON a.id_entrada = hab.id_entrada
            LEFT JOIN
                diagnosticos diag ON a.id_entrada = diag.id_entrada
            LEFT JOIN
                calidad_diagnostico cal ON diag.id_calidad = cal.id_calidad
            LEFT JOIN
                alergias al ON a.id_entrada = al.id_entrada
            LEFT JOIN
                alergias_nomencladas an ON al.id_nomenclada = an.id_nomenclada
            LEFT JOIN
                evoluciones ev ON a.id_entrada = ev.id_entrada
            WHERE 
                agendamedicos.id_agendamedico != ?
                AND p.id_paciente = ?
            GROUP BY 
                a.fecha_fin

            UNION ALL

            SELECT 
                CONCAT(DATE_FORMAT(a.fecha_inicio, '%d-%m-%Y %H:%i:%s'), ' , ', DATE_FORMAT(a.fecha_fin, '%d-%m-%Y %H:%i:%s')) AS fecha,
                CONCAT(per.nombre, ' ', per.apellido, ' , ', agendamedicos.especialidad) AS medico,
                t.motivo_consulta as motivo_consulta, 
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        'Descripcion: ', COALESCE(diag.descripcion, 'No disponible'), '\n',
                        'Calidad: ', COALESCE(cal.calidad, 'No disponible')
                    ) SEPARATOR '\n\n'
                ) AS diagnostico,
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        'Fecha Inicio: ', COALESCE(DATE_FORMAT(al.fecha_desde, '%d-%m-%Y'), 'No disponible'), '\n',
                        'Fecha Fin: ', COALESCE(DATE_FORMAT(al.fecha_hasta, '%d-%m-%Y'), 'No disponible'), '\n',
                        'Nombre: ', COALESCE(an.nombre, 'No disponible'), '\n',
                        'Importancia: ', COALESCE(an.importancia, 'No disponible')
                    ) SEPARATOR '\n\n'
                ) AS alergias,
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        'Descripcion: ', COALESCE(ant.descripcion, 'No disponible'), '\n',
                        'Fecha Desde: ', COALESCE(DATE_FORMAT(ant.fecha_desde, '%d-%m-%Y'), 'No disponible'), '\n',
                        'Fecha Hasta: ', COALESCE(DATE_FORMAT(ant.fecha_hasta, '%d-%m-%Y'), 'No disponible')
                    ) SEPARATOR '\n\n'
                ) AS antecedentes,
                GROUP_CONCAT(
                    DISTINCT CONCAT('Descripcion: ', COALESCE(medic.descripcion, 'No disponible'))
                    SEPARATOR '\n\n'
                ) AS medicamentos,
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        'Descripcion: ', COALESCE(hab.descripcion, 'No disponible'), '\n',
                        'Fecha Desde: ', COALESCE(DATE_FORMAT(hab.fecha_desde, '%d-%m-%Y'), 'No disponible'), '\n',
                        'Fecha Hasta: ', COALESCE(DATE_FORMAT(hab.fecha_hasta, '%d-%m-%Y'), 'No disponible')
                    ) SEPARATOR '\n\n'
                ) AS habitos,
                GROUP_CONCAT(
                    DISTINCT COALESCE(ev.descripcion, 'No disponible')
                    SEPARATOR '\n\n'
                ) AS evolucion
            FROM
                atenciones a
            JOIN
                turnos t ON a.id_turno = t.id_turno
            JOIN
                agendamedicos ON t.id_agendamedico = agendamedicos.id_agendamedico
            JOIN
                medicos med ON agendamedicos.id_medico = med.id_medico
            JOIN
                pacientes p ON t.id_paciente = p.id_paciente
            JOIN
                personas per ON med.dni_medico = per.dni_persona
            LEFT JOIN
                antecedentes ant ON a.id_entrada = ant.id_entrada
            LEFT JOIN
                medicamentos medic ON a.id_entrada = medic.id_entrada
            LEFT JOIN
                habitos hab ON a.id_entrada = hab.id_entrada
            LEFT JOIN
                diagnosticos diag ON a.id_entrada = diag.id_entrada
            LEFT JOIN
                calidad_diagnostico cal ON diag.id_calidad = cal.id_calidad
            LEFT JOIN
                alergias al ON a.id_entrada = al.id_entrada
            LEFT JOIN
                alergias_nomencladas an ON al.id_nomenclada = an.id_nomenclada
            LEFT JOIN
                evoluciones ev ON a.id_entrada = ev.id_entrada
            WHERE 
                agendamedicos.id_agendamedico = ?
                AND p.id_paciente = ?
                AND a.fecha_fin IS NOT NULL
            GROUP BY 
                a.fecha_fin;`, [id_agendamedico, id_paciente, id_agendamedico, id_paciente]);

        return atenciones;
    } catch (error) {
        console.log(error);
    }
}

    static async gethistorialPropio(id_agendamedico,id_paciente)
    {
        try{    
            const conn = await createConnection();
            const [atenciones]=await conn.query( `SELECT 
           CONCAT(DATE_FORMAT(a.fecha_inicio, '%d-%m-%Y %H:%i:%s'), ' , ', DATE_FORMAT(a.fecha_fin, '%d-%m-%Y %H:%i:%s')) AS fecha,
            CONCAT(per.nombre, ' ', per.apellido, ' , ', agendamedicos.especialidad) AS medico,

    GROUP_CONCAT(
        DISTINCT CONCAT(
            'Fecha Inicio: ', COALESCE(DATE_FORMAT(al.fecha_desde, '%d-%m-%Y'), 'No disponible'), '\n',
            'Fecha Fin: ', COALESCE(DATE_FORMAT(al.fecha_hasta, '%d-%m-%Y'), 'No disponible'), '\n',
            'Nombre: ', COALESCE(an.nombre, 'No disponible'), '\n',
            'Importancia: ', COALESCE(an.importancia, 'No disponible')
        ) SEPARATOR '\n\n'
    ) AS alergias,

    GROUP_CONCAT(
        DISTINCT CONCAT(
            'Descripcion: ', COALESCE(ant.descripcion, 'No disponible'), '\n',
            'Fecha Desde: ', COALESCE(DATE_FORMAT(ant.fecha_desde, '%d-%m-%Y'), 'No disponible'), '\n',
            'Fecha Hasta: ', COALESCE(DATE_FORMAT(ant.fecha_hasta, '%d-%m-%Y'), 'No disponible')
        ) SEPARATOR '\n\n'
    ) AS antecedentes,

    GROUP_CONCAT(
        DISTINCT CONCAT('Descripcion: ', COALESCE(medic.descripcion, 'No disponible'))
        SEPARATOR '\n\n'
    ) AS medicamentos,

    GROUP_CONCAT(
        DISTINCT CONCAT(
            'Descripcion: ', COALESCE(hab.descripcion, 'No disponible'), '\n',
            'Fecha Desde: ', COALESCE(DATE_FORMAT(hab.fecha_desde, '%d-%m-%Y'), 'No disponible'), '\n',
            'Fecha Hasta: ', COALESCE(DATE_FORMAT(hab.fecha_hasta, '%d-%m-%Y'), 'No disponible')
        ) SEPARATOR '\n\n'
    ) AS habitos,

    GROUP_CONCAT(
        DISTINCT CONCAT(
            'Descripcion: ', COALESCE(diag.descripcion, 'No disponible'), '\n',
            'Calidad: ', COALESCE(cal.calidad, 'No disponible')
        ) SEPARATOR '\n\n'
    ) AS diagnostico,

    GROUP_CONCAT(
        DISTINCT COALESCE(ev.descripcion, 'No disponible')
        SEPARATOR '\n\n'
    ) AS evolucion

FROM
    atenciones a
JOIN
    turnos t ON a.id_turno = t.id_turno
JOIN
    agendamedicos ON t.id_agendamedico = agendamedicos.id_agendamedico
JOIN
    medicos med ON agendamedicos.id_medico = med.id_medico
JOIN
    pacientes p ON t.id_paciente = p.id_paciente
JOIN
    personas per ON med.dni_medico = per.dni_persona
LEFT JOIN
    antecedentes ant ON a.id_entrada = ant.id_entrada
LEFT JOIN
    medicamentos medic ON a.id_entrada = medic.id_entrada
LEFT JOIN
    habitos hab ON a.id_entrada = hab.id_entrada
LEFT JOIN
    diagnosticos diag ON a.id_entrada = diag.id_entrada
LEFT JOIN
    calidad_diagnostico cal ON diag.id_calidad = cal.id_calidad
LEFT JOIN
    alergias al ON a.id_entrada = al.id_entrada
LEFT JOIN
    alergias_nomencladas an ON al.id_nomenclada = an.id_nomenclada
LEFT JOIN
    evoluciones ev ON a.id_entrada = ev.id_entrada

WHERE 
    agendamedicos.id_agendamedico = ?
    AND p.id_paciente = ?

GROUP BY a.fecha_fin

                `,[id_agendamedico,id_paciente]);
                
            return atenciones;
        }
        catch(error){
            console.log(error); 
        }
    }

 static async create(id_turno)
    { 
        try{
             const conn = await createConnection();
            const [result]=await conn.query('insert into atenciones (id_turno,activo,fecha_inicio,fecha_fin) values(?,1,NOW(),NULL)',[id_turno]);
     return result.affectedRows == 1;

        }
        catch(error){
            console.log(error);
        }
    } 
    
    static async update(id_entrada)
    { 
        try{
             const conn = await createConnection();
             const [rows] = await conn.query('select fecha_inicio from atenciones where id_entrada=?', [id_entrada]);
             return rows.length > 0 ? rows[0].fecha_inicio : null; // Retornamos la fecha real

        }
        catch(error){
            console.log(error);
        }
    }
    static async updateFinAtencion(id_entrada){
        try{
            const conn = await createConnection();
            const [result]=await conn.query('update atenciones set fecha_fin=NOW() where id_entrada=?',[id_entrada]);
            return result.affectedRows == 1;
        }
        catch(error){
            console.log(error);
        }
    }







}

module.exports = Atencion;