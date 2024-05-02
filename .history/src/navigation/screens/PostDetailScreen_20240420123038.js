import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const PostDetailScreen = ({ route, navigation }) => {
    const { post } = route.params;

    const [comments, setComments] = useState([
        {
            id: '1',
            user: 'Sarah Connor',
            comment: 'Thanks for sharing this! It really helped me.',
            date: '5 hours ago',
        },
        {
            id: '2',
            user: 'Alex Smith',
            comment: 'I agree, meditation has been great for me.',
            date: '3 hours ago',
        },
        // Add more comments as needed
    ]);

    const renderCommentItem = ({ item }) => (
        <View style={styles.commentItem}>
            <Image source={require('../assets/user-icon.png')} style={styles.commentUserIcon} />
            <View>
                <Text style={styles.commentUsername}>{item.user}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.postDetail}>
                <View style={styles.postHeader}>
                    <Image source={require('../assets/icons8-user-48.png')} style={styles.userIcon} />
                    <View>
                        <Text style={styles.username}>{post.user}</Text>
                        <Text style={styles.postDate}>{post.date}</Text>
                        <Text style={styles.topic}>{post.topic}</Text>
                    </View>
                </View>
                <Text style={styles.postMessage}>{post.message}</Text>
                <View style={styles.postFooter}>
                    <TouchableOpacity style={styles.footerButton}>
                        <Image source={require('../assets/icons8-vote.gif')} style={styles.footerIcon} />
                        <Text>{post.upvotes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}>
                        <Image source={require('../assets/icons8comment-40.png')} style={styles.footerIcon} />
                        <Text>{post.comments}</Text>
                    </TouchableOpacity>
                </View>
            </View

            <Text style={styles.commentsHeader}>Comments</Text>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id}
                style={styles.commentsList}
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
    postDetail: {
        backgroundColor: '#F0F3FF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
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
    commentsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    commentUserIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    commentUsername: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
    },
    commentDate: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
    },
    commentText: {
        fontSize: 14,
        color: '#333',
    },
    commentsList: {
        flex: 1,
    },
});

export default PostDetailScreen;
