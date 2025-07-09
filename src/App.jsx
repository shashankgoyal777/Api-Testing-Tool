import { useEffect, useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
// import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';

import { oneLight,oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// Register only the languages you need
// SyntaxHighlighter.registerLanguage('jsx', jsx);
// SyntaxHighlighter.registerLanguage('tsx', tsx);

import "./App.css";

function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1/"
  );
  const [responseFromApi, setResponseFromApi] = useState();

  const [header, setHeader] = useState({
    "Content-Type": "application/json",
  });

  const [params, setParams] = useState([
    { checkBox: true, key: "", value: "" },
    { checkBox: true, key: "", value: "" },
  ]);

  const [body, setBody] = useState("");

  function handleSend(e) {
    e.preventDefault();

    // if (!url) {
    callApi();
    console.log("Sending request with Url: ", url, " and Method: ", method);
  }


  const callApi = () => {
   

    
    fetch(url, {
      method: method,
      headers: header,
      body: method !== "GET" ?body : null,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseFromApi(data);
        console.log(data);
      }).catch(err=>alert(err.message))
      
    
  }
  
  const [paramUrl,setParamUrl]=useState("");
  console.log("ParamUrl",paramUrl)

  useEffect(()=>{

    let temp="";
    params.forEach(async(param,index)=>{
      if(param.key!="" & param.checkBox)temp+=param.key+"="+param.value+"&";

      // if(param.key!=""&index!=params.length-1)temp+="&"

    })

    if(temp!=="")setParamUrl(temp.slice(0,-1))
      console.log("TempParam: ",paramUrl);

    
  },[params])


  console.log(params);
  return (
    <>
      <div className="container">
        {/* <h5
          style={{
            textAlign: "center",
            color: "rgb(255, 94, 0)",
            textDecoration: "underline",
            fontFamily: "cursive",
          }}
        >
          !! Jay Shree Ram !!
        </h5> */}

        <form className="form">
          <select
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            className="method_selector"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          <input
            type="text"
            className="url_bar"
            placeholder="https://www.shashank.com"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            value={url}
          />
          <button className="send_btn" onClick={(e) => handleSend(e)}>
            Send
          </button>
        </form>
        <div className="params-div">
          Params &nbsp;:
          {params.map((param, index) => {
            return (
              <div key={index} className="param">
                <input
                  type="checkbox"
                  checked={param.checkBox}
                  onChange={(e) => {
                    const newParams = [...params];
                    newParams[index].checkBox = newParams[index].checkBox
                      ? false
                      : true;
                    // console.log("checkbox set To: ",newParams[index].checkBox)
                    setParams(newParams);
                  }}
                />
                <input
                  type="text"
                  placeholder="Key"
                  value={param.key}
                  onChange={(e) => {
                    const newParams = [...params];
                    newParams[index].key = e.target.value;
                    setParams(newParams);
                  }}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={param.value}
                  onChange={(e) => {
                    const newParams = [...params];
                    newParams[index].value = e.target.value;
                    setParams(newParams);
                  }}
                />
              </div>
            );
          })}
          <button
            className="add_param_btn"
            onClick={() => {
              setParams([...params, { key: "", value: "" }]);
            }}
          >
            Add
          </button>

          {/* Textara For BODY */}

          <label htmlFor="body_text_area">Body :</label>
          
          <textarea id="body_text_area" value={body} onChange={(e)=>setBody(e.target.value)} />
        </div>


        <div className="response-div">
         <code> Response From API--</code>
          <SyntaxHighlighter
            language="json"
            // style={oneLight}
            wrapLongLines
            showLineNumbers
            className="response"
          >
            
            {JSON.stringify(responseFromApi)}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
}
export default App;
