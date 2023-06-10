import { orderStatusArray } from "./model/status";
import React from "react";

export const keyStore = "orders"
export const keyI18n = "i18nOrder"
export const links = (valueOb) => orderStatusArray.map(val => (
    {
        id: val.id, name: val.name, link: "/order/" + val.id, otherComp: <div className={val.className} style={{
            position: 'relative',
            top: 8,
            padding: '0 5px',
            borderRadius: 5,
            color: 'white'
        }}>{valueOb[val.id]}</div>
    }
));
