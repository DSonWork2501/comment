import React, { createContext } from "react";

export const OrderContext = createContext({})

export const OrderProvider = ({ children }) => {
    return <OrderContext.Provider>
        {children}
    </OrderContext.Provider>
}