import React from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core";
import { ContactSupportOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { keyStore } from "../../app/main/customer/common";
import reducer from "../../app/main/customer/store";
import withReducer from "app/store/withReducer";
import { getList as getAccount, resetSearch, setSearch } from "../../app/main/customer/store/accountSlice";
import { getList } from '../../app/main/customer/store/customerSlice'
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    comment: {
        background: 'white',
        "& .ql-mention-list": {
            listStyle: "none",
            margin: 0,
            padding: 0,
            overflow: "hidden"
        },
        "& .ql-mention-list-container": {
            width: 270,
            maxHeight: 200,
            overflowY: "auto",
            border: "1px solid #f0f0f0",
            borderRadius: 4,
            backgroundColor: "#fff",
            boxShadow: "0 2px 12px 0 rgba(30, 30, 30, 0.08)",
            zIndex: 9001
        },
        "& .ql-mention-list-item": {
            cursor: "pointer",
            height: "44px",
            fontSize: "16px",
            padding: "0 20px",
            verticalAlign: "middle",
        },
        "& .ql-mention-list-item .item:last-child": {
            borderBottom: 'none'
        },
        "& .ql-mention-list-item.selected": {
            backgroundColor: "#d3e1eb",
            textDecoration: "none",
        },
        "& .mention": {
            borderRadius: "6px",
            backgroundColor: "#d3e1eb",
            padding: "4px",
        },
        "& .ql-editor": {
            height: "160px",
            overflow: "hidden",
            overflowY: "scroll",
        }

    },
}));

let apivalues = []

const hashValues = [
    { id: 3, value: "Fredrik Sundqvist 2" },
    { id: 4, value: "Patrik Sjölin 2" }
];

const mentionModuleConfig = {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    source: function (searchTerm, renderList, mentionChar) {
        let values;
        if (mentionChar === "@") {
            values = apivalues
        }
        else {
            values = hashValues;
        }

        if (searchTerm.length === 0) {
            renderList(values, searchTerm);
        } else {
            const matches = [];
            for (let i = 0; i < values.length; i++)
                if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
                    matches.push(values[i]);
            renderList(matches, searchTerm);
        }
    },
    renderItem: function (item) {
        const outerDiv = document.createElement('div');
        outerDiv.className = 'border-b item';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'option-name text-13';
        nameDiv.textContent = item.value; // Set the text content

        outerDiv.appendChild(nameDiv);

        const emailDiv = document.createElement('div');
        emailDiv.className = 'option-email text-11 text-gray-500';
        emailDiv.textContent = item.email; // Set the text content

        outerDiv.appendChild(emailDiv);

        return outerDiv
    },
};


function CommentBox({ onChange, initialText = '' }) {
    const dispatch = useDispatch()
    const entities = useSelector(store => store[keyStore]?.customer?.entities)
    const getListUser = entities?.data?.map(el => ({ id: el.id, userName: el.name, value: el.name, email: el.email }))
    const [value, setValue] = React.useState(initialText);
    const classes = useStyles();
    apivalues = getListUser

    useEffect(() => {
        dispatch(getList())
    }, [dispatch])

    const handleChange = (content, delta, source, editor) => {
        setValue(content);
        console.log(content);
        console.log(editor.getContents());
    };

    const modules = {
        mention: mentionModuleConfig
    };
    return (
        <div className={classes.comment}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={modules}
            />
        </div>
    );
}

export default withReducer(keyStore, reducer)(CommentBox);
