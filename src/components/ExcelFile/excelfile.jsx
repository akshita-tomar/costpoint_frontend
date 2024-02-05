import "./excelFile.css";
import cloud_img from "../../images/cloud-upload.png";
import link_img from "../../images/link.png";
import dropdownBbox_img from "../../images/dropbox-logo.png";
import googleDrive_img from "../../images/google-drive.png";
import delete_img from "../../images/trash.svg";
import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import DropboxChooser from "react-dropbox-chooser";
import useDrivePicker from "react-google-drive-picker";
import delete_image from "../../images/delete.svg";
import validator from "validator";
import axios from "axios";
import ExcelJS from "exceljs";
import polygon_img from "../../images/Polygon.png";
import resultloader from "../../images/resultloader.gif";
import FileLoader from "../loader/file1loader";
import Downloadingloader from "../loader/downloadingLoader";

//developer key
const APP_KEY = "sdkgrc3oxxgvbgt";

// const APP_KEY ="iospfcq32ntfgwl"
// const APP_KEY="cd6es8opryu859q"

const ExcelFile = () => {
  const divRef = useRef(null);
  const div2ref = useRef(null);
  let matchtypes = "";
  const [data, setData] = useState(false);
  const [isresult, setisresult] = useState([]);
  const [fileData2, setFileData2] = useState(false);
  const [file1, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [excelData, setExcelData] = useState(null);
  const [exceldatafile2, setexceldatafile2] = useState(null);
  const [inputfilecount, setinputfilecount] = useState(0);
  const [url, seturl] = useState();
  const [responseData, setResponseData] = useState([]);
  const [responseData2, setResponseData2] = useState([]);
  const [file2url, setfile2url] = useState();
  const [openPicker, authResponse] = useDrivePicker();
  const [drivesheetchangefile1, setdrivesheetchangefile1] = useState("");
  const [drivesheetchangefile2, setdrivesheetchangefile2] = useState("");
  const [urlsheetchangefile1, seturlsheetchangefile1] = useState("");
  const [urltoken1, seturltoken1] = useState("");
  const [urlsheetchangefile2, seturlsheetchangefile2] = useState("");
  const [urltoken2, seturltoken2] = useState("");
  const [file1headers, setfile1headers] = useState([]);
  const [file2headers, setfile2headers] = useState([]);
  const [sheetcount, setsheetcount] = useState([]);
  const [sheetcountfile2, setsheetcountfile2] = useState(0);
  const [dropboxfile1, setdropboxfile1] = useState("");
  const [dropboxfile2, setdropboxfile2] = useState("");
  const [storeselectedcolumn, setstoreselectedcolumn] = useState([]);
  const [storeselectedcolumnfile2, setstoreselectedcolumnfile2] = useState([]);
  const [matchtype, setmatchtype] = useState();
  const [matchedfile1, setmatchedfile1] = useState([]);
  const [matchedfile2, setmatchedfile2] = useState([]);
  const [notmatchedfile1, setnotmatchedfile1] = useState([]);
  const [notmatchedfile2, setnotmatchedfile2] = useState([]);
  const [matchedpercentageFile1, setmatchedpercentageFile1] = useState("");
  const [matchedpercentageFile2, setmatchedpercentageFile2] = useState("");
  const [unmatchedpercentageFile1, setunmatchedpercentageFile1] = useState("");
  const [unmatchedpercentageFile2, setunmatchedpercentageFile2] = useState("");
  const [result, setResult] = useState(false);
  const [runmatchenablefile1, setrunmatchenable] = useState();
  const [runmatchenablefile2, setrunmatchenablefile2] = useState();
  const [showresults, setshowresults] = useState(false);
  const [matchIndexfile1, setmatchIndexfile1] = useState([]);
  const [matchIndexfile2, setmatchIndexfile2] = useState([]);
  const [showMatcheddata, setshowMatcheddata] = useState(false);
  const [showunmatchedata, setshowunmatchedata] = useState(false);
  const [addfield, setaddfield] = useState([
    { selectindexfile1: "", selectindexfile2: "", selectmatchtype: "" },
  ]);
  const [columnlengthfile1, setcolumnlengthfile1] = useState(0);
  const [columnlengthfile2, setcolumnlengthfile2] = useState(0);
  const [radioInput, setRadioInput] = useState("");
  const buttonRef = useRef(null);
  const [nearMatch, setNearMatch] = useState(false);
  const [token1, setToken] = useState("");
  const [token2, setToken2] = useState("");
  const [file1name, setfile1name] = useState("");
  const [file2name, setfile2name] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState("");
  const [selectedOptionIndex2, setSelectedOptionIndex2] = useState("");
  const [loader, setloader] = useState(false);
  const [haschunkfinished, sethaschunkfinished] = useState(false);
  const ROWS_TO_DISPLAY_INITIAL = 200;
  const ROWS_TO_FETCH_ON_SCROLL = 50;
  const [displayedRows, setDisplayedRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [displayedRowsTable2, setDisplayedRowsTable2] = useState([]);
  const [totalRowsT2, setTotalRowsT2] = useState(0);
  const [displayedRowsResult1, setdisplayedRowsResult1] = useState([]);
  const [totalRowsResult1, setTotalRowsResult1] = useState(0);
  const [displayedRowsmatchResult, setdisplayedRowsmatchResult] = useState([]);
  const [totalRowsmatchResult, settotalRowsmatchResult] = useState(0);
  const [displayedRowsunmatchResult, setdisplayedRowsunmatchResult] = useState(
    []
  );
  const [totalunmatchResult, settotalunmatchResult] = useState(0);
  const [displayedRowsResult2, setdisplayedRowsResult2] = useState([]);
  const [totalrowsResult2, settotalrowsResult2] = useState(0);
  const [displayedRowsmatchResult2, setdisplayedRowsmatchResult2] = useState([]);
  const [totalmatchResult2, settotalmatchResult2] = useState(0);
  const [displayedRowsunmatchResult2, setdisplayedRowsunmatchResult2] = useState([]);
  const [totalunmatchResult2, settotalunmatchResult2] = useState(0);
  const [file1Loader, setFile1Loader] = useState(false);
  const [filedownloadingloader, setfiledownloadingloader] = useState(false);
  const [checkbox, setcheckbox] = useState(false);
  const [expectedvaluefile1, setexpectedvaluefile1] = useState(100);
  const [expectedvaluefile2, setexpectedvaluefile2] = useState(100);
  const [file1matchindexwith,setfile1matchindexwith] = useState([])
  const [file2matchindexwith,setfile2matchindexwith] = useState([])
  const [file1indexmatch,setfile1indexmatch]=useState([])
  const [file2indexmatch,setfile2indexmatch]=useState([])
  const [handletotal,sethandletotal]=useState(0)
  const [handletotal2,sethandletotal2]=useState(0)
  const [resultlength,setresultlength]=useState(0)
  const [enableRunmatch,setEnableRunmatch]=useState(false)


  //code for handle pagination
  const fetchMoreRows = useCallback(() => {
    if (displayedRows.length < totalRows) {
      const rowsToDisplay = responseData.slice(
        0,
        displayedRows.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setDisplayedRows(rowsToDisplay);
    }
  }, [displayedRows.length, totalRows, responseData]);


  const fetchMoreRowsT2 = useCallback(() => {
    if (displayedRowsTable2.length < totalRowsT2) {
      const rowsToDisplay = responseData2.slice(
        0,
        displayedRowsTable2.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setDisplayedRowsTable2(rowsToDisplay);
    }
  }, [displayedRowsTable2.length, totalRowsT2, responseData2]);

  const fetchMoreRowsresult1 = useCallback(() => {
    if (displayedRowsResult1.length < totalRowsResult1) {
      const rowsToDisplay = responseData.slice(
        0,
        displayedRowsResult1.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setdisplayedRowsResult1(rowsToDisplay);
    }
  }, [displayedRowsResult1.length, totalRowsResult1, responseData]);


  useEffect(() => {
    // Check if there is any response data
    if (responseData?.length > 0) {
      // Set the total rows count
      setTotalRowsResult1(responseData.length);

      // Display initial rows (200 rows)
      const initialRows = responseData.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setdisplayedRowsResult1(initialRows);
    }
  }, [responseData]);

  const fetchMoreRowsresult2 = useCallback(() => {
    if (displayedRowsResult2.length < totalrowsResult2) {
      const rowsToDisplay = responseData2.slice(
        0,
        displayedRowsResult2.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setdisplayedRowsResult2(rowsToDisplay);
    }
  }, [displayedRowsResult2.length, totalrowsResult2, responseData2]);

  useEffect(() => {
    // Check if there is any response data
    if (responseData2?.length > 0) {
      // Set the total rows count
      settotalrowsResult2(responseData2.length);

      // Display initial rows (200 rows)
      const initialRows = responseData2.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setdisplayedRowsResult2(initialRows);
    }
  }, [responseData2]);

  const fetchMoreRowsresult1match = useCallback(() => {
    if (displayedRowsmatchResult.length < totalRowsmatchResult) {
      const rowsToDisplay = responseData.slice(
        0,
        displayedRowsmatchResult.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setdisplayedRowsmatchResult(rowsToDisplay);
    }
  }, [displayedRowsmatchResult.length, totalRowsmatchResult, responseData]);

  useEffect(() => {
    // Check if there is any response data
    if (responseData?.length > 0) {
      // Set the total rows count
      settotalRowsmatchResult(responseData.length);

      // Display initial rows (200 rows)
      const initialRows = responseData.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setdisplayedRowsmatchResult(initialRows);
    }
  }, [responseData]);

  const fetchMoreRowsresult2match = useCallback(() => {
    if (displayedRowsmatchResult2.length < totalmatchResult2) {
      const rowsToDisplay = responseData2.slice(
        0,
        displayedRowsmatchResult2.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setdisplayedRowsmatchResult2(rowsToDisplay);
    }
  }, [displayedRowsmatchResult2.length, totalmatchResult2, responseData2]);

  useEffect(() => {
    // Check if there is any response data
    if (responseData2?.length > 0) {
      // Set the total rows count
      settotalmatchResult2(responseData2.length);

      // Display initial rows (200 rows)
      const initialRows = responseData2.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setdisplayedRowsmatchResult2(initialRows);
    }
  }, [responseData2]);

  const fetchMoreRowsresult1unmatch = useCallback(() => {
    if (displayedRowsunmatchResult.length < totalunmatchResult) {
      const rowsToDisplay = responseData.slice(
        0,
        displayedRowsunmatchResult.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setdisplayedRowsunmatchResult(rowsToDisplay);
    }
  }, [displayedRowsunmatchResult.length, totalunmatchResult, responseData]);

  useEffect(() => {
    // Check if there is any response data
    if (responseData?.length > 0) {
      // Set the total rows count
      settotalunmatchResult(responseData.length);

      // Display initial rows (200 rows)
      const initialRows = responseData.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setdisplayedRowsunmatchResult(initialRows);
    }
  }, [responseData]);

  const fetchMoreRowsresult2unmatch = useCallback(() => {
    if (displayedRowsunmatchResult2.length < totalunmatchResult2) {
      const rowsToDisplay = responseData2.slice(
        0,
        displayedRowsunmatchResult2.length + ROWS_TO_FETCH_ON_SCROLL
      );
      setdisplayedRowsunmatchResult2(rowsToDisplay);
    }
  }, [displayedRowsunmatchResult2.length, totalunmatchResult2, responseData2]);

  useEffect(() => {
    // Check if there is any response data
    if (responseData2?.length > 0) {
      // Set the total rows count
      settotalunmatchResult2(responseData2.length);

      // Display initial rows (200 rows)
      const initialRows = responseData2.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setdisplayedRowsunmatchResult2(initialRows);
    }
  }, [responseData2]);

  const eventHandler = () => {
    setData(true);
  };

  const eventHandler2 = () => {
    setFileData2(true);
  };

  // *************************   READ CONTENTS OF URL FOR  FILE-1 ****************************
  const closeBtn = async () => {
    try {
      seturl("");
      setData(false);
      sethaschunkfinished(false);
      const link = url;
      if (!link) {
        toast.error("Enter a file url and then click submit");
      } else {
        if (validator.isURL(url)) {
          seturlsheetchangefile1(url);
          // const clientId = "585542978337-cbeb0j4qo45scn1dp2qdhjs84c415rlc.apps.googleusercontent.com";
          const clientId =
            "110434826385-94lqrs6fksr9noju504bmj8ro0v5b2p8.apps.googleusercontent.com";
          // const clientSecret = "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";
          const clientSecret = "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";
          let accessToken = ""; // Variable to store the current access token
          const fetchAccessToken = async () => {
            if (accessToken) {
              // If an access token exists and is not expired, use it
              return accessToken;
            } else {
              // const refreshToken="1//042VimHHHBL1-CgYIARAAGAQSNwF-L9IrIOL9ZCaGam68bXUm9It1Jvl7LwHnVJ7vdTdQq7rxleM4A2t25Zleqf7SUy8BgB41anU"
              const refreshToken =
                "1//04zGpEGq8YtuxCgYIARAAGAQSNwF-L9IrWAaWNhNJOdiNgHWWb_wZ1MtdGngMkEuixnyJSTa-Tj6foI5qHEGTPuxy6uXwfRkXeaw";
              const tokenEndpoint = "https://oauth2.googleapis.com/token";
              try {
                const response = await axios.post(tokenEndpoint, {
                  grant_type: "refresh_token",
                  client_id: clientId,
                  client_secret: clientSecret,
                  refresh_token: refreshToken,
                });
                accessToken = await response.data.access_token;
                return accessToken;
              } catch (error) {
                //  toast.error("error!")
              }
            }
          };
        
          // Fetch the access token
          const tkn = await fetchAccessToken();
          seturltoken1(tkn);
          const startIndex = url.indexOf("/d/") + 3;
          const endIndex = url.indexOf("/edit");
          const id = url.substring(startIndex, endIndex);
          const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
            {
              headers: {
                Authorization: "Bearer " + tkn,
              },
            }
          );
          console.log(tkn)
          console.log(response)
          if (
            response.status === 404 ||
            response.status === 403 ||
            response.status === 431 ||
            response.status === 401
          ) {
            toast.error(
              "Please use a valid url that have public access as well as having extension with filename"
            );
          } else {
            setFile1Loader(true);
            const responseforfilename = await axios.get(
              `https://www.googleapis.com/drive/v3/files/${id}?fields=name`,
              {
                headers: {
                  Authorization: "Bearer " + tkn,
                },
              }
            );

            const fileName = responseforfilename.data.name;
            const nameWithoutExtension = fileName.split(".")[0];
            setfile1name(nameWithoutExtension);
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const sheetNumbers = [];
            workbook.SheetNames.forEach((sheetName, index) => {
              const worksheet = workbook.Sheets[sheetName];
              const rows = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
              });
              sheetNumbers.push(sheetName);
            });
            setsheetcount(sheetNumbers);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsondata = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
              defval: "",
              raw: false,
              dateNF: "mm/dd/yyyy",
            });
            let rows = jsondata.filter((row) => row.join("").trim() !== "");
            rows = rows.map((row) =>
              row.map((value) => {
                // Check if the value is a numeric string
                if (/^-?\d*\.?\d+$/.test(value)) {
                  return Number(value);
                }
                return value;
              })
            );
            if (rows.length === 0) {
              toast.error("No content in this file select another file!");
            } else {
              setExcelData(rows);
              setResponseData(rows);
              setFile1Loader(false);
              setinputfilecount((prev) => prev + 1);
            }
            let updatedheaders = [];
            for (let i = 0; i < rows[0]?.length; i++) {
              if ( rows[0][i] !== null) {
                updatedheaders.push(rows[0][i]);
              }
            }
            setfile1headers(updatedheaders);
          }
        } else {
          toast.error("Invalid url!");
        }
      }
    } catch (error) {
      toast.error("Invalid url!");
    }
  };

  // **********************************   READ CONTENTS OF URL FOR FILE-2  **************************
  const closeBtn2 = async () => {
    try {
      setfile2url("");
      setFileData2(false);
      sethaschunkfinished(false);
      const link = file2url;
      if (!link) {
        toast.error("Enter a file url and then click submit");
      } else {
        if (validator.isURL(file2url)) {
          seturlsheetchangefile2(link);
          const clientId =
            "110434826385-94lqrs6fksr9noju504bmj8ro0v5b2p8.apps.googleusercontent.com";
          const clientSecret = "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";
          let accessToken = ""; // Variable to store the current access token
          const fetchAccessToken = async () => {
            if (accessToken) {
              //If an access token exists and is not expired, use it
              return accessToken;
            } else {
              const refreshToken =
                "1//04zGpEGq8YtuxCgYIARAAGAQSNwF-L9IrWAaWNhNJOdiNgHWWb_wZ1MtdGngMkEuixnyJSTa-Tj6foI5qHEGTPuxy6uXwfRkXeaw";
              const tokenEndpoint = "https://oauth2.googleapis.com/token";
              try {
                const response = await axios.post(tokenEndpoint, {
                  grant_type: "refresh_token",
                  client_id: clientId,
                  client_secret: clientSecret,
                  refresh_token: refreshToken,
                });
                accessToken = await response.data.access_token;
                return accessToken;
              } catch (error) {
                //  toast.error("error!")
              }
            }
          };
          // Fetch the access token
          const tkn = await fetchAccessToken();
          seturltoken2(tkn);
          const startIndex = link.indexOf("/d/") + 3;
          const endIndex = link.indexOf("/edit");
          const id = link.substring(startIndex, endIndex);

          const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
            {
              headers: {
                Authorization: "Bearer " + tkn,
              },
            }
          );
          if (
            response.status === 404 ||
            response.status === 403 ||
            response.status === 431 ||
            response.status === 401  
          ) {
            toast.error(
              "Please use a valid url that have public access as well as having extension with filename"
            );
          } else {
            setFile1Loader(true);
            const responseforfilename = await axios.get(
              `https://www.googleapis.com/drive/v3/files/${id}?fields=name`,
              {
                headers: {
                  Authorization: "Bearer " + tkn,
                },
              }
            );
            const fileName = responseforfilename.data.name;
            const nameWithoutExtension = fileName.split(".")[0];
            setfile2name(nameWithoutExtension);
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const sheetNumbers = [];
            workbook.SheetNames.forEach((sheetName, index) => {
              const worksheet = workbook.Sheets[sheetName];
              const rows = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
              });
              sheetNumbers.push(sheetName);
            });
            setsheetcountfile2(sheetNumbers);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsondata = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
              defval: "",
              raw: false,
              dateNF: "mm/dd/yyyy",
            });
            let rows = jsondata.filter((row) => row.join("").trim() !== "");
            rows = rows.map((row) =>
              row.map((value) => {
                // Check if the value is a numeric string
                if (/^-?\d*\.?\d+$/.test(value)) {
                  return Number(value);
                }
                return value;
              })
            );
            if (rows.length === 0) {
              toast.error("No content in this file select another file!");
            } else {
              setexceldatafile2(rows);
              setResponseData2(rows);
              setFile1Loader(false);
              setinputfilecount((prev) => prev + 1);
            }
            let updatedheaders = [];
            for (let i = 0; i < rows[0]?.length; i++) {
              if ( rows[0][i] !== null) {
                updatedheaders.push(rows[0][i]);
              }
            }
            setfile2headers(updatedheaders);
          }
        } else {
          toast.error("Invalid url!");
        }
      }
    } catch (error) {
      toast.error("Invalid url!");
    }
  };

  //  ****************************** READ CONTENTS OF DRAG AND DROP FILE-1 *****************************
  //get file details using backend api
  const handleFileUpload = useCallback(async (acceptedFiles) => {
    setData(false);
    setshowresults(false);
    setResult(false);
    const nameWithoutExtension = acceptedFiles[0].name.split(".")[0];
    setfile1name(nameWithoutExtension);
    let hasProcessedFile = false;
    const extension = acceptedFiles[0].name.split(".").pop();
    if (
      !(
        extension === "xlsx" ||
        extension === "xls" ||
        extension === "xlsm" ||
        extension === "xlsb" ||
        extension === "xltx" ||
        extension === "xltm" ||
        extension === "xls" ||
        extension === "xlt" ||
        extension === "xlr" ||
        extension === "csv" ||
        extension === "txt" ||
        extension === "dbf" ||
        extension === "xld" ||
        extension === "xlc" ||
        extension === "wks" ||
        extension === "html"||
        extension === "emf" ||
        extension === "bmp"
      )
    ) {
      toast.error("Unsupported file ! select any Excel supported file");
    } else {
      try {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("excelFile", file);
        setFile1Loader(true);
        const response = await axios.post(
          "https://backend.costpoint.pro/get_file1data",
          formData
        );
        if (response) {
          setFile1Loader(false);
        }
        setExcelData(response?.data?.sheetData[0].rows);
        const rows = response.data.sheetData[0].rows;
        let updatedheaders = [];
        for (let i = 0; i < rows[0]?.length; i++) {
          if ( rows[0][i] !== null) {
            updatedheaders.push(rows[0][i]);
          }}
        setfile1headers(updatedheaders);
        setResponseData(response?.data?.sheetData[0].rows);
        if (response?.data?.sheetData[0].rows.length > 0) {
          if (!hasProcessedFile) {
            setinputfilecount((prev) => prev + 1);
            hasProcessedFile = true; // Set the flag to indicate that the file has been processed
          }
        }
        setsheetcount(response.data.sheetNames);
        setfile1(acceptedFiles[0]);
      } catch (error) {
        toast.error("Error while processing the file!");
      }
    }
  }, []);

  useEffect(() => {
    // Check if there is any response data
    if (responseData?.length > 0) {
      // Set the total rows count
      setTotalRows(responseData.length);

      // Display initial rows (200 rows)
      const initialRows = responseData.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setDisplayedRows(initialRows);
    }
  }, [responseData]);

  // ************************ READ CONTENTS OF DRAG AND DROP FILE-2 ******************
  const handleFileUploadfile2 = useCallback(async (acceptedFiles) => {
    setFileData2(false);
    setshowresults(false);
    setResult(false);
    const nameWithoutExtension = acceptedFiles[0].name.split(".")[0];
    setfile2name(nameWithoutExtension);
    let hasProcessedFile = false;
    const extension = acceptedFiles[0].name.split(".").pop();
    if (
      !(
        extension === "xlsx"||
        extension === "xls" ||
        extension === "xlsm"||
        extension === "xlsb"||
        extension === "xltx"||
        extension === "xltm"||
        extension === "xls" ||
        extension === "xlt" ||
        extension === "xlr" ||
        extension === "csv" ||
        extension === "txt" ||
        extension === "dbf" ||
        extension === "xld" ||
        extension === "xlc" ||
        extension === "wks" ||
        extension === "html"||
        extension === "emf" ||
        extension === "bmp"
      )
    ) {
      toast.error("Unsupported file! select any Excel supported file.");
    } else {
      try {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("excelFile", file);
        setFile1Loader(true);
        const response = await axios.post(
          "https://backend.costpoint.pro/get_file1data",
          formData
        );
        setFile1Loader(false);
        setexceldatafile2(response?.data?.sheetData[0].rows);
        const rows = response.data.sheetData[0].rows;
        let updatedheaders = [];
        for (let i = 0; i < rows[0]?.length; i++) {
          if ( rows[0][i] !== null) {
            updatedheaders.push(rows[0][i]);
          }
        }
        setfile2headers(updatedheaders);
        setResponseData2(response?.data?.sheetData[0].rows);
        if (response?.data?.sheetData[0].rows.length > 0) {
          if (!hasProcessedFile) {
            setinputfilecount((prev) => prev + 1);
            hasProcessedFile = true; // Set the flag to indicate that the file has been processed
          }
        }
        setsheetcountfile2(response.data.sheetNames);
        setfile2(acceptedFiles[0]);
      } catch (error) {
        toast.error("Error while processing the file!");
      }
    }
  }, []);

  useEffect(() => {
    // Check if there is any response data
    if (responseData2?.length > 0) {
      // Set the total rows count
      setTotalRowsT2(responseData2.length);
      // Display initial rows (200 rows)
      const initialRows = responseData2.slice(0, ROWS_TO_DISPLAY_INITIAL);
      setDisplayedRowsTable2(initialRows);
    }
  }, [responseData2]);

  //function to handle sheet change  file-1
  const handlesheetfile1 = async (event) => {
    setResult(false);
    setshowresults(false);
    setstoreselectedcolumn(null);
    setstoreselectedcolumnfile2(null);
    setmatchtype(null);
    setaddfield([
      { selectindexfile1: "", selectindexfile2: "", selectmatchtype: "" },
    ]);
    const index = event.target.value;
    setSelectedOptionIndex(index);
    const file = file1;
    if (file) {
      setFile1Loader(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[index]];
        const jsondata = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
          raw: false,
          dateNF: "mm/dd/yyyy",
        });

        let rows = jsondata.filter((row) => row.join("").trim() !== "");
        rows = rows.map((row) =>
          row.map((value) => {
            // Check if the value is a numeric string
            if (/^-?\d*\.?\d+$/.test(value)) {
              return Number(value);
            }
            return value;
          })
        );
        let updatedheaders = [];
        for (let i = 0; i < rows[0]?.length; i++) {
          if ( rows[0][i] !== null) {
            updatedheaders.push(rows[0][i]);
          }
        }
        setfile1headers(updatedheaders);
        setExcelData(rows);
        setResponseData(rows);
        setFile1Loader(false);
      };
      reader.readAsArrayBuffer(file);
    }
    if (dropboxfile1) {
      setFile1Loader(true);
      const downloadLink = dropboxfile1
        .replace("www.dropbox.com", "dl.dropboxusercontent.com")
        .replace("dl=0", "raw=1");
      const response = await fetch(downloadLink);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[index]];
      const jsondata = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        raw: false,
        dateNF: "mm/dd/yyyy",
      });

      let rows = jsondata.filter((row) => row.join("").trim() !== "");
      rows = rows.map((row) =>
        row.map((value) => {
          // Check if the value is a numeric string
          if (/^-?\d*\.?\d+$/.test(value)) {
            return Number(value);
          }
          return value;
        })
      );
      let updatedheaders = [];
      for (let i = 0; i < rows[0]?.length; i++) {
        if ( rows[0][i] !== null) {
          updatedheaders.push(rows[0][i]);
        }
      }
      setfile1headers(updatedheaders);
      setExcelData(rows);
      setResponseData(rows);
      setFile1Loader(false);
    }
    if (drivesheetchangefile1) {
      const id = drivesheetchangefile1;
      if (id) {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
          {
            headers: {
              Authorization: "Bearer " + token1,
            },
          }
        );

        if (response.ok) {
          setFile1Loader(true);
          const data = await response.arrayBuffer();
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[index]];
          const jsondata = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
            raw: false,
            dateNF: "mm/dd/yyyy",
          });

          let rows = jsondata.filter((row) => row.join("").trim() !== "");
          rows = rows.map((row) =>
            row.map((value) => {
              // Check if the value is a numeric string
              if (/^-?\d*\.?\d+$/.test(value)) {
                return Number(value);
              }
              return value;
            })
          );
          setExcelData(rows);
          setResponseData(rows);
          setFile1Loader(false);
          let updatedheaders = [];
          for (let i = 0; i < rows[0]?.length; i++) {
            if (rows[0][i] !== null) {
              updatedheaders.push(rows[0][i]);
            }
          }
          setfile1headers(updatedheaders);
        } else {
          toast.error(
            "Unable to fetch file content! try again or try with the file having extensions"
          );
        }
      } else {
        toast.error("Invalid Google Drive URL");
      }
    }
    if (urlsheetchangefile1) {
      const sheetchangeurl = urlsheetchangefile1;
      const startIndex = sheetchangeurl.indexOf("/d/") + 3;
      const endIndex = sheetchangeurl.indexOf("/edit");
      const id = sheetchangeurl.substring(startIndex, endIndex);
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
        {
          headers: {
            Authorization: "Bearer " + urltoken1,
          },
        }
      );
      setFile1Loader(true);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[index]];
      const jsondata = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        raw: false,
        dateNF: "mm/dd/yyyy",
      });
      let rows = jsondata.filter((row) => row.join("").trim() !== "");
      rows = rows.map((row) =>
        row.map((value) => {
          // Check if the value is a numeric string
          if (/^-?\d*\.?\d+$/.test(value)) {
            return Number(value);
          }
          return value;
        })
      );
      setExcelData(rows);
      setResponseData(rows);
      setFile1Loader(false);
      let updatedheaders = [];
      for (let i = 0; i < rows[0]?.length; i++) {
        if ( rows[0][i] !== null) {
          updatedheaders.push(rows[0][i]);
        }
      }
      setfile1headers(updatedheaders);
    }
  };

  //function to handle sheet change in file 2
  const handlesheetfile2 = async (event) => {
    setResult(false);
    setshowresults(false);
    setstoreselectedcolumn(null);
    setstoreselectedcolumnfile2(null);
    setmatchtype(null);
    setaddfield([
      { selectindexfile1: "", selectindexfile2: "", selectmatchtype: "" },
    ]);
    const index = event.target.value;
    setSelectedOptionIndex2(index);
    const file = file2;
    if (file) {
      setFile1Loader(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[index]];
        const jsondata = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
          raw: false,
          dateNF: "mm/dd/yyyy",
        });
        let rows = jsondata.filter((row) => row.join("").trim() !== "");
        rows = rows.map((row) =>
          row.map((value) => {
            // Check if the value is a numeric string
            if (/^-?\d*\.?\d+$/.test(value)) {
              return Number(value);
            }
            return value;
          })
        );
        let updatedheaders = [];
        for (let i = 0; i < rows[0]?.length; i++) {
          if ( rows[0][i] !== null) {
            updatedheaders.push(rows[0][i]);
          }
        }
        setfile2headers(updatedheaders);
        setexceldatafile2(rows);
        setResponseData2(rows);
        setFile1Loader(false);
      };
      reader.readAsArrayBuffer(file);
    }
    if (dropboxfile2) {
      const downloadLink = dropboxfile2
        .replace("www.dropbox.com", "dl.dropboxusercontent.com")
        .replace("dl=0", "raw=1");
      const response = await fetch(downloadLink);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[index]];
      const jsondata = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        raw: false,
        dateNF: "mm/dd/yyyy",
      });

      let rows = jsondata.filter((row) => row.join("").trim() !== "");
      rows = rows.map((row) =>
        row.map((value) => {
          // Check if the value is a numeric string
          if (/^-?\d*\.?\d+$/.test(value)) {
            return Number(value);
          }
          return value;
        })
      );
      let updatedheaders = [];
      for (let i = 0; i < rows[0]?.length; i++) {
        if ( rows[0][i] !== null) {
          updatedheaders.push(rows[0][i]);
        }
      }
      setfile2headers(updatedheaders);
      setexceldatafile2(rows);
      setResponseData2(rows);
    }
    if (drivesheetchangefile2) {
      let id = drivesheetchangefile2;
      if (id) {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
          {
            headers: {
              Authorization: "Bearer " + token2,
            },
          }
        );
        if (response.ok) {
          setFile1Loader(true);
          const data = await response.arrayBuffer();
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[index]];
          const jsondata = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
            raw: false,
            dateNF: "mm/dd/yyyy",
          });

          let rows = jsondata.filter((row) => row.join("").trim() !== "");
          rows = rows.map((row) =>
            row.map((value) => {
              // Check if the value is a numeric string
              if (/^-?\d*\.?\d+$/.test(value)) {
                return Number(value);
              }
              return value;
            })
          );
          setexceldatafile2(rows);
          setResponseData2(rows);
          setFile1Loader(false);
          setinputfilecount((prev) => prev + 1);
          let updatedheaders = [];
          for (let i = 0; i < rows[0]?.length; i++) {
            if ( rows[0][i] !== null) {
              updatedheaders.push(rows[0][i]);
            }
          }
          setfile2headers(updatedheaders);
        } else {
          toast.error(
            "Unable to fetch file content! try again or try with the file having extensions"
          );
        }
      } else {
        toast.error("Invalid Google Drive URL");
      }
    }
    if (urlsheetchangefile2) {
      const link = urlsheetchangefile2;
      const startIndex = link.indexOf("/d/") + 3;
      const endIndex = link.indexOf("/edit");
      const id = link.substring(startIndex, endIndex);
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
        {
          headers: {
            Authorization: "Bearer " + urltoken2,
          },
        }
      );
      setFile1Loader(true);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[index]];
      const jsondata = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        raw: false,
        dateNF: "mm/dd/yyyy",
      });
      let rows = jsondata.filter((row) => row.join("").trim() !== "");
      rows = rows.map((row) =>
        row.map((value) => {
          // Check if the value is a numeric string
          if (/^-?\d*\.?\d+$/.test(value)) {
            return Number(value);
          }
          return value;
        })
      );
      setexceldatafile2(rows);
      setResponseData2(rows);
      setFile1Loader(false);
      let updatedheaders = [];
      for (let i = 0; i < rows[0]?.length; i++) {
        if (rows[0][i] !== null) {
          updatedheaders.push(rows[0][i]);
        }
      }
      setfile2headers(updatedheaders);
    }
  };


  // ******************************  READ CONTENTS OF DROPBOX FILE-1  *******************************
  const onSuccess = useCallback(async (files) => {
    const nameWithoutExtension = files[0].name.split(".")[0];
    setfile1name(nameWithoutExtension);
    try {
      const extension = files[0].name.split(".").pop();
      if (
        !(
          extension === "xlsx" ||
          extension === "xls" ||
          extension === "xlsm" ||
          extension === "xlsb" ||
          extension === "xltx" ||
          extension === "xltm" ||
          extension === "xls" ||
          extension === "xlt" ||
          extension === "xlr" ||
          extension === "csv" ||
          extension === "txt" ||
          extension === "dbf" ||
          extension === "xld" ||
          extension === "xlc" ||
          extension === "wks" ||
          extension === "html" ||
          extension === "emf" ||
          extension === "bmp"
        )
      ) {
        toast.error(
          "Unsupported file! only Excel supported files are acceptable."
        );
      } else {
        setFile1Loader(true);
        setdropboxfile1(files[0].link);
        let fileLink = files[0].link;
        const downloadLink = fileLink
          .replace("www.dropbox.com", "dl.dropboxusercontent.com")
          .replace("dl=0", "raw=1");

        const response = await fetch(downloadLink);

        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetNumbers = [];
        workbook.SheetNames.forEach((sheetName, index) => {
          const worksheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
          });
          sheetNumbers.push(sheetName);
          // Do whatever you want with the sheet data here
        });
        setsheetcount(sheetNumbers);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsondata = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
          raw: false,
          dateNF: "mm/dd/yyyy",
        });

        let rows = jsondata.filter((row) => row.join("").trim() !== "");
        rows = rows.map((row) =>
          row.map((value) => {
            // Check if the value is a numeric string
            if (/^-?\d*\.?\d+$/.test(value)) {
              return Number(value);
            }
            return value;
          })
        );
        if (rows.length === 0) {
          toast.error("No content in this file select another file!");
        } else {
          setExcelData(rows);
          setResponseData(rows);
          setFile1Loader(false);
          setinputfilecount((prev) => prev + 1);
        }
        let updatedheaders = [];
        for (let i = 0; i < rows[0]?.length; i++) {
          if (rows[0][i] !== null) {
            updatedheaders.push(rows[0][i]);
          }
        }
        setfile1headers(updatedheaders);
      }
    } catch (error) {
      toast.error("Error!");
    }
  }, []);

 
  // ****************************** READ CONTENTS OF DROPBOX FILE-2  ***************************
  const onSuccessFile2 = useCallback(async (files) => {
    const nameWithoutExtension = files[0].name.split(".")[0];
    setfile2name(nameWithoutExtension);
    try {
      const extension = files[0].name.split(".").pop();
      if (
        !(
          extension === "xlsx" ||
          extension === "xls" ||
          extension === "xlsm" ||
          extension === "xlsb" ||
          extension === "xltx" ||
          extension === "xltm" ||
          extension === "xls" ||
          extension === "xlt" ||
          extension === "xlr" ||
          extension === "csv" ||
          extension === "txt" ||
          extension === "dbf" ||
          extension === "xld" ||
          extension === "xlc" ||
          extension === "wks" ||
          extension === "html" ||
          extension === "emf" ||
          extension === "bmp"
        )
      ) {
        toast.error("Unsupported file! select any excel supported file");
      } else {
        setFile1Loader(true);
        setdropboxfile2(files[0].link);
        let fileLink = files[0].link;
        const downloadLink = fileLink
          .replace("www.dropbox.com", "dl.dropboxusercontent.com")
          .replace("dl=0", "raw=1");
        const response = await fetch(downloadLink);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetNumbers = [];
        workbook.SheetNames.forEach((sheetName, index) => {
          const worksheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
          });
          sheetNumbers.push(sheetName);
        });
        setsheetcountfile2(sheetNumbers);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsondata = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
          raw: false,
          dateNF: "mm/dd/yyyy",
        });

        let rows = jsondata.filter((row) => row.join("").trim() !== "");
        rows = rows.map((row) =>
          row.map((value) => {
            // Check if the value is a numeric string
            if (/^-?\d*\.?\d+$/.test(value)) {
              return Number(value);
            }
            return value;
          })
        );
        if (rows.length === 0) {
          toast.error("No content in this file select another file!");
        } else {
          setexceldatafile2(rows);
          setResponseData2(rows);
          setFile1Loader(false);
          setinputfilecount((prev) => prev + 1);
        }
        let updatedheaders = [];
        for (let i = 0; i < rows[0]?.length; i++) {
          if ( rows[0][i] !== null) {
            updatedheaders.push(rows[0][i]);
          }
        }
        setfile2headers(updatedheaders);
      }
    } catch (error) {
      toast.error("Error!");
    }
  }, []);

  // **************************** PICK AND HANDLE FILE FROM GOODLE DRIVE (file-1) *****************************
  const handleopenPicker = async () => {
    // const clientId = "585542978337-cbeb0j4qo45scn1dp2qdhjs84c415rlc.apps.googleusercontent.com";
    const clientId =
      "110434826385-94lqrs6fksr9noju504bmj8ro0v5b2p8.apps.googleusercontent.com";
    // const clientSecret = "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";
    const clientSecret = "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";
    let accessToken = ""; // Variable to store the current access token
    const fetchAccessToken = async () => {
      if (accessToken) {
        // If an access token exists and is not expired, use it
        return accessToken;
      } else {
        // Access token doesn't exist or has expired, obtain a new one using the refresh token
        // const refreshToken="1//04bEAEC38N4d3CgYIARAAGAQSNwF-L9IrXhVerq03FzrjPzHzbBh-MDtWGOVXn-Lb8x9ZruD4wLIHhfB5jYPAHMZz8sImCYDwPwA"
        const refreshToken =
          "1//04zGpEGq8YtuxCgYIARAAGAQSNwF-L9IrWAaWNhNJOdiNgHWWb_wZ1MtdGngMkEuixnyJSTa-Tj6foI5qHEGTPuxy6uXwfRkXeaw";
        const tokenEndpoint = "https://oauth2.googleapis.com/token";

        try {
          const response = await axios.post(tokenEndpoint, {
            grant_type: "refresh_token",
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
          });

          accessToken = await response.data.access_token;
          const expiresIn = response.data.expires_in;
          return accessToken;
        } catch (error) {
          //  toast.error("error!")
        }
      }
    };

    try {
      // Fetch the access token
      const tkn = await fetchAccessToken();

      // Use the access token for your API requests

      setToken(tkn);

      // Continue with the rest of your code for opening the picker
      openPicker({
        clientId: clientId,
        developerKey: "AIzaSyBTid0X6qHaomwJUcXJcyg3FRwKy5y-7RY",
        viewId: "DOCS",
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,
        callbackFunction: async (data) => {
          if (data.action === "cancel") {
          } else if (data.docs) {
            const nameWithoutExtension = data.docs[0].name.split(".")[0];
            setfile1name(nameWithoutExtension);
            const extension = await data.docs[0].name.split(".").pop();
            if (
              !(
                data.docs[0].mimeType ===
                  "application/vnd.google-apps.spreadsheet" ||
                extension === "xlsx" ||
                extension === "xls" ||
                extension === "xlsm" ||
                extension === "xlsb" ||
                extension === "xltx" ||
                extension === "xltm" ||
                extension === "xls" ||
                extension === "xlt" ||
                extension === "xlr" ||
                extension === "csv" ||
                extension === "txt" ||
                extension === "dbf" ||
                extension === "xld" ||
                extension === "xlc" ||
                extension === "wks" ||
                extension === "html" ||
                extension === "emf" ||
                extension === "bmp"
              )
            ) {
              toast.error("Unsupported file! select any excel supported file");
            } else {
              const url = data.docs[0].url;
              let id = data.docs[0].id;
              setdrivesheetchangefile1(id);
              try {
                if (id) {
                  const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
                    {
                      headers: {
                        Authorization: "Bearer " + tkn,
                      },
                    }
                  );

                  if (response.ok) {
                    setFile1Loader(true);
                    const data = await response.arrayBuffer();
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetNumbers = [];
                    workbook.SheetNames.forEach((sheetName, index) => {
                      const worksheet = workbook.Sheets[sheetName];
                      const rows = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        defval: "",
                      });
                      sheetNumbers.push(sheetName);
                      // Do whatever you want with the sheet data here
                    });
                    setsheetcount(sheetNumbers);
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsondata = XLSX.utils.sheet_to_json(worksheet, {
                      header: 1,
                      defval: "",
                      raw: false,
                      dateNF: "mm/dd/yyyy",
                    });

                    let rows = jsondata.filter(
                      (row) => row.join("").trim() !== ""
                    );
                    rows = rows.map((row) =>
                      row.map((value) => {
                        // Check if the value is a numeric string
                        if (/^-?\d*\.?\d+$/.test(value)) {
                          return Number(value);
                        }
                        return value;
                      })
                    );
                    if (rows.length === 0) {
                    toast.error("No content in this file please select another file")
                    } else {
                      setExcelData(rows);
                      setResponseData(rows);
                      setFile1Loader(false);
                      setinputfilecount((prev) => prev + 1);
                    }
                    let updatedheaders = [];
                    for (let i = 0; i < rows[0]?.length; i++) {
                      if ( rows[0][i] !== null) {
                        updatedheaders.push(rows[0][i]);
                      }
                    }
                    setfile1headers(updatedheaders);
                  } else {
                    toast.error(
                      "Unable to fetch file content! try with the file having extensions"
                    );
                  }
                } else {
                  toast.error("Invalid Google Drive URL");
                }
              } catch (error) {
                toast.error("Error!");
              }
            }
          }
        },
      });
    } catch (error) {
      toast.error("Error!");
    }
  };

  // ******************************PICK AND HANDLE FILE FROM GOOGLE DRIVE (file-2) *******************************
  const handleopenPicker2 = async () => {
    // const clientId ="585542978337-cbeb0j4qo45scn1dp2qdhjs84c415rlc.apps.googleusercontent.com";
    const clientId =
      "110434826385-94lqrs6fksr9noju504bmj8ro0v5b2p8.apps.googleusercontent.com";
    // const clientSecret = "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";
    const clientSecret = "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";
    let accessToken = ""; // Variable to store the current access token

    const fetchAccessToken = async () => {
      if (accessToken) {
        // If an access token exists and is not expired, use it
        return accessToken;
      } else {
        // Access token doesn't exist or has expired, obtain a new one using the refresh token
        // const refreshToken ="1//04bEAEC38N4d3CgYIARAAGAQSNwF-L9IrXhVerq03FzrjPzHzbBh-MDtWGOVXn-Lb8x9ZruD4wLIHhfB5jYPAHMZz8sImCYDwPwA";
        const refreshToken =
          "1//04zGpEGq8YtuxCgYIARAAGAQSNwF-L9IrWAaWNhNJOdiNgHWWb_wZ1MtdGngMkEuixnyJSTa-Tj6foI5qHEGTPuxy6uXwfRkXeaw";
        const tokenEndpoint = "https://oauth2.googleapis.com/token";

        try {
          const response = await axios.post(tokenEndpoint, {
            grant_type: "refresh_token",
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
          });
          accessToken = response.data.access_token;
          return accessToken;
        } catch (error) {
          // toast.error(error)
        }
      }
    };

    try {
      // Fetch the access token
      const tkn = await fetchAccessToken();

      // Use the access token for your API requests

      setToken2(tkn);
      // Continue with the rest of your code for opening the picker
      openPicker({
        clientId: clientId,
        developerKey: "AIzaSyBTid0X6qHaomwJUcXJcyg3FRwKy5y-7RY",
        viewId: "DOCS",
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,
        callbackFunction: async (data) => {
          if (data.action === "cancel") {
          } else if (data.docs) {
            const nameWithoutExtension = data.docs[0].name.split(".")[0];
            setfile2name(nameWithoutExtension);
            const extension = data.docs[0].name.split(".").pop();
            if (
              !(
                data.docs[0].mimeType ===
                  "application/vnd.google-apps.spreadsheet" ||
                extension === "xlsx" ||
                extension === "xls" ||
                extension === "xlsm"||
                extension === "xlsb"||
                extension === "xltx"||
                extension === "xltm"||
                extension === "xls" ||
                extension === "xlt" ||
                extension === "xlr" ||
                extension === "csv" ||
                extension === "txt" ||
                extension === "dbf" ||
                extension === "xld" ||
                extension === "xlc" ||
                extension === "wks" ||
                extension === "html"||
                extension === "emf" ||
                extension === "bmp"
              )
            ) {
              toast.error("Unsupported file! Please select any excel supported file.")
            } else {
              const url = data.docs[0].url;
              let id = data.docs[0].id;
              setdrivesheetchangefile2(id);
              try {
                if (id) {
                  const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
                    {
                      headers: {
                        Authorization: "Bearer " + tkn,
                      },
                    }
                  );
                  if (response.ok) {
                    setFile1Loader(true);
                    const data = await response.arrayBuffer();
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetNumbers = [];
                    workbook.SheetNames.forEach((sheetName, index) => {
                      const worksheet = workbook.Sheets[sheetName];
                      const rows = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        defval: "",
                      });
                      sheetNumbers.push(sheetName);
                      // Do whatever you want with the sheet data here
                    });
                    setsheetcountfile2(sheetNumbers);
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsondata = XLSX.utils.sheet_to_json(worksheet, {
                      header: 1,
                      defval: "",
                      raw: false,
                      dateNF: "mm/dd/yyyy",
                    });
                    let rows = jsondata.filter(
                      (row) => row.join("").trim() !== ""
                    );
                    rows = rows.map((row) =>
                      row.map((value) => {
                        // Check if the value is a numeric string
                        if (/^-?\d*\.?\d+$/.test(value)) {
                          return Number(value);
                        }
                        return value;
                      })
                    );
                    if (rows.length === 0) {
                      toast.error("No content in this file select another file!")
                    } else {
                      setexceldatafile2(rows);
                      setResponseData2(rows);
                      setFile1Loader(false);
                      setinputfilecount((prev) => prev + 1);
                    }
                    let updatedheaders = [];
                    for (let i = 0; i < rows[0]?.length; i++) {
                      if (rows[0][i] !== null) {
                        updatedheaders.push(rows[0][i]);
                      }
                    }
                    setfile2headers(updatedheaders);
                  } else {
                    toast.error(
                      "Unable to fetch file content! try with the file name having extensions"
                    );
                  }
                } else {
                  toast.error("Invalid Google Drive URL");
                }
              } catch (error) {
                toast.error("Error!");
              }
            }
          }
        },
      });
    } catch (error) {
      toast.error("Error!");
    }
  };

  // *********************** HANDLE DELETE BUTTON FUNCTIONALITY FOR FILE-1 ********************
  const handlefile1delete = () => {
    setaddfield([
      { selectindexfile1: "", selectindexfile2: "", selectmatchtype: "" },
    ]);
    setmatchtype(null);
    setshowresults(false);
    setResult(false);
    setExcelData(null);
    setrunmatchenable(null);
    setstoreselectedcolumn(null);
    setstoreselectedcolumnfile2(null);
    setinputfilecount((prev) => prev - 1);
    setDisplayedRows([]);
  };

  // ********************** HANDLE DELETE BUTTON FUNCTIONALITY FOR FILE-2 *********************
  const handlefile1deletefile2 = () => {
    setaddfield([
      { selectindexfile1: "", selectindexfile2: "", selectmatchtype: "" },
    ]);
    setmatchtype(null);
    setshowresults(false);
    setrunmatchenablefile2(null);
    setResult(false);
    setexceldatafile2(null);
    setstoreselectedcolumn(null);
    setstoreselectedcolumnfile2(null);
    setinputfilecount((prev) => prev - 1);
    setDisplayedRowsTable2([]);
  };

  //get drag and drop for file 1
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
  });

  //get drag and drop for file2
  const { getRootProps: getRootPropsfile2, getInputProps: getInputPropsfile2 } =
    useDropzone({
      onDrop: handleFileUploadfile2,
    });

  //  *************************** HANDLE CLEAR RESULTS *****************************
  const handleClearresults = () => {
    setaddfield([
      { selectindexfile1: "", selectindexfile2: "", selectmatchtype: "" },
    ]);
    if (inputfilecount === 1) {
      setmatchedpercentageFile1("");
      setmatchedpercentageFile2("");
      setunmatchedpercentageFile1("");
      setunmatchedpercentageFile2("");
      // setmatchIndexfile1([])
      // setmatchIndexfile2[[]]
      setstoreselectedcolumn(null);
      setstoreselectedcolumnfile2(null);
      setshowresults(false);
      setResult(false);
      setmatchtype(null);
    } else {
      setmatchedpercentageFile1("");
      setmatchedpercentageFile2("");
      setunmatchedpercentageFile1("");
      setunmatchedpercentageFile2("");
      // setmatchIndexfile1([])
      // setmatchIndexfile2[[]]
      setstoreselectedcolumn(null);
      setstoreselectedcolumnfile2(null);
      setshowresults(false);
      setResult(false);
      setmatchtype(null);
    }
  };

  //  *********************************** STORE TABLE-1 SELECTED FIELD COLUMN DATA *********************************
  const handleColumnselectfile1 = (e, i) => {
    setshowresults(false);
    setResult(false);
    const { value } = e.target;
    setaddfield((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[i].selectindexfile1 = value;
      return updatedFields;
    });
    const index = file1headers.map((item) => item).indexOf(e.target.value);
    setrunmatchenable(index);
    setstoreselectedcolumn(value);
  };


  
  // *********************************** STORE TABLE-2 SELECTED FEILD COLUMN DATA **********************************
  const handleColumnselectfile2 = (e, i) => {
    setshowresults(false);
    setResult(false);
    const { value } = e.target;
    setaddfield((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[i].selectindexfile2 = value;
      return updatedFields;
    });
    const index2 = file2headers.map((item) => item).indexOf(e.target.value);
    setrunmatchenablefile2(index2);

    setstoreselectedcolumnfile2(value);
  };

 

  // ******************************** HANDLE DATA ACCORDING TO SELECTED MATCH TYPE ********************************
  const handlematchtype = (event, index) => {
    setshowresults(false);
    setResult(false);
    const { value } = event.target;
    setaddfield((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[index].selectmatchtype = value;
      return updatedFields;
    });
    const match = event.target.value;
    if (match === "near match") {
      setmatchtype(null);
    } else {
      setmatchtype(match);
    }
    if (index !== -1) {
      // make all styles false.
      for (let i = 0; i < addfield.length; i++) {
        if (addfield[i].style && match == "near match") {
          addfield[i].style = false;
        }}
        if(match !== "near match")
        {
          addfield[index]["style"] = false;  
        }
      if (match === "near match") {
        addfield[index]["style"] = true;  
      }
    }};

  // *********************************** CALCULATE THE MATCHED AND UNMATCHED FIELDS ********************************
  const handleResults = () => {
    setmatchedfile1([]);
    setmatchedfile2([]);
    setnotmatchedfile1([]);
    setnotmatchedfile2([]);
    setmatchIndexfile1([]);
    setmatchIndexfile2([]);
    setfile1matchindexwith([])
    setfile2matchindexwith([])
    sethandletotal(0)
    // sethandletotalmatch(0)
    sethandletotal2(0)
    setresultlength(0)
    // sethandletotalmatch2(0)
    for (let i = 0; i < addfield?.length; i++) {
      //select column from file 1
      let index = file1headers.findIndex(
        (item) => item.toString() === addfield[i].selectindexfile1.toString()
      );
      let columndata = [];
      excelData.forEach((internalArray) => {
        columndata.push(internalArray[index]);
      });
      
      setstoreselectedcolumn(columndata);
      sethandletotal((prev)=>prev+columndata?.length)
      setcolumnlengthfile1((prevState) => prevState + columndata.length);

      //select column from file 2
      let index2 = file2headers.findIndex(
        (item) => item.toString() === addfield[i].selectindexfile2.toString()
      );
      let columndatafile2 = [];
      exceldatafile2.forEach((internalArray) => {
        columndatafile2.push(internalArray[index2]);
      });
      setstoreselectedcolumnfile2(columndatafile2);
      sethandletotal2((prev)=>prev+columndatafile2?.length)
      setcolumnlengthfile2((prevState) => prevState + columndatafile2.length);
      matchtypes = addfield[i].selectmatchtype;
      
      if(expectedvaluefile1>100 || expectedvaluefile2>100){
        toast.warning("Percentage above 100 is not allowed")
        setloader(false)
      }else{
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          columndata: columndata,
          columndatafile2: columndatafile2,
          matchtypes: matchtypes,
          radioInput: radioInput,
          expectedvaluefile1: expectedvaluefile1,
          expectedvaluefile2: expectedvaluefile2,
        });
  
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
  
        fetch("https://backend.costpoint.pro/compare_data", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            setresultlength((prev)=>prev+1)
            setfile1indexmatch(result.indexfile1)
            setfile2indexmatch(result.indexfile2)
            setfile1matchindexwith((prev)=>[...prev,...result.indexfile1matchwith])
            setfile2matchindexwith((prev)=>[...prev,...result.indexfile2matchwith])
            setisresult(result.exact_matchedfile1);
            setmatchedfile1((prevMatchedFile1) => [
              ...prevMatchedFile1,
              ...result.exact_matchedfile1,
            ]);
            setmatchedfile2((prevMatchedFile2) => [
              ...prevMatchedFile2,
              ...result.exact_matchedfile2,
            ]);
            // setnotmatchedfile1((prevNotMatchedFile1) => [
            //   ...prevNotMatchedFile1,
            //   ...result.non_exactmatchfile1,
            // ]);
            setnotmatchedfile1((prev)=>[...prev,...result.non_exactmatchfile1])
            setnotmatchedfile2((prev)=>[...prev,...result.non_excatmatchedfile2])
            // setnotmatchedfile2((prevNotMatchedFile2) => [
            //   ...prevNotMatchedFile2,
            //   ...result.non_excatmatchedfile2,
            // ]);
            setmatchIndexfile1((prevmatchedindex) => [
              ...prevmatchedindex,
              ...result.indexfile1,
            ]);
            setmatchIndexfile2((prevmatchindexfile2) => [
              ...prevmatchindexfile2,
              ...result.indexfile2,
            ]);
          })
          .catch((error) => console.log("error", error));
      }
    }
  };
   
  


  // ****************************** REMOVE DUPLICACY FROM THE RESULT GET FROM HANDLERESULT **********************
  useEffect(() => {
  if(resultlength===addfield.length)
  {
      percentage();
  }}, [isresult]);

  //  *************************************** CALCULATE PERCENTAGE *******************************
  const percentage = () => {
    // let uniqueValuesSet = new Set(matchIndexfile1);
    // // Convert the Set back to an array
    // let uniqueValuesArray = Array.from(uniqueValuesSet);
    let uniqueValuesArray=matchIndexfile1
    
    // let uniqueValuesSet2 = new Set(matchIndexfile2);
    // // Convert the Set back to an array
    // let uniqueValuesArray2 = Array.from(uniqueValuesSet2);
    let uniqueValuesArray2=matchIndexfile2
 
    if (checkbox === false) {
          
      const rowswithoutheader = uniqueValuesArray.filter(
        (value) => value !== 0
      );
      const rowswithoutheader2 = uniqueValuesArray2.filter(
        (value) => value !== 0
      );
      const percentagefile1 = (
        (rowswithoutheader?.length / (handletotal - addfield.length)) *
        100
      ).toFixed(4);
     
      setmatchedpercentageFile1(percentagefile1);

      const percentagefile2 = (
        (rowswithoutheader2?.length / (handletotal2 - addfield.length)) *
        100
      ).toFixed(4);
      setmatchedpercentageFile2(percentagefile2);

      const notmatchpercentagefile1 = (
        ((handletotal - addfield?.length - rowswithoutheader?.length) /
          (handletotal - 1)) *
        100
      ).toFixed(4);
      setunmatchedpercentageFile1(notmatchpercentagefile1);

      const notmatchpercentagefile2 = (
        ((handletotal2 - addfield?.length - rowswithoutheader2?.length) /
          (handletotal2 - addfield?.length)) *
        100
      ).toFixed(4);
      
      setunmatchedpercentageFile2(notmatchpercentagefile2);
      if (isNaN(notmatchpercentagefile2)) {
        setResult(false);
      } else {
        setTimeout(() => {
          setloader(false);
        }, 1000);
        setResult(true);
      }
      setshowresults(false);
    } else {
      const percentagefile1 = (
        (uniqueValuesArray?.length / handletotal) *
        100
      ).toFixed(4);
      
      setmatchedpercentageFile1(percentagefile1);

      const percentagefile2 = (
        (uniqueValuesArray2?.length / handletotal2) *
        100
      ).toFixed(4);
      setmatchedpercentageFile2(percentagefile2);

      const notmatchpercentagefile1 = (
        ((handletotal - uniqueValuesArray?.length) / handletotal) *
        100
      ).toFixed(4);
      setunmatchedpercentageFile1(notmatchpercentagefile1);

      const notmatchpercentagefile2 = (
        ((handletotal2 - uniqueValuesArray2?.length) /
          handletotal2) *
        100
      ).toFixed(4);
      setunmatchedpercentageFile2(notmatchpercentagefile2);
      if (isNaN(notmatchpercentagefile2)) {
        setResult(false);
      } else {
        setTimeout(() => {
          setloader(false);
        }, 1000);
        setResult(true);
      }
      setshowresults(false);
    }
  };

  // *************************************** HANDLER TO SHOW ONLY MATCHED RECORDS IN PREVIEW *********************
  const handleMatchedfields = () => {
    setshowunmatchedata(false);
    setshowMatcheddata((prevState) => !prevState);
  };

  // *********************************** HANDLER TO SHOW ONLY UNMATCHED RECORDS IN PREVIEW ************************
  const handleMissmatched = () => {
    setshowMatcheddata(false);
    setshowunmatchedata((prevState) => !prevState);
  };

  // ************************************ HANDLER TO HIDE PREVIEW *****************************
  const hideExample = () => {
    setshowresults(false);
    setResult(true);
  };

  // ******************************** HANDLER TO SHOW PREVIEW ***************************
  const showResult = async () => {
    await setshowresults(true);
    if (divRef.current) {
      // Scroll to the div
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  
  // ******************************** HANDLE RUN MATCH BUTTON FUNCTIONALITY ****************
  const handlerunmatch = () => {
    setshowresults(false)
    setloader(true);
    handleResults();
  };

  const handlecheckbox = () => {
    setcheckbox((prev) => !prev);
  };


  // **************************** download file *********************
  const handleLoader = (file) => {
    setfiledownloadingloader(!filedownloadingloader);
    setTimeout(() => {
      handleDownloadfile(file);
    }, 100);
  };

  const handleDownloadfile = (filetype) => {
    const fileFormat = filetype;
    fetch("https://backend.costpoint.pro/download_file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        excelData: excelData,
        exceldatafile2: exceldatafile2,
        matchIndexfile1: matchIndexfile1,
        matchIndexfile2: matchIndexfile2,
        matchedfile1: matchedfile1,
        matchedfile2: matchedfile2,
        checkbox:checkbox,
        file1matchindexwith:file1matchindexwith,
        file2matchindexwith:file2matchindexwith,
        indexfile1:file1indexmatch,
        indexfile2:file2indexmatch,
        notmatchedfile1:notmatchedfile1,
        notmatchedfile2:notmatchedfile2
      }),
    })
   
    .then((response) => {
      if (!response.ok) { throw new Error('Network response was not ok'); }
    
      // Create a ReadableStream from the response body
      const stream = response.body;
      
      // Function to handle reading and streaming the data in chunks
      const reader = stream.getReader();
      const chunks = [];
      
      function read() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            // All chunks have been read
            return chunks;
          }
          // Append the chunk to the array
          chunks.push(value);
          
          // Continue reading the next chunk
          return read();
        });
      }
      
      return read();
    })
    .then((chunks) => {
      // Combine all chunks into a single Blob
      const blob = new Blob(chunks, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      if (navigator.msSaveBlob) {
        // For IE/Edge browsers
        navigator.msSaveBlob(blob, 'data.xlsx');
      } else {
        // For modern browsers 
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data'+fileFormat;
        link.click();
        setfiledownloadingloader(false) 
      }
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
  };


  // ************************* REMOVE ADDED FIELDS **********************
  const removeField = (index) => {
    setResult(false);
    setshowresults(false);
    if (addfield?.length > 1) {
      setaddfield((prevState) => {
        const updatedFields = [...prevState];
        updatedFields.splice(index, 1);
        return updatedFields;
      });
    }
  };

  //***************** ADD NEW FIELDS ********************
  const addclick = () => {
    
    setResult(false);
    setshowresults(false);
    setaddfield((prevState) => [
      ...prevState,
      { selectindexfile1: "", selectindexfile2: "", selectmatchtype: "" },
    ]);
  };

  const userInput = (e, i) => {
    
    setRadioInput(e.target.value);
    let radiovalue = e.target.value;
    // toast.success(radiovalue + " has been selected");
    for (let i = 0; i < addfield?.length; i++) {
      if (
        (addfield[i].style && radiovalue === "sequential match") ||
        radiovalue === "sectional match"
       ) {
        // addfield[i].style = false;
      }
    }
    setNearMatch(false);
  };
  const handledisabledDropbox = () => {
    toast.warning("Please delete the existing file to select the new!");
  };

  useEffect(()=>{
    for (let i = 0; i < addfield.length; i++) {
      let values = Object.values(addfield[i]);
      if (values.some(value => value === '')) {
        console.log("object contains empty values");
        setEnableRunmatch(false)
      } else {
        console.log("object does not contain empty values");
        setEnableRunmatch(true)
      }
    }
  },[addfield])

  
  // ******************************************* RETURN ****************************************
  return (
    <>
      {/* <Downloadingloader/> */}
      {file1Loader ? <FileLoader /> : ""}
      {filedownloadingloader ? <Downloadingloader /> : null}
      <section className="excel_header">
        <div className="container-fluid">
          <div className="excel_accounting_heading">
            <h2 className="cmn_font_style">
              Compare Excel Accounting Documents Online{" "}
            </h2>
            <h6 className="cmn_font_style">
              Online tool to compare Excel Accounting Documents from any device
              near excel match settings!
            </h6>
          </div>

          <div className="row">
            {excelData === null ? (
              <div className="col-lg-6 col-md-12 col-sm-12 px-4">
                <h3 className="file_heading cmn_font_style">File 1</h3>
                <div className="file">
                  <div {...getRootProps()} className="cloud_img_outer">
                    <img src={cloud_img} className="cloud_img" alt="img" />
                    <input
                      readOnly
                      className="form-control input_field"
                      placeholder="Drop or upload your file here"
                    ></input>
                  </div>
                  <input {...getInputProps()} />
                  <hr className="horizontal_line"></hr>
                  <div className=" link_outer">
                    {data ? (
                      <div className="url_input">
                        <input
                          autoFocus
                          type="text"
                          className="form-control"
                          placeholder="Enter url of file"
                          value={url}
                          onChange={(e) => seturl(e.target.value)}
                        />
                        <button onClick={closeBtn}>Submit</button>
                      </div>
                    ) : (
                      <>
                        <img src={link_img} className="link_img" alt="img" />
                        <h2 className="cmn_font_style" onClick={eventHandler}>
                          Enter Url
                        </h2>
                      </>
                    )}
                  </div>
                </div>
                <div className="googleDrive_outer">
                  <DropboxChooser
                    id="dropbox_chooser"
                    appKey={APP_KEY}
                    success={(files) => onSuccess(files)}
                    multiselect={false}
                  >
                    <div className="dropdownBbox_img cmn_container">
                      <img src={dropdownBbox_img} alt="img" />
                    </div>
                  </DropboxChooser>

                  <div
                    className="googleDrive_img  cmn_container"
                    onClick={handleopenPicker}
                  >
                    <img src={googleDrive_img} alt="img" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-6">
                <h3 className="file_heading cmn_font_style">File 1</h3>
                <div className="table_data">
                  <div className="your_file_excel_wrapper">
                    <h2 className="cmn_font_style">{file1name}</h2>
                    <img
                      onClick={handlefile1delete}
                      src={delete_img}
                      className="delete_img"
                      alt="img"
                    />
                  </div>

                  <div className="displayData" onScroll={fetchMoreRows}>
                    {displayedRows && (
                      <table>
                        <tbody>
                          {displayedRows.map((row, index) => (
                            <tr key={index}>
                              {/* Render each cell in the row */}
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="original_file_outer">
                    <h2 className="cmn_font_style cmn_font_size select_sheet_heading">
                      Select Sheet
                    </h2>
                    {sheetcount.length === 1 ? (
                      <select>
                        <option value="" selected hidden>
                          File 1
                        </option>
                        {sheetcount.map((element, index) => {
                          return (
                            <option key={index} value={index}>
                              {element}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <select
                        value={selectedOptionIndex}
                        onChange={handlesheetfile1}
                      >
                        <option value="" selected hidden>
                          File 1
                        </option>
                        {sheetcount.map((element, index) => {
                          return (
                            <option key={index} value={index}>
                              {element}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                </div>
                <div className="googleDrive_outer">
                  <div className="dropdownBbox_img cmn_container">
                    <img
                      onClick={handledisabledDropbox}
                      src={dropdownBbox_img}
                    />
                  </div>
                  <div className="googleDrive_img  cmn_container">
                    <img
                      onClick={handledisabledDropbox}
                      src={googleDrive_img}
                      alt="img"
                    />
                  </div>
                </div>
              </div>

              // } </>
            )}
            {exceldatafile2 === null ? (
              <div className="col-lg-6 col-md-12 col-sm-12 px-4">
                <h3 className="file_heading cmn_font_style">File 2</h3>
                <div className="file">
                  <div {...getRootPropsfile2()} className="cloud_img_outer">
                    <img src={cloud_img} className="cloud_img" />
                    <input
                      readOnly
                      className="form-control input_field"
                      placeholder="Drop or upload your file here"
                    ></input>
                  </div>
                  <input {...getInputPropsfile2()} />
                  <hr className="horizontal_line"></hr>
                  <div className=" link_outer">
                    {fileData2 ? (
                      <div className="url_input">
                        <input
                          autoFocus
                          type="text"
                          className="form-control"
                          placeholder="Enter url of file"
                          value={file2url}
                          onChange={(e) => setfile2url(e.target.value)}
                        />
                        <button onClick={closeBtn2}>Submit</button>
                      </div>
                    ) : (
                      <>
                        <img src={link_img} className="link_img" />
                        <h2 className="cmn_font_style" onClick={eventHandler2}>
                          Enter Url
                        </h2>
                      </>
                    )}
                  </div>
                </div>

                <div className="googleDrive_outer">
                  <DropboxChooser
                    id="dropbox_chooser"
                    appKey={APP_KEY}
                    success={(files) => onSuccessFile2(files)}
                    // cancel={() => console.log("closed")}
                    multiselect={false}
                  >
                    <div className="dropdownBbox_img cmn_container">
                      <img src={dropdownBbox_img} />
                    </div>
                  </DropboxChooser>
                  <div
                    onClick={handleopenPicker2}
                    className="googleDrive_img  cmn_container"
                  >
                    <img src={googleDrive_img} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-6">
                <h3 className="file_heading cmn_font_style">File 2</h3>
                <div className="table_data">
                  <div className="your_file_excel_wrapper">
                    <h2 className="cmn_font_style">{file2name}</h2>
                    <img
                      onClick={handlefile1deletefile2}
                      src={delete_img}
                      className="delete_img"
                    />
                  </div>
                  <div className="displayData" onScroll={fetchMoreRowsT2}>
                    {displayedRowsTable2 && (
                      <table>
                        <tbody>
                          {displayedRowsTable2.map((row, index) => (
                            <tr key={index}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="original_file_outer">
                    <h2 className="cmn_font_style cmn_font_size select_sheet_heading">
                      Select Sheet
                    </h2>
                    {sheetcountfile2.length === 1 ? (
                      <select>
                        <option value="" selected hidden>
                          File 2
                        </option>
                        {sheetcountfile2.map((element, index) => {
                          return (
                            <option key={index} value={index}>
                              {element}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <select
                        value={selectedOptionIndex2}
                        onChange={handlesheetfile2}
                      >
                        <option value="" selected hidden>
                          File 2
                        </option>
                        {sheetcountfile2.map((element, index) => {
                          return (
                            <option key={index} value={index}>
                              {element}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                </div>
                <div className="googleDrive_outer">
                  <div className="dropdownBbox_img cmn_container">
                    <img
                      onClick={handledisabledDropbox}
                      src={dropdownBbox_img}
                      alt="img"
                    />
                  </div>
                  <div className="googleDrive_img  cmn_container">
                    <img
                      onClick={handledisabledDropbox}
                      src={googleDrive_img}
                      alt="img"
                    />
                  </div>
                </div>
              </div>
              // } </>
            )}
          </div>
          <div className="identity_heading_outer">
            <h5 className="identity_heading cmn_font_style">
              Identity fields that need to matched by clicking on the respective
              fields on both sides Match
            </h5>
            <div class="form-check ms-3 checkbox_outer">
              <input
                class="form-check-input checkbox"
                type="checkbox"
                value=""
                defaultChecked={true}
                onClick={handlecheckbox}
                id="flexCheckDefault"
              />
              <label
                class="form-check-label cmn_font_style content_heading"
                for="flexCheckDefault"
              >
                my data contains the header
              </label>
            </div>
          </div>
          {/* select type match ........................*/}
          <div className="outer_MatchType">
            <div className="container">
              <div className="dropdown_btn_wrapper">
                {" "}
                {inputfilecount === 2 ? (
                  <div>
                    {addfield.map((row, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            nearMatch
                              ? "dropdown_wrapper_inner1"
                              : "dropdown_wrapper_inner"
                          }
                        >
                          <div
                            className={
                              row?.style ? " select_type_match_outer" : ""
                            }
                          >
                            <div className=" dropdown_items">
                              <div class="dropdown">
                                <select
                                  onChange={(e) =>
                                    handleColumnselectfile1(e, index)
                                  }
                                  value={row.selectindexfile1}
                                  className="dropdown_btn form-select"
                                >
                                  <option value="" selected hidden>
                                    Select match column from File 1
                                  </option>
                                  {file1headers.map((element, index) => {
                                    return (
                                      <>
                                        <option key={index} value={element}>
                                          {element}
                                        </option>
                                      </>
                                    );
                                  })}
                                  {/* <img  */}
                                  <img
                                    src={polygon_img}
                                    width="40px"
                                    height="40px"
                                  />
                                </select>
                              </div>
                              <div className="dropdown">
                                <select
                                  value={row.selectmatchtype}
                                  onChange={(e) => handlematchtype(e, index)}
                                  className="dropdown_btn form-select "
                                >
                                  <option selected hidden value=""> Select match type</option>
                                  <option value="exact match"> Exact match</option>
                                  <option value="exact number match">Exact Number match</option>
                                  <option value="exact text match">Exact Text match</option>
                                  <option value="near match">Near match</option>
                                </select>
                              </div>
                              <div className="dropdown">
                                <select
                                  onChange={(e) =>
                                    handleColumnselectfile2(e, index)
                                  }
                                  value={row.selectindexfile2}
                                  className="dropdown_btn form-select"
                                >
                                  <option value="" selected hidden>
                                    Select match column from File 2
                                  </option>
                                  {file2headers.map((element, index) => {
                                    return (
                                      <>
                                        <option key={index} value={element}>
                                          {element}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>

                            {row?.style && (
                              <>
                                <div className="">
                                  <h2 className="type_matching_heading cmn_font_style">
                                    Select Type of Matching
                                  </h2>
                                  <hr></hr>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                      <div className="expected_container">
                                        <input
                                          value={expectedvaluefile1}
                                          onChange={(e) =>
                                            setexpectedvaluefile1(
                                              e.target.value
                                            )
                                          }
                                          placeholder="80%"
                                          className="expectedMatch_btn"
                                        />

                                        <h5 className="expected_heading">
                                          {" "}
                                          Expected % match
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                      <div className="type_match_innerContnt">
                                        <div className="sequential_match_wrapper">
                                          <input
                                            type="radio"
                                            className=""
                                            name="radio"
                                            onChange={(e) =>
                                              userInput(e, index)
                                            }
                                            value="sequential match"
                                          />
                                          <label className="cmn_font_style">
                                            Sequential Match
                                          </label>
                                        </div>
                                        <div className="sequential_match_wrapper">
                                          <input
                                            type="radio"
                                            className=""
                                            name="radio"
                                            onChange={(e) => userInput(e)}
                                            value="sectional match"
                                          />
                                          <label className="cmn_font_style">
                                            Sectional match
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                      <div className="expected_container">
                                        <input
                                          value={expectedvaluefile2}
                                          onChange={(e) =>
                                            setexpectedvaluefile2(
                                              e.target.value
                                            )
                                          }
                                          placeholder="80%"
                                          className="expectedMatch_btn"
                                        />
                                        <h5 className="expected_heading">
                                          {" "}
                                          Expected % match
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          {addfield?.length > 1 ? (
                            <div
                              className={
                                row?.style
                                  ? "delete_img_outerBox1"
                                  : "delete_img_outerBox"
                              }
                            >
                              <img
                                onClick={() => removeField(index)}
                                src={delete_image}
                                className=""
                                alt="img"
                              />
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="container">
            <div
              className={
                inputfilecount === 2 ? "runBtn_outer" : "display_class"
              }
            >
              {inputfilecount === 2 ? (
                <div className="addMatch_btn_wrapper">
                  <button
                    onClick={addclick}
                    className="clearResult_And_addNew_Btn cmn_font_style cmn_btn"
                  >
                    Add new match type
                  </button>
                </div>
              ) : null}
              {storeselectedcolumn != null &&
              storeselectedcolumnfile2 != null &&
              (matchtype != null || radioInput !== "") &&
              runmatchenablefile1 != null &&
              runmatchenablefile2 != null && enableRunmatch===true ? (
                <div className="addMatch_btn_wrapper">
                  <button
                    ref={buttonRef}
                    className="runMatch_btn_bg cmn_font_style cmn_btn"
                    onClick={handlerunmatch}
                  >
                    Run match
                  </button>
                </div>
              ) : (
                <div className="btnWrapper">
                  <button className="  run_match_btn cmn_font_style cmn_btn">
                    Run match
                  </button>
                </div>
              )}{" "}
              {inputfilecount === 1 || inputfilecount > 1 ? (
                <div
                  className={
                    inputfilecount === 1
                      ? "addMatch_btn_wrapper clearResult_btn"
                      : "addMatch_btn_wrapper "
                  }
                >
                  <button
                    onClick={handleClearresults}
                    className="clearResult_And_addNew_Btn cmn_font_style cmn_btn"
                  >
                    Start Over
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* calculated result--- */}
          <div class="loader_outer">
            {loader ? (
              <div class="loader">
                <img src={resultloader} alt="img" height="60px" width="60px" />
              </div>
            ) : (
              <div ref={div2ref}>
                {result ? (
                  <div className="calculatedResult_Outer">
                    <div className="matched_outer">
                      <h2 className="record_heading cmn_font_style">
                        {matchedpercentageFile1} %
                      </h2>
                      <h2 className="cmn_font_style matched_heading">
                        Matched
                      </h2>
                      <h2 className="record_heading cmn_font_style">
                        {matchedpercentageFile2} %
                      </h2>
                    </div>
                    <div className="notmatched_outer">
                      <h2 className="cmn_font_style notmatch_record_heading ">
                        {unmatchedpercentageFile1}%
                      </h2>
                      <h2 className="cmn_font_style matched_heading">
                        {" "}
                        Not Matched
                      </h2>
                      <h2 className="cmn_font_style notmatch_record_heading ">
                        {unmatchedpercentageFile2}%
                      </h2>
                    </div>
                    <div className="resultBtn_outer">
                      <button
                        className="showExample_btn cmn_font_style cmn_result_btn"
                        onClick={showResult}
                      >
                        Show Results
                      </button>

                      <div class="dropdown">
                        <a
                          className="btn dropdown-toggle export_result_btn"
                          role="button"
                          id="dropdownMenuLink"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Export results
                        </a>

                        <ul
                          class="dropdown-menu w-100"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={() => {
                                handleLoader(".xlsx");
                              }}
                            >
                              .xlsx
                            </a>
                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => handleLoader(".txt")}
                              >
                                .txt
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => {
                                  handleLoader(".xls");
                                }}
                              >
                                .xls
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item"
                                onClick={() => {
                                  handleLoader(".csv");
                                }}
                              >
                                .csv
                              </a>
                            </li>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          {inputfilecount === 2 ? (
            <h5 className="matching_column_heading cmn_font_style">
              You need to add two files and select one or more matching columns
            </h5>
          ) : null}

          <ToastContainer position="top-left" toastClassName="my-toast" />

          {/* next section */}
        </div>
      </section>
      {showresults === true ? (
        <section className="result_container">
          <div ref={divRef} className="container-fluid">
            <div className="result_wrapper">
              <h2 className="results_heading">Results</h2>
              <div className="result_outer">
                <div className="hideResult_btn_container">
                  <button
                    onClick={hideExample}
                    className="hide_btn cmn_ai_btn cmn_font_style"
                  >
                    Hide examples
                  </button>
                  <button
                    hidden
                    className="check_btn cmn_ai_btn cmn_font_style"
                  >
                    Check with AI
                  </button>
                </div>
                <div className="filter_outer">
                  <h2 className="filter_heading">Filter data</h2>
                  <button
                    className="matched_field_btn field_btn cmn_font_style field_btn"
                    style={{
                      backgroundColor:
                        showMatcheddata === true ? "#2A8AE6" : "white",
                      color: showMatcheddata === true ? "white" : "#2A8AE6",
                    }}
                    onClick={handleMatchedfields}
                  >
                    Matched fields
                  </button>
                  <button
                    className="mismatched_field_btn  field_btn cmn_font_style field_btn"
                    onClick={handleMissmatched}
                    style={{
                      backgroundColor:
                        showunmatchedata === true ? "#FF5019" : "white",
                      color: showunmatchedata === true ? "white" : "#FF5019",
                    }}
                  >
                    Mismatched fields
                  </button>
                </div>
                <div className="row">
                  {showMatcheddata === false && showunmatchedata === false ? (
                    <div className="cmn_display">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          onScroll={fetchMoreRowsresult1}
                          className="displayData"
                        >
                          <div id="table">
                            {displayedRowsResult1 && (
                              <table className="table_div w-100">
                                <tbody>
                                  {displayedRowsResult1.map((row, rowIndex) => {
                                    const isMatched =
                                      !notmatchedfile1.includes(rowIndex);
                                    const rowClassName =
                                      rowIndex === 0
                                        ? "first-row"
                                        : isMatched
                                        ? "matched-row"
                                        : "unmatched-row";

                                    if (!checkbox) {
                                      return (
                                        <tr
                                          key={rowIndex}
                                          className={rowClassName}
                                        >
                                          {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                          ))}
                                        </tr>
                                      );
                                    } else {
                                      return (
                                        <tr
                                          key={rowIndex}
                                          className={
                                            isMatched
                                              ? "matched-row"
                                              : "unmatched-row"
                                          }
                                        >
                                          {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                          ))}
                                        </tr>
                                      );
                                    }
                                  })}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          onScroll={fetchMoreRowsresult2}
                          className="displayData"
                        >
                          {displayedRowsResult2 && (
                            <table className="table_div w-100">
                              <tbody>
                                {displayedRowsResult2.map((row, rowIndex) => {
                                  const isMatched =
                                    !notmatchedfile2.includes(rowIndex);
                                  const rowClassName =
                                    rowIndex === 0
                                      ? "first-row"
                                      : isMatched
                                      ? "matched-row"
                                      : "unmatched-row";

                                  if (!checkbox) {
                                    return (
                                      <tr
                                        key={rowIndex}
                                        className={rowClassName}
                                      >
                                        {row.map((cell, cellIndex) => (
                                          <td key={cellIndex}>{cell}</td>
                                        ))}
                                      </tr>
                                    );
                                  } else {
                                    return (
                                      <tr
                                        key={rowIndex}
                                        className={
                                          isMatched
                                            ? "matched-row"
                                            : "unmatched-row"
                                        }
                                      >
                                        {row.map((cell, cellIndex) => (
                                          <td key={cellIndex}>{cell}</td>
                                        ))}
                                      </tr>
                                    );
                                  }
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {showMatcheddata === true ? (
                    <div className="cmn_display">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          onScroll={fetchMoreRowsresult1match}
                          className="displayData"
                        >
                          {displayedRowsmatchResult && (
                            <table className="table_div w-100">
                              <tbody>
                                {displayedRowsmatchResult.map((row, rowIndex) =>
                                  !checkbox &&
                                  rowIndex ===
                                    0 ? null : !notmatchedfile1.includes(
                                      rowIndex
                                    ) ? (
                                    <tr
                                      key={rowIndex}
                                      style={{ backgroundColor: "#bfdcf7" }}
                                    >
                                      {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                      ))}
                                    </tr>
                                  ) : null
                                )}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>  

                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          onScroll={fetchMoreRowsresult2match}
                          className="displayData"
                        >
                          {displayedRowsmatchResult2 && (
                            <table className="table_div w-100">
                              <tbody>
                                {displayedRowsmatchResult2.map(
                                  (row, rowIndex) =>
                                    !checkbox &&
                                    rowIndex ===
                                      0 ? null : !notmatchedfile2.includes(
                                        rowIndex
                                      ) ? (
                                      <tr
                                        key={rowIndex}
                                        style={{ backgroundColor: "#bfdcf7" }}
                                      >
                                        {row.map((cell, cellIndex) => (
                                          <td key={cellIndex}>{cell}</td>
                                        ))}
                                      </tr>
                                    ) : null
                                )}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {showunmatchedata === true ? (
                    <div className="cmn_display">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          onScroll={fetchMoreRowsresult1unmatch}
                          className="displayData"
                        >
                          {displayedRowsunmatchResult && (
                            <table className="table_div w-100">
                              <tbody>
                                {displayedRowsunmatchResult.map(
                                  (row, rowIndex) =>
                                    !checkbox ? (
                                      rowIndex !== 0 &&
                                    notmatchedfile1.includes(rowIndex) ? (
                                        <tr
                                          key={rowIndex}
                                          style={{ backgroundColor: "#fccbba" }}
                                        >
                                          {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                          ))}
                                        </tr>
                                      ) : null
                                    ) : !notmatchedfile1.includes(
                                        rowIndex
                                      ) ? null : (
                                      <tr
                                        key={rowIndex}
                                        style={{ backgroundColor: "#fccbba" }}
                                      >
                                        {row.map((cell, cellIndex) => (
                                          <td key={cellIndex}>{cell}</td>
                                        ))}
                                      </tr>
                                    )
                                )}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div
                          onScroll={fetchMoreRowsresult2unmatch}
                          className="displayData"
                        >
                          {displayedRowsunmatchResult2 && (
                            <table className="table_div w-100">
                              <tbody>
                                {displayedRowsunmatchResult2.map(
                                  (row, rowIndex) =>
                                    !checkbox ? (
                                      rowIndex !== 0 &&
                                      notmatchedfile2.includes(rowIndex) ? (
                                        <tr
                                          key={rowIndex}
                                          style={{ backgroundColor: "#fccbba" }}
                                        >
                                          {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                          ))}
                                        </tr>
                                      ) : null
                                    ) : !notmatchedfile2.includes(
                                        rowIndex
                                      ) ? null : (
                                      <tr
                                        key={rowIndex}
                                        style={{ backgroundColor: "#fccbba" }}
                                      >
                                        {row.map((cell, cellIndex) => (
                                          <td key={cellIndex}>{cell}</td>
                                        ))}
                                      </tr>
                                    )
                                )}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="export_result_btn_outer">
                    <div class="dropdown">
                      <a
                        className="btn dropdown-toggle export_result_btn "
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Export results
                      </a>

                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li>
                          <a
                            class="dropdown-item"
                            onClick={() => handleLoader(".xlsx")}
                          >
                            .xlsx
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            onClick={() => handleLoader(".txt")}
                          >
                            .txt
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            onClick={() => handleLoader(".xls")}
                          >
                            .xls
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            onClick={() => handleLoader(".csv")}
                          >
                            .csv
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};
export default ExcelFile;
