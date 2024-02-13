import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const GlobalContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(employee => employee.id !== action.payload),
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case 'EDIT_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      };
    default:
      return state;
  }
};

export const GlobalState = ({ children }) => {
  const initialState = {
    employees: [{ id: uuidv4(), name: 'Bruce Wayne', location: 'Gotham', designation: 'Bachelor' }],
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addEmployee = employee => dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  const editEmployee = employee => dispatch({ type: 'EDIT_EMPLOYEE', payload: employee });
  const removeEmployee = id => dispatch({ type: 'REMOVE_EMPLOYEE', payload: id });

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        addEmployee,
        editEmployee,
        removeEmployee,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
