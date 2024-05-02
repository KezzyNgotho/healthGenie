import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const CommunitySupportScreen = ({ navigation }) => {
    const [communityPosts, setCommunityPosts] = useState([
        {
            id: '1',
            user: 'Jane Doe',
            message: 'Dealing with anxiety lately. Any tips?',
            date: '1 day ago',
        },
        {
            id: '2',
            user: 'John Smith',
            message: 'Has anyone tried meditation for stress?',
            date: '2 days ago',
        },
        // Add more posts as needed
    ]);

    const renderPostItem = ({ item }) => (
        <TouchableOpacity style={styles.postItem}>
            <View style={styles.postHeader}>
                <Image source={require('../assets/user-icon.png')} style={styles.userIcon} />
                <Text style={styles.username}>{item.user}</Text>
                <Text style={styles.postDate}>{item.date}</Text>
            </View>
            <Text style={styles.postMessage}>{item.message}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.newPostButton}
                onPress={() => navigation.navigate('NewPost')}
            >
                <Text style={styles.newPostButtonText}>Create New Post</Text>
            </TouchableOpacity>

            <FlatList 
                data={communityPosts}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                style={styles.postList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    newPostButton: {
        backgroundColor: '#3085C3',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    newPostButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    postList: {
        flex: 1,
    },
    postItem: {
        backgroundColor: '#F0F3FF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    postDate: {
        fontSize: 12,
        color: '#777',
    },
    postMessage: {
        fontSize: 14,
        color: '#333',
    },
});

export default CommunitySupportScreen;
