import "./index.css";

function RegistrationButton({ buttonText, handleClick, className = "", username }) {
    return (
        <div className={`user-registration-button ${className}`}>
            {username ? (
                <span className="username-greeting">Hi, {username}</span>  
            ) : (
                <button onClick={handleClick} className="registration-btn">{buttonText}</button>  
            )}
        </div>
    );
}

export default RegistrationButton;
