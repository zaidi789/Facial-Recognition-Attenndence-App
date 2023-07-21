import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Realm from 'realm';
import Nav from './src/navigation';

export default function App() {
  const initializeRealm = () => {
    return new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          primaryKey: 'id',
          properties: {
            id: 'string',
            name: 'string',
            roll_no: 'string',
            section: 'string',
            image: 'string',
          },
        },
        {
          name: 'section_details',
          primaryKey: 'section',
          properties: {
            section: 'string', // Section name as primary key
            students: {type: 'list', objectType: 'user_details'}, // List of students in the section
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
  return <Nav />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// const {width} = Dimensions.get('window');
// import SelectDropdown from 'react-native-select-dropdown';

// export default Dropdown2 = () => {
//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);

//   const citiesDropdownRef = useRef();

//   useEffect(() => {
//     setTimeout(() => {
//       setCountries([
//         {title: 'Egypt', cities: [{title: 'Cairo'}, {title: 'Alex'}]},
//         {title: 'Canada', cities: [{title: 'Toronto'}, {title: 'Quebec City'}]},
//       ]);
//     }, 1000);
//   }, []);

//   const renderHeader = () => {
//     return (
//       <View style={[styles.header, styles.shadow]}>
//         <Text style={styles.headerTitle}>{'Demo 2'}</Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.saveAreaViewContainer}>
//       <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
//       <View style={styles.viewContainer}>
//         {renderHeader()}
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           alwaysBounceVertical={false}
//           contentContainerStyle={styles.scrollViewContainer}>
//           <View style={styles.dropdownsRow}>
//             <SelectDropdown
//               data={countries}
//               onSelect={(selectedItem, index) => {
//                 console.log(selectedItem, index);
//                 citiesDropdownRef.current.reset();
//                 setCities([]);
//                 setCities(selectedItem.cities);
//               }}
//               defaultButtonText={'Select country'}
//               buttonTextAfterSelection={(selectedItem, index) => {
//                 return selectedItem.title;
//               }}
//               rowTextForSelection={(item, index) => {
//                 return item.title;
//               }}
//               buttonStyle={styles.dropdown1BtnStyle}
//               buttonTextStyle={styles.dropdown1BtnTxtStyle}
//               renderDropdownIcon={isOpened => {
//                 return (
//                   <FontAwesome
//                     name={isOpened ? 'chevron-up' : 'chevron-down'}
//                     color={'#444'}
//                     size={18}
//                   />
//                 );
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown1DropdownStyle}
//               rowStyle={styles.dropdown1RowStyle}
//               rowTextStyle={styles.dropdown1RowTxtStyle}
//             />
//             <View style={styles.divider} />
//             <SelectDropdown
//               ref={citiesDropdownRef}
//               data={cities}
//               onSelect={(selectedItem, index) => {
//                 console.log(selectedItem, index);
//               }}
//               defaultButtonText={'Select city'}
//               buttonTextAfterSelection={(selectedItem, index) => {
//                 return selectedItem.title;
//               }}
//               rowTextForSelection={(item, index) => {
//                 return item.title;
//               }}
//               buttonStyle={styles.dropdown2BtnStyle}
//               buttonTextStyle={styles.dropdown2BtnTxtStyle}
//               renderDropdownIcon={isOpened => {
//                 return (
//                   <FontAwesome
//                     name={isOpened ? 'chevron-up' : 'chevron-down'}
//                     color={'#444'}
//                     size={18}
//                   />
//                 );
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown2DropdownStyle}
//               rowStyle={styles.dropdown2RowStyle}
//               rowTextStyle={styles.dropdown2RowTxtStyle}
//             />
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 6},
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     width,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F6F6F6',
//   },
//   headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
//   saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
//   viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
//   scrollViewContainer: {
//     flexGrow: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: '10%',
//   },
//   dropdownsRow: {flexDirection: 'row', width: '100%', paddingHorizontal: '5%'},

//   dropdown1BtnStyle: {
//     flex: 1,
//     height: 50,
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#444',
//   },
//   dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
//   dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
//   dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
//   dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
//   divider: {width: 12},
//   dropdown2BtnStyle: {
//     flex: 1,
//     height: 50,
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#444',
//   },
//   dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
//   dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
//   dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
//   dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
// });
