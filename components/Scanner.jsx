import { Camera, CameraType } from "expo-camera/legacy";
import  { useRef, useState }  from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Image, Alert } from "react-native";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import { TabBarIcon } from "./navigation/TabBarIcon";
import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import CardDetails from "@/app/card/[cardDetails]";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";

const user = FIREBASE_AUTH.currentUser;
const CustomBackdrop = ({ dismissModal }) => (
  <TouchableWithoutFeedback onPress={dismissModal}>
    <View style={styles.backdrop} />
  </TouchableWithoutFeedback>
);

export default function Scanner({setScannerIsOpen, bottomSheetModalRef, handlePresentModal}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const initiatePayment = async(data) => {
    
  

  }

  const snapPoints = ["90%"];

  
  const handleClosePress = () => bottomSheetModalRef.current.close()

  const handleBarCodeScanned = async({ type, data }) => {
    try {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      const doc = await addDoc(collection(FIRESTORE_DB, 'transaction'), {cardEntry: data, receivingUser: user})
        .then(()=>{
          console.log("Transaction initiated with: ", doc)
          bottomSheetModalRef.current.close()
        }) 
        .catch((error)=>{
          Alert(error)
        })
    
      
    } catch (error) {
      alert( error);
    }
    
  };
  

  

  return (
    <View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 50,
          backgroundColor: "#000000",
          borderTopColor: "#232533",
          borderTopWidth: 1,
          shadowColor: "#232533",

        }}
        onDismiss={()=>setScannerIsOpen(false)}
        backdropComponent={() => (
          <View style={styles.backdrop}>
            <CustomBackdrop dismissModal={handleClosePress} />
          </View>
        )}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        onBarCodeScanned={handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
        
         {/* <View className="flex-1 px-4">
          <TouchableOpacity onPress={handleClosePress}>
            <TabBarIcon name="close-circle" className="text-gray-100 absolute right-3"  />
          </TouchableOpacity>
          <View className="  mt-6 mx-2 rounded-lg p-4">
          <Link href={``} className=" w-full mb-7">
            <Image
              source={images.qrcode}
              className="w-[15px] h-[15px] mr-2"
            />
            
            <Text className="text-white text-lg">Get Codes</Text>
            </Link>
            <Link href={``} className=" w-full mb-7">
            <TabBarIcon 
              name="lock-closed"
              className="text-white text-[15px]"
            />
            
            <Text className="text-white text-lg ml-2">Set Card PIN</Text>
            </Link>
            <Link href={``} className=" w-full mb-7">
            <TabBarIcon 
              name="warning"
              className="text-white mr-2 text-[15px]"
            />
            
            <Text className="text-white text-lg">Remove Card</Text>
            </Link>
          </View>
            
        </View> */}
      </BottomSheetModal>
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleIndicator: {
    backgroundColor: '#ffffff', // Change this to the desired color
    width: 40,
    height: 6,
    borderRadius: 3,
  },
});
