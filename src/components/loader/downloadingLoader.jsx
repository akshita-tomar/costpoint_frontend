import downloadingLoader from "../../images/downloadloader.webp";
import "./loader.css";
const Downloadingloader = () => {
  return (
    <div className="processing_loader downloader_outer">
      <div style={{ textAlign: "center" }}>
        <div className="download_gif">
          <img src="/images/downloadloader.gif" height="60" width="60" />
        </div>
        <h2 style={{ textAlign: "center" }}>
          File is downloading it will take a while
        </h2>
      </div>
    </div>
  );
};
export default Downloadingloader;
