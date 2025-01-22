import React, { createContext, useContext, useReducer } from 'react'
const cartstatecontext=createContext()
const cartdispatchcontext=createContext()
const reducer =(state,action)=>{
  switch(action.type){
   case "ADD":
      return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price}]
      case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
            case "UPDATE":
               let arr = [...state]
               arr.find((food, index) => {
                   if (food.id === action.id) {
                       console.log(food.qty, parseInt(action.qty), action.price + food.price)
                       arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                   }
                   return arr
               })
               return arr
               case "DROP":
                  let empArray=[]
                  return empArray
   
      default:
         console.log("ERror in reducer")
  }
}

export const Cardprovider=({ children }) => {
   const [state, dispatch] = useReducer(reducer, [])
   return (

      <cartdispatchcontext.Provider value={dispatch}>
         <cartstatecontext.Provider value={state}>
            {children}
         </cartstatecontext.Provider>
      </cartdispatchcontext.Provider>
   )
}
export const usecart=()=> useContext(cartstatecontext)
export const usedispatch=()=> useContext(cartdispatchcontext)
