import Realm from 'realm';
export default initializeRealm = () => {
  return new Realm({
    path: 'UserDatabase.realm',
    schema: [
      {
        name: 'School',
        primaryKey: 'id', // Change 'id' to 'school_id'
        properties: {
          id: 'int',
          school_id: 'int',
          name: 'string',
          address: 'string',
          lat: 'double',
          long: 'double',
          phone: 'string',
          students: 'Student[]',
        },
      },
      {
        name: 'StudentImage',
        primaryKey: 'id', // Change 'id' to 'student_id'
        properties: {
          id: 'int',
          student_id: 'int',
          b_form_no: 'string',
          image_path: 'string',
          image_features: 'string',
          student: 'Student?',
        },
      },
      {
        name: 'Student',
        primaryKey: 'student_id',
        properties: {
          student_id: 'string',
          school: 'School',
          name: 'string',
          father_name: 'string',
          b_form_no: 'string',
          class: 'int', // Change 'string' to 'int'
          attendance: 'Attandence[]',
          image: 'string',
        },
      },
      {
        name: 'Attandence',
        primaryKey: 'id',
        properties: {
          id: 'int',
          student: 'Student',
          school: 'School',
          image_path: 'string',
          image_features: 'string',
          approved_status: 'string',
          date: 'string',
          approved_by: 'string',
          matched_id: 'int',
        },
      },
    ],
  });
};
