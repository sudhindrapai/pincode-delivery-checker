import { useEffect } from "react";
import classes from './Dashboard.module.css';

import { imagesRef, storage } from '../../firebasebase'

import { ref, getDownloadURL, listAll } from "firebase/storage";

const Dashboard = () => {

    const fileName = 'pincodes.jpg';
const spaceRef = ref(imagesRef, fileName)


const path = spaceRef.fullPath;

const pathReference = ref(storage, `${path}`);

// Create a reference from a Google Cloud Storage URI
const gsReference = ref(storage, `gs://bucket/${path}`);


getDownloadURL(ref(storage, `${path}`))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    console.log(url,"itemRef")
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('imgTag');
    img.setAttribute('src', url);
    
  })
  .catch((error) => {
    // Handle any errors
  });


//   list

// Create a reference under which you want to list
const listRef = ref(storage, '/documents');

listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
        itemRef.getDownloadURL()
        .then((url) => {
            console.log(url, "url of item ref")
        })
        console.log(itemRef,"itemRef")
      // All the items under listRef.
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });

    return <div>
        {path}
        <img id="imgTag" src={pathReference} />
        Dashboard
    </div>
};

export default Dashboard