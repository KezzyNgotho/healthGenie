import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const PostDetailScreen = ({ route }) => {
    const { post } = route.params;
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments);

    const submitComment = () => {
        if (newComment.trim() !== '') {
            const comment = {
                id: comments.length + 1, // Generate a new ID for the comment
                user: 'User Name', // Assuming the user is not logged in
                userImage: 'https://via.placeholder.com/40', // Placeholder image
                comment: newComment,
            };

            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.postDetail}>
                <Image source={{ uri: post.userImage }} style={styles.userImage} />
                <View style={styles.postHeader}>
                    <Text style={styles.username}>{post.user}</Text>
                    <Text style={styles.date}>{post.date}</Text>
                    <Text style={styles.topic}>{post.topic}</Text>
                </View>
                <Text style={styles.message}>{post.message}</Text>
                <View style={styles.postFooter}>
                    <TouchableOpacity style={styles.footerButton}>
                        <Image source={require('../assets/upvote.png')} style={styles.footerIcon} />
                        <Text>{post.upvotes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}>
                        <Image source={require('../assets/icons8-comment-40.png')} style={styles.footerIcon} />
                        <Text>{comments.length}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Comments Section */}
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <View style={styles.commentItem}>
                        <Image source={{ uri: item.userImage }} style={styles.commentUserImage} />
                        <View style={styles.commentContent}>
                            <Text style={styles.commentUsername}>{item.user}</Text>
                            <Text>{item.comment}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                style={styles.commentsList}
            />

            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
                <TextInput
                    placeholder="Write a comment..."
                    style={styles.commentInput}
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.commentButton} onPress={submitComment}>
                    <Text style={styles.commentButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    postDetail: {
        marginBottom: 20,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 10,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: '#777',
    },
    topic: {
        fontSize: 12,
        color: '#3085C3',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
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
    commentsList: {
        flex: 1,
        marginBottom: 20,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    commentUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentUsername: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    commentButton: {
        backgroundColor: '#3085C3',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PostDetailScreen;
