import React ,{useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-picker/picker';
//import firebase from '../components/firebase';

const ProfileScreen = () => {
  const [userImageUri, setUserImageUri] = useState(null);
  const [userData, setUserData] = useState(null);

 
  const [user, setUser] = useState({
    name: 'Loading...',
    accountNumber: 'Loading...',
    mobileNumber: 'Loading...',
    profileImage: require('../assets/icons8-user-48.png'), // Default profile image
  });
{/*   
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userDataSnapshot = await firebase.firestore().collection('users').doc(userId).get();
          const userData = userDataSnapshot.data();
          if (userData) {
            setUser({
              name: userData.username || 'Unknown',
              accountNumber: userData.accountNumber || 'Unknown',
              mobileNumber: userData.mobileNumber || 'Unknown',
              profileImage: userData.profileImageUrl ? { uri: userData.profileImageUrl } : require('../assets/icons8-user-30.png'),
            });
          } else {
            Alert.alert('User data not found');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []); */}

  const uploadImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setUserImageUri(image.path);
      saveImageUrlToFirebase(image.path);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Image selection failed.');
    }
  };

  const saveImageUrlToFirebase = async (imageUrl) => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        await firebase.firestore().collection('users').doc(userId).update({
          profileImageUrl: imageUrl,
        });
        Alert.alert('Image URL saved successfully.');
      }
    } catch (error) {
      console.error('Error saving image URL:', error);
      Alert.alert('Failed to save image URL.');
    }
  };

  const handlePressSaveImage = () => {
    if (userImageUri) {
      saveImageUrlToFirebase(userImageUri);
    } else {
      Alert.alert('Please select an image first.');
    }
  };

  const handlePressInviteFriend = () => {
    console.log('Invite Friend');
  };

  const handlePressChangePassword = () => {
    console.log('Change Password');
  };

  const handlePressTermsAndConditions = () => {
    console.log('Terms and Conditions');
  };

  const handlePressCustomerSupport = () => {
    console.log('Customer Support');
  };

  const handlePressBeneficiaries = () => {
    console.log('Beneficiaries');
  };

  const handlePressBankAccount = () => {
    console.log('Bank Account');
  };

  const handlePressLogout = () => {
    console.log('Logout');
  }
    return (
      <View style={styles.container}>
      {/* Profile card */}
      <View style={styles.card}>
        {/* Profile information */}
        <View style={styles.topBar}>
          {/* Profile image */}
          <TouchableOpacity onPress={uploadImage}>
            <View style={styles.profileContainer}>
              <Image source={user.profileImage} style={styles.profileImage} />
              {/* <Image source={require('../assets/icons8-camera-24.png')} style={styles.cameraIcon} /> */}
            </View>
          </TouchableOpacity>
          {/* User information */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name ? user.name.toUpperCase() : 'Loading...'}</Text>
            <Text style={styles.userDetails}>Account Number: {user.accountNumber}</Text>
            <Text style={styles.userDetails}>Mobile Number: {user.mobileNumber}</Text>
          </View>
        </View>
      </View>

      {/* Sections below the card */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity onPress={handlePressInviteFriend}>
          <View style={styles.sectionItem}>
            {/* <Image source={require('../assets/icons8-share-50.png')} style={styles.sectionIcon} /> */}
            <Text style={styles.sectionText}>Invite Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressChangePassword}>
          <View style={styles.sectionItem}>
            {/* <Image source={require('../assets/icons8-password-48.png')} style={styles.sectionIcon} />*/}
            <Text style={styles.sectionText}>Change Password</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity onPress={handlePressTermsAndConditions}>
          <View style={styles.sectionItem}>
           {/* <Image source={require('../assets/icons8-copyleft-50.png')} style={styles.sectionIcon} /> */}
            <Text style={styles.sectionText}>Terms and Conditions</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressCustomerSupport}>
          <View style={styles.sectionItem}>
           {/*<Image source={require('../assets/icons8-support-64.png')} style={styles.sectionIcon} /> */}
            <Text style={styles.sectionText}>Customer Support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressBeneficiaries}>
          <View style={styles.sectionItem}>
          {/*  <Image source={require('../assets/icons8-share-50.png')} style={styles.sectionIcon} /> */}
            <Text style={styles.sectionText}>Beneficiaries</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressBankAccount}>
          <View style={styles.sectionItem}>
           {/* <Image source={require('../assets/icons8-bank-50.png')} style={styles.sectionIcon} /> */}
            <Text style={styles.sectionText}>Bank Account</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <View style={[styles.section, styles.logoutSection]}>
        <TouchableOpacity onPress={handlePressLogout}>
          <View style={styles.sectionItem}>
           {/* <Image source={require('../assets/icons8-logout-50.png')} style={styles.sectionIcon} /> */}
            <Text style={styles.sectionText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
       {/* Save Image Button */}
       <TouchableOpacity onPress={handlePressSaveImage} style={styles.saveImageButton}>
                <Text style={styles.saveImageButtonText}>Save Image</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#EEF5FF',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#888', // Adjust border color as needed
    borderRadius: 50, // Half of the width and height for a circular shape
    padding: 4, // Adjust padding as needed
    justifyContent: 'center', // Center the items horizontally
  },
  profileImage: {
    width: 45, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Half of the width and height for a circular shape
  },
  cameraIcon: {
    position: 'absolute', // Position the camera icon relative to the container
    width: 20,
    height: 20,
    right: 0, // Align the camera icon to the right of the container
    bottom: 0, // Align the camera icon to the bottom of the container
    backgroundColor: 'white', // Add a background color for better visibility
    borderRadius: 10, // Half of the width and height for a circular shape
    borderWidth: 2,
    borderColor: 'black', // Adjust border color as needed
  },
  userInfo: {
    marginLeft: 20, // Adjust as needed
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#1D5D9B"
  },
  userDetails: {
    fontSize: 16,
    marginBottom: 3,
    color:"black"
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D5D9B',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  sectionIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  sectionText: {
    fontSize: 16,
    color: 'black',
  },
  logoutSection: {
    marginTop: 'auto', // Push the logout section to the bottom
  },

  saveImageButton: {
    backgroundColor: '#1D5D9B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
},
saveImageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
});

export default ProfileScreen;