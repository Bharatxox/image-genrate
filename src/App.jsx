// import React, { useReducer, useState } from "react";
// import axios from "axios";
// // import "./ImageGen.css";
// // import Api from "./api";
// // import downloadIcon from "../Assets/download-icon-white-png-1.png";

// const initialState = {
//   loading: false,
//   image: null,
//   error: null,
// };

// const IMAGE_GEN = {
//   GENERATE_INIT: "GENERATE_INIT",
//   GENERATE_SUCCESS: "GENERATE_SUCCESS",
//   GENERATE_FAILURE: "GENERATE_FAILURE",
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case IMAGE_GEN.GENERATE_INIT:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case IMAGE_GEN.GENERATE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         image: action.payload,
//       };
//     case IMAGE_GEN.GENERATE_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// const ImageGen = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [prompt, setPrompt] = useState("");

//   const generateImage = async () => {
//     dispatch({ type: IMAGE_GEN.GENERATE_INIT });
//     if (prompt === "") {
//       console.log("Prompt is null");
//       dispatch({
//         type: IMAGE_GEN.GENERATE_FAILURE,
//         payload: "Prompt cannot be empty.",
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api-inference.huggingface.co/models/prompthero/openjourney",
//         { inputs: prompt },
//         {
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Bearer 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`,
//           },
//         }
//       );

//       if (response.status !== 200) {
//         throw new Error(`API request failed with status: ${response.status}`);
//       }
//       console.log(response.data);
//       const blob = new Blob([response.data], { type: "image/jpeg" });
//       const imageUrl = URL.createObjectURL(blob);
//       dispatch({ type: IMAGE_GEN.GENERATE_SUCCESS, payload: imageUrl });
//     } catch (error) {
//       console.error("Error generating image:", error);
//       dispatch({
//         type: IMAGE_GEN.GENERATE_FAILURE,
//         payload: "Failed to generate image. Please try again later.",
//       });
//     }
//   };

//   const handleDownload = () => {
//     if (state.image === null) {
//       console.log("Image is null");
//       return;
//     }
//     // const link = document.createElement("a");
//     // link.href = state.image;
//     // link.download = "imageprompt-ai.jpg";
//     // link.click();
//   };

//   const genBtnStyle = {
//     opacity: prompt ? 1 : 0.5,
//     cursor: prompt ? "pointer" : "not-allowed",
//   };

//   const downBtnStyle = {
//     opacity: state.image ? 1 : 0.5,
//     cursor: state.image ? "pointer" : "not-allowed",
//   };

//   return (
//     <div className="aiImage">
//       <div className="header">
//         ImagePrompt<span> AI</span>
//       </div>
//       <div className="imgArea">
//         {state.image && (
//           <div className="genImage">
//             <img src={state.image} alt="Generated" />
//           </div>
//         )}
//       </div>
//       <div className="search">
//         <div className="downBtn" style={downBtnStyle} onClick={handleDownload}>
//           <img alt="Download" />
//         </div>
//         <input
//           type="text"
//           className="searchInput"
//           placeholder="Type your prompt..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <div className="genBtn" style={genBtnStyle} onClick={generateImage}>
//           {state.loading ? "Generating..." : "Generate"}
//         </div>
//       </div>
//       {state.error && <div className="error">{state.error}</div>}{" "}
//       {/* Display error message */}
//       <div className="copyright">
//         <a
//           href="https://thrimaa.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           © Thrimaa Interactive Pvt. Ltd
//         </a>{" "}
//         | Developed by Vikum Chandrasekara
//       </div>
//     </div>
//   );
// };

// export default ImageGen;

import { useState } from "react";
import axios from "axios";

const ImageGen = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    try {
      setLoading(true);
      if (prompt === "") {
        alert("promt is null");
      } else {
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/prompthero/openjourney",
          { inputs: prompt },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer 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`,
            },
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const genBtnStyle = {
    opacity: prompt ? 1 : 0.5,
    cursor: prompt ? "pointer" : "not-allowed",
  };

  return (
    <div className="w-screen relative h-screen flex justify-center items-center">
      <div className=" p-1 h-[700px] w-[700px] rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="flex flex-col items-center justify-between w-full h-full bg-gray-800 back p-10 rounded-md gap-5">
          <h1 className="text-4xl font-semibold">Image-Generator</h1>
          <div className="imgArea">
            <div className="genImage">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="w-full justify-center flex px-5">
            <input
              type="text"
              className="w-3/4 pl-5 rounded-l-2xl"
              placeholder="Type your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="w-1/4 rounded-r-2xl rounded-l-[0px]"
              style={genBtnStyle}
              onClick={generateImage}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGen;
