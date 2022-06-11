import React from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
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

const url = 'https://0x0.st';

const headers = {
  'Content-Type': 'multipart/form-data',
};

const fetchUploader = async (form: FormData) => {
  const response = await fetch(url, {
    headers: new Headers(headers),
    method: 'POST',
    body: form,
  }).then(res => res.text());
  return response;
};

const axiosUploader = async (form: FormData) => {
  const {data} = await axios.post(url, form, {
    headers,
  });
  return data;
};

const uploaders = {fetchUploader, axiosUploader};

const File: React.FC<{
  file: File;
  uploader: (form: FormData) => Promise<string>;
  name: string;
}> = ({file, uploader, name}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    console.log('Uploading...');
    const form = new FormData();
    form.append('file', file);

    try {
      const response = await uploader(form);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.file}>
      <Text style={styles.text}>{file.size}</Text>
      <Button disabled={isLoading} title={name} onPress={handleUpload} />
      <ActivityIndicator animating={isLoading} />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Form data memory leak demo</Text>
        {(Object.keys(uploaders) as (keyof typeof uploaders)[]).map(key =>
          files.map((file, index) => (
            <File
              key={`axios-${index}`}
              file={file}
              name={key}
              uploader={uploaders[key]}
            />
          )),
        )}
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
