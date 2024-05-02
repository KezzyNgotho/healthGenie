import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // Import ImagePicker library
import {}
const NewPostScreen = ({ navigation }) => {
    const [topic, setTopic] = useState('General Health'); // Default topic
    const [message, setMessage] = useState('');
    const [userImageUri, setUserImageUri] = useState(null); // State to store selected image URI

    const saveImageUrlToFirebase = (imagePath) => {
        // Function to save image URL to Firebase or any other storage service
        console.log('Saving image URL to Firebase:', imagePath);
        // Implement your logic here
    };

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

    const handlePost = () => {
        // Logic to handle post submission
        // For now, let's just log the post details
        console.log('Topic:', topic);
        console.log('Message:', message);
        console.log('Image URI:', userImageUri);
        // Navigate back to CommunitySupportScreen or any other screen
        navigation.goBack();
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
                {/* Add more topics as needed */}
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

            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    topicPicker: {
        marginBottom: 20,
    },
    messageInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        height: 150,
        textAlignVertical: 'top',
    },
    imagePickerButton: {
        backgroundColor: '#3085C3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePickerText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginBottom: 20,
    },
    postButton: {
        backgroundColor: '#3CB371',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NewPostScreen;
