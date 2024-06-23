import { addDoc, collection, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function createStatus(hostName, code) {

    
    try {
        const docRef = doc(db, 'game',code)
        await setDoc(docRef, {
                'room': code,
                'board': Array(9).fill(null),
                'status': 'ongoing',
                'disableClick': false,
                'screenText': 'start',
                'currentPlayer': 'X',
                'hostName': hostName
            })

            const data = getGame(code)
            return data
          } catch (e) {
          }
}


export async function getGame(room) {
    const gameRef = doc(db, 'game', room);
    const gameSnapshot = await getDoc(gameRef);
    return gameSnapshot.data()
    
  }


  export async function updateGameStatus(room, newStatus) {
    if (room === undefined) {
      return
    }
    const gameRef = doc(db, "game", room);
    
    try {
      await updateDoc(gameRef, newStatus);
    
    } catch (e) {
      
    }
  }
  

export function createCode() {
  let code = ''
  for (let i = 0; i < 5; i++) {
    code += (Math.floor(Math.random() * i)).toString()
  }
  return code;
}


export function AImove(board) {
  let openPositions = []
  for (let i = 0; i< board.length; i++) {
      if (board[i] === null) {
          openPositions.push(i)
      }
  }
  return openPositions[Math.floor(Math.random() * openPositions.length)]
}


export async function getHelp(player, board) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "You are a Tic TacToe assistant, the current player to play's letter which is either X or (most likely x) will be passed and an array of 9 values will be passed which will represent the board state, all you have to do is to pick the best spot to play, just return the position of the best spot which has not been taken. just return the  best position to play e.g top right, middle center, bottom left etc, no long talk"
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `${board}, player is ${player}`
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 240,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content
}


