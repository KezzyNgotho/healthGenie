import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Image,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import firebase from '../components/firebase';

const NewPostScreen = ({ navigation }) => {
    const [topic, setTopic] = useState('General Health'); 
    const [message, setMessage] = useState('');
    const [userImageUri, setUserImageUri] = useState(null); 
    const [loading, setLoading] = useState(false);

   
    const savePostToFirestore = async (postData) => {
        try {
            await firestore().collection('posts').add(postData);
        } catch (error) {
            console.error('Error saving post to Firestore:', error);
            throw error;
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create a New Post</Text>

            <Picker
                selectedValue={topic}
                style={styles.topicPicker}
                onValueChange={(itemValue) => setTopic(itemValue)}
            >
                <Picker.Item label="General Health" value="General Health" />
                <Picker.Item label="Mental Health" value="Mental Health" />
                <Picker.Item label="Nutrition" value="Nutrition" />
                <Picker.Item label="Exercise" value="Exercise" />
                <Picker.Item label="Disease Management" value="Disease Management" />
            </Picker>

            <TextInput
                style={styles.messageInput}
                placeholder="What's on your mind?"
                multiline
                value={message}
                onChangeText={setMessage}
            />

            {userImageUri && (
                <Image source={{ uri: userImageUri }} style={styles.selectedImage} />
            )}

            <TouchableOpacity style={styles.imagePickerButton} onPress={uploadImage}>
                <Text style={styles.imagePickerText}>Pick an Image</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.postButton} 
                onPress={handlePost}
                disabled={loading}
            >
                <Text style={styles.postButtonText}>{loading ? 'Posting...' : 'Post'}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        textAlign: 'center',
    },
    topicPicker: {
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    messageInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        marginBottom: 30,
        height: 150,
        textAlignVertical: 'top',
        fontSize: 16,
    },
    imagePickerButton: {
        backgroundColor: '#3085C3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 30,
    },
    imagePickerText: {
        color: '#fff',
        fontSize: 18,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 30,
        resizeMode: 'cover',
    },
    postButton: {
        backgroundColor: '#3CB371',
        padding: 18,
        borderRadius: 5,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default NewPostScreen;
