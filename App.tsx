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

type File = {
  name: string;
  uri: string;
  type: string;
  size: string;
};

const files: File[] = [
  {
    size: '15.8MB',
    uri: 'https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_15MB_MP4.mp4',
    name: 'Free_Test_Data_15MB_MP4.mp4',
    type: 'video/mp4',
  },
  {
    size: '47.9MB',
    uri: 'https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/Sample-MP4-Video-File-Download.mp4',
    name: 'Sample-MP4-Video-File-Download.mp4',
    type: 'video/mp4',
  },
];

const File: React.FC<{file: File}> = ({file}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    console.log('Uploading...');
    const form = new FormData();
    form.append('file', file);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    try {
      const {data} = await axios.post('https://0x0.st', form, {
        headers,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.file}>
      <Text style={styles.text}>{file.size}</Text>
      <Button disabled={isLoading} title="Upload" onPress={handleUpload} />
      <ActivityIndicator animating={isLoading} />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Axios form data memory leak demo</Text>
        {files.map((file, index) => (
          <File key={index} file={file} />
        ))}
      </View>
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
  file: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
