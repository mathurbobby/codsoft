import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();
const DispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          price: action.price,
          img: action.img,
          size: action.size,
        },
      ];

    case "REMOVE":
      const newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      arr.find((prod, i) => {
        if (prod.id === action.id && prod.size === action.size) {
          arr[i] = {
            ...prod,
            qty: parseInt(action.qty) + parseInt(prod.qty),
            price: action.price + prod.price,
          };
        }
      });
      return arr;

      case 'DROP':
        let emptarr = [];
        return emptarr;

    default:
      return console.log("error");
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <DispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={state}>{children}</CartContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useDispatch = () => useContext(DispatchContext);
export default CartProvider;
