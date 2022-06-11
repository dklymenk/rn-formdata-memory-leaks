import React from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const handleUpload = async () => {
    setLoading(true);
    console.log('Uploading...');
    const form = new FormData();
    form.append('file', {
      uri: 'https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_15MB_MP4.mp4',
      name: 'Free_Test_Data_15MB_MP4.mp4',
      type: 'video/mp4',
    });
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    try {
      const {status, data} = await axios.post('https://0x0.st', form, {
        headers,
      });
      console.log({status, data});
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.heading}>Axios form data memory leak demo</Text>
          <Button disabled={loading} title="Upload" onPress={handleUpload} />
          <ActivityIndicator animating={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
