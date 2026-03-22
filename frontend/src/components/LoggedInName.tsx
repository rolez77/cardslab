
function LoggedInName(){

    function doLogOut(event:any): void{
        event.preventDefault();
        localStorage.removeItem('user_data');
        alert('doLogOut()');
    };

    return(
        <div id = 'loggedInDiv'>
            <span id = 'username'> Logged in as John Doe</span><br/>
            <button type = 'button' id='logoutButton' className='buttons' onClick={doLogOut}>
                Log Out
            </button>
        </div>
    );
};
export default LoggedInName;