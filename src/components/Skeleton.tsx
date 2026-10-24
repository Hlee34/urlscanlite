import './Skeleton.css'

export function Skeleton() {
    return (
        <div className="skeleton-result">
            <div className="skeleton-summary">
                <span className="skeleton-line"></span>
                <span className="skeleton-line"></span>
                <span className="skeleton-line"></span>
                <span className="skeleton-line"></span>
                <span className="skeleton-line"></span>
                <span className="skeleton-line" style={{width:"40%"}}></span>
            </div>
            <div className="skeleton-screenshot"></div>
        </div>
    );
}