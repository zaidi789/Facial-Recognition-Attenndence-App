import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Realm from 'realm';

const DataEntryPage = () => {
  const [scID, setSCID] = useState('');
  const [schoolId, setSchoolId] = useState(parseInt(scID));
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [schoolLat, setSchoolLat] = useState('');
  const [schoolLong, setSchoolLong] = useState('');
  const [schoolPhone, setSchoolPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentFatherName, setStudentFatherName] = useState('');
  const [studentBForm, setStudentBForm] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [studentImage, setStudentImage] = useState('');

  const handleSubmit = () => {
    const realm = initializeRealm();
    realm.write(() => {
      // Save data to the corresponding tables
      const school = realm.create('School', {
        id: Math.floor(Math.random() * 100000), // Generate random ID
        school_id: schoolId,
        name: schoolName,
        address: schoolAddress,
        lat: parseFloat(schoolLat),
        long: parseFloat(schoolLong),
        phone: schoolPhone,
      });

      const student = realm.create('Student', {
        id: Math.floor(Math.random() * 100000), // Generate random ID
        student_id: Math.floor(Math.random() * 100000), // Generate random ID
        school: school,
        name: studentName,
        father_name: studentFatherName,
        b_form_no: studentBForm,
        class: studentClass,
        section: studentSection,
        image: studentImage,
      });

      realm.create('StudentImage', {
        id: Math.floor(Math.random() * 100000), // Generate random ID
        student_id: student.student_id,
        b_form_no: studentBForm,
        image_path: studentImage,
        image_features: '', // You can add this data if needed
        student: student,
      });
    });
    realm.close();

    // Reset form after submission
    setSchoolId('');
    setSchoolName('');
    setSchoolAddress('');
    setSchoolLat('');
    setSchoolLong('');
    setSchoolPhone('');
    setStudentName('');
    setStudentFatherName('');
    setStudentBForm('');
    setStudentClass('');
    setStudentSection('');
    setStudentImage('');
  };

  return (
    <View style={styles.container}>
      {/* School Data */}
      <Text style={styles.sectionHeading}>School Details</Text>
      <TextInput
        style={styles.input}
        value={scID.toString()}
        onChangeText={setSCID}
        placeholder="School ID"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={schoolName.toString()}
        onChangeText={setSchoolName}
        placeholder="School Name"
      />
      <TextInput
        style={styles.input}
        value={schoolAddress.toString()}
        onChangeText={setSchoolAddress}
        placeholder="School Address"
      />
      {/* ... other input fields for school data ... */}

      {/* Student Data */}
      <Text style={styles.sectionHeading}>Student Details</Text>
      <TextInput
        style={styles.input}
        value={studentName.toString()}
        onChangeText={setStudentName}
        placeholder="Student Name"
      />
      <TextInput
        style={styles.input}
        value={studentFatherName.toString()}
        onChangeText={setStudentFatherName}
        placeholder="Father Name"
      />
      <TextInput
        style={styles.input}
        value={studentBForm.toString()}
        onChangeText={setStudentBForm}
        placeholder="B Form Number"
      />
      <TextInput
        style={styles.input}
        value={studentClass.toString()}
        onChangeText={setStudentClass}
        placeholder="Class"
      />
      <TextInput
        style={styles.input}
        value={studentSection.toString()}
        onChangeText={setStudentSection}
        placeholder="Section"
      />
      {/* ... other input fields for student data ... */}

      {/* Student Image Data */}
      <Text style={styles.sectionHeading}>Student Image Details</Text>
      <TextInput
        style={styles.input}
        value={studentImage.toString()}
        onChangeText={setStudentImage}
        placeholder="Student Image Path"
      />
      {/* ... other input fields for student image data ... */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DataEntryPage;
