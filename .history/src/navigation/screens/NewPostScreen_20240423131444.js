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
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';

const NewPostScreen = ({ navigation }) => {
    const [topic, setTopic] = useState('General Health'); 
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null); 
    const [loading, setLoading] = useState(false);

    const handlePost = async () => {
        if (!message.trim()) {
            Alert.alert('Error', 'Message cannot be empty.');
            return;
        }
        if (!topic.trim()) {
            Alert.alert('Error', 'Please select a topic.');
            return;
        }

        setLoading(true);

        
    const pickImage = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then((img) => {
            console.log(img);
            setImage(img);
          })
          .catch((err) => {
            console.log(err);
            Alert.alert('Error', 'Image selection failed.');
          });
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

            {image && (
                <Image source={{ uri: image.path }} style={styles.selectedImage} />
            )}

            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
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
