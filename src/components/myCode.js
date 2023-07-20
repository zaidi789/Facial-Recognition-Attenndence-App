import React, { useEffect } from 'react';
import { View } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Realm from 'realm';

const HomeScreen = ({ navigation }) => {
  const initializeRealm = () => {
    return new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_id: { type: 'int', default: 0 },
            user_name: 'string',
            user_contact: 'string',
            user_address: 'string',
          },
        },
      ],
    });
  };

  useEffect(() => {
    const realm = initializeRealm();
    // You can use 'realm' here or store it in a state variable if needed
    // Make sure to close the realm instance when the component is unmounted
    return () => realm.close();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
      }}
    >
      <Mytext text="RealM Example" />
      <Mybutton title="Register" customClick={() => navigation.navigate('Register')} />
      <Mybutton title="Update" customClick={() => navigation.navigate('Update')} />
      <Mybutton title="View" customClick={() => navigation.navigate('View')} />
      <Mybutton title="View All" customClick={() => navigation.navigate('ViewAll')} />
      <Mybutton title="Delete" customClick={() => navigation.navigate('Delete')} />
    </View>
  );
};

export default HomeScreen;

import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';

const RegisterUser = ({ navigation }) => {
  const [user_name, setUserName] = useState('');
  const [user_contact, setUserContact] = useState('');
  const [user_address, setUserAddress] = useState('');

  useEffect(() => {
    realm = new Realm({ path: 'UserDatabase.realm' });

    return () => {
      realm.close();
    };
  }, []);

  const register_user = () => {
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          realm.write(() => {
            var ID =
              realm.objects('user_details').sorted('user_id', true).length > 0
                ? realm.objects('user_details').sorted('user_id', true)[0]
                    .user_id + 1
                : 1;
            realm.create('user_details', {
              user_id: ID,
              user_name: user_name,
              user_contact: user_contact,
              user_address: user_address,
            });
            Alert.alert(
              'Success',
              'You are registered successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          });
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, justifyContent: 'space-between' }}>
          <Mytextinput
            placeholder="Enter Name"
            onChangeText={setUserName}
          />
          <Mytextinput
            placeholder="Enter Contact No"
            onChangeText={setUserContact}
            maxLength={10}
            keyboardType="numeric"
          />
          <Mytextinput
            placeholder="Enter Address"
            onChangeText={setUserAddress}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: 'top' }}
          />
          <Mybutton
            title="Submit"
            customClick={register_user}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default RegisterUser;



import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';

const UpdateUser = ({ navigation }) => {
  const [input_user_id, setInputUserId] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_contact, setUserContact] = useState('');
  const [user_address, setUserAddress] = useState('');

  useEffect(() => {
    realm = new Realm({ path: 'UserDatabase.realm' });
    return () => {
      realm.close();
    };
  }, []);

  const searchUser = () => {
    console.log(input_user_id);
    var user_details = realm.objects('user_details').filtered('user_id =' + input_user_id);
    console.log(user_details);
    if (user_details.length > 0) {
      setUserName(user_details[0].user_name);
      setUserContact(user_details[0].user_contact);
      setUserAddress(user_details[0].user_address);
    } else {
      alert('No user found');
      setUserName('');
      setUserContact('');
      setUserAddress('');
    }
  };

  const updateUser = () => {
    if (input_user_id) {
      if (user_name) {
        if (user_contact) {
          if (user_address) {
            realm.write(() => {
              var ID = input_user_id;
              console.log('ID', ID);
              var obj = realm.objects('user_details').filtered('user_id =' + input_user_id);
              console.log('obj', obj);
              if (obj.length > 0) {
                obj[0].user_name = user_name;
                obj[0].user_contact = user_contact;
                obj[0].user_address = user_address;
                Alert.alert(
                  'Success',
                  'User updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('HomeScreen'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('User Updation Failed');
              }
            });
          } else {
            alert('Please fill Address');
          }
        } else {
          alert('Please fill Contact Number');
        }
      } else {
        alert('Please fill Name');
      }
    } else {
      alert('Please fill User Id');
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Mytextinput
        placeholder="Enter User Id"
        onChangeText={setInputUserId}
      />
      <Mybutton
        title="Search User"
        customClick={searchUser}
      />
      <Mytextinput
        placeholder="Enter Name"
        value={user_name}
        onChangeText={setUserName}
      />
      <Mytextinput
        placeholder="Enter Contact No"
        value={user_contact}
        onChangeText={setUserContact}
        maxLength={10}
        keyboardType="numeric"
      />
      <Mytextinput
        value={user_address}
        placeholder="Enter Address"
        onChangeText={setUserAddress}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{ textAlignVertical: 'top' }}
      />
      <Mybutton
        title="Update User"
        customClick={updateUser}
      />
    </View>
  );
};

export default UpdateUser;

import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Realm from 'realm';

const ViewAllUser = () => {
  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    const realm = new Realm({ path: 'UserDatabase.realm' });
    const user_details = realm.objects('user_details');
    setFlatListItems(user_details);

    return () => {
      realm.close();
    };
  }, []);

  const ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    );
  };

  return (
    <View>
      <FlatList
        data={flatListItems}
        ItemSeparatorComponent={ListViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Id: {item.user_id}</Text>
            <Text>Name: {item.user_name}</Text>
            <Text>Contact: {item.user_contact}</Text>
            <Text>Address: {item.user_address}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ViewAllUser;




import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Realm from 'realm';

const initializeRealm = () => {
  return new Realm({
    path: 'UserDatabase.realm',
    schema: [
      {
        name: 'user_details',
        primaryKey: 'section', // Use 'section' as the primary key
        properties: {
          id: 'string',
          name: 'string',
          roll_no: 'string',
          section: 'string',
          image: 'string',
        },
      },
    ],
  });
};

const ViewBySection = () => {
  const [sectionList, setSectionList] = useState([]);
  const [dataBySection, setDataBySection] = useState({});

  useEffect(() => {
    const realm = initializeRealm();
    const sections = realm.objects('user_details').sorted('section', false);

    // Update the section list
    setSectionList(sections);

    // Query and organize data by sections
    const data = {};
    sections.forEach((section) => {
      const recordsInSection = realm
        .objects('user_details')
        .filtered('section = $0', section.section);
      data[section.section] = recordsInSection;
    });

    setDataBySection(data);

    return () => {
      realm.close();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <Text>Section: {item.section}</Text>
      {item.records.map((record) => (
        <View key={record.id}>
          <Text>Id: {record.id}</Text>
          <Text>Name: {record.name}</Text>
          <Text>Roll No: {record.roll_no}</Text>
          <Text>Address: {record.section}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View>
      <FlatList
        data={sectionList}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }}>{item.section}</Text>
        )}
        keyExtractor={(item) => item.section}
      />

      {Object.keys(dataBySection).map((section) => (
        <FlatList
          key={section}
          data={[{ section: section, records: dataBySection[section] }]}
          renderItem={renderItem}
          keyExtractor={(item) => item.section}
        />
      ))}
    </View>
  );
};

export default ViewBySection;
