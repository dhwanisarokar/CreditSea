import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import ReportDisplay from "./components/ReportDisplay";
import { fetchReports } from "./services/api";
import "./index.css";

const App = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        const data = await fetchReports();
        setReports(data);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-5">Soft Credit Pull Dashboard</h1>
                <FileUpload onUpload={loadReports} />
                {reports.length > 0 ? (
                    <ReportDisplay reports={reports} />
                ) : (
                    <p className="text-center text-gray-500 mt-5">No reports available. Upload a file to get started.</p>
                )}
            </div>
        </div>
    );
};

export default App;
