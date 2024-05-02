import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image , ActivityIndicator} from 'react-native';
//import firestore from '@react-native-firebase/firestore';
import firebase from '../components/firebase';

    const CommunitySupportScreen = ({ navigation }) => {
        const [communityPosts, setCommunityPosts] = useState([]);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const subscriber = firebase.firestore()
                .collection('posts')
                .onSnapshot(querySnapshot => {
                    const posts = [];
        
                    querySnapshot.forEach(documentSnapshot => {
                        const post = documentSnapshot.data();
                        post.id = documentSnapshot.id;
                        posts.push(post);
                    });
        
                    if(posts.length === 0) {
                        console.log("No posts found.");
                    } else {
                        console.log("Fetched posts:", posts);
                        setCommunityPosts(posts);
                    }
                    setLoading(false);
                }, error => {
                    console.error("Error fetching posts:", error);
                    setLoading(false);
                });
        
            // Unsubscribe from events when no longer in use
            return () => subscriber();
        }, []);
        
        
        if (loading) {
            return <ActivityIndicator size="large" color="#3085C3" style={styles.loadingIndicator} />;
        }
    
    const renderPostItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.postItem} 
            onPress={() => navigation.navigate('PostDetail', { post: item })}
        >
            <View style={styles.postHeader}>
                <Image source={{ uri: item.imageUrl }} style={styles.userIcon} />
                <View>
                    <Text style={styles.username}>{item.user}</Text>
                    <Text style={styles.postDate}>{item.timestamp}</Text>
                </View>
                <Text style={styles.topic}>{item.topic}</Text>
            </View>
            <Text style={styles.postMessage}>{item.message}</Text>
            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.footerButton}>
                    <Image source={require('../assets/icons8-vote.gif')} style={styles.footerIcon} />
                    <Text>{item.upvotes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Image source={require('../assets/icons8-comment-40.png')} style={styles.footerIcon} />
                    <Text>{item.comments ? item.comments.length : 0}</Text>

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
        borderRadius: 3,
        marginBottom: 20,
        alignItems: 'center',
        width:140,
    },
    newPostButtonText: {
        color: '#fff',
        fontSize: 14,
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
