import { useNavigate, useSearchParams, useLocation } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { submitScan } from '../api/scan'
import { Options } from './Options'
import magnifier from "../assets/images/iconmonstr-magnifier-2-240.png"
import './UrlInput.css'

type Result = {
    status: 200;
    url: string;
    domain: string;
    ip: string;
    asnname: string;
    country: string;
    city: string;
    malicious: boolean;
    screenshot: string;
} | {
    status: number;
    message: string;
    description: string;
} | null;

interface UrlInputProps {
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

export function UrlInput({ options, setOptions, visibility, setVisibility, setResult }: UrlInputProps) {
    const [searchParams] = useSearchParams();
    const [scanUrl, setScanUrl] = useState(searchParams.get("url") || "");
    const location = useLocation();
    const navigate = useNavigate();
    const scanStarted = useRef(false);

    const changeSearchUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScanUrl(event.target.value);
    };

    const handleOnSubmit = (e : any) => {
        e.preventDefault();
        navigate(`/scan?url=${encodeURIComponent(scanUrl)}`);
    };

    useEffect(() => {
        if (location.pathname === "/scan" && !scanStarted.current) {
            scanStarted.current = true;
            const queryUrl = searchParams.get("url") ?? "";
            submitScan(queryUrl, visibility, setResult)
        }
    }, [location.pathname, searchParams, visibility, setResult]);   

    return (
        <form onSubmit={handleOnSubmit} className="input-container">
            <input className="search-bar" name="scanUrl" placeholder="URL" value={scanUrl} onChange={changeSearchUrl}></input>

                <button className="scan-button">
                    <img id="magnifier" src={magnifier} alt="Scan Icon" />
                    Scan
                </button>

            <Options options={options} setOptions={setOptions} visibility={visibility} setVisibility={setVisibility} />
        </form>
    );
}