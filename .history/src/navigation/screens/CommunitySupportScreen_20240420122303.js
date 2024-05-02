import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';

const CommunitySupportScreen = ({ navigation }) => {
    const [communityPosts, setCommunityPosts] = useState([
        {
            id: '1',
            user: 'Jane Doe',
            message: 'Dealing with anxiety lately. Any tips?',
            date: '1 day ago',
            upvotes: 15,
            comments: 5,
            topic: 'Mental Health'
        },
        {
            id: '2',
            user: 'John Smith',
            message: 'Has anyone tried meditation for stress?',
            date: '2 days ago',
            upvotes: 10,
            comments: 3,
            topic: 'Stress Relief'
        },
        // Add more posts as needed
    ]);

    const renderPostItem = ({ item }) => (
        <TouchableOpacity style={styles.postItem} onPress={() => navigation.navigate('PostDetail', { post: item })}>
            <View style={styles.postHeader}>
                <Image source={require('../assets/icons8-user-48.png')} style={styles.userIcon} />
                <View>
                    <Text style={styles.username}>{item.user}</Text>
                    <Text style={styles.postDate}>{item.date}</Text>
                </View>
                <Text style={styles.topic}>{item.topic}</Text>
            </View>
            <Text style={styles.postMessage}>{item.message}</Text>
            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.footerButton}>
                    <Image source={require('../assets/upvote.png')} style={styles.footerIcon} />
                    <Text>{item.upvotes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Image source={require('../assets/icons8comment.png')} style={styles.footerIcon} />
                    <Text>{item.comments}</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    topic: {
        fontSize: 12,
        color: '#3085C3',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    postMessage: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
});

export default CommunitySupportScreen;
