const QueriesReported = (accountId, search, offset, limit) => {
  return {
    total: `SELECT COUNT(student_violation.id) as total
    FROM student_violation 
    LEFT JOIN student ON (student_violation.studentId = student.id)
    LEFT JOIN sub_criteria ON (student_violation.violationId = sub_criteria.id)
    LEFT JOIN account ON (student_violation.accountId = account.id)
    WHERE account.id = ${accountId} AND student.name LIKE '%${search}%'
  `,
    data: `SELECT student_violation.newViolation, student_violation.createdAt as reportedDate, 
    student.nisn, student.name as studentName, student.kelas, student.gender, 
    sub_criteria.code, sub_criteria.name as violation, sub_criteria.weight, sub_criteria.criteriaId, 
    account.name as pelapor
    FROM student_violation 
    LEFT JOIN student ON (student_violation.studentId = student.id)
    LEFT JOIN sub_criteria ON (student_violation.violationId = sub_criteria.id)
    LEFT JOIN account ON (student_violation.accountId = account.id)
    WHERE account.id = ${accountId} AND student.name LIKE '%${search}%'
    ORDER BY student_violation.createdAt DESC
    LIMIT ${offset}, ${limit}
  `,
  };
};
const QueriesDashboard = (columnName, offset, limit) => {
  return {
    total: `SELECT COUNT(student_violation.id) as total
    FROM student_violation 
    LEFT JOIN student ON (student_violation.studentId = student.id)
    LEFT JOIN sub_criteria ON (student_violation.violationId = sub_criteria.id)
    LEFT JOIN account ON (student_violation.accountId = account.id)
    WHERE ${columnName} IS NOT NULL
  `,
    data: `SELECT student_violation.newViolation, student_violation.violationId, student_violation.createdAt as reportedDate, 
    student.nisn, student.name as studentName, student.kelas, student.gender, 
    sub_criteria.code, sub_criteria.name as violation, sub_criteria.weight, sub_criteria.criteriaId, 
    account.name as pelapor
    FROM student_violation 
    LEFT JOIN student ON (student_violation.studentId = student.id)
    LEFT JOIN sub_criteria ON (student_violation.violationId = sub_criteria.id)
    LEFT JOIN account ON (student_violation.accountId = account.id)
    WHERE ${columnName} IS NOT NULL
    ORDER BY student_violation.createdAt DESC
    LIMIT ${offset}, ${limit}
  `,
  };
};

export { QueriesReported, QueriesDashboard };
