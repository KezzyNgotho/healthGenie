import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PostDetailScreen = ({ route }) => {
    const { post } = route.params;
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('comments')
            .where('postId', '==', post.id)
            .onSnapshot(querySnapshot => {
                const fetchedComments = [];
                querySnapshot.forEach(documentSnapshot => {
                    fetchedComments.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });
                setComments(fetchedComments);
            });

        return () => unsubscribe();
    }, [post.id]);

    const submitComment = async () => {
        if (newComment.trim() !== '') {
            try {
                const comment = {
                    user: 'User Name', // Replace with actual user's name or ID
                    userImage: 'https://www.bing.com/images/search?view=detailV2&ccid=6VXFsRgi&id=B06E8A83E98148240E01ECD2F643B869A060BA6C&thid=OIP.6VXFsRgius1NBTzH5HcXJgHaHa&mediaurl=https%3a%2f%2fi2.wp.com%2fwww.papertraildesign.com%2fwp-content%2fuploads%2f2017%2f06%2fHappy.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.e955c5b11822bacd4d053cc7e4771726%3frik%3dbLpgoGm4Q%252fbS7A%26pid%3dImgRaw%26r%3d0&exph=1980&expw=1980&q=emoji+images&simid=608026868550758538&FORM=IRPRST&ck=74538637186C8F71C20B5CD0E85E91FC&selectedIndex=0&itb=1&idpp=overlayview&ajaxhist=0&ajaxserp=0', // Placeholder image
                    comment: newComment,
                    postId: post.id,
                    date: new Date().toISOString(),
                };

                await firestore().collection('comments').add(comment);
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment: ', error);
                Alert.alert('Error', 'Failed to add comment.');
            }
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
                        <Image source={require('../assets/icons8-vote.gif')} style={styles.footerIcon} />
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
        fontSize: 15,
        fontWeight: 'bold',
        color:'black',
    },
    date: {
        fontSize: 12,
        color: 'black',
    },
    topic: {
        fontSize: 12,
        color: '#3085C3',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'maro',
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
