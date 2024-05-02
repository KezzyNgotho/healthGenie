import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const PostDetailScreen = ({ route }) => {
    const { post } = route.params;

    return (
        <View style={styles.container}>
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
                        <Text>{post.comments}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Comments Section */}
            <FlatList
                data={post.comments}
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
});

export default PostDetailScreen;
