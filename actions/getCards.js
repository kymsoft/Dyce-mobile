import { useState } from 'react';
import {FIREBASE_AUTH, FIRESTORE_DB} from '@/FirebaseConfig'
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import useAuthStatus from '@/constants/authstatus'
import { router } from 'expo-router';



export const getUserCards = () => {
  const {isLoggedIn} = useAuthStatus();
    
    const [cards, setCards] = useState([]);
    useEffect(() => {
            const cardDoc = collection(FIRESTORE_DB, 'cards');
            const cardSnapShot = onSnapshot(cardDoc, {
              next: (snapshot) => {
                const cards = [];
                snapshot.docs.forEach((doc) => {
                  cards.push({
                    id: doc.id,
                    ...doc.data()
                  })
                })
                setCards(cards)
    
              }
            })
            return () => cardSnapShot()
          }, [])

      for(let i = 0; i<cards.length; i++){
        if(isLoggedIn){
            const user = FIREBASE_AUTH.currentUser.uid
            if(user == cards[i].userid){
                return cards[i]
                
              }
        }
        
      }
    
}